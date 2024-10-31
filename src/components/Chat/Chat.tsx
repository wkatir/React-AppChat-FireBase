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
import { Trash2, Edit2, X, Check } from "lucide-react";

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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-xl">
      <div className="border-b border-white/20 pb-3 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 text-center">
          {room.toUpperCase()}
        </h1>
      </div>
      <div className="h-64 sm:h-80 md:h-96 overflow-y-auto space-y-3 sm:space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-300">
        {messages.map((message) => (
          <div
            className="bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition duration-300 relative group"
            key={message.id}
          >
            <span
              className={`font-semibold ${generateUserColor(
                message.user
              )} text-sm sm:text-base`}
            >
              {message.user}
            </span>
            {editingId === message.id ? (
              <div className="mt-2 flex items-center space-x-2">
                <input
                  className="flex-grow px-3 py-1 bg-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-pink-400"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button
                  onClick={() => handleEdit(message.id)}
                  className="p-1 text-green-400 hover:text-green-300"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={cancelEditing}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <p className="mt-1 text-white/90 text-sm sm:text-base">
                {message.text}
              </p>
            )}
            {message.user === auth.currentUser?.displayName && !editingId && (
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEditing(message)}
                  className="p-1 text-blue-400 hover:text-blue-300"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-grow px-3 sm:px-4 py-2 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white/20 transition duration-300 text-sm sm:text-base"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out transform hover:-translate-y-1 text-sm sm:text-base"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
