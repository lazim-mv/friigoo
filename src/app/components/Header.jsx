"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import logow from "../../../public/logo/logow.png"; // white logo
import logob from "../../../public/logo/logo.png"; // black logo
import { Search, Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { useGSAP } from "@gsap/react";
import Hamburger from "./common/Hamburger";
import LogoComponent from "./common/LogoComponent";
import Logo2 from "./common/Logo2";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    const headerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [isColorChange, setIsColorChange] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPackagesSubPath, setIsPackagesSubPath] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll tracking variables
    const lastScrollYRef = useRef(0);
    const tickingRef = useRef(false);

    useEffect(() => {
        if (pathname?.startsWith("/packages")) {
            const rest = pathname.replace("/packages", "");
            setIsPackagesSubPath(rest.length > 1);
        } else {
            setIsPackagesSubPath(false);
        }
    }, [pathname]);

    const navOptions = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Packages", href: "/packages" },
        { label: "Services", href: "/services" },
        { label: "Contact Us", href: "/contact-us" },
    ];

    // Improved scroll handler similar to second header
    const handleScroll = () => {
        const header = headerRef.current;
        if (!header) return;

        const currentY = window.scrollY;
        const direction = currentY > lastScrollYRef.current ? "down" : "up";
        const scrollDifference = Math.abs(currentY - lastScrollYRef.current);

        // Add scrolled background when past 10% of viewport height
        if (currentY > window.innerHeight * 0.1) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Hide/show logic with 250px threshold and scroll direction sensitivity
        if (currentY > 250) {
            if (direction === "down" && scrollDifference > 5) {
                // Only hide when scrolling down with some momentum
                header.classList.add("hidden");
            } else if (direction === "up" && scrollDifference > 5) {
                // Show when scrolling up with some momentum
                header.classList.remove("hidden");
            }
        } else {
            // Always show when near the top
            header.classList.remove("hidden");
        }

        lastScrollYRef.current = currentY;
        tickingRef.current = false;
    };

    const requestScrollTick = () => {
        if (!tickingRef.current) {
            requestAnimationFrame(handleScroll);
            tickingRef.current = true;
        }
    };

    useGSAP(() => {
        (async () => {
            if (isPackagesSubPath) return;
            const gsapModule = await import("../utils/gsapInit");
            const gsap = gsapModule.default;
            const { ScrollTrigger } = gsapModule;

            const headerEl = headerRef.current;

            // Initial header animation
            gsap.fromTo(headerEl,
                {
                    y: -100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2
                }
            );

            // Animate logo and nav items
            gsap.fromTo(".logo-container",
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
            );

            gsap.fromTo(".nav-item",
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.7, ease: "power2.out" }
            );

            gsap.fromTo(".header-actions",
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out" }
            );

            ScrollTrigger.create({
                trigger: "#hero",
                start: "50px top",
                onEnter: () => setIsColorChange(true),
                onLeaveBack: () => setIsColorChange(false),
            });

            // Add scroll event listener for new logic
            window.addEventListener("scroll", requestScrollTick, { passive: true });

            // Cleanup
            return () => {
                window.removeEventListener("scroll", requestScrollTick);
            };
        })();
    }, []);

    // Mobile menu animations
    useGSAP(() => {
        (async () => {
            const gsapModule = await import("../utils/gsapInit");
            const gsap = gsapModule.default;

            const menuEl = mobileMenuRef.current;

            if (isMobileMenuOpen) {
                // Open animation
                gsap.set(menuEl, { display: "flex" });

                // Menu background animation
                gsap.fromTo(menuEl,
                    {
                        clipPath: "circle(0% at 100% 0%)",
                        opacity: 0
                    },
                    {
                        clipPath: "circle(150% at 100% 0%)",
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out"
                    }
                );

                // Menu items stagger animation - FIXED VERSION
                gsap.fromTo(".mobile-nav-item",
                    {
                        // y: 100,
                        opacity: 0,
                        // Removed any transforms that could cause stretching
                    },
                    {
                        // y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        delay: 0.3,
                        ease: "power2.out",
                        // Ensure transforms don't affect text rendering
                        force3D: false,
                        transformOrigin: "center center"
                    }
                );

                // Close button animation
                gsap.fromTo(".close-button",
                    {
                        scale: 0,
                        rotation: -180
                    },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        delay: 0.4,
                        ease: "back.out(1.7)"
                    }
                );
            } else {
                // Close animation - FIXED VERSION
                gsap.to(".mobile-nav-item",
                    {
                        y: -100,
                        opacity: 0,
                        // Removed rotationY which can cause text distortion
                        duration: 0.3,
                        stagger: 0.05,
                        ease: "power2.in",
                        force3D: false
                    }
                );

                gsap.to(".close-button",
                    {
                        scale: 0,
                        rotation: 180,
                        duration: 0.3,
                        ease: "power2.in"
                    }
                );

                gsap.to(menuEl,
                    {
                        clipPath: "circle(0% at 100% 0%)",
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.2,
                        ease: "power3.in",
                        onComplete: () => gsap.set(menuEl, { display: "none" })
                    }
                );
            }
        })();
    }, [isMobileMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none'; // Prevent iOS scroll
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.touchAction = 'auto';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className="w-full fixed top-0 left-0 z-[110] bg-transparent"
            >
                <div className="px-8 md:px-12 py-4 flex items-center justify-between mx-auto">
                    {/* Logo */}
                    <div className="w-36 aspect-[7/2] relative logo-container">
                        <a href="/">
                            <Logo2 textFill={isMobileMenuOpen || isColorChange ? "black" : "white"} />
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lists">
                        {navOptions.map((nav, idx) => (
                            <a
                                key={idx}
                                href={nav.href}
                                className={`nav-item relative overflow-hidden group transition-colors duration-300 ${isColorChange ? "text-black" : "text-white"
                                    }`}
                            >
                                <span className="relative z-10">{nav.label}</span>
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isColorChange ? "bg-black" : "bg-white"
                                    }`}></span>
                            </a>
                        ))}
                    </nav>

                    {/* Header Actions */}
                    <div className="flex gap-6 header-actions">
                        <button
                            className={`
                            hidden md:block
                            z-20 p-3 backdrop-blur-sm rounded-xl transition-all duration-300 border group hover:scale-105 ${isColorChange
                                    ? "bg-white/20 border-black/10 hover:bg-black/10"
                                    : "bg-white/10 border-white/20 hover:bg-white/20"
                                }`}
                        >
                            <Search
                                size={20}
                                color={isColorChange ? "black" : "white"}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                        </button>

                        <div
                            className={`md:hidden
                            z-20 px-3 backdrop-blur-sm rounded-xl transition-all duration-300 border ${isMobileMenuOpen || isColorChange
                                    ? "bg-white/20 border-black/10 hover:bg-black/10"
                                    : "bg-white/10 border-white/20 hover:bg-white/20"
                                }`}
                        >
                            <Hamburger
                                strokeColor={isMobileMenuOpen || isColorChange ? "black" : "white"}
                                isOpen={isMobileMenuOpen}
                                onToggle={setIsMobileMenuOpen}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="section fixed inset-0 z-[100] hidden flex-col  items-start justify-end bg-white"
                style={{ display: 'none' }}
            >
                {/* Menu Content */}
                <nav className="flex flex-col items-start justify-center gap-8 text-center lists mobileMenu">
                    {navOptions.map((nav, idx) => (
                        <a
                            key={idx}
                            href={nav.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-nav-item text-3xl md:text-4xl font-light text-black
                hover:text-gray-600 transition-colors duration-300 relative group
                will-change-transform"
                            style={{
                                // Prevent text stretching with CSS
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                                transform: 'translateZ(0)',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale'
                            }}
                        >
                            <span className="relative z-10 block">{nav.label}</span>
                        </a>
                    ))}
                </nav>

                {/* Social Links */}
                <div className="mobile-nav-item mt-10 px-8 py-4 bg-white/10 
    backdrop-blur-sm rounded-full border border-black/100 text-black flex items-center gap-5 
    hover:bg-black/20 transition-all duration-300">
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-300"
                    >
                        <MessageCircle className="w-6 h-6 text-black" strokeWidth={1.1} />
                    </a>
                    <a
                        href="tel:+1234567890"
                        className="transition-colors duration-300"
                    >
                        <Phone className="w-6 h-6 text-black" strokeWidth={1.1} />
                    </a>
                    <a
                        href="https://instagram.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-300"
                    >
                        <Instagram className="w-6 h-6 text-black" strokeWidth={1.1} />
                    </a>
                    <a
                        href="mailto:info@friigoo.com"
                        className="transition-colors duration-300"
                    >
                        <Mail className="w-6 h-6 text-black" strokeWidth={1.1} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Header;