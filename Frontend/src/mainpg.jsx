import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import EntityCard from './EntityCard';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IoSearchOutline } from 'react-icons/io5';
import { CgDesignmodo } from 'react-icons/cg';
import { MdManageAccounts } from 'react-icons/md';
import { MdDeveloperMode } from 'react-icons/md';
import { HiServerStack } from 'react-icons/hi2';
import { FaHackerrank } from 'react-icons/fa';
import { SiPytest } from 'react-icons/si';
import { GiArtificialHive } from 'react-icons/gi';
import { GiPipes } from 'react-icons/gi';
import { GiWoodPile } from 'react-icons/gi';
import { FaRegEye } from 'react-icons/fa';
import { FaTrowelBricks } from 'react-icons/fa6';
import { GiWaterTank } from 'react-icons/gi';
import { MdElectricalServices } from 'react-icons/md';
import { GiSwordSmithing } from 'react-icons/gi';
import { IoGitNetworkSharp } from 'react-icons/io5';
import { LuFileClock } from 'react-icons/lu';
import { IoLocationSharp } from 'react-icons/io5';
import { MdOutlineCurrencyRupee } from 'react-icons/md';

function Mainpg() {
  // toast.configure();
  const [entities, setEntities] = useState([]);
  const [array, setArray] = useState([]);
  const [activeButton, setActiveButton] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('https://s60-prasanna-capstone-connecto-1.onrender.com/main')
      .then((res) => {
        console.log('Fetch successful');
        if (res.data.length > 0) {
          setEntities(res.data);
          setArray(res.data);
        }
      })
      .catch((error) => {
        console.log('error in getting', error);
      });
  }, []);
  useEffect(() => {
    const handlePopState = () => {
      window.history.replaceState(null, '', '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const deletingTheItem = (id) => {
    console.log('hi');
    axios
      .delete(`https://s60-prasanna-capstone-connecto.onrender.com/store/${id}`)
      .then((res) => {
        console.log(res, 'deleted');
        location.reload();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const notify = () => {
    toast.success('Your person is available');
  };
  const handleInput = (e) => {
    console.log(e.value);
    let input = e.value.toLowerCase();
    console.log(entities);
    let modarr = entities.filter((element, index) => {
      if (e.value == '') {
        setEntities(entities);
      }
      let work = element.Work;
      work = work.toLowerCase();
      console.log(work.includes(input), element);
      return work.includes(input);
    });
    setArray(modarr);
  };
  const filterEntities = (work) => {
    const filtered = entities.filter((entity) => entity.Work === work);
    setArray(filtered);
    setActiveButton(work);
  };
  const refresh = (e) => {
    setEntities((e.target.value = ''));
  };

  console.log(array);
  if (entities.length === 0) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#0074A2_0deg,#0074A2_180deg,transparent_180deg,transparent_360deg)]">
          <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#21C0FF_0deg,#0088BE_180deg,transparent_180deg,transparent_360deg)]"></span>
        </div>
      </div>
    );
  }
  console.log();

  return (
    <div className="manindiv ">
      <div className="HeaderDiv bg-slate-100 h-96 p-2">
        <div className=" flex justify-center items-center m-4">
          <div className="FirstText w-2/5 font-bold text-3xl text-black flex justify-center items-center">
            Find People Here
          </div>
          <button
            className="w-28 bg-black h-[30px] my-3 flex items-center justify-center rounded cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-500 before:to-zinnc-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0 text-[#fff] font-medium text-sm"
            onClick={() => {
              navigate('/Applyform');
            }}
          >
            Apply yourself
          </button>
        </div>

        <div className=" flex justify-center items-center h-1/4 gap-3">
          <div className=" w-3/4 flex justify-center rounded-full bg-white shadow-md border gap-2">
            <div>
              <IoSearchOutline className="h-full bg-white w-12 p-3 rounded-[100%]" />
            </div>
            <input
              type="text"
              placeholder="Enter Skills/Works"
              className="p-4 w-full outline-none border-0 rounded-full"
              onChange={(e) => {
                {
                  handleInput(e.target);
                }
              }}
            />
          </div>
        </div>
        <br />
        <div className="buttonsDiv h-10 flex justify-evenly items-center ">
          <div className="Firstset  flex justify-center w-3/4 gap-3 items-center">
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiPipes />
              <button onClick={() => filterEntities('Plumber')} className="">
                Plumber
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiWoodPile />
              <button className="" onClick={() => filterEntities('Carpenter')}>
                Carpenter
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaRegEye />
              <button className="" onClick={() => filterEntities('Supervisor')}>
                Supervisor
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaTrowelBricks />
              <button className="" onClick={() => filterEntities('Mason')}>
                Mason
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiWaterTank />
              <button className="" onClick={() => filterEntities('Waterman')}>
                Waterman
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdElectricalServices />
              <button
                className=""
                onClick={() => filterEntities('Electrician')}
              >
                Electrician
              </button>
            </div>
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiSwordSmithing />
              <button className="" onClick={() => filterEntities('Smith')}>
                Smith
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="btnsiv h-10 flex justify-evenly items-center">
          <div className="  Secondset flex justify-evenly gap-3 w-3/4 items-center">
            <div className=" flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <CgDesignmodo className="" />
              <button
                className=""
                onClick={() => filterEntities('UX/UI architect')}
              >
                UX architect
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdManageAccounts />
              <button className="" onClick={() => filterEntities('HR')}>
                HR
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <MdDeveloperMode />
              <button className="" onClick={() => filterEntities('Developer')}>
                Developer
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <HiServerStack />
              <button className="" onClick={() => filterEntities('Serverman')}>
                Server
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <FaHackerrank />
              <button className="" onClick={() => filterEntities('Hacker')}>
                Hacker
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <SiPytest />
              <button
                className=""
                onClick={() => filterEntities('Backend Developer')}
              >
                Tester
              </button>
            </div>
            <div className="flex gap-2 items-center p-3 rounded-xl bg-white text-black border border-slate-300 font-medium">
              <GiArtificialHive />
              <button
                className=""
                onClick={() => filterEntities('AI developer')}
              >
                AI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {' '}
        <div className="grid gap-5 justify-center items-center p-10">
          {array.map((entity, index) => (
            <div
              className="border w-[50vw] h-48 pt-4 shadow-lg rounded-2xl"
              key={index}
            >
              <div className="flex">
                <div className="flex items-center justify-center w-16">
                  <img
                    src={entity.Profile}
                    alt="ProfilePhoto"
                    className="size-12 rounded-full"
                  />
                </div>
                <div>
                  <div className="pl-5">
                    <p className="font-semibold text-lg">{entity.Name}</p>
                  </div>
                  <div className=" pl-5 flex items-center gap-2 w-1/4 ">
                    <p className="text-slate-600 font-semibold">
                      {entity.Work}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center  w-full justify-start mt-2">
                <div className="pl-5 mt-1 w-1/3 flex items-center gap-1 border-r-2 ">
                  <LuFileClock />
                  <p className="text-slate-600">{entity.WorkExp}</p>
                </div>
                <div className="pl-5 mt-1 w-1/3 flex items-center gap-1 border-r-2 ">
                  <IoLocationSharp />
                  <p className="text-slate-600">{entity.Location}</p>
                </div>
                <div className="pl-5 mt-1 w-2/3 flex items-center gap-1">
                  <MdOutlineCurrencyRupee />
                  <p className="text-slate-600">{entity.ExpectedSalary}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className=" pl-5 mt-1 w-1/2 flex items-center ">
                    <p className="text-slate-600 font-medium">{entity.Email}</p>
                  </div>
                  <div className=" pl-5 mt-1 w-1/2 flex items-center ">
                    <p className="text-slate-600 font-medium">
                      {entity.PhoneNumber}
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className=" w-2/5 flex items-center justify-center">
                  <button
                    className="button bg-slate-100 border border-slate-900 p-1 font-semibold rounded-lg hover:bg-red-100"
                    onClick={notify}
                  >
                    Connect
                  </button>
                  {/* <button
                    className="button bg-slate-100 border border-slate-900 p-1 font-semibold rounded-lg hover:bg-sky-100"
                    onClick={() => {
                      deletingTheItem;
                    }}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default Mainpg;
