import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Blog from './components/pages/Blog'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
