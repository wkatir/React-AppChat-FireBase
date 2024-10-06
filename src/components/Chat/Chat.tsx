import React, { useEffect, useState } from 'react'
import styles from './Chat.module.css'
import {addDoc, collection, onSnapshot, query, serverTimestamp, where} from "firebase/firestore"
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
        const queryMessages = query(messageRef, where("room", "==", room))
        onSnapshot(queryMessages, (snaphot) => {
            let messages: any[] = [];
            snaphot.forEach((document) => {
                messages.push({ ...document.data(), id: document.id });
           })
           setMessages(messages);
        });
   }, [])

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
        <div>
            {messages.map((message) => (
                <h1 key={message.id}>{message.text}</h1>
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