import React from 'react'

const Navbar = () => {
  return (
    <nav className="container bg-violet-600 flex justify-between p-3"> 
    <div className="logo">
      <span className='font-bold text-xl'>iTask</span>
    </div>
    <ul className='flex gap-5 mx-2'>
      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
    </ul>
    </nav>
  )
}

export default Navbar
