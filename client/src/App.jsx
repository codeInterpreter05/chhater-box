import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'

const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = userInfo? true : false;

    return isAuthenticated? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();

  const isAuthenticated = userInfo? true : false;

  return isAuthenticated? <Navigate to="/chat" /> : children;
}


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth/></AuthRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/chat" element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

