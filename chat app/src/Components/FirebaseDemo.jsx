import React, { useState, useEffect } from 'react';
import { sendDataToDatabase, subscribeToData } from '../firebase';

import './FirebaseDemo.css';

const FirebaseDemo = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    // Load data immediately on component mount using the real-time listener
    useEffect(() => {
        console.log("ENV VARS:", import.meta.env);

        // We are listening to the 'demo-items' collection
        const unsubscribe = subscribeToData('demo-items', (data) => {
            console.log('Got data:', data);
            setItems(data);
        });

        // Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setLoading(true);
        try {
            // Send data to 'demo-items' collection
            await sendDataToDatabase('demo-items', {
                text: inputValue,
                createdAt: new Date()
            });
            setInputValue(''); // Clear input
        } catch (error) {
            console.error("SEND ERROR:", error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="firebase-demo-container">
            <div className="demo-card">
                <div className="demo-header">
                    <h2>🔥 FireStore Demo</h2>
                    <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.9rem' }}>Real-time Database Connection</p>
                </div>

                <div className="demo-body">
                    <form onSubmit={handleSubmit}>
                        <div className="modern-input-group">
                            <input
                                type="text"
                                className="modern-input"
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                className="modern-btn"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <h6 style={{ margin: 0, color: '#718096', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 'bold' }}>Live Data</h6>
                        <span style={{ fontSize: '0.8rem', marginLeft: 'auto', color: loading ? '#667eea' : '#a0aec0' }}>
                            {loading ? 'Syncing...' : 'Connected'}
                        </span>
                    </div>


                    {items.length === 0 ? (
                        <div className="empty-state">
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                            No messages yet. <br /> Be the first to say hello!
                        </div>
                    ) : (
                        <ul className="data-list">
                            {items.map((item) => (
                                <li key={item.id} className="data-item">
                                    <span className="item-text">{item.text}</span>
                                    <span className="item-id">
                                        {item.id.substring(0, 4)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FirebaseDemo;
