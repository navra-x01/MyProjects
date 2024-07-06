"use client"
import React, { useState,useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const dashboard = () => {
  const { data: session } = useSession();
  const [form, setform] = useState({})
  const router=useRouter()
  
  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  const handleChange=(e) => {
    setform({...form,[e.target.name]:e.target.value})
  }
  
  return (
    <>
    <div className="flex flex-col gap-5 text-white w-[35%]  mx-auto my-5">
      <h1 className='text-center text-2xl font-bold'>Welcome to your dashboard</h1>

      <div className="options space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input onChange={handleChange} id='name' value={form.name?form.name:""} name='name' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} id='email' value={form.email?form.email:""} name='email' className='bg-slate-700 rounded-lg px-2 py-1' type="email" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input onChange={handleChange} id='username' value={form.username?form.username:""} name='username' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="profile">Profie Picture</label>
          <input onChange={handleChange} id='profile' value={form.profile?form.profile:""} name='profile' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cover">Cover Picture</label>
          <input onChange={handleChange} id='cover' value={form.cover?form.cover:""} name='cover' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="id">Cashfree ID</label>
          <input onChange={handleChange} id='id' value={form.id?form.id:""} name='id' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="secret">Cashfree Secret</label>
          <input onChange={handleChange} id='secret' value={form.secret?form.secret:""} name='secret' className='bg-slate-700 rounded-lg px-2 py-1' type="text" />
        </div>
        <button
            
            className=" w-full  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
              Save
            </span>
          </button>
      </div>
    </div>
    </>
  )
}

export default dashboard
