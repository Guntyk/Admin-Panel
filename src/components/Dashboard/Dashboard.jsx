import User from './User/User';

export default function Dashboard({ users, setUsers }) {
  return (
    <div className='container'>
      {users.map((user) => (
        <User key={user.id} user={user} setUsers={setUsers} />
      ))}
    </div>
  );
}
