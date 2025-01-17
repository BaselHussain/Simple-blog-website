import React from 'react';
import { Card,CardContent,CardHeader,CardDescription,CardTitle,CardFooter } from './ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default async function AllBlogs() {
  interface Post{
summary:string;
title:string;
image:any;
author:string;
slug:string
  }



  const query=`
 *[_type=='blog'] | order(_createdAt asc){
  summary,title,image,author,
    "slug":slug.current
}`
const posts:Post[]=await client.fetch(query)

  return (
   <>
   <div className='w-[90%] mx-auto py-20'>
   <h1 className='text-4xl font-bold text-center my-16'>All Blogs</h1>
   <div className='grid grid-cols-1 md:grid-cols-3 gap-7  '>
    
   {posts.map((post:Post,index:number)=>(
    <Link href={`SingleBlog/${post.slug}`}>
    <Card key={index} className=' h-[600px] rounded-lg shadow-lg'>
      <div className='w-full h-[60%] rounded-lg'>
<Image
src={urlFor(post.image).url()}
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
                 post.summary.substring(0, 100) // Limit excerpt length
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
