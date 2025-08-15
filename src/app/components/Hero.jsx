"use client";
import React, { useRef, useState, useEffect } from "react";
import CTAButton from "./common/CTAButton";
import { Volume2, VolumeX } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "../utils/gsapInit";

const Hero = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);
    const muteButtonRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Set initial states
        gsap.set([headingRef.current, paragraphRef.current, buttonRef.current], {
            opacity: 0,
            y: 60,
        });

        gsap.set(overlayRef.current, {
            opacity: 0,
        });

        gsap.set(videoRef.current, {
            scale: 1.1,
            opacity: 0,
        });

        // Premium entrance animation sequence
        tl.to(videoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "power3.out",
        })
            .to(overlayRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            }, "-=1.8")
            .to(headingRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.8,
                ease: "power3.out",
            }, "-=1")
            .to(paragraphRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
            }, "-=1.2")
            .to(buttonRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
            }, "-=0.8")


        // Subtle floating animation for the heading
        gsap.to(headingRef.current, {
            y: -8,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 3,
        });

        // Parallax effect on scroll
        // gsap.to(videoRef.current, {
        //     yPercent: -20,
        //     ease: "none",
        //     scrollTrigger: {
        //         trigger: containerRef.current,
        //         start: "top top",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });



    }, []);

    // Enhanced mute button animation
    const handleMuteToggle = () => {
        gsap.to(muteButtonRef.current, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
        });
        setIsMuted(!isMuted);
    };

    // Add mouse move parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 30;
            const yPos = (clientY / innerHeight - 0.5) * 20;

            gsap.to(headingRef.current, {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: "power2.out",
            });

            gsap.to(paragraphRef.current, {
                x: xPos * 0.5,
                y: yPos * 0.5,
                duration: 2.5,
                ease: "power2.out",
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative overflow-hidden" ref={containerRef} id="hero">
            {/* Background video */}

            <video
                ref={videoRef}
                className="w-full h-screen object-cover will-change-transform"
                autoPlay
                loop
                muted={isMuted}
            >
                <source src="/vid/23.mp4" type="video/mp4" />
            </video>

            {/* Mute/Unmute button */}


            {/* Premium gradient overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="relative flex flex-col items-center justify-center text-center">

                    <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent blur-3xl scale-150" />

                    <h1
                        ref={headingRef}
                        className="
        relative text-white 
        text-5xl sm:text-5xl md:text-6xl lg:text-7xl 
        font-normal mb-6 sm:mb-8 lg:mb-9 
        max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]
        leading-tight tracking-wide will-change-transform
    "
                        style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            fontWeight: '300',
                        }}
                    >
                        <span className="bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent">
                            Your Gateway to Unforgettable Journeys Around the World
                        </span>
                    </h1>

                    <p
                        ref={paragraphRef}
                        className="
        relative text-white/90 
        text-base sm:text-lg md:text-xl 
        max-w-lg sm:max-w-xl md:max-w-2xl 
        font-light mb-8 sm:mb-10 lg:mb-12 
        leading-relaxed will-change-transform
    "
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                        Discover hidden gems, explore breathtaking destinations, and book
                        your dream trip all in one place with Friigoo.
                    </p>

                    <div ref={buttonRef} className="will-change-transform">
                        <CTAButton label="Explore Packages" borderColor="border-white/20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;