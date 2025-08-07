import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomeFeed from './pages/HomeFeed'
import Navbar from './components/Navbar'
import CreatePrompt from './pages/CreatePrompt'
import PostPage from './pages/PostPage'
import EditPrompt from './pages/EditPrompt'

import './App.css'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomeFeed/>}/>
        <Route path="/create" element={<CreatePrompt/>}/>
        <Route path="/prompt/:id" element={<PostPage/>}/>
        <Route path="/edit/:id" element={<EditPrompt />} />
      </Routes>
    </>
  )
}

export default App
