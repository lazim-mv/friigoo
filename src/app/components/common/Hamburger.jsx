import React, { useEffect, useRef } from 'react'
import '../../styles/hamburger.css'

const Hamburger = ({ strokeColor = "black", isOpen = false, onToggle }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.checked = isOpen;
        }
    }, [isOpen]);

    return (
        <label className="hamburger">
            <input
                ref={inputRef}
                type="checkbox"
                onChange={(e) => onToggle?.(e.target.checked)}
            />
            <svg viewBox="0 0 32 32" className="w-7">
                <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    stroke={strokeColor}
                    strokeWidth="2"
                    fill="none"
                />
                <path
                    className="line"
                    d="M7 16 27 16"
                    stroke={strokeColor}
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
        </label>
    )
}

export default Hamburger
