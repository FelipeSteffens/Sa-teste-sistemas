import React, { useState } from 'react';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
    </div>
  );
};

export default App;