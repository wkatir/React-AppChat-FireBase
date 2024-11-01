import { useState, useEffect } from "react";
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
import { auth, db } from "../utils/fireBaseConfig";
import { Message } from "../interfaces/chat/message";

export const useChat = (room: string) => {
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
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((document) => {
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

  return {
    newMessage,
    setNewMessage,
    messages,
    editingId,
    editingText,
    setEditingText,
    handleSubmit,
    handleDelete,
    startEditing,
    cancelEditing,
    handleEdit,
  };
};
