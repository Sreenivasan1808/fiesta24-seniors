import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-500 dark:bg-slate-800 text-gray-100">
        <Link className="m-2 p-2" href='/'>
          <img src="" alt="Fiesta'24" />
        </Link>
        <div className="m-2 p-2 flex gap-6">
          <Link href="/CoordinatorDashboard" className="px-4 rounded-3xl hover:bg-green-400 hover:text-black">Coordinator Dashboard</Link>
          <Link href="/#events" className="px-4 rounded-3xl hover:bg-green-400 hover:text-black">Events</Link>
          <Link href="/Login" className="px-4 rounded-3xl hover:bg-green-400 hover:text-black">Login</Link>
          <Link href="/Register" className="px-4 rounded-3xl hover:bg-green-400 hover:text-black">Register</Link>
        </div>
      </nav>
  )
}

export default Navbar
