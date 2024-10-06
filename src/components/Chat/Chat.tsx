import React, { useEffect, useState } from 'react'
import styles from './Chat.module.css'
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from "firebase/firestore"
import { auth, db } from '../fireBaseConfig/fireBaseConfig';


interface ChatProps {
    room: string;
}

const Chat: React.FC<ChatProps> = (props) => {
  
    const {room} = props

    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const messageRef = collection(db, "messages");
    

   useEffect(() =>{
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"))
       const unsuscribe = onSnapshot(queryMessages, (snaphot) => {
            let messages: any[] = [];
            snaphot.forEach((document) => {
                messages.push({ ...document.data(), id: document.id });
           })
           setMessages(messages);
        });

        return () => unsuscribe();

   }, [room]);

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
       if(newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser?.displayName,
            room: room,
        });

        setNewMessage("");

    };

    return (
        <div className={styles.chatApp}>
            <div className={styles.header}>
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
        <div className={styles.messages}>
            {messages.map((message) => (
                <div className={styles.message} key={message.id}>
                    <span className={styles.user}>{message.user}</span>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
        <form  onSubmit={handleSubmit} className={styles.newMessageForm}>
            <input className={styles.newMessageInput} placeholder="Type your message here"
            onChange={(e) => setNewMessage(e.target.value)} 
            value={newMessage}
            />
            <button type="submit" className={styles.btnSend}>Send</button>
        </form>
    </div>
  )
}

export default Chat