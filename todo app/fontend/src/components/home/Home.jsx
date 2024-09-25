import React from 'react'
import './Home.css'



const Home = () => {


  return (
    <div className='home d-flex justify-content-center align-items-center'>

      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1>
          Organize your <br /> day with <b style={{color:'black'}}>todo</b>
        </h1>
        <p>
          <b>todo</b> is a simple todo app that helps you to organize your day. <br /> You can create, edit, delete and mark as completed your todos.
        </p>
        <button className='btn btn-primary'>Get Started</button>

      </div>
    </div>
  )
}

export default Home