"use client"
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import img1 from '../../../public/testi/1.webp'
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from '../utils/gsapInit';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [cardsPerView, setCardsPerView] = useState(2);

  const testimonials = [
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
  ];

  const maxIndex = testimonials.length - 1;

  // Detect cardsPerView on resize
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2);
      }
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Initial animations
  useGSAP(() => {
    gsap.fromTo('.testimonials-header', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo('.testimonials-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6 });
    gsap.fromTo('.testimonials-controls', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.2 });
  }, []);

  // Animate cards on index change
  useGSAP(() => {
    if (containerRef.current && cardsRef.current[0]) {
      const cardWidth = cardsRef.current[0].offsetWidth;
      const gap = parseInt(getComputedStyle(containerRef.current).gap) || 0;

      gsap.to(containerRef.current, {
        x: -currentIndex * (cardWidth + gap),
        duration: 0.8,
        ease: 'power2.inOut'
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          const isVisible = index >= currentIndex && index < currentIndex + cardsPerView;
          gsap.to(card, {
            scale: 1,
            opacity: isVisible ? 1 : 0.7,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    }
  }, [currentIndex, cardsPerView]);

  return (
    <div className='sectionMargin relative w-full h-fit overflow-hidden' style={{ marginBottom: "0" }}>
      <Image src={img1} alt='friigoo trip planner website testimonial background' className='w-full h-full object-cover absolute top-0 left-0' />
      <div className='absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20' />

      <div className='top-24 w-full flex flex-col items-center'>
        <h2 className='testimonials-header text-6xl mb-10 text-white drop-shadow-lg text-center'>What Our Clients Say</h2>
        <p className='testimonials-description w-full md:w-[40%] text-[17px] font-light text-center paragraph-style leading-relaxed text-white/90 drop-shadow-md'>
          Our customer's feedback is essential in building a great reputation and maintaining excellent service.
        </p>

        <div className='relative w-full max-w-full md:max-w-7xl mt-8 md:mt-24 overflow-hidden' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='flex justify-center mb-6 gap-2'>
            {testimonials.map((_, idx) => (
              <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-black' : 'w-2 bg-black/40'}`} />
            ))}
          </div>

          <div className='flex justify-center'>
            <div className='overflow-hidden'>
              <div ref={containerRef} className='flex gap-8 transition-transform duration-800 ease-in-out'>
                {testimonials.map((testi, idx) => (
                  <div
                    key={idx}
                    ref={el => cardsRef.current[idx] = el}
                    className='bg-white/10 backdrop-blur-md rounded-lg w-full md:w-[500px] flex-shrink-0 hover:bg-white/20 transition-all duration-500 border border-white/20 p-6 shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-2 group'
                  >
                    <p className='text-[17px] font-light text-white/90 paragraph-style mb-8 leading-relaxed relative z-10'>{testi.description}</p>
                    <div className='flex gap-4 items-center'>
                      <div className='w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-300'>
                        <Image className='w-full h-full object-cover' src={testi.img} width={56} height={56} alt={`Testimonial by ${testi.name}`} />
                      </div>
                      <div className='flex flex-col'>
                        <p className='text-[20px] font-normal'>{testi.name}</p>
                        <p className='text-[14px] font-light paragraph-style leading-relaxed'>{testi.place}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='testimonials-controls flex gap-6 mx-auto pt-8 md:pt-16'>
          <button onClick={handlePrev} className='group hover:scale-90 transition-all duration-300 cursor-pointer hover:drop-shadow-2xl'>
            <CircleChevronLeftIcon size={60} color="#99a1af" strokeWidth={0.5} className='w-[50px] h-[50px] md:w-[70px] md:h-[70px]' />
          </button>
          <button onClick={handleNext} className='group hover:scale-110 transition-all duration-300 cursor-pointer hover:drop-shadow-2xl'>
            <CircleChevronRightIcon size={60} color="#99a1af" strokeWidth={0.5} className='w-[50px] h-[50px] md:w-[70px] md:h-[70px]' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
