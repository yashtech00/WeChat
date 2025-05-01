
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Chat from './Pages/Chat'
import { PersonalChat } from './Components/PersonalChat'
import Follow from './Pages/Follow'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:id' element={<PersonalChat />} />
        <Route path='/follow' element={<Follow />} />

      </Routes>
      <Toaster
      position='bottom-center'
      />
      </BrowserRouter>
  )
}

export default App
