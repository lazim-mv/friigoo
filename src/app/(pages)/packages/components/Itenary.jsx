"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "../../../../../public/trek/6.jpg";
import img2 from "../../../../../public/trek/2.jpg";
import img3 from "../../../../../public/trek/8.jpg";
import img4 from "../../../../../public/trek/7.jpg";
import img5 from "../../../../../public/trek/3.jpg";
import Image from "next/image";
import Lenis from "lenis";
import ItenaryCard1 from "./ItenaryCard1";
import ItenaryCardSlider from "./ItenaryCardSlider";
import ItenarySwiperSlider from "./ItenarySwiperSlider";

const Itenary = () => {
    const travelPackage = [
        {
            day: "Day 1",
            title: "Arrival in Pattaya",
            transport: "01 Van + 01 Car (for luggage)",
            meals: "No meals included",
            content: [
                {
                    type: "description",
                    items: [
                        "Welcome to Pattaya! Upon arrival, our team will assist you with smooth transfers to your hotel.",
                        "Enjoy your first day exploring iconic landmarks and soaking in the local culture.",
                        "Arrival & departure service will have 01 van & 01 car considering luggage (costing is based on this arrangement).",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Arrival at the hotel and check-in",
                        "Visit Big Buddha Temple",
                        "Stop at Pattaya Viewpoint for panoramic city views",
                        "Explore the Pattaya Game Gallery",
                        "Stroll along Walking Street Pattaya (optional nightlife experience)",
                        "Relax at Pattaya Beach",
                    ],
                },
            ],
            img: img1,
        },
        {
            day: "Day 2",
            title: "Coral Island Tour (Join-in SIC)",
            transport: "1 Van (SIC speedboat transfer to Coral Island)",
            meals: "Indian Lunch included",
            content: [
                {
                    type: "description",
                    items: [
                        "Experience the thrill of Pattaya’s famous Coral Island adventure.",
                        "This day is perfect for water sports lovers or those who just want to relax by the sea.",
                        "Transfers are arranged by speedboat and include a local Indian lunch.",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Transfer by speedboat to Coral Island (Koh Larn)",
                        "Enjoy optional water activities (at own cost)",
                        "Indian lunch at a local restaurant",
                        "Return to Pattaya and evening at leisure",
                    ],
                },
            ],
            img: img2,
        },
        {
            day: "Day 3",
            title: "Wildlife & Culture",
            transport: "1 Van",
            meals: "No meals included",
            content: [
                {
                    type: "description",
                    items: [
                        "A perfect mix of wildlife encounters and cultural exploration awaits you.",
                        "Spend your day meeting majestic animals and discovering the traditional Thai market atmosphere.",
                        "This is a relaxed day with plenty of free time in the evening.",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Visit Tiger Park Pattaya – walk around and interact",
                        "Explore Pattaya Floating Market (Entry only)",
                        "Return to hotel and enjoy free time",
                    ],
                },
            ],
            img: img3,
        },
        {
            day: "Day 4",
            title: "Culture, Art & Shopping",
            transport: "1 Van",
            meals: "Lunch included at Nong Nooch Tropical Garden",
            content: [
                {
                    type: "points",
                    items: [
                        "Visit Sanctuary of Truth (Admission included)",
                        "Explore Nong Nooch Tropical Garden (Admission + Cultural show + Lunch included)",
                        "Experience 3D fun at Art in Paradise",
                        "Visit Mini Siam – miniature landmarks from around the world",
                        "Shopping at Terminal 21 Pattaya",
                        "Evening airport transfer for departure",
                    ],
                },
                {
                    type: "description",
                    items: [
                        "On your last day in Pattaya, immerse yourself in culture, art, and shopping.",
                        "From majestic temples to lush gardens and interactive museums, this day has it all.",
                        "Wrap up your trip with shopping at Terminal 21 before your departure transfer.",
                    ],
                },

            ],
            img: img4,
        },
    ];





    const lenisRef = useRef(null);

    useEffect(() => {
        // Init Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        lenisRef.current = lenis;
    }, []);

    const scrollToSection = (id) => {
        const target = document.getElementById(id);
        if (target && lenisRef.current) {
            lenisRef.current.scrollTo(target, {
                offset: -20, // adjust offset for header spacing
                duration: 1.2,
            });
        }
    };

    // Material You Slider Component
    // const MaterialSlider = ({ index, pkgs, title }) => {
    //     const [currentSlide, setCurrentSlide] = useState(0);
    //     const [isTransitioning, setIsTransitioning] = useState(false);

    //     const nextSlide = () => {
    //         if (isTransitioning) return;
    //         setIsTransitioning(true);
    //         setCurrentSlide((prev) => (prev + 1) % pkgs.length);
    //         setTimeout(() => setIsTransitioning(false), 300);
    //     };

    //     const prevSlide = () => {
    //         if (isTransitioning) return;
    //         setIsTransitioning(true);
    //         setCurrentSlide((prev) => (prev - 1 + pkgs.length) % pkgs.length);
    //         setTimeout(() => setIsTransitioning(false), 300);
    //     };

    //     const goToSlide = (index) => {
    //         if (isTransitioning || index === currentSlide) return;
    //         setIsTransitioning(true);
    //         setCurrentSlide(index);
    //         setTimeout(() => setIsTransitioning(false), 300);
    //     };

    //     return (
    //         <div key={index} className="relative w-full bg-blue-900 rounded-xl overflow-hidden shadow-xl">
    //             {/* Main Image Container */}
    //             <div
    //                 className="flex w-full transition-transform duration-500 ease-out"
    //                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    //             >
    //                 {pkgs && pkgs.map((pkg, index) => (
    //                     <div key={index} className="relative min-w-full rounded-xl overflow-hidden">

    //                         {/* Image Section - Now with dynamic aspect ratio */}
    //                         <div className="relative aspect-[4/1.5] w-full">
    //                             <Image
    //                                 src={pkg.img}
    //                                 alt={`${pkg.title} ${index + 1}`}
    //                                 fill
    //                                 className="object-cover"
    //                             />
    //                             {/* Gradient overlay */}
    //                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    //                             <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
    //                                 <span className="text-sm font-medium text-gray-700">Day {index + 1}</span>
    //                             </div>
    //                         </div>

    //                         {/* Content Section - Dynamic height based on content */}
    //                         <div className="px-10 py-6 bg-yellow-800">
    //                             <h3 className="mb-4 text-xl md:text-2xl font-semibold">
    //                                 {pkg.title}
    //                             </h3>
    //                             <p className="text-[17px] font-light leading-relaxed">
    //                                 {pkg.description}
    //                             </p>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>

    //             {/* Navigation Arrows */}
    //             <button
    //                 onClick={prevSlide}
    //                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
    //             >
    //                 <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    //                 </svg>
    //             </button>

    //             <button
    //                 onClick={nextSlide}
    //                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
    //             >
    //                 <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    //                 </svg>
    //             </button>

    //             {/* Bottom Controls */}
    //             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
    //                 {/* Dot Indicators */}
    //                 <div className="flex gap-2">
    //                     {pkgs.map((_, index) => (
    //                         <button
    //                             key={index}
    //                             onClick={() => goToSlide(index)}
    //                             className={`transition-all duration-300 rounded-full ${index === currentSlide
    //                                 ? 'w-8 h-3 bg-blue-500'
    //                                 : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
    //                                 }`}
    //                         />
    //                     ))}
    //                 </div>

    //                 {/* Counter */}
    //                 <div className="flex items-center gap-2 text-sm text-gray-600 border-l border-gray-300 pl-4">
    //                     <span className="font-semibold">{currentSlide + 1}</span>
    //                     <span>/</span>
    //                     <span>{pkgs.length}</span>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div
            className="
    px-[0px] py-[0px]          /* default mobile */
    sm:px-[0px] sm:py-[40px]    /* ≥415px */
    md:px-[30px] md:py-[0px]    /* ≥769px */
    lg:px-[70px] lg:py-[0px]    /* ≥1034px */
    2xl:px-[140px] 2xl:py-[0px] /* ≥1401px */
    h-max
  "
        >
            <div className="mt-10 md:mt-0  h-max">
                <div className="md:p-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight">
                        Sample Itinerary
                    </h2>
                    <div className="flex gap-8  h-max">
                        {/* MAIN CONTENT */}
                        {/* {travelPackage.map((pkg, index) => (
                                
                            ))} */}
                        <div className="w-full h-max">
                            {/* <ItenaryCardSlider
                                pkgs={travelPackage}
                            /> */}
                            <ItenarySwiperSlider pkgs={travelPackage} />
                            {/* <ItenaryCard1
                                    key={index}
                                    index={index}
                                    title={pkg.title}
                                    description={pkg.description}
                                    images={pkg.images}
                                /> */}
                        </div>
                        {/* SIDEBAR */}
                        {/* <div className="sticky top-26 hidden md:flex flex-col gap-4 w-[40%] h-fit ">
                            {travelPackage.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToSection(`card${idx + 1}`)}
                                    className="flex items-center justify-between px-5 h-[50px] bg-[var(--highlight)] hover:bg-[var(--highlight)]/20 transition-colors"
                                >
                                    <p className="text-white">Day {idx + 1} </p>
                                    <p className="text-white">{item.title}</p>
                                </button>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itenary;