import React from 'react'
import Section1 from '../components/Section1'
import img1 from '../../../../public/service-page/1.jpg'
import Container5 from '@/app/components/Container5'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Banner from '../about-us/components/Banner'
import Testimonials from '@/app/components/Testimonials'
import ContactForm from '@/app/components/common/ContactForm'

const page = () => {
    return (
        <div>
            <Section1
                heading='Discover Friigoo Experiences'
                subHeading='More than just trips, we craft unforgettable journeys filled with stories, connections, and lasting memories.'
                img={img1}
            />
            <Section2 btn={false} />
            <Section3 />
            <Banner />
            <ContactForm />
            <Testimonials />
        </div>
    )
}

export default page