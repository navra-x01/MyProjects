import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between py-3 px-12 h-14 items-center'>
        <div className="logo text-xl font-bold">
            <span className='text-purple-600'>&lt;</span>
            <span>Pass</span>
            <span className='text-purple-600'>Guard/&gt;</span>
        </div>
        {/* <ul className='flex gap-4'>
            <li><a className='hover:font-bold' href="">Home</a></li>
            <li><a className='hover:font-bold' href="">About</a></li>
            <li><a className='hover:font-bold' href="">Contact</a></li>
        </ul> */}
    </nav>
  )
}

export default Navbar
