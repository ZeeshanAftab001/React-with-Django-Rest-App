import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Sending Data:", { username, password });
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", { username, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token received:", token);
        
        // Store token in local storage
      //  localStorage.setItem("token", token);
        
        // Dispatch login action
        dispatch(login(token));
        
        navigate("/");
      }
  
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="p-3 bg-orange-400 shadow-xl rounded-2xl">
        <h1 className="text-white text-lg font-bold">Login</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-6 rounded-xl shadow-xl mt-5">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          className="w-full p-2 rounded-xl bg-orange-500 text-white font-bold hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="mt-3">
        Don't have an account? <Link to="/register" className="text-orange-500 font-bold">Register</Link>
      </div>
    </div>
  );
}
