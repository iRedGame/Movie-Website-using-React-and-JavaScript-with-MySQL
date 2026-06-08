
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './config.css'

function Config() {

    return (
        <>
            <div className="container-setting">
                <div className="container-pages">
                    <nav className='nav-setting'>
                        <NavLink to='account' 
                            className={({isActive})=>isActive ? 'titles-setting active' : 'titles-setting'}>
                           <p>Account</p>
                        </NavLink>
                    </nav>
                </div>

                <div className='container-content'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Config