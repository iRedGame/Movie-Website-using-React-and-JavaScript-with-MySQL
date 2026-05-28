
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

function Layout() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <header className='main-header'>
                <div className="logo">
                    <p>Metro<span>!</span></p>
                </div>

                <nav>
                    <Link to='/' className='link active'>Home</Link>
                </nav>

                <div className='login'>
                        <button type="button" className='btn-login' onClick={()=>{setOpen(!open)}}></button>
                        {open && (
                            <div className="menu">
                                <button type="button" className="btn-menu">
                                    <div className="icon-btn"><i className="fa-solid fa-user"></i></div>
                                    <div className="btn-info">My Account</div>
                                </button>
                                <Link to='favorites'>
                                    <button type="button" className="btn-menu">
                                        <div className="icon-btn"><i className="fa-regular fa-heart"></i></div>
                                        <div className="btn-info">Favorite</div>
                                    </button>
                                </Link>
                                <button type="button" className="btn-menu" onClick={logout}>
                                    <div className="icon-btn"><i className="fa-solid fa-right-to-bracket"></i></div>
                                    <div className="btn-info">Exit</div>
                                </button>
                                
                            </div>
                        )}
                </div>
            </header>

            <Outlet/ >

            <footer className='main-footer'>
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

export default Layout