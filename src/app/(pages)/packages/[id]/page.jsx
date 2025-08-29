//app/(pages)/packages/[id]/page.jsx

import React from 'react'
import img1 from '../../../../../public/trek/8.webp'
import Section1 from '../../components/Section1'
// import { travelPackages } from '@/app/data'
// import Section2 from '../components/Section2'
import Itenary from '../components/Itenary'

async function getPackage(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/packages/${id}`)

    if (!res.ok) throw new Error("Failed to fetch package")
    return res.json()
}

const page = async ({ params }) => {
    const { id } = await params;
    const data = await getPackage(id)
    return (
        <div>
            <Section1
                heading={data.destination}
                subHeading={data.shortdescription}
                img={img1}
            />
            <div className='pb-24 md:bg-[#f3f2ee] '>
                {/* <Section2 /> */}
                <Itenary travelPackage={data?.travel_package_days?.length > 0 ? data.travel_package_days : []} />
            </div>
        </div>
    )
}

export default page