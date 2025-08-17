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
  ;

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

      {isReady && children}
    </>
  );
}






