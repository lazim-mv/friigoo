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

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/packages`);

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  const packages = await res.json();
  return (
    <div className="">
      <Hero />
      <About />
      <PackageCard
        btn={false}
        travelPackages={packages && packages !== undefined && packages.splice(0, 3)} />
      <Container4 />
      <Container5 />
      <Banner img={bannberImg} />
      <ContactForm />
      <Testimonials />
    </div>
  );
}
