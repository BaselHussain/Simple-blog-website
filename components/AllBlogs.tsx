import React from 'react';
import { posts } from '@/lib/blogs';
import { Card,CardContent,CardHeader,CardDescription,CardTitle,CardFooter } from './ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function AllBlogs() {
  return (
   <>
   <div className='w-[90%] mx-auto py-20'>
   <h1 className='text-4xl font-bold text-center my-16'>All Blogs</h1>
   <div className='grid grid-cols-1 md:grid-cols-3 gap-7  '>
    
   {posts.map((post)=>(
    <Link href={`SingleBlog/${post.id}`}>
    <Card key={post.id} className=' h-[600px] rounded-lg shadow-lg'>
      <div className='w-full h-[60%] rounded-lg'>
<Image
src={post.src}
alt='post-image'
width={1000}
height={1000}
className='w-full h-full rounded-lg'/>
      </div>
<CardHeader>
    <CardTitle className='leading-snug text-xl'>{post.title}</CardTitle>
</CardHeader>
<CardContent
              className="line-clamp-3">
              {
                 post.content.substring(0, 100) // Limit excerpt length
              }...
            </CardContent>
    </Card>
    </Link>
   ))}
   </div>
   </div>
   </>
  )
}
