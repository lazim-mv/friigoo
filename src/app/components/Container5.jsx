import Image from 'next/image'
import React from 'react'
import img1 from '../../../public/container5/1.jpg'
import img2 from '../../../public/container5/2.jpg'
import CTAButton from './common/CTAButton'
import { CheckCircleIcon } from 'lucide-react'

const Container5 = () => {
    const servicePoints = [
        "Connect with Nature",
        "Experience New Cultures",
        "Discover Hidden Gems",
        "Travel Without Hassle",
        "Make Memories That Last"
    ];
    return (
        <div className='px-32 py-24 flex justify-between'>
            <div className='relative w-[41%] h-[550px] px-16'>
                <Image src={img1} alt='Norther Lights' className='object-cover w-full h-full' />
                <Image src={img2} alt='Norther Lights' className='absolute bottom-[-15%] right-[-10%] w-[60%] h-[350px] object-cover' />
            </div>

            <div className='flex flex-col w-[50%]'>
                <h2 className='text-6xl mb-10 w-[80%]'>
                    Your Journey, <br />Perfectly Planned
                </h2>
                <p className='w-[60%] text-[17px] font-light paragraph-style mb-9 leading-relaxed'>
                    At Friigoo, we go beyond booking trips we craft experiences.
                    Whether you’re looking for an all inclusive holiday package, a custom adventure itinerary, or the perfect guided tour,
                    our team ensures every detail is taken care of. From handpicked accommodations to knowledgeable local guides,
                    we make your journey smooth, memorable, and uniquely yours.
                </p>

                <ul className='mb-9 '>
                    {servicePoints.map((point, index) => (
                        <li key={index} className='flex gap-4 items-center text-[17px] font-light mb-1 leading-relaxed'>
                            <CheckCircleIcon size={17} strokeWidth={1.5} />
                            {point}
                        </li>
                    ))}
                </ul>

                <div className='w-[35%]'>
                    <CTAButton
                        label='Know More'
                        textColor='#0a0a0a'
                        bgColor='bg-black/10'
                        borderColor='border-black/10'
                    />
                </div>
            </div>
        </div>
    )
}

export default Container5