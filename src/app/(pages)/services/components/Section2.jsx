"use client"
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import img1 from '../../../../../public/service-page/5.webp'
import img2 from '../../../../../public/service-page/4.webp'
import img3 from '../../../../../public/service-page/2.webp'


import CTAButton1 from '@/app/components/common/CTAButton1'
import { CheckCircleIcon } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from "@/app/utils/gsapInit";

const Section2 = ({ btn = true }) => {
    const containerRef = useRef(null)
    const img1Ref = useRef(null);
    const contentRef = useRef(null);
    const checkItemsRef = useRef([]);


    const servicePoints = [
        "Connect with Nature",
        "Experience New Cultures",
        "Discover Hidden Gems",
        "Travel Without Hassle",
        "Make Memories That Last"
    ]

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play none none reverse"
            }
        })

        // Image animations with subtle parallax effect
        tl.fromTo(img1Ref.current,
            {
                // scale: 1.1,
                opacity: 0,
                rotationY: -5
            },
            {
                scale: 1,
                opacity: 1,
                rotationY: 0,
                duration: 1.4,
                ease: "power3.out"
            }
        )
            // Content animations with staggered reveals
            .fromTo(".content-title",
                {
                    y: 60,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1"
            )
            .fromTo(".content-description",
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.8"
            )

        // Staggered check items animation
        checkItemsRef.current.forEach((item, index) => {
            if (item) {
                tl.fromTo(item,
                    {
                        x: -30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `-=${0.9 - (index * 0.1)}`
                )
            }
        })

        // CTA Button animation
        tl.fromTo(".cta-container",
            {
                y: 30,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.4"
        )

        // Continuous subtle animations
        gsap.to(img1Ref.current, {
            y: -10,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        })

    }, { dependencies: [], scope: containerRef })

    // Interactive hover effects
    const handleImageHover = (imageRef, isHover) => {
        gsap.to(imageRef.current, {
            scale: isHover ? 1.05 : 1,
            rotationY: isHover ? 2 : 0,
            duration: 0.8,
            ease: "power2.out"
        })
    }

    const handleCheckItemHover = (index, isHover) => {
        const item = checkItemsRef.current[index]
        if (item) {
            gsap.to(item, {
                x: isHover ? 10 : 0,
                duration: 0.4,
                ease: "power2.out"
            })

            const icon = item.querySelector('.check-icon')
            if (icon) {
                gsap.to(icon, {
                    scale: isHover ? 1.2 : 1,
                    rotationZ: isHover ? 360 : 0,
                    duration: 0.5,
                    ease: "back.out(2)"
                })
            }
        }
    }

    return (
        <div
            ref={containerRef}
            className="section flex flex-col md:flex-row justify-between gap-8 md:gap-20 overflow-hidden items-stretch">

            {/* Image Section with Enhanced Styling */}
            <div className="relative grid grid-cols-3  h-auto w-full md:w-[50%] gap-3">
                <div
                    className="relative w-full h-[400px] md:h-full rounded-lg overflow-hidden"
                >
                    <Image
                        // ref={img1Ref}
                        src={img1}
                        alt="Northern Lights"
                        fill
                        className="object-cover w-full h-full transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div
                    className="relative w-full h-[400px] md:h-full rounded-lg overflow-hidden"
                >
                    <Image
                        // ref={img1Ref}
                        src={img2}
                        alt="Northern Lights"
                        fill
                        className="object-cover w-full h-full transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div
                    className="relative w-full h-[400px] md:h-full rounded-lg overflow-hidden"
                >
                    <Image
                        // ref={img1Ref}
                        src={img3}
                        alt="Northern Lights"
                        fill
                        className="object-cover w-full h-full transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>

            {/* Content Section */}
            <div ref={contentRef} className='flex flex-col w-full md:w-[50%]'>
                <h2 className='content-title text-6xl mb-6 md:mb-8 lg:mb-10 w-full md:w-[80%] drop-shadow-lg'>
                    Your Journey, <br />
                    <span className='relative'>
                        Perfectly Planned

                    </span>
                </h2>

                <p className='content-description  text-[17px] font-light mb-6 md:mb-8 lg:mb-10 leading-relaxed '>
                    At Friigoo, we go beyond booking trips we craft experiences.
                    Whether you're looking for an all inclusive holiday package, a custom adventure itinerary, or the perfect guided tour,
                    our team ensures every detail is taken care of. From handpicked accommodations to knowledgeable local guides,
                    we make your journey smooth, memorable, and uniquely yours.
                </p>

                <ul className='mb-6 md:mb-8 lg:mb-10  items-center gap-4 flex flex-wrap'>
                    {servicePoints.map((point, index) => (
                        <li
                            key={index}
                            ref={el => checkItemsRef.current[index] = el}
                            className='flex gap-4 items-center text-[17px] font-light leading-relaxed group'
                            onMouseEnter={() => handleCheckItemHover(index, true)}
                            onMouseLeave={() => handleCheckItemHover(index, false)}
                        >
                            <div className='check-icon relative'>
                                <CheckCircleIcon
                                    size={17}
                                    strokeWidth={1.5}
                                    className='text-green-600 group-hover:text-green-500 transition-colors duration-300'
                                />
                                <div className='absolute inset-0 bg-green-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-sm' />
                            </div>
                            <span
                                style={{ fontFamily: "var(--font-poppins)" }}
                                className='group-hover:text-gray-900 font-light text-[#09090b] transition-colors duration-300 whitespace-nowrap'>
                                {point}
                            </span>
                        </li>
                    ))}
                </ul>

               
            </div>


        </div>
    )
}

export default Section2