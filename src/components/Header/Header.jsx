import Hamburger from './Hamburger/Hamburger';
import './Header.css'

export default function Header({ setUsers }) {
  function addUser() {
    const newUser = {
        id: String(Date.now()),
        name1: '',
        name2: null,
        hall: '',
        type: '',
        start: null,
        end: null,
        pauses: [],
    }
    setUsers(prev => [...prev, newUser])
  }
  return (
    <header className='head'>
      <div className="header container">
          <Hamburger/>
          <a href="/" className="logo-h"></a>
          <div className="header-btns">
            <button className='btn' onClick={addUser}>Додати</button>
          </div>
      </div>
    </header>
  );
}
