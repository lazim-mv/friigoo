// components/CTAButton.jsx
import React from "react";

const CTAButton = ({
    label = "Subscribe",
    onClick,
    borderColor = "border-white/20",
    textColor = "text-white",
    bgColor = "bg-white/20"
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        group/button relative inline-flex items-center justify-center overflow-hidden 
        rounded-md bg-transparent backdrop-blur-lg px-6 py-2
        text-base font-medium transition-all duration-300 ease-in-out
        hover:scale-95 hover:shadow-xl hover:shadow-gray-600/50 cursor-pointer
        border ${borderColor} ${textColor}
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
        group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
            >
                <div className={`relative h-full w-10 ${bgColor}`}></div>
            </div>
        </button>
    );
};

export default CTAButton;
