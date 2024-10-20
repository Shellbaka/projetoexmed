import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Home></Home>
      <Footer/>
    </>
  )
}

export default App