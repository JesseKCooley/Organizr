import {Navigate, BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import LoginPage  from './pages/LoginPage';
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import NewUserPage from './pages/NewUserPage';
import ListView from './pages/ListView';
import { useAuthContext } from './hooks/useAuthContext'


function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
     <div className='Pages'>
     
      <Routes>
      <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <LoginPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <NewUserPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/listView" 
              element={user ? <ListView /> : <Navigate to="/login" />} 
            />
      </Routes>
    
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
