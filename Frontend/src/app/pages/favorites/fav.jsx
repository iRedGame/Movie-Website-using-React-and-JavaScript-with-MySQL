
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../../services/api.js'
import './fav.css'

function Fav() {

    const [movie, setMovie] = useState([])

    async function getFav() {
        try {
            const token = localStorage.getItem('token')

            const response = await api.get('/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setMovie(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getFav()
    }, [])

    return (
        <>
            <div className="fav-container">
                {movie.length < 1 && (
                    <div className='message-content'>
                        <h1 className='message-fav'>you not have movie save</h1>
                    </div>
                )}
                {movie.length > 1 && (
                    <div className="title-fav">
                        <h2 className='fav-h2'>Favorites</h2>
                    </div>
                )}
                <div className="grid-fav">
                    {movie.map(movie => (
                        <div className='card-fav' key={movie.id}>
                            <div className="img-fav">
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.image} />
                                </Link>
                            </div>
                            <div className="title-fav">
                                <p>{movie.title}</p>
                            </div>
                            <div className="note-fav">
                                <span>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Fav