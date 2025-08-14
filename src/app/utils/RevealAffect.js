"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@react-hook/window-size";

const RevealAffect = ({
  children,
  speed = 1,
  id = "reveal",
  className,
  height,
  width,
  start,
  end,
  endTop,
}) => {
  const trigger = useRef();
  const target = useRef();

  gsap.registerPlugin(ScrollTrigger);

  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    const y = windowHeight * speed * 0.1;
    const setY = gsap.quickSetter(target.current, "y", "px");

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        // markers: true,
        onUpdate: (e) => {
          setY((1 - e.progress) * y);
        },
      },
    });

    // Animation to change opacity
    gsap.to(target.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: trigger.current,
        start: `top ${start ? start : 90}%`,
        end: `${endTop ? endTop : "center"} ${end ? end : 20}%`,
        scrub: true,
        // markers: true,
      },
    });

    return () => {
      timeline?.kill();
    };
  }, [id, speed, windowHeight]);

  return (
    <div ref={trigger} className={className}>
      <div
        ref={target}
        style={{
          opacity: 0,
          height: height,
          width: width,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RevealAffect;
