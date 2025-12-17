import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import img1 from './../../Img/cat-1.jpg'
import './Profile.css'

function Profile() {

    const navigate = useNavigate()

    return (
        <>
            <div className='UserInfoWrapper'>
                <div>
                    <button onClick={() => navigate('/UsersBar')}>
                        <FaArrowLeft size={15}/>
                    </button>
                </div>
                <div>
                    <img src={img1} alt="profile" />
                </div>
                <div className='userInfo'>
                    <h1>Name</h1>
                    <small>
                        status
                    </small>
                </div>
            </div>
            <div className='AccountInfoWrapper'>
                <div>
                    <h5>Account Information</h5>
                </div>
                <div className='Infos'>
                    <p>email@gmail.com</p>
                    <small>E-Mail</small>
                </div>
                <div className='Infos'>
                    <p>Abebebesobela</p>
                    <small>Username</small>
                </div>
                <div className='Infos bio'>
                    <p>I am abebnksadnjsadnjasnd nklaehflu fajndfsjeifun dsnmdnfkjsanue.</p>
                    <small>Bio</small>
                </div>
            </div>
        </>
    )
}

export default Profile
