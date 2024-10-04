import { useState } from 'react'
import './App.css'
import Login from './Login'
import AuthComponent from './SignIn'

function App() {

  return (
    <>
      <div>
        Login
        {/* <Login/> */}
        <AuthComponent/>
      </div>
    </>
  )
}

export default App
