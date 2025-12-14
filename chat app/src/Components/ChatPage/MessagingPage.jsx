import React, { useState } from 'react'
import './MessagingPage.css'

function MessagingPage() {

    const [focus, setFocus] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleFocus = () => {
        setFocus(!focus)
    }

    return (
        <div className='ChatSection'>
            <div className='MessagingArea'>
                <div className='SenderMessage'>
                    <p>
                        Sender Messages
                    </p>
                    <small className='r-0'>10:50 PM</small>
                </div>
                <div className='ReciverMessage r-0'>
                    <p>
                        Reciver Message
                    </p>
                    <small className='r-0'>10:50 AM</small>
                </div>
            </div>
            <div className='bottomWrapper'>
                <div>
                    <input type="text"
                        placeholder='Write Something... '
                        onChange={handleChange}
                        className={`${focus ? 'focusInput' : 'b-none'}`}
                    />
                </div>
                <div>
                    <button className={`${ message == "" ? '' : 'sendData'}`}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessagingPage
