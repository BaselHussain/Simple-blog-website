import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

export default function HeroSection() {
  return (
    <>
    <div className='w-full max-w-[2000px]'>
        <div className='relative w-full'>
        <div className=' w-full h-[350px] md:h-[700px]'>
<Image
src={'/hero-image.png'}
alt='hero-image'
width={2000}
height={2000}
className=' w-full h-full'
/>
</div>
<div className='absolute top-1/2 -translate-y-32 md:-translate-y-44 left-1/2 -translate-x-1/2 text-center   text-2xl font-bold flex flex-col items-center gap-4'>
<h1 className='text-sm md:text-3xl font-bold'>Explore the Blogs World</h1>
<p className='text-sm md:text-2xl'>"Where creativity meets knowledge. Explore, learn, and grow through words that matter."</p>
<Button>Explore</Button>
</div>
</div>
    </div>
    </>
  )
}
