import { Route, Routes } from 'react-router-dom'
import './App.scss'
import NavBar from './components/navbar/navbar.component'
import Home from './routes/home/home.component'
import MeetType from '../src/routes/meet-type/meet-type.component'
import User from './routes/user/user.component'
import MyMeetings from './routes/my-meetings/my-meetings.component'
import OnlineMeet from './routes/online-meet/online-meet.component'
import OfflineMeet from './routes/offline-meet/offline-meet.component'

function App() {

  return (
    <div className='app-div'>
      <Routes>
        <Route path='/' element={<NavBar/>} >
        <Route index element={<Home/>} />
        <Route path='/meet-type' element={<MeetType/>} />
        <Route path='/user' element={<User/>} />
        <Route path='/my-meetings' element={<MyMeetings/>} />
        <Route path='/online-meet' element={<OnlineMeet/>} />
        <Route path='/offline-meet' element={<OfflineMeet/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
