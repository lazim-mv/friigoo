"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    // Set theme immediately
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") || "dark";
    root.setAttribute("data-theme", storedTheme);
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    // Custom requestAnimationFrame loop for Lenis
    function raf(time) {
      lenisRef.current.lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup
      lenisRef.current.lenis.destroy();
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smooth: true,
        smoothWheel: true,
        smoothTouch: true,
        syncTouchLerp: 0.01,
        wheelMultiplier: 0.9,
        autoRaf: false, // manual raf
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
