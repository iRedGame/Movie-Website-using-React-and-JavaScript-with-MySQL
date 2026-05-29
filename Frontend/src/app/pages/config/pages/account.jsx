
import { useState } from 'react'
import api from '../../../../services/api.js'
import '../config.css'

function Account() {
    const [name, setName] = useState([])
    const [email, setEmail] = useState([])
    const [lastPs, setLastPs] = useState([])
    const [newPs, setNewPs] = useState([])

    async function putInfo() {
        try {
            const token = localStorage.getItem('token')

            await api.put('users', {
                name: name,
                email: email,
                lastPs: lastPs,
                newPs: newPs,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch(error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='content-div'>
                <form action="">
                    <h2 className='title-div'>Change your Infos</h2>
                    <label htmlFor="" className='label-acc'>Name:</label>
                    <input type="text" className='input-acc' 
                        onChange={(e)=>{setName(e.target.value)}}/>
                    <label htmlFor="" className='label-acc'>Email:</label>
                    <input type="email" className='input-acc' 
                        onChange={(e=>{setEmail(e.target.value)})}/>
                    <label htmlFor="" className='label-acc'>Last Password:</label>
                    <input type="password" className='input-acc' 
                        onChange={(e)=>{setLastPs(e.target.value)}}/>
                    <label htmlFor="" className='label-acc'>New Password:</label>
                    <input type="password" className='input-acc'
                        onChange={(e)=>{setNewPs(e.target.value)}} />
                    <button type="submit" className='btn-acc' onClick={putInfo}>
                        Save
                    </button>
                </form>
                <div className="message-acc">
                    <p>Remember, you will not change your info after 15 days</p>
                </div>
            </div>
        </>
    )
}

export default Account