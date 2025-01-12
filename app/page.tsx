import AllBlogs from "@/components/AllBlogs";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
  

export const revalidate=10;

export default function Home() {
  return (
    <>
   
    <HeroSection/>
    <AllBlogs/>
    </>
  );
}
