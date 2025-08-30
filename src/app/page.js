import Hero from "./components/Hero";
import About from "./components/About";
import PackageCard from "./components/common/card/Card";
import Container4 from "./components/Container4";
import Container5 from "./components/Container5";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/common/ContactForm";
import Banner from "./(pages)/about-us/components/Banner";
import bannberImg from '../../public/banner/4.webp'
import { createClient } from "@supabase/supabase-js";

export const revalidate = 600;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function Home() {
  let packages = [];
  let hasError = false;

  try {
    const { data, error } = await supabase
      .from('travel_packages')
      .select(`
                *,
                travel_package_days (*)
            `)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .order('day', { foreignTable: 'travel_package_days', ascending: true })

    if (error) {
      console.error('Database error:', error.message);
      hasError = true;
    } else {
      packages = data || [];
    }
  } catch (error) {
    console.error('Page error:', error);
    hasError = true;
  }

  // Check if packages array is empty or there's an error
  const showEmptyState = hasError || !Array.isArray(packages) || packages.length === 0;

  return (
    <div className="">
      <Hero />
      <About />
      {!showEmptyState && <PackageCard
        btn={false}
        travelPackages={packages} />
      }
      <Container4 />
      <Container5 />
      <Banner img={bannberImg} />
      <ContactForm />
      <Testimonials />
    </div>
  );
}