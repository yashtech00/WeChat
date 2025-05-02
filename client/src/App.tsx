
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Chat from './Pages/Chat'
import { PersonalChat } from './Components/PersonalChat'
import Follow from './Pages/Follow'
import { Layout } from './Layout/Layout'
import { useAuth } from './hooks'

function App() {

  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 ">
        <div className="loader border-t-4 border-orange-600 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    )
  }


  return (
    <BrowserRouter>
      <div className='bg-black'>
      <Routes>
          
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chat' element={<Layout><Chat /></Layout>} />
        <Route path='/chat/:id' element={<Layout><PersonalChat /></Layout>} />
        <Route path='/follow' element={<Layout><Follow /></Layout>} />
       
        </Routes>
        </div>
      <Toaster
      position='bottom-center'
      />
      </BrowserRouter>
  )
}

export default App
