import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context.context.jsx'
import { UserRoleProvider } from './contexts/user-role.context.jsx'
import { MeetingRoomsProvider } from './contexts/meeting-rooms.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <UserRoleProvider>
      <MeetingRoomsProvider>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </MeetingRoomsProvider>
    </UserRoleProvider>
  </AuthProvider>,
)
