"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative, Parallax, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/parallax";

import { CalendarCheck, Car, ChevronLeft, ChevronRight, ChevronRightCircleIcon, ChevronRightIcon, CircleChevronLeftIcon, CircleChevronRightIcon, Hamburger } from "lucide-react";
import Image from "next/image";
import img1 from "../../../../../public/itinary/1.svg";

import carsvg from '../../../../../public/icons/car.svg';
import hotelsvg from '../../../../../public/icons/hotel.svg';
import mealssvg from '../../../../../public/icons/meals.svg';
import flightsvg from '../../../../../public/icons/flight.svg';
import mountainssvg from '../../../../../public/icons/mountains.svg';
import sunnysvg from '../../../../../public/icons/sunny.svg';

const ItenarySwiperSlider = ({ pkgs }) => {
    if (!pkgs || pkgs.length === 0) return null;

    const swiperRef = useRef(null);
    const [slideHeight, setSlideHeight] = useState(0);

    // Measure active slide height
    const updateHeight = (swiper) => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
            setSlideHeight(activeSlide.offsetHeight);
        }
    };

    useEffect(() => {
        if (swiperRef.current) {
            updateHeight(swiperRef.current);
        }
    }, []);

    return (
        <div
            className="relative w-full transition-[height] duration-500 ease-in-out"
            style={{ height: slideHeight ? `${slideHeight}px` : "auto", overflow: 'hidden' }}
        >
            <Swiper
                modules={[Pagination, EffectCreative, Parallax, Navigation]}
                slidesPerView={1}
                spaceBetween={50}
                grabCursor
                speed={900}
                loop
                parallax
                effect="creative"
                navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ["-20%", 0, -1],
                        scale: 0.85,
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    },
                }}
                className="rounded-xl"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    updateHeight(swiper);
                }}
                onSlideChange={updateHeight}
            >
                {pkgs.map((pkg, index) => (
                    <SwiperSlide key={`${pkg.title}-${index}`}>
                        <div className="group overflow-hidden rounded-xl relative bg-white">

                            {/* Image + navigation buttons wrapper */}
                            <div className="relative aspect-[4/4] md:aspect-[4/1.5] w-full">
                                <Image
                                    src={pkg.img}
                                    alt={pkg.title || "Package image"}
                                    fill
                                    className="object-cover rounded-t-xl"
                                    quality={100}
                                    unoptimized
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
                                <div className="absolute left-4 md:left-12 bottom-6 md:top-1/2 md:-translate-y-1/2
                                 md:transform rounded-full  
                                 flex gap-5 items-start justify-start md:justify-center  md:flex-col flex-wrap md:flex-nowrap z-10"
                                >


                                    <div className='flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-300"
                                    >
                                        <Image
                                            src={carsvg}
                                            width={28}
                                            height={28}
                                            className=' w-7 h-7 invert'
                                            alt='car icon'
                                        />
                                        <p className='text-white font-light' style={{ fontSize: "14px" }}>{pkg.transport}</p>
                                    </div>

                                    <div className='flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-250"
                                    >
                                        <Image
                                            src={mealssvg}
                                            width={32}
                                            height={32}
                                            alt='car icon'
                                            className=' w-7 h-7 invert'
                                        />
                                        <p className='text-white font-light' style={{ fontSize: "14px" }}>{pkg.meals}</p>
                                    </div>

                                    <div className='flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-200"
                                    >
                                        <Image
                                            src={sunnysvg}
                                            width={32}
                                            height={32}
                                            alt='car icon'
                                            className=' w-7 h-7 invert'
                                        />
                                        <p className='text-white font-light whitespace-nowrap' style={{ fontSize: "14px" }}>12 Days</p>
                                    </div>
                                    <div className='hidden md:flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-150"
                                    >
                                        <Image
                                            src={hotelsvg}
                                            width={32}
                                            height={32}
                                            alt='car icon'
                                            className=' w-7 h-7 invert'
                                        />
                                        <p className='text-white font-light' style={{ fontSize: "14px" }}>HOTEL</p>
                                    </div>
                                    <div className='hidden md:flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-100"
                                    >
                                        <Image
                                            src={mountainssvg}
                                            width={32}
                                            height={32}
                                            alt='car icon'
                                            className=' w-7 h-7 invert'
                                        />
                                        <p className='text-white font-light' style={{ fontSize: "14px" }}>SIGHTS</p>
                                    </div>
                                    <div className='hidden md:flex gap-2 justify-center items-center bg-black/50 md:bg-white/20 rounded-full shadow-lg py-2 px-6'
                                        data-swiper-parallax="-80"
                                    >
                                        <Image
                                            src={flightsvg}
                                            width={32}
                                            height={32}
                                            alt='car icon'
                                            className=' w-7 h-7 invert'
                                        />
                                        <p className='text-white font-light' style={{ fontSize: "14px" }}>FLIGHT</p>
                                    </div>
                                </div>

                                {/* Navigation buttons centered on image */}
                                <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-20
                                rounded-full w-[40px] h-[40px] bg-black/80
                                hover:scale-95 hover:bg-black/60  transition">
                                    <ChevronLeft
                                        strokeWidth={1}
                                        color="white"
                                        className="w-full h-full"
                                    />
                                </button>
                                <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-20 
                                rounded-full w-[40px] h-[40px] bg-black/80  
                                hover:scale-95 hover:bg-black/60  transition">
                                    <ChevronRight
                                        strokeWidth={1}
                                        color="white"
                                        className="w-full h-full"
                                    />
                                </button>
                            </div>

                            {/* Content */}
                            <div
                                className="relative py-6 px-6 md:px-10 rounded-b-xl overflow-hidden"
                                data-swiper-parallax="-100"
                            >
                                <Image
                                    src={img1}
                                    width={1512}
                                    height={1008}
                                    alt="Package background"
                                    className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 
                                        w-[80%] h-[80%] object-cover opacity-20 md:opacity-60 z-[1]
                                        md:left-auto md:right-0 md:w-[350px] md:h-[350px] 
                                        md:translate-x-0 md:translate-y-[50%] md:object-top"
                                    draggable={false}
                                />

                                <div className="absolute inset-0 bg-white/70 z-[2]"></div>

                                <h3
                                    className="mb-4 text-xl md:text-2xl font-semibold relative z-10"
                                    data-swiper-parallax="-200"
                                >
                                    {pkg.title}
                                </h3>

                                

                                {/* Description / Points */}
                                <div className="relative z-10" data-swiper-parallax="-100">
                                    {pkg.content.map((block, idx) =>
                                        block.type === "description" ? (
                                            block.items.map((desc, dIdx) => (
                                                <p
                                                    key={`${idx}-${dIdx}`}
                                                    className="text-[15px] font-light leading-relaxed mb-2"
                                                >
                                                    {desc}
                                                </p>
                                            ))
                                        ) : (
                                            <ul
                                                key={idx}
                                                className="list-disc pl-10 space-y-2 text-[15px] font-light"
                                            >
                                                {block.items.map((point, pIdx) => (
                                                    <li key={`${idx}-${pIdx}`}>{point}</li>
                                                ))}
                                            </ul>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ItenarySwiperSlider;
