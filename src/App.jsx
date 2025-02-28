import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherApp from './components/WeatherApp'
import './components/Weatherapp.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
       <WeatherApp />
      </div>
      
    </>
  )
}

export default App
