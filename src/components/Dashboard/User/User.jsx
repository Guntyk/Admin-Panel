import { changeUserKey } from '../../../helpers/userHelpers';
import Timer from './Timer/Timer';
import './User.css';

export default function User({ user, setUsers }) {
  function changeName(event, key) {
    const name = event.target.value.trim();
    setUsers((prev) => changeUserKey(prev, user.id, key, name));
  }
  function changeHall(event) {
    const hall = event.target.value;
    setUsers((prev) => changeUserKey(prev, user.id, 'hall', hall));
  }
  function changeType(event) {
    const type = event.target.value;
    setUsers((prev) => changeUserKey(prev, user.id, 'type', type));
  }
  function deleteUser() {
    if (user.end || !user.start) {
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
    } else {
      alert('Please, end the session');
    }
  }
  function addName2() {
    setUsers((prev) => changeUserKey(prev, user.id, 'name2', ''));
  }
  return (
    <div className="client">
      <button className="deleteBtn" onClick={deleteUser}>
        <DeleteIcon />
      </button>
      <input
        className="input"
        type="text"
        name="name"
        onChange={(e) => changeName(e, 'name1')}
        defaultValue={user.name1}
        placeholder="Name1"
        // list="users"
      />
      {/* <datalist id="users">
        <option value="Chocolate" />
        <option value="Coconut" />
        <option value="Mint" />
        <option value="Strawberry" />
        <option value="Vanilla" />
      </datalist> */}
      {user.name2 === null && <button className='add-user' onClick={addName2}>+</button>}
      {user.name2 !== null && (
        <input
          className="input"
          type="text"
          name="name"
          onChange={(e) => changeName(e, 'name2')}
          defaultValue={user.name2}
          placeholder="Name2"
        />
      )}
      <div className="select">
        <select
          className="input hall"
          name="hall"
          defaultValue={user.hall}
          onChange={changeHall}>
          <option value="" disabled>
            Select hall
          </option>
          <option value="1">Hall 1</option>
          <option value="2">Hall 2</option>
          <option value="3">Hall 3</option>
          <option value="4">Hall 4</option>
        </select>
      </div>
      <div className="select">
        <select
          className="input type"
          name="type"
          defaultValue={user.type}
          onChange={changeType}>
          <option value="" disabled>
            Select type
          </option>
          <option value="private">Private</option>
          <option value="self">Self</option>
        </select>
      </div>
      <Timer user={user} setUsers={setUsers} />
    </div>
  );
}

function DeleteIcon() {
  return (
    <svg
      className="delete-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <title>Delete</title>
      <path
        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M80 112h352"
      />
      <path
        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
}
