"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import CTAButton1 from "@/app/components/common/CTAButton1";

import carsvg from '../../../../../public/icons/car.svg';
import hotelsvg from '../../../../../public/icons/hotel.svg';
import mealssvg from '../../../../../public/icons/meals.svg';
import flightsvg from '../../../../../public/icons/flight.svg';
import mountainssvg from '../../../../../public/icons/mountains.svg';
import sunnysvg from '../../../../../public/icons/sunny.svg';
import { HighlightsBlock } from "./HighlightsBlock";
import Ratings from "@/app/components/common/Ratings";

const ItenarySwiperSlider2 = ({ pkgs }) => {
    if (!Array.isArray(pkgs) || pkgs.length === 0) return null;

    const validPkgs = pkgs.filter(
        (pkg) => pkg && typeof pkg.title === "string" && pkg.title.trim() !== ""
    );

    if (validPkgs.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-lg text-gray-500">Sry No Data Found</h2>
            </div>
        )
    }

    const swiperRef = useRef(null);
    const swiperSliderContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [swiper, setSwiper] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Memoize observer to prevent recreation
    const observerCallback = useCallback((entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }, []);

    useEffect(() => {
        if (!swiperSliderContainerRef.current) return;

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px' // Better threshold for mobile
        });

        observer.observe(swiperSliderContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [observerCallback]);

    // Optimized slide change handler
    const handleSlideChange = useCallback((swiper) => {
        setActiveIndex(swiper.realIndex);
        setIsTransitioning(false);
    }, []);

    // Optimized slide transition start
    const handleSlideTransitionStart = useCallback(() => {
        setIsTransitioning(true);
    }, []);

    // Optimized swiper initialization
    const handleSwiperInit = useCallback((swiperInstance) => {
        swiperRef.current = swiperInstance;
        setSwiper(swiperInstance);
    }, []);

    // Memoized swiper configuration
    const swiperConfig = useMemo(() => ({
        modules: [Pagination, EffectFade, Parallax, Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        loop: true,
        parallax: true,
        effect: "fade",
        autoHeight: true,
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            prevEl: ".custom-prev",
            nextEl: ".custom-next"
        },
        // Enhanced touch settings for mobile
        touchRatio: 1.2,
        touchAngle: 45,
        grabCursor: true,
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        // Better resistance for smoother feel
        resistance: true,
        resistanceRatio: 0.6,
        // Optimized for performance
        watchSlidesProgress: false,
        // Better mobile scrolling
        freeMode: false
    }), []);


    // Memoized meta icons data
    const metaIcons = useMemo(() => [
        { icon: carsvg, text: 'transport', parallax: -300 },
        { icon: mealssvg, text: 'meals', parallax: -250 },
        { icon: sunnysvg, text: '12 Days', parallax: -200, whitespace: 'whitespace-nowrap' },
        { icon: hotelsvg, text: 'HOTEL', parallax: -150, hidden: 'hidden md:flex' },
        { icon: mountainssvg, text: 'SIGHTS', parallax: -100, hidden: 'hidden md:flex' },
        { icon: flightsvg, text: 'FLIGHT', parallax: -80, hidden: 'hidden md:flex' }
    ], []);

    return (
        <div ref={swiperSliderContainerRef} className="relative w-full mx-auto select-none">
            <Swiper
                {...swiperConfig}
                className="rounded-xl border-b border-black/20 overflow-hidden bg-white transform-gpu"
                onSwiper={handleSwiperInit}
                onSlideChange={handleSlideChange}
                onSlideTransitionStart={handleSlideTransitionStart}
            >
                {validPkgs.map((pkg, index) => (
                    <SwiperSlide key={`${pkg.title}-${index}`}>
                        <div className="relative flex flex-col md:flex-row">
                            {/* ✅ Image Section */}
                            {pkg.img ? (
                                <div className="relative w-full md:w-3/5 h-[300px] md:h-auto overflow-hidden"
                                >
                                    <Image
                                        src={pkg.img}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105 will-change-transform"
                                        quality={85}
                                        unoptimized
                                        priority={index < 2}
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent" />
                                </div>
                            ) : (
                                <div className="w-full md:w-3/5 h-[300px] bg-gray-200 flex items-center justify-center">
                                    <h2 className='flex items-center justify-center text-center h-full'>No Image Available</h2>
                                </div>
                            )}

                            {/* ✅ Content Section */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden" >
                                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                                    {pkg.title}
                                </h2>

                                {/* Rating only for first slide */}
                                {index === 0 && <Ratings classes="mb-6" />}

                                {/* ✅ Safe content check */}
                                <div className="space-y-4 mb-8" >
                                    {Array.isArray(pkg.content) && pkg.content.length > 0 ? (
                                        pkg.content.map((block, idx) =>
                                            block.type === "description" ? (
                                                block.items?.map((desc, dIdx) => (
                                                    <p
                                                        key={`${idx}-${dIdx}`}
                                                        className="text-gray-600 leading-relaxed font-light text-lg"
                                                    >
                                                        {desc}
                                                    </p>
                                                ))
                                            ) : (
                                                <HighlightsBlock
                                                    key={idx}
                                                    block={block}
                                                    idx={idx}
                                                    swiper={swiper}
                                                />
                                            )
                                        )
                                    ) : (
                                        <p className="text-gray-400 italic">No details available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Navigation buttons - enhanced for mobile */}
            {validPkgs && validPkgs.length > 1 && (
                <>
                    <button
                        className={`custom-prev fixed md:absolute left-2 md:left-[-5%] top-1/2 -translate-y-1/2 z-20
        w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full
        flex items-center justify-center shadow-lg border border-gray-200
        hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 transform-gpu
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${isTransitioning ? "pointer-events-none opacity-60" : ""}`}
                        disabled={isTransitioning}
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <button
                        className={`custom-next fixed md:absolute right-2 md:right-[-5%] top-1/2 -translate-y-1/2 z-20
        w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full
        flex items-center justify-center shadow-lg border border-gray-200
        hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 transform-gpu
        focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${isTransitioning ? "pointer-events-none opacity-60" : ""}`}
                        disabled={isTransitioning}
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </>
            )}


            {/* Package counter */}
            <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                    Day {activeIndex + 1} / {validPkgs.length}
                </span>
            </div>
        </div>
    );
};

export default ItenarySwiperSlider2;