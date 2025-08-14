"use client";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisScrollWrapper({ children }) {
    const lenis = useLenis();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!lenis) return;

        const update = () => ScrollTrigger.update();
        lenis.on("scroll", update);

        setMounted(true);

        return () => {
            lenis.off("scroll", update);
        };
    }, [lenis]);

    if (!mounted) return null;

    return <>{children}</>;
}
