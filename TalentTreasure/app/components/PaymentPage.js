"use client"

import React from 'react'

const PaymentPage = ({username}) => {
  return (
    <>
    <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
    <div className='text-white'>
      
      <div className="cover w-full relative pt-4">
        <img className='w-full mx-auto h-[350px]  ' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/1180182/4f15af89878e46ad8697936c5b65e637/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/3.png?token-time=1722729600&token-hash=xAHvs1q1kqEQyitCEqmn5xBXry52RvtaZZejkYGJE7o%3D" alt="" />
        <img className='absolute rounded-full -bottom-8 left-[45%] border-black border-2' width={150} height={150} src="https://codequotient.com/blog/wp-content/uploads/2023/03/What-benefits-come-with-acquiring-coding-skills.jpg" alt="" />
      </div>
      <div className="info flex flex-col gap-2 items-center justify-center my-10">
      <div className='text-2xl font-bold'>@{username}</div>
      <div className='text-slate-400'>Creating React and Next.js apllications</div>
      <div className='text-slate-400'>1,316 members . 14 posts . $3,451/release</div>

      <div className='flex gap-5  w-[80%] my-3'>

        <div className="supporters p-5 w-1/2 bg-slate-900 space-y-5 rounded-xl">
          <h1 className='font-bold text-2xl '>Supporters</h1>
          <ul className='mx-5 space-y-3'>
            <li className='flex items-center gap-2'><img width={25} src="/avatar.svg" alt="" />fh donated <span className='font-bold'>$21</span> with a message ""</li>
            <li className='flex items-center gap-2'><img width={25} src="/avatar.svg" alt="" />fh donated <span className='font-bold'>$21</span> with a message ""</li>
            <li className='flex items-center gap-2'><img width={25} src="/avatar.svg" alt="" />fh donated <span className='font-bold'>$21</span> with a message ""</li>
            <li className='flex items-center gap-2'><img width={25} src="/avatar.svg" alt="" />fh donated <span className='font-bold'>$21</span> with a message ""</li>
            
          </ul>
        </div>

        <div className="payment p-5 w-1/2 bg-slate-900 rounded-xl space-y-5">
          <h1 className='font-bold text-2xl '>Make a payment</h1>
          <div className="fields flex flex-col gap-4  ">
            <input className='bg-slate-700 p-2 rounded-lg' placeholder='Enter name' type="text" />
            <input className='bg-slate-700 p-2 rounded-lg' placeholder='Enter amount' type="text" />
            <input className='bg-slate-700 p-2 rounded-lg' placeholder='Enter message' type="text" />
            <button
            
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
              Pay
            </span>
          </button>
          </div>

          <div className="default flex gap-5">
            <button className='bg-slate-800 rounded-lg p-2' onClick={()=>pay(10)}>Pay ₹10</button>
            <button className='bg-slate-800 rounded-lg p-2' onClick={()=>pay(20)}>Pay ₹20</button>
            <button className='bg-slate-800 rounded-lg p-2' onClick={()=>pay(30)}>Pay ₹50</button>
          </div>
        </div>
      </div>

                           
      </div>
    </div>
    </>
  )
}

export default PaymentPage
