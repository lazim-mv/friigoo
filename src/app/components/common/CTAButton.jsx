// components/CTAButton.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CTAButton = ({
    label = "Subscribe",
    route = null, // you can pass "/about-us", "/services", etc.
    onClick,      // still allow custom click logic if needed
    borderColor = "border-white/20",
    textColor = "text-white",
    bgColor = "bg-white/20",
}) => {
    const router = useRouter();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e); // run any custom handler
        }
        if (route) {
            router.push(route); // navigate if route is provided
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`
        w-full
        group/button relative inline-flex items-center justify-center overflow-hidden 
        rounded-md bg-transparent backdrop-blur-lg px-6 py-2
        text-base font-medium transition-all duration-300 ease-in-out
        hover:scale-95 hover:shadow-xl hover:shadow-gray-600/50 
        active:scale-90 active:shadow-lg active:shadow-gray-600/40
        focus:scale-95 focus:shadow-xl focus:shadow-gray-600/50
        cursor-pointer border ${borderColor} ${textColor}
        touch-manipulation select-none
      `}
        >
            <span className="text-[16px] font-normal letter-spacing-link whitespace-nowrap">
                {label}
            </span>

            {/* Shine effect */}
            <div
                className="absolute inset-0 flex h-full w-full justify-center
          [transform:skew(-13deg)_translateX(-100%)]
          group-hover/button:duration-1000
          group-hover/button:[transform:skew(-13deg)_translateX(100%)]
          group-active/button:duration-1000
          group-active/button:[transform:skew(-13deg)_translateX(100%)]
          group-focus/button:duration-1000
          group-focus/button:[transform:skew(-13deg)_translateX(100%)]
        "
            >
                <div className={`relative h-full w-10 ${bgColor}`}></div>
            </div>
        </button>
    );
};

export default CTAButton;
