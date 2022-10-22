import React from 'react';
import User from './Routes/User';
import Admin from './Routes/Admin';
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './Context/UserContext'
import { AdminContext } from './Context/AdminContext'

function App() {
  return (
    <div className="App">
      <UserContext>
        <Routes>
          <Route element={<User />} path='/*' />
        </Routes>
      </UserContext>
      <AdminContext>
        <Routes>
          <Route element={<Admin />} path='/admin/*' />
        </Routes>
      </AdminContext>

    </div>
  );
}

export default App;
