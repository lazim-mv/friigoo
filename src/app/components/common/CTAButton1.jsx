// components/CTAButton.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const CTAButton = ({
    label = "Subscribe",
    route = null,
    onClick,
    textColor = "text-white",
    borderColor = "border-white/20",
    bgColor = "bg-white/20",
    disableScale = false,
    hoverText = true,
}) => {
    const router = useRouter();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (route) {
            router.push(route);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`cursor-pointer
                group relative inline-flex items-center justify-center
                px-8 py-3 rounded-full overflow-hidden
                bg-transparent border ${borderColor} ${textColor}
                text-[15px] font-medium letter-spacing-wide
                transition-all duration-500 ease-out
                hover:shadow-lg hover:shadow-black/10
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-black/20
                backdrop-blur-sm
                ${disableScale ? '' : 'hover:scale-105'}
                touch-manipulation select-none
            `}
        >
            {/* Background fill effect */}
            {/* absolute inset-0 ${bgColor.replace('/20', '/5')}  */}
            <div
                className={`
                    absolute inset-0 bg-black/30 
                    scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus:scale-x-100
                    transition-transform duration-500 ease-out origin-left
                    rounded-full
                `}
            />
{/* ${hoverText ? "group-hover:text-[var(--highlight)]" : "text-white"} transition-colors duration-300`} */}
            {/* Content */}
            <span className={`relative z-10 flex items-center gap-2.5 
            ${hoverText ? "group-hover:text-white" : "group-hover:text-white"} transition-colors duration-300`}
            >
                {label}
                <ArrowRight
                    strokeWidth={1.5}
                    className="w-4 h-4 transition-all duration-300 
                               group-hover:translate-x-1 group-active:translate-x-2"
                />
            </span>

            {/* Subtle border glow */}
            <div
                className={`
                    absolute inset-0 rounded-full opacity-0 
                    group-hover:opacity-20 transition-opacity duration-500
                    border ${borderColor.replace('/20', '/40')}
                    scale-110
                `}
            />
        </button>
    );
};

export default CTAButton;