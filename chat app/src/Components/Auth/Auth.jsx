import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import './Auth.css'



function Auth() {


    const [logIn, setLogIn] = useState(false)

    return (
        <>
            <div className='SignUpContainer'>
                <div>
                    <div>
                        <h1>Log In</h1>
                    </div>
                    <div>
                        <button className='google-btn'>
                            <FcGoogle size={24} style={{ marginRight: "8px" }} />
                            Continue with Google
                        </button>
                    </div>
                    <div>
                        <button className=' facebook-btn'>
                            <FaFacebook size={24} style={{ marginRight: "8px", color: "white", backgroundColor: "blue" }} />
                            Continue with Face Book
                        </button>
                    </div>
                    <div>
                        <form action="">
                            <div>
                                <input type="text" placeholder='E-mail Address' />

                            </div>
                            <div>
                                <input type="text" placeholder='Password'/>
                            </div>
                            <div>
                                <button>
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <small>
                            Forget Password?
                        </small>
                    </div>
                </div>
                <div>
                    <small>
                        Don't Have an Account 
                        <a href="">S</a>
                    </small>

                </div>
            </div>
            <div className='LoginContainer'>
                <div>

                </div>
                <div>

                </div>
            </div>

        </>
    )
}

export default Auth
