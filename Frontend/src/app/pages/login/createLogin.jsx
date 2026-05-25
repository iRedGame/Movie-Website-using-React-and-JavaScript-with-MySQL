
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import api from '../../../services/api.js'
import './login.css'

function CreateUser() {

    const email = useRef()
    const password = useRef()
    const name = useRef()
    const navigate = useNavigate()

    async function postUser() {
        try {
            await api.post('/users', {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            })
            navigate('/created')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='lg'>
                <div className="login-container">
                    <h2 className='login-h2'>Create Account</h2>
                    <form action="">
                        <label htmlFor="">Name:</label>
                        <input type="text" placeholder='nickname' ref={name} />
                        <label htmlFor="">Email:</label>
                        <input type="email" placeholder='Email' ref={email} />
                        <label htmlFor="">Password:</label>
                        <input type="password" placeholder='Password' ref={password} />
                        <button type="button" onClick={postUser}>enter</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateUser