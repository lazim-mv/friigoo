"use client"
import Hero from "./components/Hero";
import About from "./components/About";
import { travelPackages } from "./data";
import PackageCard from "./components/common/card/Card";
import Container4 from "./components/Container4";
import Container5 from "./components/Container5";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <About />
      <PackageCard travelPackages={travelPackages} />
      <Container4 />
      <Container5 />
      <Testimonials />
      <Footer />

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
