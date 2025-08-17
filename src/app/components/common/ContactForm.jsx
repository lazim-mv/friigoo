"use client";
import Image from "next/image";
import { Phone, Instagram, Mail, MessageCircle } from "lucide-react";
import img1 from "../../../../public/about-page/2.jpg";
import CTAButton from "./CTAButton";
import { useGSAP } from "@gsap/react";
import gsap from "@/app/utils/gsapInit";
import { useRef } from "react";

const ContactForm = () => {
    const titleRef = useRef(null);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const formRef = useRef(null);
    const formTitleRef = useRef(null);
    const formDescRef = useRef(null);
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const socialLinksRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );

        tl.fromTo(
            containerRef.current,
            { opacity: 0, y: 80, rotationX: -10, transformPerspective: 1000 },
            { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: "power3.out" },
            "-=0.6"
        );

        tl.fromTo(
            imageRef.current,
            { opacity: 0, x: -100, scale: 1.1, borderRadius: "0px" },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                borderRadius: "8px",
                duration: 1.2,
                ease: "power2.out",
            },
            "-=1.0"
        );

        tl.fromTo(
            formTitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.8"
        ).fromTo(
            formDescRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        );

        tl.fromTo(
            inputRefs.current,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.15,
            },
            "-=0.4"
        );

        tl.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8, rotationY: -15 },
            {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
            },
            "+=0.1"
        );

        tl.fromTo(
            socialLinksRef.current,
            { opacity: 0, scale: 0,  },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.1,
            },
            "-=0.5"
        );
    }, []);

    const handleInputFocus = (e) => {
        gsap.to(e.target, {
            scale: 1.02,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            borderColor: "rgb(59 130 246)",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleInputBlur = (e) => {
        gsap.to(e.target, {
            scale: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleSocialHover = (e, color) => {
        gsap.to(e.currentTarget, {
            scale: 1.3,
            rotation: 12,
            color: color,
            duration: 0.3,
            ease: "back.out(1.7)",
        });
    };

    const handleSocialLeave = (e) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            rotation: 0,
            color: "#6b7280",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <section className="section w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center leading-tight drop-shadow-lg"
            >
                Get in Touch
            </h2>
            <div
                ref={containerRef}
                className="flex flex-col md:flex-row shadow-2xl rounded-lg max-w-7xl mx-auto overflow-hidden"
            >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <div ref={imageRef} className="h-full w-full">
                        <Image
                            src={img1}
                            fill
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            alt="Beautiful Tourist Place by Friigoo"
                        />
                    </div>
                </div>

                {/* Form Section */}
                <form
                    ref={formRef}
                    className="bg-white w-full md:w-1/2 p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col justify-center"
                >
                    <div className="space-y-4">
                        <h3
                            ref={formTitleRef}
                            className="text-xl sm:text-2xl font-medium text-center mb-4"
                        >
                            Plan Your Trip
                        </h3>
                        <p
                            ref={formDescRef}
                            className="text-sm sm:text-base text-center mb-6 md:mb-8"
                        >
                            Write to us for personalized travel advice or for information on
                            group travel and last minute travel, all travel is insured and
                            safe.
                        </p>
                        <input
                            ref={(el) => (inputRefs.current[0] = el)}
                            type="text"
                            placeholder="Your Name"
                            className="w-full border border-black/20 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none transition-all duration-300"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <input
                            ref={(el) => (inputRefs.current[1] = el)}
                            type="email"
                            placeholder="Your Email"
                            className="w-full border border-black/20 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none transition-all duration-300"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <textarea
                            ref={(el) => (inputRefs.current[2] = el)}
                            placeholder="Your Message"
                            rows={4}
                            className="w-full border border-black/20 rounded-md px-4 py-2 text-sm sm:text-base focus:outline-none transition-all duration-300"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        ></textarea>

                        {/* Submit Button */}
                        <div ref={buttonRef} className="mt-4">
                            <CTAButton
                                label="Submit"
                                textColor="#0a0a0a"
                                bgColor="bg-black/10"
                                borderColor="border-black/40"
                            />
                        </div>

                        {/* Contact Links */}
                        <div className="flex justify-center gap-6 mt-6 text-xl sm:text-2xl text-gray-600">
                            <a
                                ref={(el) => (socialLinksRef.current[0] = el)}
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-300"
                                onMouseEnter={(e) => handleSocialHover(e, "#10b981")}
                                onMouseLeave={handleSocialLeave}
                            >
                                <MessageCircle className="w-6 h-6" />
                            </a>
                            <a
                                ref={(el) => (socialLinksRef.current[1] = el)}
                                href="tel:+1234567890"
                                className="transition-colors duration-300"
                                onMouseEnter={(e) => handleSocialHover(e, "#3b82f6")}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Phone className="w-6 h-6" />
                            </a>
                            <a
                                ref={(el) => (socialLinksRef.current[2] = el)}
                                href="https://instagram.com/yourpage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors duration-300"
                                onMouseEnter={(e) => handleSocialHover(e, "#ec4899")}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                ref={(el) => (socialLinksRef.current[3] = el)}
                                href="mailto:info@friigoo.com"
                                className="transition-colors duration-300"
                                onMouseEnter={(e) => handleSocialHover(e, "#ef4444")}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
