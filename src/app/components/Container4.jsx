"use client"
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import img1 from '../../../public/container4/1.webp'
import img2 from '../../../public/container4/2.webp'
import img3 from '../../../public/container4/3.webp'
import img4 from '../../../public/container4/4.webp'
import img5 from '../../../public/container4/5.webp'
import img6 from '../../../public/container4/6.webp'
import img7 from '../../../public/container4/7.webp'
import { useGSAP } from '@gsap/react';
import gsap from '../utils/gsapInit';
// import { MaterialYouSlider } from './common/ExpoStyleSlider';
import ExpoStyleSlider from './common/ExpoStyleSlider';

export const countries = [
    {
        name: "Thailand",
        img: img1,
    },
    {
        name: "Italy",
        img: img2,
    },
    {
        name: "Japan",
        img: img3,
    },
    {
        name: "Australia",
        img: img4,
    },
    {
        name: "Greece",
        img: img5,
    },
    {
        name: "Brazil",
        img: img6,
    },
    {
        name: "Canada",
        img: img7,
    },
];

const Container4 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerView, setItemsPerView] = useState(3);
    const [isMobile, setIsMobile] = useState(false);

    // Drag/swipe state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    useEffect(() => {
        const updateItemsPerView = () => {
            const isMobileView = window.innerWidth < 768;
            setItemsPerView(isMobileView ? 1 : 3);
            setIsMobile(isMobileView);
        };

        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);

    const maxIndex = Math.max(0, countries.length - itemsPerView);

    const containerRef = useRef(null);
    const carouselRef = useRef(null);
    const cardsRef = useRef([]);
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonsRef = useRef([]);
    const dotsRef = useRef([]);
    const autoPlayRef = useRef(null);










    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Initial page load animations
        tl.fromTo(titleRef.current,
            {
                opacity: 0,
                y: 60,
                rotationX: -15
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out"
            }
        )
            .fromTo(paragraphRef.current,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                },
                "-=0.6"
            )
            .fromTo(buttonsRef.current,
                {
                    opacity: 0,
                    x: -30,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.1
                },
                "-=0.4"
            );

        // Animate cards in
        gsap.fromTo(cardsRef.current,
            {
                opacity: 0,
                y: 80,
                scale: 0.9,
                rotationY: -15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15,
                delay: 0.3
            }
        );

        // Animate dots
        gsap.fromTo(dotsRef.current,
            {
                opacity: 0,
                scale: 0
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.05,
                delay: 1
            }
        );

    }, []);

    // Animation when index changes (only if not dragging)
    useGSAP(() => {
        if (carouselRef.current && !isDragging) {
            gsap.to(carouselRef.current, {
                x: `-${currentIndex * (isMobile ? 100 : 90 / itemsPerView + 2)}%`,
                duration: 0.8,
                ease: "power2.inOut"
            });

            // Subtle scale animation on visible cards
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
                    gsap.to(card, {
                        scale: isVisible ? 1 : 0.95,
                        opacity: isVisible ? 1 : 0.7,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
    }, [currentIndex, isDragging]);

    return (
        <div
            ref={containerRef}
            className='
                    px-[30px] py-[80px] md:py-[96px] my-[40px] md:my-[96px`]
                    [@media(min-width:1034px)]:px-[70px]
                    [@media(min-width:1401px)]:px-[140px]
            
             bg-[#f3f2ee]'
        >
            {/* <div
                className='flex flex-col md:flex-row justify-around
                            px-[30px]
                            [@media(min-width:1034px)]:pr-[70px]
                            [@media(min-width:1401px)]:pr-[140px]'
            > */}
            <div
                className='flex flex-col md:flex-row justify-around
                            '
            >
                <h2
                    ref={titleRef}
                    className='text-6xl mb-6 md:mb-8 lg:mb-10 w-full md:w-[40%] drop-shadow-lg'
                >
                    Discover Our Top Destinations
                </h2>
                <p
                    ref={paragraphRef}
                    className='w-full md:w-[40%] text-[17px] font-light paragraph-style mb-0 md:mb-8 lg:mb-10'
                >
                    From sun soaked beaches and crystal clear waters to vibrant cityscapes bursting with life,
                    Friigoo brings you handpicked travel experiences across the world's most stunning countries.
                    Wander through ancient streets steeped in history, savor flavors that tell the story of a region,
                    and witness landscapes that take your breath away from snow-capped mountains to lush tropical rainforests.
                    Whether you're seeking adventure, relaxation, or cultural immersion,
                    our curated packages are designed to create moments you'll cherish forever.
                </p>
            </div>
            <div className='pt-8 md:pt-16 flex gap-8 md:gap-16 flex-col md:flex-row pr-[30px] md:pr-0'>
                {/* <div className='flex flex-row md:flex-col gap-4 order-1 md:order-0 justify-center md:justify-start'>
                    <button
                        ref={el => buttonsRef.current[0] = el}
                        onClick={handlePrev}
                        className='hover:opacity-70 transition-all cursor-pointer transform hover:scale-95 active:scale-90'
                        disabled={currentIndex === 0}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 0.95,
                                rotation: -5,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                rotation: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                    >
                        <CircleChevronLeftIcon
                            strokeWidth={0.5}
                            color="#99a1af"
                            className={`
                                  w-[50px] h-[50px] md:w-[70px] md:h-[70px]
                                  ${currentIndex === 0 ? 'opacity-40' : ''}
                                `}
                        />
                    </button>
                    <button
                        ref={el => buttonsRef.current[1] = el}
                        onClick={handleNext}
                        className='hover:opacity-70 transition-all cursor-pointer transform hover:scale-95 active:scale-90'
                        disabled={currentIndex === maxIndex}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 0.95,
                                rotation: 5,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1,
                                rotation: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                    >
                        <CircleChevronRightIcon
                            strokeWidth={.5}
                            color="#99a1af"
                            className={`
                                  w-[50px] h-[50px] md:w-[70px] md:h-[70px]
                                  ${currentIndex === maxIndex ? 'opacity-40' : ''}
                                `}
                        />
                    </button>
                </div> */}
                {/* <MaterialYouSlider
                    countries={countries}
                /> */}
                <ExpoStyleSlider
                    countries={countries}
                />
            </div>

            {/* Dots indicator with premium animations */}
            {/* <div className='hidden md:flex justify-center mt-8 gap-2'>
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        ref={el => dotsRef.current[index] = el}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                        onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: 1.4,
                                duration: 0.3,
                                ease: "back.out(1.7)"
                            });
                        }}
                        onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, {
                                scale: index === currentIndex ? 1.1 : 1,
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }}
                    />
                ))}
            </div> */}
        </div>
    )
}

export default Container4