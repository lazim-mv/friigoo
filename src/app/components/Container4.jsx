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

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying && !isDragging) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
            }, 4000);
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, maxIndex, isDragging]);

    // Pause autoplay on hover, resume on leave
    const handleMouseEnter = () => {
        if (!isDragging) {
            setIsAutoPlaying(false);
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }
    };

    const handleMouseLeave = () => {
        if (!isDragging) {
            setIsAutoPlaying(true);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        pauseAutoplayTemporarily();
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        pauseAutoplayTemporarily();
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        pauseAutoplayTemporarily();
    };

    const pauseAutoplayTemporarily = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 2000);
    };

    // Drag/Swipe handlers
    const handleDragStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
        setCurrentX(clientX);
        setIsAutoPlaying(false);
        
        if (carouselRef.current) {
            carouselRef.current.style.transition = 'none';
        }
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;
        
        setCurrentX(clientX);
        const deltaX = clientX - startX;
        setDragOffset(deltaX);
        
        if (carouselRef.current) {
            const baseTransform = `-${currentIndex * (isMobile ? 100 : 90 / itemsPerView + 2)}%`;
            const dragPercentage = (deltaX / carouselRef.current.offsetWidth) * 100;
            carouselRef.current.style.transform = `translateX(calc(${baseTransform} + ${dragPercentage}px))`;
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        const threshold = 50; // minimum distance for swipe
        const deltaX = currentX - startX;
        
        if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentIndex > 0) {
                // Swiped right - go to previous
                setCurrentIndex(currentIndex - 1);
            } else if (deltaX < 0 && currentIndex < maxIndex) {
                // Swiped left - go to next
                setCurrentIndex(currentIndex + 1);
            }
        }
        
        setDragOffset(0);
        setStartX(0);
        setCurrentX(0);
        
        // Resume autoplay after a short delay
        setTimeout(() => setIsAutoPlaying(true), 1000);
    };

    // Mouse events
    const handleMouseDown = (e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        handleDragMove(e.clientX);
    };

    const handleMouseUp = (e) => {
        e.preventDefault();
        handleDragEnd();
    };

    // Touch events
    const handleTouchStart = (e) => {
        handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        handleDragEnd();
    };

    // Add global mouse move and up listeners
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mouseleave', handleMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('mouseleave', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

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
                    pl-[30px] py-[80px] md:py-[96px] my-[40px] md:my-[96px`]
                    [@media(min-width:1034px)]:pl-[70px]
                    [@media(min-width:1401px)]:pl-[140px]
            
             bg-[#f3f2ee]'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className='flex flex-col md:flex-row justify-around
                            pr-[30px]
                            [@media(min-width:1034px)]:pr-[70px]
                            [@media(min-width:1401px)]:pr-[140px]'
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
                <div className='flex flex-row md:flex-col gap-4 order-1 md:order-0 justify-center md:justify-start'>
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
                </div>
                <div className='flex-1 overflow-hidden'>
                    <div
                        ref={carouselRef}
                        className={`flex gap-0 md:gap-6 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}
                    >
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className='min-w-[100%] md:min-w-[31%] relative group overflow-hidden'
                                style={{
                                    pointerEvents: isDragging ? 'none' : 'auto'
                                }}
                            >
                                <Image
                                    src={country.img}
                                    alt={country.name}
                                    width={200}
                                    height={600}
                                    className='aspect-[4/4] md:aspect-[3/4] w-full object-cover rounded-xl shadow-lg'
                                    draggable={false}
                                />

                                <div className='overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl'></div>

                                <h3 className='card-title absolute text-3xl font-medium ml-5 mb-8 w-full bottom-0 text-white drop-shadow-lg z-10'>
                                    {country.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dots indicator with premium animations */}
            <div className='hidden md:flex justify-center mt-8 gap-2'>
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
            </div>
        </div>
    )
}

export default Container4