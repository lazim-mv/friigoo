"use client"
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image';
import img1 from '../../../public/container4/1.jpg'
import img2 from '../../../public/container4/2.jpg'
import img3 from '../../../public/container4/3.jpg'
import img4 from '../../../public/container4/4.jpg'
import img5 from '../../../public/container4/5.jpg'
import img6 from '../../../public/container4/6.jpg'
import img7 from '../../../public/container4/7.jpg'


export const countries = [
    {
        name: "Thailand",
        img: img1,
    },
    {
        name: "Italy",
        img: img2,
    },
    {
        name: "Japan",
        img: img3,
    },
    {
        name: "Australia",
        img: img4,
    },
    {
        name: "Greece",
        img: img5,
    },
    {
        name: "Brazil",
        img: img6,
    },
    {
        name: "Canada",
        img: img7,
    },
];

const Container4 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3; // Number of cards visible at once
    const maxIndex = Math.max(0, countries.length - itemsPerView);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <div className='pl-32 my-24 py-24 bg-[#f3f2ee] '>
            <div className='flex justify-around pr-32'>
                <h2 className='text-6xl mb-10 w-[40%]'>
                    Discover Our Top Destinations
                </h2>
                <p className='w-[40%] text-[17px] font-light paragraph-style mb-9'>
                    From sun-soaked beaches and crystal-clear waters to vibrant cityscapes bursting with life,
                    Friigoo brings you handpicked travel experiences across the world's most stunning countries.
                    Wander through ancient streets steeped in history, savor flavors that tell the story of a region,
                    and witness landscapes that take your breath away from snow-capped mountains to lush tropical rainforests.
                    Whether you're seeking adventure, relaxation, or cultural immersion,
                    our curated packages are designed to create moments you'll cherish forever.
                </p>
            </div>
            <div className='pt-16 flex gap-16'>
                <div className='flex flex-col gap-4'>
                    <button
                        onClick={handlePrev}
                        className='hover:opacity-70 hover:scale-80 transition-all cursor-pointer'
                        disabled={currentIndex === 0}
                    >
                        <CircleChevronLeftIcon
                            size={70}
                            strokeWidth={.5}
                            className={currentIndex === 0 ? 'opacity-40' : ''}
                        />
                    </button>
                    <button
                        onClick={handleNext}
                        className='hover:opacity-70 hover:scale-80 transition-all cursor-pointer'
                        disabled={currentIndex === maxIndex}
                    >
                        <CircleChevronRightIcon
                            size={70}
                            strokeWidth={.5}
                            className={currentIndex === maxIndex ? 'opacity-40' : ''}
                        />
                    </button>
                </div>
                <div className='flex-1 overflow-hidden'>
                    <div
                        className='flex transition-transform duration-300 ease-in-out gap-6'
                        style={{
                            transform: `translateX(-${currentIndex * (90 / itemsPerView + 2)}%)`
                        }}
                    >
                        {countries.map((country, index) => (
                            <div key={index} className='min-w-[31%] relative group'>
                                <Image
                                    src={country.img}
                                    alt={country.name}
                                    width={200}
                                    height={600}
                                    className='aspect-[3/4] w-full object-cover rounded-lg shadow-lg'
                                />

                                {/* Improved overlay for better text visibility */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg'></div>

                                <h3 className='absolute text-3xl font-medium ml-5 mb-8 w-full bottom-0 text-white drop-shadow-lg z-10'>
                                    {country.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optional: Dots indicator */}
            <div className='flex justify-center mt-8 gap-2'>
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Container4