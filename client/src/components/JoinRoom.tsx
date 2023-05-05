import { useState } from 'react';

function JoinRoom() {
  const [name, setName] = useState('');

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }

  return (
    <form onSubmit={joinRoom}>
      <input
        name='Name'
        placeholder='Name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        name='Room'
        placeholder='Room'
        type='text'
      />

    </form>
  )
}

export default JoinRoom;
