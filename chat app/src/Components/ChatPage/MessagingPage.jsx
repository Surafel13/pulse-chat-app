import React, { useState, useEffect, useRef } from 'react';
import './MessagingPage.css';
import { db } from '../../firebase';
import { collection, addDoc, query, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { IoSend } from "react-icons/io5";

function MessagingPage({ receiverId, currentUser }) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)

    // Generate a unique conversationId for the two users
    const conversationId = [currentUser.uid, receiverId].sort().join('_');

    useEffect(() => {
        if (!conversationId) return;

        // Query messages for this specific conversation (removed orderBy to avoid index issues)
        const q = query(
            collection(db, "messages"),
            where("conversationId", "==", conversationId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Client-side sort to ensure order without composite index
            msgs.sort((a, b) => {
                const tA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp || 0);
                const tB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp || 0);
                return tA - tB;
            });

            setMessages(msgs);
        }, (error) => {
            console.error("Error listening to messages:", error);
        });

        return () => unsubscribe();
    }, [conversationId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (message.trim() === "" || !currentUser) return;

        const messageData = {
            conversationId: conversationId,
            senderId: currentUser.uid,
            receiverId: receiverId,
            text: message,
            timestamp: serverTimestamp(),
            senderName: currentUser.displayName || currentUser.email.split('@')[0]
        };

        try {
            const currentMsg = message;
            setMessage("");

            // 1. Add the actual message
            await addDoc(collection(db, "messages"), messageData);

            // 2. Update/Create the conversation summary for the sidebar
            const { doc, setDoc } = await import("firebase/firestore");
            await setDoc(doc(db, "conversations", conversationId), {
                conversationId,
                lastMessage: currentMsg,
                lastSenderId: currentUser.uid,
                participants: [currentUser.uid, receiverId],
                timestamp: serverTimestamp()
            }, { merge: true });

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return (
        <div className='ChatSection'>
            <div className='MessagingArea'>
                {messages.length === 0 ? (
                    <div className="empty-chat-placeholder">
                        <div className="icon">👋</div>
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={msg.senderId === currentUser.uid ? 'MessageSelf' : 'MessageOthers'}
                        >
                            <div className="message-content">
                                <p>{msg.text}</p>
                                <small>
                                    {msg.timestamp?.toDate ?
                                        msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        : 'Sending...'}
                                </small>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className='bottomWrapper'>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder='Type a message... '
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                </div>
                <button
                    className={`send-button ${message.trim() !== "" ? 'active' : ''}`}
                    onClick={handleSend}
                    disabled={message.trim() === ""}
                >
                    <IoSend />
                </button>
            </div>
        </div>
    )
}

export default MessagingPage;
