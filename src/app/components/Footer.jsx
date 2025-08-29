import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import logo1 from "../../../public/logo/logow.png";

const navOptions = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white section footer"
            style={{ paddingBottom: "0" }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mt-8 md:mt-0">
                {/* Logo & Description */}
                <div className="col-span-1 flex flex-col gap-10">
                    <Image src={logo1} alt="Friigoo Logo" width={150} height={50} />
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Friigoo brings you curated travel packages, guided tours, and
                        unforgettable adventures to the most stunning destinations around
                        the globe.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 md:mb-8 lg:mb-10">Quick Links</h3>
                    <ul className="flex flex-col gap-4 lists">
                        {navOptions.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="text-gray-400 hover:text-white transition"
                                    style={{
                                        letterSpacing: "normal",
                                        color: "#99a1af",
                                    }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 md:mb-8 lg:mb-10">Contact Us</h3>
                    <div className="flex flex-col gap-4 lists">
                        <p className="text-gray-400 text-sm">
                            123 Friigoo Street,<br /> Wanderlust City, TravelLand
                        </p>
                        <a
                            href="tel:1234567890"
                            className="text-gray-400 text-sm  flex gap-2 items-center w-max"
                            style={{
                                letterSpacing: "normal",
                                color: "#99a1af",
                            }}
                        >
                            <Phone size={16} /> +1 (234) 567-890
                        </a>
                        <a
                            href="mailto:info@friigoo.com"
                            className="text-gray-400 text-sm  flex gap-2 items-center w-max"
                            style={{
                                letterSpacing: "normal",
                                color: "#99a1af",
                            }}
                        >
                            <Mail size={16} /> info@friigoo.com
                        </a>
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-6 md:mb-8 lg:mb-10">Follow Us</h3>
                    <div className="flex gap-4 text-gray-400 flex-col lists">
                        <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-max transition flex gap-2 items-center"
                        >
                            <Linkedin size={22} strokeWidth={1.5} /> LinkedIn
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-max transition flex gap-2 items-center"
                        >
                            <Instagram size={22} strokeWidth={1.5} /> Instagram
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-max transition flex gap-2 items-center"
                        >
                            <Facebook size={22} strokeWidth={1.5} /> Facebook
                        </a>
                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-max transition flex gap-2 items-center"
                        >
                            <MessageCircle size={22} strokeWidth={1.5} /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center
            gap-2 justify-between border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm pb-5 lists">
                <p>© {new Date().getFullYear()} Friigoo. All rights reserved.</p>
                <a href="https://lazim-mv.vercel.app/" className="w-max" target="_blank">Site by: Lazim Mv </a>
            </div>
        </footer>
    );
};

export default Footer;
