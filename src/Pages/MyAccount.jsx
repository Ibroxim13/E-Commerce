import React from 'react'
import BreadCrumb from '../Components/BreadCrumb'
import { useLocation } from 'react-router-dom'
import Login from './Login'
import UserAccount from './UserAccount'

export default function MyAccount() {
    const location = useLocation()
    let user = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <BreadCrumb page={location.pathname.slice(1)} />
            <section className='my-account-wrapper'>
                <div className="container">
                    <div className="my-account-wrapper-content">
                        {
                            user ? <UserAccount /> :
                                <Login />
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
