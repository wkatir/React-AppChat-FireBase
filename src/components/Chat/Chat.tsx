import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/fireBaseConfig";
import { Message } from "../../interfaces/chat/message";
import { ChatProps } from "../../interfaces/chat/chatprops";
import {
  Trash2,
  Edit2,
  X,
  Check,
  Send,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const generateUserColor = (username: string): string => {
  const colors = [
    "text-emerald-300",
    "text-pink-300",
    "text-sky-300",
    "text-amber-300",
    "text-violet-300",
    "text-rose-300",
    "text-teal-300",
    "text-orange-300",
    "text-cyan-300",
    "text-yellow-300",
  ];

  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Chat: React.FC<ChatProps> = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snaphot) => {
      const messages: Message[] = [];
      snaphot.forEach((document) => {
        messages.push({ ...document.data(), id: document.id } as Message);
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, [room]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room: room,
    });
    setNewMessage("");
  };

  const handleDelete = async (messageId: string) => {
    try {
      const messageDoc = doc(db, "messages", messageId);
      await deleteDoc(messageDoc);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const startEditing = (message: Message) => {
    setEditingId(message.id);
    setEditingText(message.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleEdit = async (messageId: string) => {
    if (editingText.trim() === "") return;
    try {
      const messageDoc = doc(db, "messages", messageId);
      await updateDoc(messageDoc, {
        text: editingText,
      });
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <div className="relative min-h-screen max-w-4xl mx-auto p-4">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
      <div className="absolute top-20 left-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="relative p-4 border-b border-gray-700 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {room.toUpperCase()}
          </h1>
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        </div>
      </div>

      <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        {messages.map((message) => (
          <div
            key={message.id}
            className="group relative transform transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-lg p-4 border border-gray-700 shadow-lg hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span
                  className={`font-medium ${generateUserColor(message.user)}`}
                >
                  {message.user}
                </span>
              </div>

              {editingId === message.id ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    className="flex-grow px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => handleEdit(message.id)}
                    className="p-2 text-green-400 hover:text-green-300 transition-colors duration-300"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-gray-200">{message.text}</p>
              )}

              {message.user === auth.currentUser?.displayName &&
                !editingId && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEditing(message)}
                      className="p-1.5 bg-gray-800 rounded-full text-blue-400 hover:text-blue-300 hover:bg-gray-700 transition-all duration-300"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-1.5 bg-gray-800 rounded-full text-red-400 hover:text-red-300 hover:bg-gray-700 transition-all duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-xl border-t border-gray-700">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative flex gap-2">
            <input
              className="flex-grow px-4 py-3 bg-gray-900 rounded-lg text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              placeholder="Escribe tu mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
                 <button
                type="submit"
                className="relative rounded-full p-px focus:outline-none bg-gray-800 text-white"
              >
                <Send className="w-8 h-8 p-2" />
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Chat;
