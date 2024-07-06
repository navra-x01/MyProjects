import React from "react";
import { useRef, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords= async () => {
    let req=await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords);
    console.log(passwords)
    
  }
  

  useEffect(() => {
    getPasswords()
  }, []);

  const copyText = (text) => {
    
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
  };

  const showPassword = () => {
    if (ref.current.src.includes("/icons/eye.svg")) {
      ref.current.src = "/icons/eyecross.svg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icons/eye.svg";
      passwordRef.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async() => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
      
      // If any such id exists in the db, delete it 
      // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

      // Otherwise clear the form and show toast
      setform({ site: "", username: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    }
    else{
      toast('Failed to save password!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    }
  };

  const deletePassword =async (id) => {
    let c= confirm("Do you really want to delete this password?")
    if (c) {
      
      setPasswordArray(passwordArray.filter((item)=>item.id!==id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id!==id)));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    }
    
  };

  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(i=>i.id!==id));
    
  };

  

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-purple-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="container mx-auto  p-4 max-w-5xl">
        <div className="logo text-3xl font-bold text-center">
          <span className="text-purple-600">&lt;</span>
          <span>Pass</span>
          <span className="text-purple-600">Guard/&gt;</span>
        </div>

        <div className="text-black text-center text-xl font-bold my-2">
          Your own Password Manager
        </div>

        <div className="flex flex-col gap-8 my-6  ">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter website URL"
            className="w-3/4 rounded-full border-[2px] border-purple-600 mx-auto px-3 py-1"
            type="text"
          />
          <div className="flex flex-col md:flex-row gap-3 justify-around ">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter username"
              className=" w-3/4 md:w-1/4 rounded-full border-[2px] border-purple-600 px-3 py-1 "
              type="text"
            />

            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter password"
              className="w-3/4 md:w-1/4 rounded-full border-[2px] border-purple-600 px-3 py-1 relative "
              type="password"
            />
            <span
              onClick={showPassword}
              className="absolute right-[27%] top-[33%] "
            >
              <img className=" " ref={ref} src="/icons/eye.svg" alt="" />
            </span>
          </div>
        </div>

        <div className="btn flex justify-center  ">
          <button
            onClick={savePassword}
            className="bg-purple-200 rounded-full px-4 py-2 font-bold flex items-center gap-2 hover:bg-purple-300"
          >
            Save 
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
          </button>
        </div>

        <div className="passes  p-2 space-y-3">
          <h2 className="font-bold text-xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto rounded-md overflow-hidden w-full ">
              <thead className="bg-purple-400 ">
                <tr className="">
                  <th className="p-1">Site</th>
                  <th className="p-1">Username</th>
                  <th className="p-1">Password</th>
                  <th className="p-1">Actions</th>
                </tr>
              </thead>
              <tbody >
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className=" text-center">
                      <td className="border-[1px] border-purple-200  p-1 ">
                        <div className="flex justify-center items-center gap-2">
                          <a href="{item.site}" target="_blank">
                            {item.site}
                          </a>
                          <img
                            width={18}
                            className="cursor-pointer"
                            src="/icons/copy.svg"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="border-[1px] border-purple-200  p-1 ">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.username}</span>
                          <img
                            width={18}
                            className="cursor-pointer"
                            src="/icons/copy.svg"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="border-[1px] border-purple-200  p-1 ">
                        <div className="flex justify-center items-center gap-2">
                        <span>{item.password ? "*".repeat(item.password.length) : ""}</span>

                          <img
                            width={18}
                            className="cursor-pointer"
                            src="/icons/copy.svg"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="border-[1px] border-purple-200  p-1 ">
                        <div className="flex justify-center items-center gap-2">
                          
                          <img onClick={()=>{editPassword(item.id)}} className="cursor-pointer" src="icons/edit.svg" alt="" />
                          <img onClick={()=>{deletePassword(item.id)}} className="cursor-pointer" src="icons/delete.svg" alt="" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
