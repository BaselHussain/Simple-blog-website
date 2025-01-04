import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <>
    <header className=" body-font bg-slate-500 text-white">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <span className="ml-3 text-xl font-bold">Basel Blogs</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href='/' className="mr-5 hover:text-gray-900">Home</Link>
      <Link href='/about' className="mr-5 hover:text-gray-900">About</Link>
      
    </nav>
    
  </div>
</header>
    </>
  )
}
