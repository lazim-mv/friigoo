import Image from 'next/image';
import React, { useState } from 'react'

const ItenaryCard1 = ({ index, title, description, images }) => {

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
                    {title}
                </h3>
                <p className="text-[17px] font-light leading-relaxed">
                    {description}
                </p>
                {/* Material You Slider (if images available) */}
                {images && (
                    <div className="mt-[35px] mb-[85px]">
                        <MaterialSlider
                            images={images}
                            title={title}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItenaryCard1