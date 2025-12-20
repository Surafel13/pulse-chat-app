import React, { useState } from 'react'
import './MessagingPage.css'

function MessagingPage() {

    const [focus, setFocus] = useState(false)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([
        { id: 1, type: 'sender', text: 'Hey there! How are you doing today?', time: '10:50 PM' },
        { id: 2, type: 'receiver', text: 'I am doing great! Thanks for asking. How about you?', time: '10:51 PM' },
        { id: 3, type: 'sender', text: 'I am good too. Just working on this chat application.', time: '10:52 PM' },
        { id: 4, type: 'receiver', text: 'That sounds interesting! Is it React based?', time: '10:53 PM' },
        { id: 5, type: 'sender', text: 'Yes, it is built with React and pure CSS.', time: '10:54 PM' },
        { id: 6, type: 'receiver', text: 'Awesome! I love the design so far.', time: '10:55 PM' },
        { id: 7, type: 'sender', text: 'Thanks! I appreciate the feedback.', time: '10:56 PM' },
        { id: 8, type: 'receiver', text: 'Keep up the good work!', time: '10:57 PM' },
        { id: 9, type: 'sender', text: 'Will do! Talk to you later.', time: '10:58 PM' },
        { id: 10, type: 'receiver', text: 'Bye!', time: '10:59 PM' },
        { id: 11, type: 'sender', text: 'Check this scroll functionality.', time: '11:00 PM' },
        { id: 12, type: 'receiver', text: 'It should work smoothly now.', time: '11:01 PM' }
    ])

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleFocus = () => {
        setFocus(!focus)
    }

    // Auto-scroll to bottom
    const messagesEndRef = React.useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = () => {
        if (message.trim() === "") return;
        const newMessage = {
            id: messages.length + 1,
            type: 'sender',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages([...messages, newMessage])
        setMessage("")
    }

    return (
        <div className='ChatSection'>
            <div className='MessagingArea'>
                {messages.map((msg) => (
                    <div key={msg.id} className={msg.type === 'sender' ? 'SenderMessage' : 'ReciverMessage'}>
                        <p>{msg.text}</p>
                        <small>{msg.time}</small>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className='bottomWrapper'>
                <div>
                    <input type="text"
                        placeholder='Write Something... '
                        onChange={handleChange}
                        value={message}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                </div>
                <div>
                    <button
                        className={`${message === "" ? '' : 'sendData'}`}
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
