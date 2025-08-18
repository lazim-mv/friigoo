import React from 'react'
import Section1 from '../components/Section1'
import img1 from '../../../../public/trek/6.jpg'
import PackageCard from '@/app/components/common/card/Card'
import { travelPackages } from '@/app/data'
import ContactForm from '@/app/components/common/ContactForm'
import Testimonials from '@/app/components/Testimonials'
const page = () => {
    return (
        <div>
            <Section1
                heading='Tailored Travel Packages'
                subHeading='Choose from a variety of thoughtfully designed packages that turn your travel dreams into reality.'
                img={img1}
            />
            <PackageCard travelPackages={travelPackages} />
            <ContactForm />
            <Testimonials />
        </div>
    )
}

export default page