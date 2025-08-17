import React from 'react'
import { Globe2, MapPin, Wallet, Clock, Users, Plane } from 'lucide-react'

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
    return (
        <div className="section py-16 bg-white">
            <div className="mb-6 md:mb-8 lg:mb-10 text-start flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-3xl md:text-4xl lg:text-6xl leading-tight drop-shadow-lg mb-6 md:mb-0">
                    Why Choose Friigoo?
                </h2>
                <p className="w-fi=ull md:w-[42%] font-light text-center md:text-left md:text-lg leading-relaxed">
                    At Friigoo, we believe travel should be seamless, inspiring, and
                    unforgettable. From personalized packages and handpicked experiences
                    to transparent pricing and 24/7 support, we go the extra mile to make
                    your journey stress free and truly memorable.
                </p>
            </div>


            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3  mx-auto px-4">
                {whyFriigoo.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="p-6 rounded-lg border border-black/20"
                        >
                            <Icon className="w-12 h-12 mb-4 mx-auto" color='var(--highlight)' strokeWidth={1} />
                            <h3 className="mb-2 text-center">
                                {item.title}
                            </h3>
                            <p className="text-center font-light ">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Section3;
