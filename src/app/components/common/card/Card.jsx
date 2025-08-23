"use client"
import React, { use, useRef, useState } from 'react'
import { MapPin, MessageCircle, PhoneCall, Star } from "lucide-react";
import Image from 'next/image';
import CTAButton from '../CTAButton';
import CTAButton1 from '../CTAButton1';
import { useGSAP } from '@gsap/react';
import gsap from '@/app/utils/gsapInit';
import { useRouter } from 'next/navigation';
import carsvg from '../../../../../public/icons/car.svg';
import hotelsvg from '../../../../../public/icons/hotel.svg';
import mealssvg from '../../../../../public/icons/meals.svg';
import flightsvg from '../../../../../public/icons/flight.svg';
import mountainssvg from '../../../../../public/icons/mountains.svg';
import sunnysvg from '../../../../../public/icons/sunny.svg';
import Ratings from '../Ratings';


const PackageCard = ({ travelPackages }) => {
    const router = useRouter();
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    if (!travelPackages || travelPackages.length === 0) return null;

    useGSAP(() => {
        const cards = gsap.utils.toArray('.package-card');

        setIsMobile(window.innerWidth < 768);

        // Initial state - cards invisible and slightly down
        gsap.set(cards, {
            opacity: 0,
            y: 30,
            scale: 0.95
        });

        // Stagger animation for cards entrance
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
        });

        // Hover animations for each card
        cards.forEach((card) => {
            const image = card.querySelector('.card-image');
            const content = card.querySelector('.card-content');
            const buttons = card.querySelectorAll('.action-btn');

            // Card hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // Subtle content lift
                gsap.to(content, {
                    y: -4,
                    duration: 0.4,
                    ease: "power2.out"
                });


            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });

                gsap.to(content, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });


            });

            // Individual button hover effects
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });

                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });
            });
        });

    }, { scope: containerRef });

    const handleClick = () => {
        router.push("packages/1");
    }

    return (
        <div className='section'>
            <div ref={containerRef} className="md:grid flex flex-col grid-cols-3 gap-8 md:gap-6" onClick={handleClick}>
                {travelPackages.map((pkg, idx) => (
                    <div
                        key={idx}
                        className="package-card flex flex-col items-center w-full h-fit rounded-xl shadow-xl overflow-hidden cursor-pointer"
                    >
                        {/* Image */}
                        <div className="relative w-full overflow-hidden">
                            <Image
                                src={pkg.img}
                                alt={`${pkg.country} package`}
                                className="card-image aspect-[4/3] w-full object-cover transition-transform duration-300"
                                width={500}
                                height={300}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                            {/* bg-[var(--highlight)]/50 */}
                            <div className="absolute top-4 left-4 bg-[var(--highlight)]  backdrop-blur-sm text-white py-2 rounded-full px-5">
                                <p className="text-xs text-white" style={{ fontSize: isMobile ? "12px" : "12px" }}>Starting from</p>
                                <h3 className="text-lg font-bold leading-none" style={{ fontSize: isMobile ? "28px" : "" }}>₹{pkg.price}</h3>
                            </div>
                            <div className="meta-icons absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/20 shadow-lg flex gap-5 items-center justify-center py-2 px-6">
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={flightsvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light' style={{ fontSize: isMobile ? "8px" : "12px" }}>FLIGHT</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={carsvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light' style={{ fontSize: isMobile ? "8px" : "12px" }}>RIDES</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={mountainssvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light' style={{ fontSize: isMobile ? "8px" : "12px" }}>SIGHTS</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={mealssvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light' style={{ fontSize: isMobile ? "8px" : "12px" }}>FOOD</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={hotelsvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light' style={{ fontSize: isMobile ? "8px" : "12px" }}>HOTEL</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <Image
                                        src={sunnysvg}
                                        alt='car icon'
                                        className='w-6 h-6 md:w-8 md:h-8 invert'
                                    />
                                    <p className='text-white font-light whitespace-nowrap' style={{ fontSize: isMobile ? "8px" : "12px" }}>{pkg.duration}</p>
                                </div>
                            </div>
                        </div>
                        {/* Info */}
                        <div className="card-content w-full flex flex-col items-start px-4">
                            <div className='flex justify-between w-full items-center mt-10 mb-5'>
                                <h3 className="flex gap-2 items-center text-3xl font-medium  transition-colors duration-300 hover:text-blue-600">
                                    <MapPin className="transition-transform duration-300 hover:scale-110" />
                                    {pkg.country}
                                </h3>
                                <Ratings classes='flex-col justify-center' />
                            </div>
                            <hr className="mb-5 w-full bg-black/20 transition-all duration-300" />
                            {/* Description */}
                            <p className='font-light transition-colors duration-300 hover:text-gray-700'>{pkg.description}</p>
                            <hr className="my-5 w-full bg-black/20 transition-all duration-300" />
                            {/* Actions */}
                            <div className="mb-5 flex justify-between w-full gap-2 flex-wrap">
                                <div className="flex gap-5 md:gap-2 lg:gap-2">
                                    <button
                                        className="action-btn cursor-pointer p-3 bg-transparent backdrop-blur-sm rounded-lg
                                            hover:bg-black/20 transition-all duration-300 border border-[#d3d3d3]
                                            hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <MessageCircle size={20} color="black" className="transition-colors duration-300 hover:text-blue-600" />
                                    </button>
                                    <button
                                        className="action-btn cursor-pointer p-3 bg-transparent backdrop-blur-sm rounded-lg
                                            hover:bg-black/20 transition-all duration-300 border border-[#d3d3d3]
                                            hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <PhoneCall size={20} color="black" className="transition-colors duration-300 hover:text-green-600" />
                                    </button>
                                </div>
                                <div className=''>
                                    <CTAButton1
                                        label="Book Now"
                                        textColor="#0a0a0a"
                                        bgColor="bg-black/10"
                                        borderColor="border-black/10"
                                        disableScale={true}
                                        route={"/packages"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className='w-max mx-auto mt-14'>
                <CTAButton1
                    label="View All"
                    textColor="#0a0a0a"
                    bgColor="bg-black/10"
                    borderColor="border-black/10 shadow-2xl"
                    route="/about-us"
                />
            </div>
        </div>
    );
};

export default PackageCard;