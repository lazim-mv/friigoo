"use client"

import Image from 'next/image'
import React, { useRef } from 'react'
import CTAButton from './common/CTAButton'

import siteseeing from '../../../public/about/siteseeing.webp'
import relax from '../../../public/about/relax.webp'
import adv from '../../../public/about/adv.webp'

import Lottie from "lottie-react";
import lottie1 from "../../../public/about/lotiie1.json";
import { useGSAP } from '@gsap/react'
import gsap from '../utils/gsapInit'

const About = ({ btn = true, heading, desc1, desc2, smallCards = false }) => {
    const containerRef = useRef()
    const mapRef = useRef()
    const textRef = useRef()
    const cardsRef = useRef()

    useGSAP(() => {
        // Set initial states
        gsap.set([mapRef.current, textRef.current], {
            opacity: 0,
            y: 60
        })

        gsap.set(".card-item", {
            opacity: 0,
            y: 80,
            scale: 0.9
        })

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })

        // Animate map with elegant entrance
        tl.to(mapRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        })

        // Animate text content with stagger
        tl.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.6")

        // Animate cards with premium stagger effect
        tl.to(".card-item", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
                amount: 0.6,
                ease: "power2.out"
            },
            ease: "back.out(1.7)"
        }, "-=0.4")

        // Continuous floating animation for map
        // gsap.to(mapRef.current, {
        //     y: -10,
        //     duration: 3,
        //     ease: "power2.inOut",
        //     yoyo: true,
        //     repeat: -1,
        //     delay: 1.5
        // })

        // Hover animations for cards
        const cards = document.querySelectorAll('.card-item')
        cards.forEach(card => {
            const image = card.querySelector('.card-image')
            const title = card.querySelector('.card-title')

            // Set initial transforms
            gsap.set(image, { scale: 1 })
            gsap.set(title, { y: 0 })

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                })
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out"
                })
                gsap.to(title, {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                })
                gsap.to(image, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                })
                gsap.to(title, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                })
            })
        })

        // Parallax effect for the entire section
        gsap.to(containerRef.current, {
            // yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        })

        // Text reveal animation with split text effect
        const heading = textRef.current?.querySelector('h2')
        const paragraph = textRef.current?.querySelector('p')

        if (heading) {
            gsap.set(heading, { opacity: 0 })
            gsap.to(heading, {
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            })
        }

        if (paragraph) {
            gsap.set(paragraph, { opacity: 0, y: 20 })
            gsap.to(paragraph, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: paragraph,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            })
        }

    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="section overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0">
                {/* Map */}
                <div ref={mapRef} className="w-full lg:w-[45%]">
                    {/* <Image src={map} alt="world map" className="w-full h-auto" /> */}
                    <Lottie animationData={lottie1} loop />
                </div>

                {/* Text */}
                <div ref={textRef} className="flex flex-col items-start justify-center h-full w-full lg:w-[45%]">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 leading-tight drop-shadow-lg">
                        Magical Memories,<br />Bespoke Experiences
                    </h2>
                    <p className="w-full md:w-[90%] text-base md:text-[16px] font-light paragraph-style  leading-relaxed">
                        {desc1
                            ? desc1
                            : "At Friigoo, we believe travel is more than moving from one place to another it's about creating stories you'll tell for a lifetime. From hidden corners of the world to iconic landmarks, we craft every journey to match your unique style."
                        }
                    </p>
                    <br /><br />
                    <p className="w-full md:w-[90%] text-base md:text-[16px] font-light paragraph-style mb-6 md:mb-8 leading-relaxed">
                        {desc2
                            ? desc2
                            : "Whether you crave the thrill of adventure, the charm of cultural discoveries, or the serenity of a beachside escape, our team ensures every detail is seamless so you can focus on what truly matters—making memories."
                        }
                    </p>

                    {btn &&
                        <div className='w-max'>
                            <CTAButton
                                label="Know More"
                                textColor="#0a0a0a"
                                bgColor="bg-black/10"
                                borderColor="border-black/10"
                                route="/about-us"
                            />
                        </div>
                    }
                </div>
            </div>

            {/* Cards */}
            {smallCards && <div ref={cardsRef} className="pt-12 md:pt-14 lg:pt-16 hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    {
                        title: "Hidden Wonders",
                        img: siteseeing,
                        alt: "guided exploration tours",
                        svgAlt: "exploration icon",
                        bg: "bg-black/5"
                    },
                    {
                        title: "Epic Adventures",
                        img: adv,
                        alt: "adventure holiday packages",
                        svgAlt: "adventure icon",
                        bg: "bg-black/10"
                    },
                    {
                        title: "Unwind in Paradise",
                        img: relax,
                        alt: "luxury relaxation getaways",
                        svgAlt: "relaxation icon",
                        bg: "bg-black/10"
                    }
                ].map((card, index) => (
                    <div
                        key={index}
                        className={`card-item z-20 ${card.bg} backdrop-blur-sm rounded-lg overflow-hidden border border-black/10 shadow-xl shadow-gray-600/50 border-b-0 transition-shadow duration-300 hover:shadow-2xl hover:shadow-gray-600/60`}
                    >
                        <div className="relative">
                            <Image
                                src={card.img}
                                height={120}
                                alt={card.alt}
                                className="card-image w-full object-cover h-[120px] sm:h-[180px] md:h-[120px] lg:h-[120px] transition-transform duration-500"
                                style={{ filter: "brightness(0.6)" }}
                            />
                            <h3 className="card-title absolute top-8 text-white 
                             text-center py-3 z-10
                             w-full font-medium transition-transform duration-300"
                            >
                                {card.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default About