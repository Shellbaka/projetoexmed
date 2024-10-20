import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Exame from './pages/Exames/Exame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Exame></Exame>
      <Footer/>
    </>
  )
}

export default App