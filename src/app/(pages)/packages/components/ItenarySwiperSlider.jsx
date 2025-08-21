"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/parallax";

import { CalendarCheck, Car, Hamburger } from "lucide-react";
import Image from "next/image";
import img1 from "../../../../../public/itinary/1.svg";

const ItenarySwiperSlider = ({ pkgs }) => {
  if (!pkgs || pkgs.length === 0) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, EffectCreative, Parallax]}
        slidesPerView={1}
        spaceBetween={50}
        grabCursor
        speed={900}
        loop
        parallax
        pagination={{ clickable: true }}
        effect="creative"
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
      >
        {pkgs.map((pkg, index) => (
          <SwiperSlide key={`${pkg.title}-${index}`}>
            <div className="group overflow-hidden rounded-xl relative bg-white">
              {/* Image */}
              <div
                className="relative aspect-[4/4] md:aspect-[4/1.5] w-full"
                data-swiper-parallax="-40%"
              >
                <Image
                  src={pkg.img}
                  alt={pkg.title || "Package image"}
                  fill
                  className="object-cover rounded-t-xl"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 600px"
                  draggable={false}
                />
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
                  className="
                    absolute bottom-0 left-1/2 -translate-x-1/2 
                    w-[80%] h-[80%] object-cover opacity-20 md:opacity-60 z-[1]
                    md:left-auto md:right-0 md:w-[350px] md:h-[350px] 
                    md:translate-x-0 md:translate-y-[50%] md:object-top
                  "
                  draggable={false}
                />

                <div className="absolute inset-0 bg-white/70 z-[2]"></div>

                <h3
                  className="mb-4 text-xl md:text-2xl font-semibold relative z-10"
                  data-swiper-parallax="-200"
                >
                  {pkg.title}
                </h3>

                {/* Meta info */}
                <div
                  className="mb-4 flex flex-wrap gap-4 relative z-10"
                  data-swiper-parallax="-150"
                >
                  <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[15px] font-light">
                    <CalendarCheck className="w-5 h-5" />
                    {pkg.day}
                  </div>
                  <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[15px] font-light">
                    <Car className="w-5 h-5" />
                    {pkg.transport}
                  </div>
                  <div className="flex gap-2 border border-black/20 rounded-full py-1 px-3 items-center text-[15px] font-light">
                    <Hamburger className="w-5 h-5" />
                    {pkg.meals}
                  </div>
                </div>

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
                        className="list-disc pl-5 space-y-2 text-[15px] font-light"
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
