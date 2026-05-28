
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import api from '../../../services/api.js'
import './movie.css'

function Movie() {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    const videoRef = useRef(null)
    const [play, setPlay] = useState(false)
    const [progress, setProgress] = useState(0)
    const [current, setCurrent] = useState(0)
    const [duration, setDuration] = useState(0)

    const playerRef = useRef(null)
    const [fullS, setFullS] = useState(null)
    const lastRef = useRef(0)

    const [fav, setFav] = useState(false)

    useEffect(() => {
        getMovie()
        moreWatch()
        userSaveHistory()
        isFav()
    }, [id])

    async function moreWatch() {
        try {
            await api.put(`/movies/views/${id}`)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function getMovie() {
        try {
            const response = await api.get(`/movies/${id}`)
            setMovie(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function userSaveHistory() {
        try {
            const token = localStorage.getItem('token')
            await api.post('/history', {movieId: id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    async function updateHistory() {
        try {
            const currentTime = Math.floor(videoRef.current.currentTime)
            const duration = Math.floor(videoRef.current.duration)
            if(!duration) return

            const token = localStorage.getItem('token')

            await api.put(`/history/${id}`,
                {
                    currentTime,
                    duration
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    async function postFav() {
        try {
            const token = localStorage.getItem('token')

            if(fav) {
                await api.delete(`/favorites/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setFav(false)
            } else {
                await api.post('/favorites', {movieId: id}, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setFav(true)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async function isFav() {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const exist = response.data.some(
                movie => movie.id == id
            )

            setFav(exist)
        } catch (error) {
            console.log(error.message)
        }
    }


    if (!movie) {
        return <h1>Loading...</h1>
    }

    function playVideo() {
        if (play) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setPlay(!play)
    }

    function timeUpdate() {
        const currentTime = videoRef.current.currentTime
        const durationTime = videoRef.current.duration
        const time = (currentTime / durationTime) * 100

        setCurrent(currentTime)
        setDuration(durationTime)
        setProgress(time)
    }

    function rangeVideo(e) {
        const w = e.currentTarget.clientWidth
        const click = e.nativeEvent.offsetX
        const percent = (click / w) * 100
        const durationVideo = videoRef.current.duration
        videoRef.current.currentTime = (percent / 100) * durationVideo
    }

    function timeVideo(time) {
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)
        return `${min}:${sec < 10 ? 0 : ''}${sec}`
    }

    function Fullscreen() {
        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen()
            setFullS(1)
        } else {
            document.exitFullscreen()
            setFullS(null)
        }
    }

    function handleHistory() {
        const currentTime = Math.floor(videoRef.current.currentTime)
        if(currentTime % 10 === 0 && currentTime !== lastRef.current) {
            lastRef.current = currentTime
            updateHistory()
        }
    }

    function callTimeUpdate() {
        timeUpdate()
        handleHistory()
    }


    return (
        <>
            <div className='pag'>
                <div className='titles'>
                    <h1>Your Move is Here </h1>
                    <div className="title-a-fav">
                        <h3>TITLE: {movie.title}</h3>
                        <button type='button' className='btn-fav' onClick={postFav}>
                            {fav ? <i className="fa-solid fa-heart"></i> :
                                <i className="fa-regular fa-heart"></i>
                            }
                        </button>
                    </div>
                </div>

                <div className='movie-container' ref={playerRef}>
                    <video
                        src={movie.video}
                        ref={videoRef}
                        onTimeUpdate={callTimeUpdate}
                    />
                    <div className="minescreen">
                        <div className="controls">
                            <button onClick={playVideo}>
                                {
                                    !play ? <i className="fa-solid fa-play"></i> :
                                        <i className="fa-solid fa-pause"></i>
                                }
                            </button>
                            <div className="range-container" onClick={rangeVideo}>
                                <div className="line-time"
                                    style={{
                                        width: `${progress}%`
                                    }}
                                />
                                <div className="ball"
                                    style={{
                                        left: `${progress}%`
                                    }}
                                />
                            </div>
                            <p>
                                {timeVideo(current)} / {timeVideo(duration)}
                            </p>
                            <button onClick={Fullscreen}>
                                {
                                    fullS == null ? <i className="fa-solid fa-expand"></i> :
                                        <i className="fa-solid fa-compress"></i>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie