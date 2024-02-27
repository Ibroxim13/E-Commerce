import React from 'react'

export default function UserAccount() {
    let user = JSON.parse(localStorage.getItem("user"))

    return (
        <main className='user-info-box'>
            <div className="user-info-box-col">
                <img src={user.image} alt={user.firstName} />
            </div>
            <div className="user-info-box-col">
                <div>Fullname:<span>{user.firstName} {user.lastName} {user.maidenName}</span></div>
                <div>Date of Birth:<span>{user.birthDate}</span></div>
                <div>Address:<span>{user?.address?.city} , {user?.address?.address}</span></div>
                <div>Email: <span>{user?.email}</span></div>
                <div>Phone Number: <span>{user?.phone}</span></div>
                <div>Work Place: <span>{user?.company?.department} , {user?.company?.title}</span></div>
            </div>
        </main>
    )
}
