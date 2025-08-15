"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import logow from "../../../public/logo/logow.png"; // white logo
import logob from "../../../public/logo/logo.png"; // black logo
import { Search } from "lucide-react";
import { useGSAP } from "@gsap/react";

const Header = () => {
    const headerRef = useRef(null);
    const [isColorChange, setIsColorChange] = useState(false);

    const navOptions = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/" },
        { label: "Services", href: "/" },
        { label: "Contact Us", href: "/" },
    ];

    useGSAP(() => {
        (async () => {
            const gsapModule = await import("../utils/gsapInit");
            const gsap = gsapModule.default;
            const { ScrollTrigger } = gsapModule;

            const headerEl = headerRef.current;

            ScrollTrigger.create({
                trigger: "#hero",
                start: "bottom top",
                onEnter: () => setIsColorChange(true),
                onLeaveBack: () => setIsColorChange(false),
            });

            let lastScroll = 0;
            window.addEventListener("scroll", () => {
                const currentScroll = window.scrollY;
                if (currentScroll > lastScroll && currentScroll > 100) {
                    gsap.to(headerEl, { y: -100, duration: 0.3, ease: "power2.out" });
                } else {
                    gsap.to(headerEl, { y: 0, duration: 0.3, ease: "power2.out" });
                }
                lastScroll = currentScroll;
            });
        })();
    }, []);

    return (
        <header
            ref={headerRef}
            className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${isColorChange ? "bg-white" : ""}`}
        >
            <div className="px-8 md:px-12 py-4 flex items-center justify-between mx-auto">
                {/* Logo */}
                <div className="w-36 aspect-[7/2] relative">
                    <Image
                        src={isColorChange ? logob : logow}
                        alt="Friigoo Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 lists">
                    {navOptions.map((nav, idx) => (
                        <a
                            key={idx}
                            href={nav.href}
                            className={`   ${isColorChange ? "text-black" : "text-white"
                                }`}
                        >
                            {nav.label}
                        </a>
                    ))}
                </nav>

                {/* Search Icon */}
                <button
                    className={`z-20 p-3 backdrop-blur-sm rounded-full transition-all duration-300 border ${isColorChange
                        ? "bg-white/10 border-black/10 hover:bg-black/10"
                        : "bg-white/10 border-white/20 hover:bg-white/20"
                        }`}
                >
                    <Search size={20} color={isColorChange ? "black" : "white"} />
                </button>
            </div>
        </header >
    );
};

export default Header;
