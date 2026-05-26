import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../services/api.js'
import './home.css'
import './homeMobile.css'

function Home() {

    const [movie, setMovie] = useState([])
    const [moreWatch, setMoreWatch] = useState([])
    const [history, setHistory] = useState([])

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

    async function getHistory() {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('/history', 
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )
            setHistory(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCover()
        getMoreWatch()
        getHistory()
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

            <div className="home-container">
                <div className="title">
                    <h2 className='home-h2'>History</h2>
                </div>
                <div className="grid-movie">
                    {Array.isArray(history) && history.map(movie => {
                        const progress = movie.duration ? (movie.currentTime / movie.duration) * 100 : 0 
                        const finalProgress = progress >= 90 ? 100 : progress

                        return (
                            <div className='catalogo' key={movie.movieId}>
                                <div className="img">
                                    <Link to={`/movie/${movie.movieId}`}>
                                        <img src={movie.image} />
                                        <div className="progress-movie">
                                            <div className='progress-time' 
                                                style={{
                                                    width: `${finalProgress}%`,
                                                    background: finalProgress === 100 ? 'green' : 'red'
                                                }}>
                                            </div>
                                        </div>
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
                        )
                })}
                </div>
                {movie.length > 5 && (
                        <div className="seemore">
                            <a href="">
                                <i className="fa-solid fa-circle-plus"></i>
                                <span> See More</span>
                            </a>
                        </div>
                )}
            </div>
        </>
    )
}

export default Home