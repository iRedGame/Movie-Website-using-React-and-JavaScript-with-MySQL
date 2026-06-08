
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout.jsx'
import LayoutLogin from '../login/layoutLg.jsx'
import Home from '../home/home.jsx'
import Movie from '../movie/movie.jsx'
import Login from '../login/login.jsx'
import CreateUser from '../login/createLogin.jsx'
import Fav from '../favorites/fav.jsx'
import Config from '../config/config.jsx'
import Account from '../config/pages/account.jsx'

function App() {

  function PrivateRoute({children}) {
    const token = localStorage.getItem('token')

    if(!token) {
      return <Navigate to='login'/>
    }
    return children
  }

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/movie/:id' element={<PrivateRoute><Movie /> </PrivateRoute>} />
            <Route path='/favorites' element={<PrivateRoute><Fav /> </PrivateRoute>}/>
            
            <Route path='/config' element={<PrivateRoute><Config /> </PrivateRoute>}>
              <Route index element={<Account />} />
              <Route path='account' element={<Account />} />
            </Route>
          </Route>

          <Route element={<LayoutLogin />}>
            <Route path='/login' element={<Login />} />
            <Route path='/createUser' element={<CreateUser />} />
            <Route path='/created' element={<Login />} />
          </Route>
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
