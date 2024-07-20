import Bloglist from "@/components/Bloglist";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Subscribe from "@/components/Subscribe";
import Image from "next/image";

export default function Home() {
  return (
   <div className="">
    <Navbar/>
    <Subscribe/>
    <Bloglist/>
    <Footer/>
   </div>
  );
}
