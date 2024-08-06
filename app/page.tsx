import Bloglist from "@/components/Bloglist";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Subscribe from "@/components/Subscribe";
import Image from "next/image";

export default function Home() {
  return (
      <div >
        <Navbar/>
        <HeroSection/>
        <Bloglist/>
        <Footer/>
      </div>
  );
}
