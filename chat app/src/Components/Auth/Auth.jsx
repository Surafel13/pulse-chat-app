// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import './Auth.css'



// function Auth() {

//     const navigate = useNavigate();

//     const [logIn, setLogIn] = useState(false)
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);


//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         if (name === "email") setEmail(value);
//         if (name === "password") setPassword(value);
//         if (name === "confirmPassword") setConfirmPassword(value);
//     };

//     //     const CheckPassword = () => {
//     //   if (!confirmPassword) return null;

//     //   return password === confirmPassword ? null : (
//     //     <div className="warning">
//     //       <small>Check your password again!</small>
//     //     </div>
//     //   );
//     // };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         navigate("/Verification");
//     };




//     const handleLogin = () => {
//         setLogIn(!logIn)
//     }

//     return (
//         <>
//             <div className='MainWrapper'>
//                 {
//                     logIn ?
//                         <div className='LoginContainer mx-auto'>
//                             <div>
//                                 <div className='HeaderText'>
//                                     <h3>Log In</h3>
//                                 </div>
//                                 <div>
//                                     <button className='google-btn'>
//                                         <FcGoogle size={24} style={{ marginRight: "8px" }} />
//                                         Continue with Google
//                                     </button>
//                                 </div>
//                                 <div>
//                                     <button className=' facebook-btn'>
//                                         <FaFacebook size={24} style={{ marginRight: "8px", color: "white", backgroundColor: "blue" }} />
//                                         Continue with Face Book
//                                     </button>
//                                 </div>
//                                 <div>
//                                     <form onSubmit={handleSubmit}>
//                                         <div className='inputWrapper'>
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 placeholder="E-mail Address"
//                                                 value={email}
//                                                 onChange={handleChange}
//                                                 required
//                                             />


//                                         </div>
//                                         <div className='inputWrapper'>
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 value={password}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             <button
//                                                 type="button"
//                                                 className="eyeBtn"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                             >
//                                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </button>
//                                         </div>
//                                         <div>
//                                             <button className={email && password ? 'LoginButtonFocus' : 'LoginButton'} type='submit'>
//                                                 Log In
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                                 <div>
//                                     <small>
//                                         <a href="">Forget Password?</a>
//                                     </small>
//                                 </div>
//                             </div>
//                             <div>
//                                 <small>
//                                     Don't Have an Account?
//                                     <button onClick={handleLogin} className='LinkButton'>
//                                         Sign Up
//                                     </button>
//                                 </small>

//                             </div>
//                         </div>
//                         :
//                         <div className='LoginContainer mx-auto'>
//                             <div>
//                                 <div className='HeaderText'>
//                                     <h3>Sign Up</h3>
//                                 </div>
//                                 <div>
//                                     <button className='google-btn'>
//                                         <FcGoogle size={24} style={{ marginRight: "8px" }} />
//                                         Continue with Google
//                                     </button>
//                                 </div>
//                                 <div>
//                                     <button className=' facebook-btn'>
//                                         <FaFacebook size={24} style={{ marginRight: "8px", color: "white", backgroundColor: "blue" }} />
//                                         Continue with Face Book
//                                     </button>
//                                 </div>
//                                 <div>
//                                     <form onSubmit={handleSubmit}>
//                                         <div className='inputWrapper'>
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 placeholder="E-mail Address"
//                                                 value={email}
//                                                 onChange={handleChange}
//                                                 required
//                                             />

//                                         </div>
//                                         <div className='inputWrapper'>
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 value={password}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             <button
//                                                 type="button"
//                                                 className="eyeBtn"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                             >
//                                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </button>
//                                         </div>
//                                         <div className='inputWrapper'>
//                                             <input
//                                                 type={showConfirmPassword ? "text" : "password"}
//                                                 name="confirmPassword"
//                                                 placeholder="Confirm Password"
//                                                 value={confirmPassword}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             <button
//                                                 type="button"
//                                                 className="eyeBtn"
//                                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                             >
//                                                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </button>
//                                         </div>
//                                         <div>
//                                             <button className={`${password && email && confirmPassword ? 'LoginButtonFocus' : 'LoginButton'}`} type='submit'>
//                                                 Sign Up
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>

//                             </div>
//                             <div>

//                             </div>

//                             <div>
//                                 <small>
//                                     Already Have an Account?
//                                     <button onClick={handleLogin} className='LinkButton'>
//                                         Log In
//                                     </button>
//                                 </small>

//                             </div>
//                         </div>
//                 }
//             </div>





//         </>
//     )
// }

// export default Auth

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

// Firebase
import { auth } from "../../../functions/Config/firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

function Auth() {
    const navigate = useNavigate();

    const [logIn, setLogIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // -------------------------
    // GOOGLE AUTH
    // -------------------------
    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate("/Messaging");
        } catch (error) {
            alert(error.message);
        }
    };

    // -------------------------
    // MAIN SUBMIT (Login / Signup)
    // -------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!logIn) {
            // SIGN UP
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/verification");
            } catch (err) {
                alert(err.message);
            }
        } else {
            // LOGIN
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/Messaging");
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <>
            <div className="MainWrapper">
                {logIn ? (
                    // -------------------------
                    // LOGIN FORM
                    // -------------------------
                    <div className="LoginContainer mx-auto">
                        <div>
                            <div className="HeaderText">
                                <h3>Log In</h3>
                            </div>

                            <button className="google-btn" onClick={handleGoogle}>
                                <FcGoogle size={24} style={{ marginRight: "8px" }} />
                                Continue with Google
                            </button>

                            <button className="facebook-btn">
                                <FaFacebook size={24} style={{ marginRight: "8px" }} />
                                Continue with Facebook
                            </button>

                            <form onSubmit={handleSubmit}>
                                <div className="inputWrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail Address"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="eyeBtn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <button
                                    className={email && password ? "LoginButtonFocus" : "LoginButton"}
                                    type="submit"
                                >
                                    Log In
                                </button>
                            </form>

                            <small>
                                <a href="">Forget Password?</a>
                            </small>
                        </div>

                        <small>
                            Don't Have an Account?
                            <button onClick={() => setLogIn(false)} className="LinkButton">
                                Sign Up
                            </button>
                        </small>
                    </div>
                ) : (
                    // -------------------------
                    // SIGNUP FORM
                    // -------------------------
                    <div className="LoginContainer mx-auto">
                        <div>
                            <div className="HeaderText">
                                <h3>Sign Up</h3>
                            </div>

                            <button className="google-btn" onClick={handleGoogle}>
                                <FcGoogle size={24} style={{ marginRight: "8px" }} />
                                Continue with Google
                            </button>

                            <button className="facebook-btn">
                                <FaFacebook size={24} style={{ marginRight: "8px" }} />
                                Continue with Facebook
                            </button>

                            <form onSubmit={handleSubmit}>
                                <div className="inputWrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail Address"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="inputWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="eyeBtn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <div className="inputWrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="eyeBtn"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                <button
                                    className={
                                        email && password && confirmPassword
                                            ? "LoginButtonFocus"
                                            : "LoginButton"
                                    }
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>

                        <small>
                            Already Have an Account?
                            <button onClick={() => setLogIn(true)} className="LinkButton">
                                Log In
                            </button>
                        </small>
                    </div>
                )}
            </div>
        </>
    );
}

export default Auth;
