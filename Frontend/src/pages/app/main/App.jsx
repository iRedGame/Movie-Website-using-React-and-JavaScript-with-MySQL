
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from '../home/home.jsx'
import Movie from '../movie/movie.jsx'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <header>
          <div className="logo">
            <p>Metro<span>!</span></p>
          </div>

          <nav>
            <Link to='/' className='link active'>Home</Link>
          </nav>

          <div className='login'>
            <button type="button"></button>
          </div>
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
        </Routes>

        <footer>
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
      </BrowserRouter>
    </>
  )
}

export default App
