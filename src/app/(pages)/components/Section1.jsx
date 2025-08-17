"use client";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "@/app/utils/gsapInit";



const Section1 = ({
    img,
    heading = "About Friigoo",
    subHeading = "Discover. Explore. Belong",
}) => {
    const headingRef = useRef(null);
    const subheadingRef = useRef(null);
    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        gsap.set([headingRef.current, subheadingRef.current], {
            y: 80,
            opacity: 0,
        });

        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(imageRef.current, { scale: 1.1 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(imageRef.current, { scale: 1, duration: 2.5, ease: "power2.out" }, 0)
            .to(overlayRef.current, { opacity: 1, duration: 1.8, ease: "power2.inOut" }, 0.3)
            .to(headingRef.current, { y: 0, opacity: 1, duration: 1.2 }, 0.8)
            .to(subheadingRef.current, { y: 0, opacity: 1, duration: 1 }, 1.2);

        gsap.to(imageRef.current, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        gsap.to([headingRef.current, subheadingRef.current], {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        gsap.to(headingRef.current, {
            scale: 1.02,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2,
        });
    }, []);

    return (
        <div
            id="hero"
            ref={containerRef}
            className="section flex items-center relative h-[80vh] overflow-hidden"
        >
            <div ref={imageRef} className="absolute inset-0">

                <Image
                    src={img}
                    alt="Hero background"
                    fill
                    className="h-full w-full object-cover"
                    priority
                />
            </div>

            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"
            />

            <div className="section flex flex-col items-center justify-center w-full relative z-10">
                <h1
                    ref={headingRef}
                    className="
                    relative text-white 
        text-[11.7vw] sm:text-5xl md:text-6xl lg:text-7xl 
        font-normal mb-6 sm:mb-8 lg:mb-9 
        leading-tight tracking-wide will-change-transform text-center"
                    style={{
                        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                        fontWeight: "300",
                    }}
                >
                    <span className="bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
                        {heading}
                    </span>
                </h1>

                <h3
                    ref={subheadingRef}
                    className="z-10 will-change-transform text-center"
                    style={{
                        color: "#fff",
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    {subHeading}
                </h3>
            </div>
        </div>
    );
};

export default Section1;
