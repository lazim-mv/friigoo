import gsap from '@/app/utils/gsapInit';
import { useGSAP } from '@gsap/react';
import { CalendarCheck, Car, CircleChevronLeftIcon, CircleChevronRightIcon, Hamburger } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState, useCallback } from 'react'
import img1 from '../../../../../public/itinary/1.svg';

const ItenaryCardSlider = ({ pkgs, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 1; // Fixed to 1 since you're using 100% width

    // Drag/swipe state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const maxIndex = Math.max(0, pkgs.length - itemsPerView);

    const containerRef = useRef(null);
    const carouselRef = useRef(null);
    const cardsRef = useRef([]);
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonsRef = useRef([]);
    const dotsRef = useRef([]);

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCurrentIndex(0); // Loop back to first
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            setCurrentIndex(maxIndex); // Loop to last
        }
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    // Memoized drag handlers to prevent unnecessary re-renders
    const handleDragStart = useCallback((clientX) => {
        setIsDragging(true);
        setStartX(clientX);
        setCurrentX(clientX);

        if (carouselRef.current) {
            carouselRef.current.style.transition = 'none';
        }
    }, []);

    const handleDragMove = useCallback((clientX) => {
        if (!isDragging) return;

        setCurrentX(clientX);
        const deltaX = clientX - startX;

        if (carouselRef.current) {
            const cardWidth = 100; // Always 100% since itemsPerView is 1
            const baseTransform = currentIndex * cardWidth;
            const dragPercentage = (deltaX / carouselRef.current.offsetWidth) * 100;
            carouselRef.current.style.transform = `translateX(${-baseTransform + dragPercentage}%)`;
        }
    }, [isDragging, startX, currentIndex]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);
        const threshold = 50;
        const deltaX = currentX - startX;

        if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else if (deltaX < 0 && currentIndex < maxIndex) {
                setCurrentIndex(currentIndex + 1);
            }
        }

        setStartX(0);
        setCurrentX(0);
    }, [isDragging, currentX, startX, currentIndex, maxIndex]);

    // Mouse events
    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    }, [handleDragStart]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            e.preventDefault();
            handleDragMove(e.clientX);
        }
    }, [isDragging, handleDragMove]);

    const handleMouseUp = useCallback((e) => {
        if (isDragging) {
            e.preventDefault();
            handleDragEnd();
        }
    }, [isDragging, handleDragEnd]);

    // Touch events
    const handleTouchStart = useCallback((e) => {
        handleDragStart(e.touches[0].clientX);
    }, [handleDragStart]);

    const handleTouchMove = useCallback((e) => {
        if (isDragging) {
            e.preventDefault();
            handleDragMove(e.touches[0].clientX);
        }
    }, [isDragging, handleDragMove]);

    const handleTouchEnd = useCallback(() => {
        handleDragEnd();
    }, [handleDragEnd]);

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
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        // Initial page load animations
        if (titleRef.current) {
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
            );
        }

        if (paragraphRef.current) {
            tl.fromTo(paragraphRef.current,
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
            );
        }

        if (buttonsRef.current.length > 0) {
            tl.fromTo(buttonsRef.current,
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
        }

        // Animate cards in
        const validCards = cardsRef.current.filter(card => card !== null);
        if (validCards.length > 0) {
            gsap.fromTo(validCards,
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
        }

        // Animate dots
        const validDots = dotsRef.current.filter(dot => dot !== null);
        if (validDots.length > 0) {
            gsap.fromTo(validDots,
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
        }

    }, []);

    // Animation when index changes
    useGSAP(() => {
        if (carouselRef.current && !isDragging) {
            const cardWidth = 100; // Always 100%
            gsap.to(carouselRef.current, {
                x: `-${currentIndex * cardWidth}%`,
                duration: 0.8,
                ease: "power2.inOut"
            });

            // Subtle scale animation on visible cards
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
                    gsap.to(card, {
                        scale: isVisible ? 1 : .98,
                        opacity: isVisible ? 1 : 0.7,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });
        }
    }, [currentIndex, isDragging]);

    // Don't render if no packages
    if (!pkgs || pkgs.length === 0) {
        return null;
    }

    // Check if navigation should be shown
    const showNavigation = pkgs.length > itemsPerView;

    return (
        <div
            ref={containerRef}
            className='relative flex flex-col md:flex-row'
        >
            {/* Carousel Container */}
            <div className='flex-1 overflow-hidden relative'>
                <div
                    ref={carouselRef}
                    className={`flex relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
                    {pkgs.map((pkg, index) => (
                        <div key={`${pkg.title}-${index}`}
                            ref={el => cardsRef.current[index] = el}
                            className="min-w-[100%] group overflow-hidden rounded-b-xl relative"
                            style={{
                                pointerEvents: isDragging ? 'none' : 'auto',
                                minWidth: '100%'
                            }}>



                            <div className="relative aspect-[4/4] md:aspect-[4/1.5] w-full">
                                <Image
                                    src={pkg.img}
                                    alt={pkg.title || 'Package image'}
                                    fill
                                    className="object-cover rounded-t-xl"
                                    draggable={false}
                                    loading={index < itemsPerView ? 'eager' : 'lazy'}
                                    quality={100}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>

                            <div className="relative py-6 bg-white rounded-b-xl px-[30px] md:px-10 overflow-hidden">

                                <Image
                                    src={img1}
                                    width={1512}
                                    height={1008}
                                    alt="Package background"
                                    className="
                                      imgBackground absolute bottom-0 left-1/2 -translate-x-1/2 
                                      w-[80%] h-[80%] object-cover opacity-20 md:opacity-80 z-[1]
                                      md:left-auto md:right-0 md:w-[350px] md:h-[350px] 
                                      md:object-top md:translate-x-0 md:translate-y-[49.5%]
                                    "
                                    draggable={false}
                                />

                                <div className="absolute inset-0 bg-white/70 z-[2]"></div>


                                <h3 className="mb-4 text-xl md:text-2xl font-semibold z-10 relative">{pkg.title}</h3>

                                <div className='mb-4 flex flex-wrap gap-6 z-10 relative'>
                                    <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[16px] font-light leading-relaxed">
                                        <div className='w-6 h-6'>
                                            <CalendarCheck />
                                        </div>
                                        {pkg.day}
                                    </div>
                                    <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[16px] font-light leading-relaxed">
                                        <div className='w-6 h-6'>
                                            <Car />
                                        </div>
                                        {pkg.transport}
                                    </div>
                                    <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[16px] font-light leading-relaxed">
                                        <div className='w-6 h-6'>
                                            <Hamburger />
                                        </div>
                                        {pkg.meals}
                                    </div>
                                </div>

                                {pkg.content.map((block, idx) =>
                                    block.type === "description" ? (
                                        block.items.map((desc, dIdx) => (
                                            <p
                                                key={`${idx}-${dIdx}`}
                                                className="text-[16px] font-light leading-relaxed z-10 relative"
                                            >
                                                {desc}

                                            </p>
                                        ))
                                    ) : (
                                        <ul key={idx} className="mt-4 list-disc pl-5 space-y-2 mb-4 z-10 relative">
                                            {block.items.map((point, pIdx) => (
                                                <li key={`${idx}-${pIdx}`} className="text-[16px] font-light leading-relaxed">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        </div>
                    ))}

                </div>

                <div className='hidden px-4 absolute md:flex flex-row  justify-between top-[28%] w-full '>
                    <button
                        ref={el => buttonsRef.current[0] = el}
                        onClick={handlePrev}
                        className=' hover:opacity-70 transition-all cursor-pointer transform hover:scale-95 active:scale-90 mix-blend-difference'
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
                            strokeWidth={0.8}

                            className={`
                                  w-[50px] h-[50px] md:w-[70px] md:h-[70px]
                                  ${currentIndex === 0 ? '' : ''}
                                  text-black md:text-white
                                `}
                        />
                    </button>
                    <button
                        ref={el => buttonsRef.current[1] = el}
                        onClick={handleNext}
                        className='hover:opacity-70 transition-all cursor-pointer transform hover:scale-95 active:scale-90 mix-blend-difference'
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
                            strokeWidth={0.8}

                            className={`
                                  w-[50px] h-[50px] md:w-[70px] md:h-[70px]
                                  ${currentIndex === maxIndex ? '' : ''}
                                  text-black md:text-white
                                `}
                        />
                    </button>
                </div>
            </div>


        </div>
    );
};

export default ItenaryCardSlider;