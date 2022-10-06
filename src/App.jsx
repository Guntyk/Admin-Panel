import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';

function App() {
  const [users, setUsers] = useState(window.localStorage.getItem('users') ? JSON.parse(window.localStorage.getItem('users')) : []);
  useEffect(() => {
    window.localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <>
      <Header setUsers={setUsers} />
      <Dashboard users={users} setUsers={setUsers} />
    </>
  );
}

export default App;
