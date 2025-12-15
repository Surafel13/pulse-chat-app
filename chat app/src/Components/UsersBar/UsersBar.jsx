import React from 'react'
import img1 from './../../Img/cat-1.jpg'
import './../Messaging/Messaging.css'
import { useNavigate } from 'react-router-dom'

function UsersBar() {
    const navigate = useNavigate()


    return (
        <>
            <div className='MainWrapper container sm-h-75'>

                <div className='UserBar'>
                    <div className='barHeader'>
                        <h4>Messages</h4>
                    </div>
                    <div className='InputWrapper'>
                        <input type="text" placeholder='Search conversations...' />
                    </div>
                    <div><hr /></div>
                    <div>
                        <div className='usersWrapper' onClick={() => navigate('/Messaging')}>
                            <div className='imageWrapper'>
                                <img src={img1} alt="img" />
                            </div>
                            <div>
                                <div>
                                    <h6>Name name</h6>
                                </div>
                                <div>
                                    <small>message</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='usersWrapper' onClick={() => navigate('/Messaging')}>
                            <div className='imageWrapper'>
                                <img src={img1} alt="img" />
                            </div>
                            <div>
                                <div>
                                    <h6>Name name</h6>
                                </div>
                                <div>
                                    <small>message</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='usersWrapper' onClick={() => navigate('/Messaging')}>
                            <div className='imageWrapper'>
                                <img src={img1} alt="img" />
                            </div>
                            <div>
                                <div>
                                    <h6>Name name</h6>
                                </div>
                                <div>
                                    <small>message</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>

                </div>
            </div>
        </>
    )
}

export default UsersBar
