import { useState } from "react";
import axios from "axios";

function Admin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials
      );
      console.log(response);
      setIsLoggedIn(true);
      setLoginError("");
    } catch (error) {
      console.log(error);
      setLoginError("Invalid username or password");
    }
  };
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        // Remove the user from the state after deletion
        setUserData(userData.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {!isLoggedIn ? (
        <form
          onSubmit={handleLoginSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleLoginChange}
            placeholder="Enter username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleLoginChange}
            placeholder="Enter password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:bg-blue-600 transition"
          >
            Login
          </button>
          {loginError && (
            <p className="mt-4 text-red-500 text-center">{loginError}</p>
          )}
        </form>
      ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
          <button
            onClick={fetchUserData}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:bg-green-600 transition mb-6"
          >
            Fetch User Data
          </button>
          <ul className="space-y-4">
            {userData.map((user) => (
              <li
                key={user._id}
                className="p-4 bg-gray-100 border border-gray-300 rounded-lg text-lg text-center"
              >
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Message: {user.message}</p>
                <p>
                  <strong>Submitted at:</strong> {formatDate(user.createdAt)}
                </p>
                 {/* Delete button */}
                 <button 
                    onClick={() => deleteUser(user._id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:bg-red-600 transition">
                    Delete User
                  </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;
