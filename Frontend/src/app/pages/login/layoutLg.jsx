
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import api from '../../../services/api.js'
import './layout.css'

function LayoutLogin() {
    return (
        <>
            <header className='login-header'>
                <p>Metro<span>!</span></p>

                <nav>
                    <Link to='/login' className='login-link active'>Login</Link>
                    <Link to='/createUser' className='login-link'>Create Account</Link>
                </nav>
            </header>

            <Outlet />

            <footer className='login-footer'>
                <p><span>Copyright © {new Date().getFullYear()}</span> Metro! Inc.</p>
                <p>All right reserved</p>
                <nav>
                    <ul>
                        <li><a href="">Internet services terms</a> </li>
                        <span>|</span>
                        <li><a href="">Cookie Notice</a></li>
                        <span>|</span>
                        <li><a href="">Support</a></li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}

export default LayoutLogin