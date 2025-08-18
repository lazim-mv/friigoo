import React from 'react'
import img1 from '../../../../../public/trek/8.jpg'
import Section1 from '../../components/Section1'

const page = () => {
    return (
        <div>
            <Section1
                heading='Tailored Travel Packages'
                subHeading='Choose from a variety of thoughtfully designed packages that turn your travel dreams into reality.'
                img={img1}
            />
        </div>
    )
}

export default page