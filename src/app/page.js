"use client"
import Hero from "./components/Hero";
import About from "./components/About";
import { travelPackages } from "./data";
import PackageCard from "./components/common/card/Card";
import Container4 from "./components/Container4";
import Container5 from "./components/Container5";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/common/ContactForm";
import Banner from "./(pages)/about-us/components/Banner";
import bannberImg from '../../public/banner/4.webp'

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <PackageCard travelPackages={travelPackages.splice(0, 3)} />
      <Container4 />
      <Container5 />
      <Banner img={bannberImg} />
      <ContactForm />
      <Testimonials />


      {/* <video
        className="w-full h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/4.mov" type="video/mp4" />
      </video> */}
    </div>
  );
}
