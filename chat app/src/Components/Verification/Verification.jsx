import React from 'react'
import './Verification.css'

function Verification() {
    return (
        <div className='Main-container'>
            <div className="verify-container">
                <h2>Verify Your Email</h2>
                <p>
                    📩 We’ve sent a verification link to your email.
                    Please check your inbox and click the link to verify your account.
                    Didn’t receive it? You can resend the email.
                    Once verified, you’ll be able to access the chat. 
                    Thank you for signing up!
                </p>


                <button >Resend Verification Email</button>

            </div>
        </div>
    )
}

export default Verification
