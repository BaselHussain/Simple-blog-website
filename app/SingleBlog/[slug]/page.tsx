import React, { useState, useEffect } from "react";

import PageClient from "@/components/PageClient";

import { client } from "@/sanity/lib/client";


export const revalidate=10;



export async function generateStaticParams(){
const query=`
 *[_type=='blog' ] {
   "slug":slug.current
 }
`
const slugs=await client.fetch(query)
const slugRoutes:string[]=slugs.map((slug:{slug:string})=>(slug.slug))
return slugRoutes.map((slug:string)=>({slug}))
}

export default async function Page({ params:{slug} }: { params: { slug: string } }) {

 

  const query=`
   *[_type=='blog' && slug.current=='${slug}'][0]{
   title,summary,image,author,content
 } 
  `
  const post=await client.fetch(query)

  if (!post) {
    return <div className="text-center mt-16">Blog post not found.</div>;
  }
 
  return (
    <PageClient post={post}/>
  );
}
