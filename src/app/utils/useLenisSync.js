"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useLenisSync() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;

        const update = () => ScrollTrigger.update();
        lenis.on("scroll", update);

        return () => {
            lenis.off("scroll", update);
        };
    }, [lenis]);
}
