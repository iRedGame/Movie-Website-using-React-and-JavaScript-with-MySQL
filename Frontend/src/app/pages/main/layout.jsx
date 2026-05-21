
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function Layout() {
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
                    <Link to='/login'>
                        <button type="button"></button>
                    </Link>
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