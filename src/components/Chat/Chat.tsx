import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../utils/fireBaseConfig";
import { Message } from "../../interfaces/chat/message";
import { ChatProps } from "../../interfaces/chat/chatprops";

const Chat: React.FC<ChatProps> = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
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
            className="bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm hover:bg-white/15 transition duration-300"
            key={message.id}
          >
            <span className="font-semibold text-pink-300 text-sm sm:text-base">
              {message.user}
            </span>
            <p className="mt-1 text-white/90 text-sm sm:text-base">
              {message.text}
            </p>
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
