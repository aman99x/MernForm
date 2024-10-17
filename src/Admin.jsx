import { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loginError, setLoginError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
      console.log(response)
      setIsLoggedIn(true);
      setLoginError('');
    } catch (error) {
        console.log(error)
      setLoginError('Invalid username or password');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  return (
    <div className="admin-container">
      {!isLoggedIn ? (
        <form onSubmit={handleLoginSubmit}>
          <h2>Admin Login</h2>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleLoginChange}
            placeholder="Enter username"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleLoginChange}
            placeholder="Enter password"
            required
          />
          <button type="submit">Login</button>
          {loginError && <p>{loginError}</p>}
        </form>
      ) : (
        <>
          <h2>Admin Panel</h2>
          <button onClick={fetchUserData}>Fetch User Data</button>
          <ul>
            {userData.map((user) => (
              <li key={user._id}>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Message: {user.message}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Admin;
