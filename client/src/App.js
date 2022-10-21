import React from 'react';
import User from './Routes/User';
import Admin from './Routes/Admin';
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './Context/UserContext'

function App() {
  return (
    <div className="App">
      <UserContext>
        <Routes>
          <Route element={<User />} path='/*' />
          <Route element={<Admin />} path='/admin/*' />
        </Routes>
      </UserContext>

    </div>
  );
}

export default App;
