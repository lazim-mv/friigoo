"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export const cleanupGsap = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.clearMatchMedia();
  ScrollTrigger.refresh();
};

export { ScrollTrigger, SplitText };
export default gsap;
