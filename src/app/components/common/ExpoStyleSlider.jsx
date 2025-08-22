"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

const ExpoStyleSlider = ({ countries }) => {
    return (
        <div className="w-full h-full">
            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                loop={true}
                centeredSlides={true}
                initialSlide={3}
                slidesPerView={"auto"}
                spaceBetween={20}
                pagination={{ clickable: true }}
                coverflowEffect={{
                    rotate: 0,   // no rotation
                    stretch: 0,  // no stretch
                    depth: 200,  // distance between slides
                    modifier: 2.5,
                    slideShadows: false,
                }}
                className="h-[500px] md:h-[600px]"
            >
                {countries.map((country, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-[90%] md:!w-[30%] relative group overflow-hidden rounded-xl shadow-lg"
                    >
                        <Image
                            src={country.img}
                            alt={country.name}
                            width={500}
                            height={600}
                            className="w-full h-full object-cover rounded-xl"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl"></div>

                        {/* Title */}
                        <h3 className="absolute bottom-6 left-6 text-3xl font-medium text-white drop-shadow-lg z-10">
                            {country.name}
                        </h3>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ExpoStyleSlider;
