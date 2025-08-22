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
import CTAButton from "@/app/components/common/CTAButton";

import carsvg from '../../../../../public/icons/car.svg';
import hotelsvg from '../../../../../public/icons/hotel.svg';
import mealssvg from '../../../../../public/icons/meals.svg';
import flightsvg from '../../../../../public/icons/flight.svg';
import mountainssvg from '../../../../../public/icons/mountains.svg';
import sunnysvg from '../../../../../public/icons/sunny.svg';
import { HighlightsBlock } from "./HighlightsBlock";

const ItenarySwiperSlider2 = ({ pkgs }) => {
    if (!pkgs || pkgs.length === 0) return null;

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

    // Optimized progress indicator click handler
    const handleProgressClick = useCallback((index) => {
        if (swiperRef.current && !isTransitioning) {
            swiperRef.current.slideTo(index);
        }
    }, [isTransitioning]);

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
                {pkgs.map((pkg, index) => (
                    <SwiperSlide key={`${pkg.title}-${index}`}>
                        <div className="relative flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="relative w-full md:w-3/5 h-[300px] md:h-auto overflow-hidden">
                                <Image
                                    src={pkg.img}
                                    alt={pkg.title || "Package image"}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105 will-change-transform"
                                    quality={85} // Reduced for better performance
                                    unoptimized
                                    priority={index < 2} // Only prioritize first 2 slides
                                    draggable={false}
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent" />

                                {/* Optimized meta icons */}
                                <div className="meta-icons absolute bottom-6 left-6 flex flex-wrap gap-2 max-w-[280px]">
                                    {metaIcons.map((meta, idx) => (
                                        <div
                                            key={idx}
                                            className={`${meta.hidden || ''} flex gap-2 justify-center items-center bg-black/50 rounded-full shadow-lg py-2 px-6 transform-gpu`}
                                            data-swiper-parallax={meta.parallax}
                                        >
                                            <Image
                                                src={meta.icon}
                                                className="w-6 h-6 md:w-7 md:h-7 invert"
                                                alt={`${meta.text} icon`}
                                            />
                                            <p className={`text-white font-light ${meta.whitespace || ''}`}>
                                                {pkg[meta.text] || meta.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                                {/* Background pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full blur-3xl" />
                                </div>

                                <div
                                    className="relative z-10 transform-gpu"
                                    data-swiper-parallax="-200"
                                >
                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                                        {pkg.title}
                                    </h2>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 font-medium">4.8 (127 reviews)</span>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4 mb-8">
                                        {pkg.content.map((block, idx) =>
                                            block.type === "description" ? (
                                                block.items.map((desc, dIdx) => (
                                                    <p
                                                        key={`${idx}-${dIdx}`}
                                                        className="text-gray-600 leading-relaxed font-light text-lg"
                                                    >
                                                        {desc}
                                                    </p>
                                                ))
                                            ) : (
                                                <HighlightsBlock key={idx} block={block} idx={idx} swiper={swiper} />
                                            )
                                        )}
                                    </div>

                                    <div className='cta-container w-max relative overflow-hidden md:pb-2'>
                                        <CTAButton
                                            label="Chat with us"
                                            textColor="#0a0a0a"
                                            bgColor="bg-black/10"
                                            borderColor="border-black/10"
                                            route="/about-us"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation buttons - enhanced for mobile */}
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

            {/* Package counter */}
            <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                    Day {activeIndex + 1} / {pkgs.length}
                </span>
            </div>
        </div>
    );
};

export default ItenarySwiperSlider2;