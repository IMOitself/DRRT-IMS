import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [buns, setBuns] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/buns')
    .then(res => res.json())
    .then(data => setBuns(data))
  }, [])

  return (
    <ul>
    {
      buns.map(bun => (
        <li>Buns - filling: {bun.filling} - days old: {bun.days_old}</li>
      ))
    }
    </ul>
  )
}

export default App
