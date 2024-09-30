import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Mainpg from './mainpg';
import connectologo from './assets/connecto-logo-color-removebg-preview.png';

const clientId =
  '598048758838-enhddjp4p7aecbg815on7utseok98276.apps.googleusercontent.com';

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSuccessfulLogin = (userData) => {
    // Save the user data to local storage or session storage
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/Mainpg');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://s60-prasanna-capstone-connecto.onrender.com/login',
        formData
      );
      if (res.data.message === 'Invalid credentials or user not existed') {
        alert(
          'Error happened. Please fill the Credentials. If filled, please look for the proper Credentials. Have you signed up already?'
        );
      } else if (res.data.message === 'Login successful') {
        handleSuccessfulLogin(res.data);
      }
    } catch (error) {
      console.log('error on fetching', error);
    }
  };

  const onSuccess = async (res) => {
    console.log('Google Sign-In successful', res);
    try {
      const response = await axios.post(
        'https://s60-prasanna-capstone-connecto.onrender.com/google-login',
        {
          token: res.tokenId,
        }
      );

      if (response.data.message === 'Login successful') {
        handleSuccessfulLogin(response.data);
      } else {
        alert('Google login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('An error occurred during Google login. Please try again.');
    }
  };

  const onFailure = (res) => {
    console.log('login is unsuccessful', res);
  };

  useEffect(() => {
    async function start() {
      try {
        await gapi.load('client:auth2', async () => {
          await gapi.client.init({
            clientId: clientId,
            scope: 'email profile',
          });
        });
      } catch (error) {
        console.error('Error loading or initializing Google API client', error);
      }
    }
    start();
  }, []);

  return (
    <div className="bg-[#ffffff] h-screen ">
      <form
        className=" flex justify-around items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative py-3 w-1/3">
          <div className="relative px-4 py-10 mx-8 md:mx-0 shadow rounded-3xl sm:p-10 border ">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-sky-500 text-4xl">Connecto</h1>
            </div>
            <br />
            <h2 className="text-2xl font-bold text-sky-500 ">Login</h2>
            <div className="max-w-md mx-auto text-white">
              <div className="flex items-center space-x-5 justify-center"></div>
              <div className="mt-5">
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="login"
                >
                  E-mail
                </label>
                <input
                  className="border border-slate-500 outline-none bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black"
                  type="text"
                  id="login"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-slate-500 outline-none bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-black"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="flex justify-center items-center">
                <div id="loginButton">
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single-host-origin'}
                    // isSignedIn={true}
                  ></GoogleLogin>
                </div>
              </div>
              <div className="mt-5">
                <button
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                  onClick={() => {
                    handleSubmit;
                  }}
                >
                  Log in
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <p
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  onClick={() => {
                    navigate(`/Signup`);
                  }}
                >
                  or sign up
                </p>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="border border-black"></div>
    </div>
  );
}

export default Login;
