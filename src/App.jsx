import { useState, useEffect } from 'react'
import { auth } from './firebase'
import './App.css'
import GenreMovieList from './Components/GenreMovieList'
import Header from './Components/Header'
import ProductionHouse from './Components/ProductionHouse'
import Slider from './Components/Slider'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="">
      <Header />
      {user ? (
        <>
          <Slider />
          <ProductionHouse />
          <GenreMovieList />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h2 className="text-2xl text-white">Please login to view content</h2>
        </div>
      )}
    </div>
  )
}

export default App

