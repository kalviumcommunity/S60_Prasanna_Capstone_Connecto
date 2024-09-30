import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmemail: '',
    password: '',
    confirmpassword: '',
    gender: 'male',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(
        'https://s60-prasanna-capstone-connecto-1.onrender.com/signup',
        formData
      );

      if (res.data.message === 'ok') {
        navigate('/Mainpg'); // Redirects to Mainpg on successful signup
      } else if (res.data.message === 'get out') {
        alert('Your email is already in our database. Please Login');
        navigate(`/Login`);
      }
    } catch (err) {
      console.log('error', err.response);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-3/4">
      <div className="w-full max-w-md rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-sky-500 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            name="name"
            value={formData.name}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            type="text"
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            name="email"
            value={formData.email}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            type="email"
            onChange={handleChange}
          />
          <input
            placeholder="Confirm Email"
            name="confirmemail"
            value={formData.confirmemail}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            type="email"
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            type="password"
            onChange={handleChange}
          />
          <input
            placeholder="Confirm Password"
            name="confirmpassword"
            value={formData.confirmpassword}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            type="password"
            onChange={handleChange}
          />
          <select
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <p className="text-gray-900 mt-4">
            Already have an account?{' '}
            <span
              className="text-sky-500 hover:underline cursor-pointer"
              onClick={() => {
                navigate(`/Login`);
              }}
            >
              Login
            </span>
          </p>
          <button
            className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
