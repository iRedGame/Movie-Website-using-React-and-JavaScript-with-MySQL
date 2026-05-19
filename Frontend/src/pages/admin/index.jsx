import { useState } from 'react'
import api from '../../services/api.js'
import './index.css'

function Index() {
    const [ title, setTitle ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ image, setImage ] = useState(null)
    const [ video, setVideo ] = useState(null)
    
    async function submit(e) {
        try{
            e.preventDefault()
            const formData = new FormData()  
        
            formData.append('title', title)
            formData.append('category', category)
            formData.append('video', video)
            formData.append('image', image)

            await api.post('/movies', formData)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="container">
                <h1>Admin Movie</h1>
                <form action="" onSubmit={submit}>
                    <label htmlFor="">Title</label>
                    <input type="text" 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="">Category</label>
                    <input type="text" 
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor="">Image</label>
                    <input type="file" 
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="">Video</label>
                    <input type="file" 
                        onChange={(e) => setVideo(e.target.files[0])}
                     />
                    <button type="submit">send</button>
                </form>
            </div>
        </>
    )
}

export default Index