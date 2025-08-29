import React from 'react'
import Section1 from '../components/Section1'
import img1 from '../../../../public/about-page/6.webp'
import PackageCard from '@/app/components/common/card/Card'
import ContactForm from '@/app/components/common/ContactForm'
import Testimonials from '@/app/components/Testimonials'

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/packages`);

    if (!res.ok) {
        throw new Error("Failed to fetch packages");
    }

    const packages = await res.json();

    return (
        <div>
            <Section1
                heading='Tailored Travel Packages'
                subHeading='Choose from a variety of thoughtfully designed packages that turn your travel dreams into reality.'
                img={img1}
            />
            <PackageCard
                btn={false}
                travelPackages={packages && packages !== undefined && packages} />
            <ContactForm />
            <Testimonials />
        </div>
    )
}

export default page