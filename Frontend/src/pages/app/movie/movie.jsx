
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
    const [pec, setPec] = useState(null)

    useEffect(() => {
        getMovie()
        moreWatch()
    }, [])

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
            setPec(1)
        } else {
            document.exitFullscreen()
            setPec(null)
        }
    }


    return (
        <>
            <div className='pag'>
                <h1>Your Move is Here </h1>
                <h3>TITLE: {movie.title}</h3>

                <div className='container' ref={playerRef}>
                    <video
                        src={movie.video}
                        ref={videoRef}
                        onTimeUpdate={timeUpdate}
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
                                    pec == null ? <i className="fa-solid fa-expand"></i> :
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