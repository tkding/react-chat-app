import React, { useEffect } from "react";

import  { auth, db } from "../../config/firebase";
// hook form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { ChatProps as ChatPropsI } from "./chat-main";

interface FormData {
    message: string;
}

interface ChatProps {
    ChatProps: ChatPropsI;
}

interface Message {
    id: string;
    message: string;
    creatAt: string;
    room: number | null;
    userId: string;
    username: string;
}

export const Chat = ({ ChatProps }: ChatProps) => {
    const [ user ] = useAuthState(auth);
    const [ messages, setMessages ] = React.useState<Message[]>([]);

    const schema = yup.object().shape({
        message: yup.string().required("message is required").min(4, "message is too short").max(100, "message is too long"),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const messagesRef = collection(db, "messages");

    // onSnapShot() is used to listen for real-time updates
    const onSubmit = async (data: FormData) => {
        try {
            // send message to firestore
            await addDoc(messagesRef, {
                ...data,
                creatAt: serverTimestamp(),
                room: ChatProps.room,
                userId: user?.uid,
                username: user?.displayName,
            });
            // set message input to empty
            reset();

            const container = document.getElementsByClassName("chat-messages")[0];
            container && (container.scrollTop = container.scrollHeight);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        const queryMessages = query(messagesRef, (where("room", "==", ChatProps.room)), orderBy("creatAt", "desc"), limit(10));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages: Message[] = [];
            snapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(messages);
            return () => unsubscribe;
        })
    }, []);

    return (
        <div className="chat-app">
            <h1>Chat</h1>
            <div className="chat-messages">
                {messages.slice().reverse().map((message) => (
                    <div key={message.id} className="message">
                        <span className="user">{message.username}: </span> 
                        <span className="message-text">{message.message}</span>
                    </div>
                ))}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="new-message-input" placeholder="Message" {...register("message")} />
                <p style={{color: "red"}}>{errors.message?.message}</p>
                <input className="form-submit-btn" type="submit" />
            </form>
        </div>
    );
}