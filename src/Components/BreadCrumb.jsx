import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({ page }) {
    return (
        <div className='breadcrumb'>
            <span><Link to={"/home"}>Home</Link> / </span>
            <span>{page}</span>
        </div>
    )
}
