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
        <>
            <div
                ref={containerRef}
                className='
                    px-[30px] pt-[80px] md:pt-[96px] mt-[40px] md:mt-[96px`]
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
            </div>
            <div className='pt-8 pb-[100px] md:pb-[96px] mb-[40px] md:mb-[96px]  md:pt-16 flex gap-8 md:gap-16 flex-col md:flex-row pr-[0px] md:pr-0 bg-[#f3f2ee]'>
                <ExpoStyleSlider
                    countries={countries}
                />
            </div>
        </>
    )
}

export default Container4