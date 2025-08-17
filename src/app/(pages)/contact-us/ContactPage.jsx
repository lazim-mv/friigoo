"use client"
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from '@/app/utils/gsapInit';

const ContactPage = () => {
    const containerRef = useRef(null);
    const leftContentRef = useRef(null);
    const rightFormRef = useRef(null);
    const headingRef = useRef(null);
    const subtitleRef = useRef(null);
    const contactDetailsRef = useRef([]);
    const formFieldsRef = useRef([]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    useGSAP(() => {
        // Set initial states
        gsap.set(headingRef.current, { opacity: 0, y: 50 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        gsap.set(contactDetailsRef.current, { opacity: 0, x: -30 });
        gsap.set(formFieldsRef.current, { opacity: 0, x: 30 });

        // Create timeline for entrance animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate heading and subtitle
        tl.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")

            // Animate contact details
            .to(contactDetailsRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.3")

            // Animate form fields
            .to(formFieldsRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="section min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1
                        ref={headingRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-6"
                    >
                        Get in touch
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-gray-600 text-lg max-w-2xl mx-auto"
                    >
                        Write to us for personalized travel advice or for information on
                        group travel and last minute travel, all travel is insured and
                        safe.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left side - Contact Information */}
                    <div ref={leftContentRef} className="space-y-8">
                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div
                                ref={el => contactDetailsRef.current[0] = el}
                                className="text-gray-700"
                            >
                                <p className="text-lg">
                                    <span className="font-medium">Email:</span> info@friigoo.com
                                </p>
                            </div>

                            <div
                                ref={el => contactDetailsRef.current[2] = el}
                                className="text-gray-700"
                            >
                                <p className="text-lg">
                                    <span className="font-medium">Phone Number:</span> +91 989709085
                                </p>
                            </div>

                        </div>

                        {/* Address */}
                        <div
                            ref={el => contactDetailsRef.current[4] = el}
                            className="text-gray-700 pt-8 border-t border-gray-200"
                        >
                            <div className="space-y-2">
                                <p className="text-lg">friigoo,Kozhikode Kallai</p>
                                <p className="text-lg">Kerala</p>
                                <p className="text-lg">673003</p>
                                <p className="text-lg">India</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Contact Form */}
                    <div ref={rightFormRef}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div ref={el => formFieldsRef.current[0] = el}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent outline-none transition-all duration-200"
                                    />
                                </div>
                                <div ref={el => formFieldsRef.current[1] = el}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent outline-none transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Phone field with country code */}
                            <div ref={el => formFieldsRef.current[2] = el} className="flex">
                                <div className="flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3">
                                    <span className="text-2xl mr-2">🇮🇳</span>
                                    <span className="text-gray-600">+</span>
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[var(--highlight)]  focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>

                            {/* Email field */}
                            <div ref={el => formFieldsRef.current[3] = el}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--highlight)]  focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>

                            {/* Message field */}
                            <div ref={el => formFieldsRef.current[4] = el}>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--highlight)]  focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                                />
                            </div>




                            {/* Submit button */}
                            <div ref={el => formFieldsRef.current[6] = el} className="pt-4">
                                <button
                                    type="submit"
                                    className="cursor-pointer w-full bg-[var(--highlight)] text-white py-3 px-6 rounded-lg hover:opacity-80 transition-colors duration-200 font-medium text-lg"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;