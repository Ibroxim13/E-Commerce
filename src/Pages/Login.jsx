import axios from 'axios'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ErrorNotification } from '../Notifications/ErrorNotification'

export default function Login() {
    const username = useRef()
    const password = useRef()

    const Login = e => {
        e.preventDefault();

        axios.post("https://dummyjson.com/auth/login", {
            username: username.current.value,
            password: password.current.value,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", JSON.stringify(res.data.token))
                axios("https://dummyjson.com/auth/me", {
                    headers: {
                        "Authorization": `Bearer ${res.data.token}`
                    }
                })
                    .then(data => {
                        localStorage.setItem("user", JSON.stringify(data.data))
                        window.location.reload()
                    })
            })
            .catch(() => ErrorNotification("Something went wrong! Check your password or username"))
    }

    return (
        <main className="my-account-login">
            <h1>Log in</h1>
            <p>Enter your username and password</p>
            <form onSubmit={(e) => Login(e)}>
                <input ref={username} required type="username" placeholder='Enter username...' />
                <input ref={password} autoComplete='false' required type="password" placeholder='Enter password' />
                <button type='submit'>Log in</button>
            </form>
            <div className='my-acccount-login-details'>
                <span>Don't have an Account? Create new one</span>
                <Link to={"/sign-up"}><b>Sign up</b></Link>
            </div>
        </main>
    )
}
