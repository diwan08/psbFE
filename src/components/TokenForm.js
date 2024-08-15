import React, { useState } from 'react';
import axios from 'axios';

function TokenForm() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Atur expires_at, misalnya 1 jam dari sekarang
    const expiresIn = 60 * 60 * 1000; // 1 jam dalam milidetik
    const expirationDate = new Date(Date.now() + expiresIn).toISOString();

    // Buat data yang akan dikirim
    const data = {
      user_id: userId,
      token: token,
      expires_at: expirationDate,
    };

    try {
      // Kirim data ke server
      const response = await axios.post('http://localhost:3000/api/user_tokens', data);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button type="submit">Save Token</button>
    </form>
  );
}

export default TokenForm;
