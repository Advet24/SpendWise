import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
