import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' } // Ensure JSON format
      });
      

      if (response.status === 201) {
        console.log(response.data);
        alert('User Registered, Please Login!');
        dispatch(login(response.data.token))
        navigate('/');
      }
    } catch (error) {
      console.error('Error Occurred:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="p-3 bg-orange-400 shadow-xl rounded-2xl">
        <h1 className="text-white text-lg font-bold">Register</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-6 rounded-xl shadow-xl mt-5">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
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
          Register
        </button>
      </form>

      <div className="mt-3">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-500 hover:text-amber-300 font-bold">
          Login
        </Link>
      </div>
    </div>
  );
}
