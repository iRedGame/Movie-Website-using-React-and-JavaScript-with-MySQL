
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import api from '../../../services/api.js'
import './login.css'

function Login() {
    const [ email, setEmail ] = useState([])
    const [ password, setPassword ] = useState([])
    const navigate = useNavigate()

    async function postLogin() {
        try {
            const validUser = await api.post('/validUser', {
                email: email,
                password: password
            })

            if(validUser.data.token) {
                localStorage.setItem('token', validUser.data.token)
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='lg'>
                <div className="login-container">
                    <h2 className='login-h2'>Enter your info for sign in</h2>
                    <form action="">
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='Email'
                            onChange={(e) => {setEmail(e.target.value)}} 
                        />
                        <label htmlFor="">Password:</label>

                        <input type="password" placeholder='Password'
                            onChange={(e) => {setPassword(e.target.value)}} 
                        />
                        <button type="button" onClick={postLogin}>enter</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login