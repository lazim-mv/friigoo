"use client"
import React, { useRef } from 'react'
import { Globe2, MapPin, Wallet, Clock, Users, Plane } from 'lucide-react'
import { useGSAP } from '@gsap/react';
import gsap from '@/app/utils/gsapInit';

// Content data
export const whyFriigoo = [
    {
        icon: Globe2,
        title: "Global Destinations",
        desc: "Discover stunning destinations worldwide with packages tailored just for you.",
    },
    {
        icon: MapPin,
        title: "Handpicked Experiences",
        desc: "Adventure, culture, and relaxation enjoy trips crafted to make memories last.",
    },
    {
        icon: Wallet,
        title: "Affordable Packages",
        desc: "Get unbeatable value for money with clear pricing and absolutely no hidden fees.",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        desc: "Travel stress free with round the clock assistance whenever you need a hand.",
    },
    {
        icon: Users,
        title: "Trusted by Travelers",
        desc: "Thousands of happy travelers choose Friigoo to make every journey unforgettable.",
    },
    {
        icon: Plane,
        title: "Seamless Bookings",
        desc: "Book flights, stays, and activities in one smooth, simple, and stress free place.",
    },
];

const Section3 = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const cardsRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate header section with split animation
        tl.fromTo(titleRef.current,
            {
                opacity: 0,
                x: -60,
                scale: 0.95
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            }
        )
            .fromTo(descRef.current,
                {
                    opacity: 0,
                    x: 60,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out"
                },
                "-=0.7" // Overlap with title animation
            );

        // Animate cards with wave-like entrance
        const cards = cardsRef.current.children;
        tl.fromTo(cards,
            {
                opacity: 0,
                y: 60,
                rotationX: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.9,
                stagger: {
                    each: 0.12,
                    from: "start"
                },
                ease: "back.out(1.2)"
            },
            "-=0.4" // Start before header finishes
        );

        // Add subtle breathing animation for icons
        gsap.to(".breathing-icon", {
            scale: 1.1,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
                each: 0.5,
                from: "random"
            }
        });

        // Add continuous rotation for specific icons
        gsap.to(".rotating-icon", {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1
        });

        // Subtle parallax for the entire section
        gsap.to(sectionRef.current, {
            y: -30,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="section py-16 bg-white overflow-hidden">
            <div ref={headerRef} className="mb-6 md:mb-8 lg:mb-10 text-start flex flex-col md:flex-row items-center md:items-start justify-between">
                <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-6xl leading-tight drop-shadow-lg mb-6 md:mb-0">
                    Why Choose Friigoo?
                </h2>
                <p ref={descRef} className="w-full md:w-[42%] font-light text-center md:text-left md:text-lg leading-relaxed">
                    At Friigoo, we believe travel should be seamless, inspiring, and
                    unforgettable. From personalized packages and handpicked experiences
                    to transparent pricing and 24/7 support, we go the extra mile to make
                    your journey stress free and truly memorable.
                </p>
            </div>

            <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4">
                {whyFriigoo.map((item, i) => {
                    const Icon = item.icon;
                    // Add special classes for specific icons
                    const iconClasses = [
                        "breathing-icon rotating-icon", // Globe2 - both effects
                        "breathing-icon", // MapPin
                        "breathing-icon", // Wallet
                        "breathing-icon rotating-icon", // Clock - both effects
                        "breathing-icon", // Users
                        "breathing-icon" // Plane
                    ];

                    return (
                        <div
                            key={i}
                            className="card-item p-6 rounded-lg border border-black/20 backdrop-blur-sm"
                        >
                            <Icon
                                className={`w-12 h-12 mb-4 mx-auto text-black ${iconClasses[i]}`}
                                strokeWidth={1}
                            />
                            <h3 className="mb-2 text-center">
                                {item.title}
                            </h3>
                            <p className="text-center font-light">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Section3;