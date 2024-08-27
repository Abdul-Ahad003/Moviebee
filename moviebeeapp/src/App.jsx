import { useState, useEffect } from 'react'
import './App.css'
import Home from './assets/components/Home'
import Navbar from './assets/components/Navbar'





function App() {

  const [showcategory, setshowcategory] = useState("Home")

  return (

    <>
      <Navbar showcategory={showcategory} setshowcategory={setshowcategory} />
      <Home showcategory={showcategory} />
    </>
  )
}

export default App
