import React from 'react'
import About from '@/app/components/About'
import Section2 from './components/Section2'
import ContactForm from '@/app/components/common/ContactForm'
import Section1 from '../components/Section1'
import img1 from '../../../../public/about-page/4.webp'
import bannerimg1 from '../../../../public/banner/4.webp'
import Banner from './components/Banner'
import Testimonials from '@/app/components/Testimonials'


const page = () => {
    return (
        <div>
            <Section1
                heading="Our Journey, Your Adventures"
                subHeading="Our mission is to simplify travel while creating experiences that last a lifetime."
                img={img1}
            />
            <About
                btn={false}
                smallCards={true}
                heading="Built Around Travelers"
                desc1="At Friigoo, we believe travel is not just about reaching destinations, but about creating timeless stories that stay with you forever. From breathtaking adventures and cultural explorations to peaceful escapes, we design every journey with care so you can focus on what truly matters making memories."
                desc2="Whether you seek the thrill of adventure, the beauty of cultural discoveries, or the calm of a beachside retreat, Friigoo ensures every detail is seamless. With us, your journey becomes effortless, meaningful, and truly unforgettable."
            />
            <Banner img={bannerimg1}/>
            <Section2 />
            <ContactForm />
            <Testimonials />
        </div>
    )
}

export default page