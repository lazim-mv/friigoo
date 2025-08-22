// components/CTAButton.jsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

const CTAButton = ({
    label = "Subscribe",
    route = null,
    onClick,
    textColor = "text-white",
    borderColor = "border-white/20",
    bgColor = "bg-white/20",
    disableScale = false,
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
  rounded-full bg-transparent backdrop-blur-lg px-6 py-2
  text-base font-medium transition-all duration-300 ease-in-out

  active:shadow-lg hover:shadow-gray-600/50 active:shadow-gray-600/40
  focus:shadow-gray-600/50
  group
  cursor-pointer border ${borderColor} ${textColor}
  touch-manipulation select-none
`}
        >
            <span className="text-[16px] font-normal  whitespace-nowrap flex gap-2 items-center">
                {label}
                <ArrowRight strokeWidth={1} className="w-5 h-5 transition-transform rotate-[-45deg] duration-300 group-hover:rotate-[-0deg]" />
            </span>

            {/* Shine effect */}
            <div
                className="absolute inset-0 flex h-full w-full justify-center
                rounded-full
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
