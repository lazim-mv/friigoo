"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "../../../../../public/trek/6.jpg";
import img2 from "../../../../../public/trek/2.jpg";
import img3 from "../../../../../public/trek/8.jpg";
import img4 from "../../../../../public/trek/7.jpg";
import Image from "next/image";
import Lenis from "lenis";

const Itenary = () => {
    const travelPackage = [
        {
            title: "Arrival & Transfer",
            description:
                "Your journey begins with a warm welcome in Pattaya. Arrival and check-in at the hotel followed by a visit to the iconic Big Buddha Temple. Capture stunning panoramic views at Pattaya Viewpoint, enjoy interactive experiences at Pattaya Game Gallery, and unwind with a stroll along the famous Walking Street. End the day relaxing by Pattaya Beach.",
            images: [img1, img2, img3, img4],
        },
        {
            title: "Coral Island Adventure",
            description:
                "Set out on an exciting speedboat ride to Coral Island (Koh Larn). Indulge in thrilling optional water sports and activities at your own pace. Savor a delicious Indian lunch at a local restaurant before returning to Pattaya. The evening is free for leisure and exploration.",
        },
        {
            title: "Wildlife & Culture",
            description:
                "Get up close with majestic animals at Tiger Park Pattaya with a unique walking experience. Discover the vibrant Pattaya Floating Market with its traditional charm and cultural atmosphere. Afterward, return to your hotel and enjoy free time to relax or explore on your own.",
        },
        {
            title: "Culture, Art & Shopping",
            description:
                "Experience the architectural wonder of the Sanctuary of Truth with included admission. Explore the breathtaking Nong Nooch Tropical Garden, complete with a cultural show and lunch. Continue with a fun-filled visit to Art in Paradise 3D Museum, followed by Mini Siam to see miniature landmarks from around the world. Conclude the day with shopping at Terminal 21 Pattaya before your evening airport transfer.",
        },
        {
            title: "Departure",
            description:
                "Departure services will include one van and one car considering luggage requirements (costing is based on this). All sightseeing services will be arranged with one van only.",
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
    const MaterialSlider = ({ images, title }) => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const [isTransitioning, setIsTransitioning] = useState(false);

        const nextSlide = () => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev + 1) % images.length);
            setTimeout(() => setIsTransitioning(false), 300);
        };

        const prevSlide = () => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
            setTimeout(() => setIsTransitioning(false), 300);
        };

        const goToSlide = (index) => {
            if (isTransitioning || index === currentSlide) return;
            setIsTransitioning(true);
            setCurrentSlide(index);
            setTimeout(() => setIsTransitioning(false), 300);
        };

        return (
            <div className="relative w-full h-[350px] md:h-[500px] bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl overflow-hidden shadow-xl">
                {/* Main Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                    <div
                        className="flex w-full h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {images.map((img, index) => (
                            <div key={index} className="relative flex-shrink-0 w-full h-full">
                                <Image
                                    src={img}
                                    alt={`${title} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Bottom Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    {/* Dot Indicators */}
                    <div className="flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentSlide
                                    ? 'w-8 h-3 bg-blue-500'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 border-l border-gray-300 pl-4">
                        <span className="font-semibold">{currentSlide + 1}</span>
                        <span>/</span>
                        <span>{images.length}</span>
                    </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                    <span className="text-sm font-medium text-gray-700">Gallery</span>
                </div>
            </div>
        );
    };

    return (
        <div
            className="
    px-[0px] py-[0px]          /* default mobile */
    sm:px-[0px] sm:py-[40px]    /* ≥415px */
    md:px-[30px] md:py-[0px]    /* ≥769px */
    lg:px-[70px] lg:py-[0px]    /* ≥1034px */
    2xl:px-[140px] 2xl:py-[0px] /* ≥1401px */
  "
        >
            <div className="mt-10 md:mt-0">
                <div className="md:p-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight">
                        Sample Itinerary
                    </h2>
                    <div className="flex gap-8">
                        {/* MAIN CONTENT */}
                        <div className="bg-white max-w-5xl w-full">
                            {travelPackage.map((pkg, index) => (
                                <div
                                    key={index}
                                    className="bg-white"
                                    id={`card${index + 1}`}
                                >
                                    {/* Day Header */}
                                    <div className="flex items-center justify-center mb-6 md:mb-8 cardHeader bg-[var(--highlight)] text-white h-[50px] md:h-[50px]">
                                        <p>Day {index + 1}</p>
                                    </div>
                                    {/* Title + Description */}
                                    <div className="px-10 pb-8">
                                        <h3 className="mb-6 md:mb-7 text-xl md:text-2xl font-semibold">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-[17px] font-light leading-relaxed">
                                            {pkg.description}
                                        </p>
                                        {/* Material You Slider (if images available) */}
                                        {pkg.images && (
                                            <div className="mt-[35px] mb-[85px]">
                                                <MaterialSlider
                                                    images={pkg.images}
                                                    title={pkg.title}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* SIDEBAR */}
                        <div className="sticky top-26 hidden md:flex flex-col gap-4 w-[40%] h-fit ">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itenary;