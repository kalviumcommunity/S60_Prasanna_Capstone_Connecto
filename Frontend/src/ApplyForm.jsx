import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Applyform() {
  const navigate = useNavigate();
  // const [state, setState] = useState({
  //   Name: '',
  //   PhoneNumber: '',
  //   Work: 0,
  //   Email: '',
  //   Profile: '',
  //   WorkExp: '',
  //   Location: '',
  //   ExpectedSalary: '',
  // });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setState((previousData) => ({
  //     ...previousData,
  //     [name]: value,
  //   }));
  // };
  const handleSubmit = () => {
    console.log(state);
    axios
      .post('https://s60-prasanna-capstone-connecto-1.onrender.com/main', state)
      .then((res) => {
        console.log(res);
        navigate('/Mainpg');
      })

      .catch((err) => {
        console.error(err);
      });
  };
  const handleFile = (e) => {
    let a = e.target.files[0];
    // console.log(a)
    let b = new FileReader();
    b.readAsDataURL(a);
    b.onload = (event) => {
      // console.log(event.target.result);
      axios
        .post('https://api.cloudinary.com/v1_1/ddpebfutl/image/upload', {
          file: event.target.result,
          upload_preset: 'tg5wbsjz',
        })
        .then((r) => {
          setState({ ...state, Profile: r.data.secure_url });
          console.log(r.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  return (
    <div className="flex justify-center items-center">
      <div className="operationaldiv border w-1/2 h-11/12 shadow-md shadow-sky-500  ">
        <br />
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-sky-500 text-2xl">Apply Here...</h1>
        </div>
        <br />

        <div className=" w-full">
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="username"
                name="Name"
                type="text"
                placeholder="Name..."
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                onChange={handleChange}
              />
            </div>
          </div>
          <br />

          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userwork"
                name="Work"
                type="text"
                onChange={handleChange}
                placeholder="Work..."
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userphonenumber"
                name="PhoneNumber"
                type="text"
                onChange={handleChange}
                placeholder="Phone Number..."
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userprofile"
                name="Profile"
                type="file"
                onChange={handleFile}
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="useremail"
                name="Email"
                type="text"
                onChange={handleChange}
                placeholder="Email...(not mandatory)"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userWorkExp"
                name="WorkExp"
                type="text"
                onChange={handleChange}
                placeholder="Experience"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="userLocation"
                name="Location"
                type="text"
                onChange={handleChange}
                placeholder="Location"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="ExpectedSalary"
                name="ExpectedSalary"
                type="text"
                onChange={handleChange}
                placeholder="ExpectedSalary"
                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="w-36 bg-black  h-[40px] my-3 flex items-center justify-center rounded cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-500 before:to-sky-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0 text-[#fff] font-medium"
              onClick={handleSubmit}
            >
              Apply
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default Applyform;
