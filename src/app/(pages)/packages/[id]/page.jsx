import React from 'react'
import img1 from '../../../../../public/trek/8.jpg'
import Section1 from '../../components/Section1'
import { travelPackages } from '@/app/data'
import Section2 from '../components/Section2'
import Itenary from '../components/Itenary'

const page = () => {
    return (
        <div>
            <Section1
                heading={travelPackages[0].country}
                subHeading={travelPackages[0].description}
                img={img1}
            />
            <div className='pb-24 md:bg-[#f3f2ee] h-max'>
                <Section2 />
                <Itenary />
            </div>
        </div>
    )
}

export default page