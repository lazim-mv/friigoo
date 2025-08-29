"use client"
import Image from 'next/image'
import React, { useState, useCallback, useMemo, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import img1 from '../../../public/testi/1.webp'
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';

const Testimonials = ({ marginTop }) => {
  const swiperRef = useRef(null);

  const testimonials = useMemo(() => [
    {
      description: "Friigoo made my dream vacation come true! Everything was perfectly organized, and I didn't have to worry about a thing.",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      name: "Sarah Thompson",
      place: "New York, USA"
    },
    {
      description: "From booking to the actual trip, the experience was seamless. I discovered amazing hidden spots thanks to their guides.",
      img: "https://images.pexels.com/photos/30450838/pexels-photo-30450838.jpeg",
      name: "James Carter",
      place: "London, UK"
    },
    {
      description: "The best travel platform I've ever used! Great deals, wonderful destinations, and excellent customer service.",
      img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      name: "Ananya Kapoor",
      place: "Mumbai, India"
    },
    {
      description: "Friigoo made planning so easy! I could focus on enjoying my trip instead of stressing over arrangements.",
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      name: "Lucas Martínez",
      place: "Barcelona, Spain"
    }
  ], []);

  const swiperConfig = useMemo(() => ({
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32
      }
    },
    spaceBetween: 20,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 4000,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
      renderBullet: (index, className) => {
        return `<div class="${className} testimonial-bullet"></div>`;
      }
    },
    grabCursor: true,
  }), []);

  const handleSlideChange = useCallback(() => {
    // Handle slide change if needed
  }, []);

  const handleSlideTransitionStart = useCallback(() => {
    // Handle slide transition start if needed
  }, []);

  const handlePrevClick = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNextClick = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <div className='sectionMargin relative w-full h-fit overflow-hidden' style={{ marginBottom: "0", marginTop: marginTop }}>
      <Image
        src={img1}
        alt='friigoo trip planner website testimonial background'
        className='w-full h-full object-cover absolute top-0 left-0'
      />
      <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20' />

      <div className='w-full flex flex-col items-center relative z-10'>
        <h2 className='text-6xl mb-10 text-white drop-shadow-lg text-center'>
          What Our Clients Say
        </h2>
        <p className='w-full md:w-[40%] text-[17px] font-light text-center paragraph-style leading-relaxed text-[#09090b] drop-shadow-md'>
          Our customer's feedback is essential in building a great reputation and maintaining excellent service.
        </p>

        <div className='relative w-full max-w-full md:max-w-7xl mt-8 md:mt-24 px-0 md:px-4'>
          <div className="testimonials-pagination flex justify-center gap-2"></div>

          <Swiper
            {...swiperConfig}
            className="py-5 overflow-visible"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            onSlideTransitionStart={handleSlideTransitionStart}
          >
            {testimonials.map((testi, idx) => (
              <SwiperSlide key={idx}>
                <div className='bg-white/10 backdrop-blur-md rounded-lg w-full mx-auto mt-4 md:mt-6
                               hover:bg-white/20 transition-all duration-500 border border-white/20 p-6 
                               shadow-2xl hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group'>
                  <p className='text-[17px] font-light text-[#09090b] paragraph-style mb-8 leading-relaxed'>
                    {testi.description}
                  </p>
                  <div className='flex gap-4 items-center'>
                    <div className='w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/30 
                                   group-hover:ring-white/60 transition-all duration-300'>
                      <Image
                        className='w-full h-full object-cover'
                        src={testi.img}
                        width={56}
                        height={56}
                        alt={`Testimonial by ${testi.name}`}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-[20px] font-normal'>{testi.name}</p>
                      <p className='text-[14px] font-light paragraph-style leading-relaxed'>{testi.place}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex gap-6 mx-auto pt-8 md:pt-10'>
          <button
            onClick={handlePrevClick}
            className='hover:scale-90 transition-all duration-300 cursor-pointer hover:drop-shadow-2xl'
          >
            <CircleChevronLeftIcon
              strokeWidth={0.5}
              className='w-[50px] h-[50px] md:w-[70px] md:h-[70px] text-white/50 md:text-black/20'
            />
          </button>
          <button
            onClick={handleNextClick}
            className='hover:scale-90 transition-all duration-300 cursor-pointer hover:drop-shadow-2xl'
          >
            <CircleChevronRightIcon
              strokeWidth={0.5}
              className='w-[50px] h-[50px] md:w-[70px] md:h-[70px] text-white/50 md:text-black/20'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;