import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../services/api.js'
import './home.css'
import './homeMobile.css'

function Home() {

    const [movie, setMovie] = useState([])
    const [moreWatch, setMoreWatch] = useState([])

    async function getCover() {
        try {
            const response = await api.get('/movies/lastadd')
            setMovie(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function getMoreWatch() {
        try {
            const response = await api.get('/movies/views')
            setMoreWatch(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCover()
        getMoreWatch()
    }, [])

    return (
        <>
            <div className="home-container">
                <div className="title">
                    <h2 className='home-h2'>Last Movies</h2>
                </div>
                <div className="grid-movie">
                    {movie.map(movie => (
                        <div className='catalogo' key={movie.id}>
                            <div className="img">
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.image} />
                                </Link>
                            </div>
                            <div className="title">
                                <p>{movie.title}</p>
                            </div>
                            <div className="note">
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
                <div className="seemore">
                    <a href="">
                        <i className="fa-solid fa-circle-plus"></i>
                        <span> See More</span>
                    </a>
                </div>
            </div>

            <div className="home-container">
                <div className="title">
                    <h2 className='home-h2'>More Watching</h2>
                </div>
                <div className="grid-movie">
                    {Array.isArray(moreWatch) && moreWatch.map(movie => (
                        <div className='catalogo' key={movie.id}>
                            <div className="img">
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.image} />
                                </Link>
                            </div>
                            <div className="title">
                                <p>{movie.title}</p>
                            </div>
                            <div className="note">
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
                <div className="seemore">
                    <a href="">
                        <i className="fa-solid fa-circle-plus"></i>
                        <span> See More</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Home