import React from 'react'
import Section1 from '../components/Section1'
import img1 from '../../../../public/service-page/8.webp'
import ContactPage from './ContactPage'
import Testimonials from '@/app/components/Testimonials'

const page = () => {
    return (
        <div>
            <Section1
                heading='Contact Us'
                subHeading='Plan Your Next Adventure'
                img={img1}
            />
            <ContactPage />
            <Testimonials />
        </div>
    )
}

export default page