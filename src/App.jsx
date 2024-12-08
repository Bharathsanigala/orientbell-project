import { Route, Routes } from 'react-router-dom'
import './App.scss'
import NavBar from './components/navbar/navbar.component'
import Home from './routes/home/home.component'
import MeetType from '../src/routes/meet-type/meet-type.component'
import User from './routes/user/user.component'
import MyMeetings from './routes/my-meetings/my-meetings.component'
import OnlineMeet from './routes/online-meet/online-meet.component'
import OfflineMeet from './routes/offline-meet/offline-meet.component'
import DataLoader from './components/data-loader/data-loader.component'
import { useState,useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase/firebase'
import BookOfflineMeet from './routes/book-offline-meet/book-offline-meet.component'
import { useAuthContext } from './contexts/auth-context.context'
import ProtectedRoute from './routes/protected-route/protected-route.component'
import UserRequests from './routes/user-requests/user-requests.component'
import SearchUsers from './routes/search-users/search-users.component'
import AdminSettings from './routes/admin-settings/admin-settings.component'

function App() {

  const {handleSetUser} = useAuthContext();
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleSetUser(user);
      } else {
        handleSetUser(null);
      }
      setIsLoading(false); 
    });
    return () => unsubscribe();
  }, [ handleSetUser]);
  

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
        <Route path='/book-offline-meet/:offlineMeetNameId' element={<BookOfflineMeet/>} />
        <Route element={<ProtectedRoute/>} path='/admin-space'  >
          <Route path='/admin-space/search-users' element={<SearchUsers/>} />
          <Route path='/admin-space/user-requests' element={<UserRequests/>} />
          <Route path='/admin-space/admin-settings' element={<AdminSettings/>} />
        </Route>
        </Route>
      </Routes>
      {isLoading &&  <DataLoader />}
    </div>
  )
}

export default App
