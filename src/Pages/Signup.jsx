import React, { useRef } from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { useLocation, Link } from 'react-router-dom'

export default function Signup() {
    const location = useLocation()
    const firstName = useRef()
    const lastname = useRef()
    const maidenName = useRef()
    const age = useRef()
    const address = useRef()
    const username = useRef()
    const password = useRef()
    const image = useRef()

    return (
        <>
            <BreadCrumb page={location.pathname.slice(1)} />
            <section className='my-account-wrapper'>
                <div className="container">
                    <div className="my-account-wrapper-content">
                        <main className="my-account-signup">
                            <h1>Sign up</h1>
                            <p>Enter your details <br /> P.S: now impossible sign up, because i don't have server</p>
                            <form>
                                <input ref={firstName} required type="text" placeholder='Enter First Name' />
                                <input ref={lastname} required type="text" placeholder='Enter Last Name' />
                                <input ref={maidenName} required type="text" placeholder='Enter Maiden Name' />
                                <input ref={age} min="6" required type="number" placeholder='Enter Age' />
                                <input ref={address} required type="email" placeholder='Enter Email Address' />
                                <input ref={username} required type="username" placeholder='Enter Username' />
                                <input autoComplete='false' ref={password} required type="password" placeholder='Enter Password' />
                                <label className="input-file">
                                    <input ref={image} type="file" name="file" />
                                    <span>Upload Your Image</span>
                                </label>
                                <button type='submit'>Sign up</button>
                            </form>
                            <div className='my-acccount-login-details'>
                                <span>Already have an Account?</span>
                                <Link to={"/my-account"}> <b>Log in</b></Link>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </>
    )
}
