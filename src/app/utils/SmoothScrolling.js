"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap, { ScrollTrigger } from "./gsapInit";
// import LoadingScreen from "../components/common/LoadingScreen";
import { usePathname } from "next/navigation";

export default function SmoothScrolling({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement
    const stored = localStorage.getItem('theme')
    if (stored) {
      root.classList.toggle('dark', stored === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
    }
  }, [])

  useEffect(() => {
    const initializeScroll = async () => {
      try {
        // Step 1: Initialize Lenis
        const lenis = new Lenis({
          // lerp: 0.075,
          lerp: 0.09,
          smooth: true,
          smoothWheel: true,
          smoothTouch: true,
          syncTouchLerp: 0.01,
          wheelMultiplier: 0.9,
        });

        lenisRef.current = lenis;
        // Random progress between 1-25
        setLoadingProgress(Math.floor(Math.random() * 25) + 1); // 1 to 25

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Step 2: Sync Lenis with GSAP
        gsap.ticker.add(() => {
          lenis.raf(performance.now());
        });

        // Random progress between 25-50
        setLoadingProgress(Math.floor(Math.random() * 26) + 25); // 25 to 50
        await new Promise(resolve => setTimeout(resolve, 100));

        // Step 3: Setup ScrollTrigger
        ScrollTrigger.defaults({ scroller: lenis.wrapper });

        ScrollTrigger.scrollerProxy(lenis.wrapper, {
          scrollTop(value) {
            return value !== undefined ? lenis.scrollTo(value) : lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: lenis.wrapper?.style.transform ? "transform" : "fixed",
        });

        ScrollTrigger.addEventListener("refresh", () => { });
        ScrollTrigger.refresh();

        // Random progress between 50-90
        setLoadingProgress(Math.floor(Math.random() * 18) + 80); // 50 to 90
        await new Promise(resolve => setTimeout(resolve, 100));

        // Step 4: Finalization
        isReady && setLoadingProgress(100); // Always 100 at the end
        await new Promise(resolve => setTimeout(resolve, 400)); // Let user see 100%

        setIsReady(true);

      } catch (error) {
        console.error("Error initializing smooth scrolling:", error);
        setIsReady(true); // Show content even if initialization fails
      }
    };

    initializeScroll();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <>

      {/* <LoadingScreen isReady={isReady} loadingProgress={loadingProgress} /> */}

      {children}
    </>
  );
}






