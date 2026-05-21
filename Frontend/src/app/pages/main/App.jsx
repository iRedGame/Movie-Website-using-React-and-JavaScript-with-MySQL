
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './layout.jsx'
import LayoutLogin from '../login/layoutLg.jsx'
import Home from '../home/home.jsx'
import Movie from '../movie/movie.jsx'
import Login from '../login/login.jsx'
import CreateUser from '../login/createLogin.jsx'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
          </Route>

          <Route element={<LayoutLogin />}>
            <Route path='/login' element={<Login />} />
            <Route path='/createUser' element={<CreateUser />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
