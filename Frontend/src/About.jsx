import React from 'react';
import './App.css';
import handshakeimage from './assets/handshakeIMG.png';
import { useNavigate } from 'react-router-dom';
import Splash from './Splash';

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" text-center flex flex-col items-center h-full m-2 p-2">
        <div className=" w-1/2">
          <h1 className="font-bold text-3xl ">
            At Connecto every Job becomes Recognised - Become Professional
          </h1>
        </div>
        <br />
        <div className=" w-1/2">
          <p className="text-sm font-light ">
            Connecto - A User-friendly, Accessible and Dynamic site for people
          </p>
        </div>
      </div>
      <br />
      <div className="flex">
        <div className="w-1/2 m-3 p-3 text-justify">
          <div>
            <h1 className="font-semibold text-2xl">
              Welcome to Connecto - Bridging Talent with Oppurtunities
            </h1>
          </div>
          <br />
          <div>
            <p>
              At Connecto, we are dedicated to Empowering Rural communities by
              providing a seamless link between Seekers and Providers. With a
              great vision to enhance employment accessibility and to connecto
              the untapped potential professionals with various industries,
              fostering mutual growth and Development. Rural job seekers can
              find and register themselves with their jobs that matches their
              skills. Employers can browse through a rich database of potential
              employees who are ready to bring their work to the table.
            </p>
          </div>
        </div>
        <div className=" w-1/2 flex justify-around items-center">
          <div className=" rounded-full">
            <img src={handshakeimage} alt="" className="size-72 rounded-full" />
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-32 flex justify-center items-center">
          <button
            className="w-24 bg-black p-2 my-3 flex items-center justify-center rounded cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-teal-500 before:to-teal-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0 text-[#fff] font-medium"
            onClick={() => {
              navigate(`/`);
              console.log('connection to the page is successful');
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default About;
