"use client"
import React from 'react'
import { Heart, Users, Star, Rocket, Globe2, Shield } from "lucide-react"; // example icons
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

    useGSAP(() => {
        // gsap
    })
    return (
        <div className="section py-16 bg-white">
            <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight">
                The Spirit of Friigoo
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3  mx-auto ">
                {aboutFriigoo.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="p-6 rounded-lg border border-black/20 "
                        >
                            <Icon className="w-12 h-12 mb-4 mx-auto text-black"  strokeWidth={1} />
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
