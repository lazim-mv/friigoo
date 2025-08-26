"use client";
import React, { useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import CTAButton1 from "@/app/components/common/CTAButton1";
import img1 from "../../../../../public/banner/3.webp";
import gsap from "@/app/utils/gsapInit";

const Banner = ({ img }) => {
    const imgRef = useRef(null)

    useEffect(() => {
        if (imgRef.current) {
            gsap.to(imgRef.current, {
                yPercent: -20, // Changed from 20 to -20 (move up instead of down)
                ease: "none",
                scrollTrigger: {
                    trigger: imgRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
        }
    }, [])

    return (
        <div className="sectionMargin relative h-max md:h-[60vh] bg-black w-full overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-transparent z-[1]" />
            {/* Background Image */}
            <div
                ref={imgRef}
                className="absolute top-[-10%] left-0 w-full h-[120vh] will-change-transform"
            >
                <Image
                    src={img || img1}
                    alt="Beautiful lake by friigoo"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Content */}
            <div className="z-10 relative flex flex-col justify-center items-center h-full w-full text-white bg-white/20 rounded-lg p-6">
                <div className="relative mb-6 md:mb-8 lg:mb-10">
                    <h2
                        className="relative text-3xl md:text-4xl lg:text-6xl leading-tight text-white
                       drop-shadow-lg
                       tracking-tight text-center"
                        style={{ color: "white" }}
                    >
                        Travel Made Effortless
                    </h2>
                </div>

                <p className="z-10 w-full md:w-[40%] text-center lg:text[17px] md:text-[16px] font-light paragraph-style mb-6 md:mb-8 leading-relaxed
                      drop-shadow-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]" style={{ color: "white" }}>
                    From flights and stays to unique adventures, Friigoo brings everything you need into one smooth, stress-free travel experience.
                </p>

                <div className="w-max">
                    <CTAButton1
                        label="Explore Destinations"
                        textColor="#0a0a0a"
                        borderColor="border-white/10"
                        hoverText={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner