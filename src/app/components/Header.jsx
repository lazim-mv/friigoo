import Image from "next/image";
import React from "react";
import logo from "../../../public/logo/logow.png";
import { Search } from "lucide-react";

const Header = () => {

    const navOptions = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/" },
        { label: "Services", href: "/" },
        { label: "Contact Us", href: "/" },
    ]

    return (
        <header className="w-full fixed top-0 left-0 z-50">
            <div className="px-12 py-4 flex items-center justify-between  mx-auto">
                {/* Logo */}
                <div className="w-36 aspect-[7/2] relative">
                    <Image
                        src={logo}
                        alt="Friigoo Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center gap-8 lists">
                    {navOptions.map((nav, idx) => (
                        <a key={idx} href={nav.href} className="text-white text-[16px] hover:text-blue-500 transition letter-spacing-link ">
                            {nav.label}
                        </a>
                    ))}
                </nav>

                {/* Search Icon */}
                <button
                    className=" z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full
                     hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                    <Search size={20} color="white" />
                </button>
            </div>
        </header>

    );
};

export default Header;
