import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import { About } from './components/about/About'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { SignUp } from './components/signup/SignUp'
import SignIn from './components/signin/SignIn'
import Todo from './components/todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './components/store'


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login(id));
    }
  }, [])
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App