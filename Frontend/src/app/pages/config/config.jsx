
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
                        <NavLink to='appearance' 
                            className={({isActive})=>isActive ? 'titles-setting active' : 'titles-setting'}>
                            <p>Appearance</p>
                        </NavLink>
                        <NavLink to='data' 
                            className={({isActive})=>isActive ? 'titles-setting active' : 'titles-setting'}>
                            <p>User Data</p>
                        </NavLink>
                        <NavLink to='security' 
                            className={({isActive})=>isActive ? 'titles-setting active' : 'titles-setting'}>
                            <p>Security</p>
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