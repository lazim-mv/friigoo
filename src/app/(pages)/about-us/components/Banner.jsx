import React from 'react'
import img1 from '../../../../../public/trek/5.jpg'
import Image from 'next/image'
import CTAButton from '@/app/components/common/CTAButton'

const Banner = () => {
    return (
        <div className='sectionMargin relative h-max md:h-[60vh] w-full'>
            {/* Stronger overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 z-[1]" />

            <Image src={img1} fill alt='Beautiful lake by friigoo' className='absolute' objectFit='cover' />

            <div className='z-10 relative flex flex-col justify-center items-center h-full w-full text-white bg-white/20 rounded-lg p-6'>
                {/* Enhanced h2 with text shadow and backdrop */}
                <div className="relative mb-6 md:mb-8 lg:mb-10">
                    {/* Optional: Subtle backdrop for extra contrast */}
                    {/* <div className="absolute inset-0 bg-black/30 blur-xl scale-110 rounded-lg" /> */}

                    <h2 className="relative text-3xl md:text-4xl lg:text-6xl leading-tight text-white
                                   drop-shadow-lg
                                   [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%),_0px_0px_16px_rgb(0_0_0_/_50%)]
                                   tracking-tight
                                   text-center
                                   "
                        style={{ color: "white" }}>
                        Travel Made Effortless
                    </h2>
                </div>

                <p className="z-10 w-full md:w-[40%] text-center lg:text[17px] md:text-[16px] font-light paragraph-style mb-6 md:mb-8 leading-relaxed
                              drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
                    From flights and stays to unique adventures, Friigoo brings everything you need into one smooth, stress-free travel experience.
                </p>

                <div className='w-max'>
                    <CTAButton
                        label="Explore Destinations"
                        textColor="#0a0a0a"
                        bgColor="bg-white/10"
                        borderColor="border-white/10"
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner