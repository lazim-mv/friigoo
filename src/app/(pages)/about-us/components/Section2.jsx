"use client"
import React, { useRef } from 'react'
import { Heart, Users, Star, Rocket, Globe2, Shield } from "lucide-react";
import { useGSAP } from '@gsap/react';
import gsap from '@/app/utils/gsapInit';

export const aboutFriigoo = [
    {
        icon: Heart,
        title: "Our Mission",
        desc: "To make every journey unforgettable by offering personalized travel experiences that inspire and delight.",
    },
    {
        icon: Users,
        title: "Our Team",
        desc: "A passionate team of travel enthusiasts, planners, and experts dedicated to creating seamless adventures for our travelers.",
    },
    {
        icon: Star,
        title: "Our Values",
        desc: "Integrity, transparency, and excellence guide everything we do, ensuring travelers have a memorable and trustworthy experience.",
    },
    {
        icon: Rocket,
        title: "Innovation in Travel",
        desc: "We constantly leverage technology to simplify bookings, enhance travel experiences, and bring new adventures closer to you.",
    },
    {
        icon: Globe2,
        title: "Global Reach",
        desc: "From hidden gems to world-famous destinations, we connect travelers to experiences across the globe with ease.",
    },
    {
        icon: Shield,
        title: "Traveler Safety",
        desc: "Your peace of mind matters. We provide reliable support, guidance, and safety measures for worry-free journeys.",
    },
];

const Section2 = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate title with elegant fade and slide
        tl.fromTo(titleRef.current,
            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );

        // Animate cards with staggered entrance
        const cards = cardsRef.current.children;
        tl.fromTo(cards,
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            },
            "-=0.6" // Start cards animation before title finishes
        );

        // Add subtle floating animation for icons
        gsap.to(".floating-icon", {
            y: -5,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: {
                each: 0.3,
                from: "random"
            }
        });

        // Add a subtle parallax effect to the entire section
        gsap.to(sectionRef.current, {
            y: -20,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="section py-16 bg-white">
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight"
            >
                The Spirit of Friigoo
            </h2>

            <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                {aboutFriigoo.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="card p-6 rounded-lg border border-[#d3d3d3] backdrop-blur-sm"
                        >
                            <Icon
                                className="floating-icon w-12 h-12 mb-4 mx-auto text-black"
                                strokeWidth={1}
                            />
                            <h3 className="mb-2 text-center font-medium">
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

export default Section2;