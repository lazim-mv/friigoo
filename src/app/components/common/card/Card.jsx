import React from 'react'
import { MapPin, MessageCircle, PhoneCall } from "lucide-react";
import Image from 'next/image';
import CTAButton from '../CTAButton';

const PackageCard = ({ travelPackages }) => {
    if (!travelPackages || travelPackages.length === 0) return null;

    return (
        <div className="section md:grid flex flex-col grid-cols-3 gap-8 md:gap-6">
            {travelPackages.map((pkg, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center w-full h-fit rounded-lg shadow-2xl overflow-hidden"
                >
                    {/* Image */}
                    <div className="w-full">
                        <Image
                            src={pkg.img}
                            alt={`${pkg.country} package`}
                            className="aspect-[4/3] w-full object-cover"
                            width={500}
                            height={300} // keep this proportional for Next.js optimization
                        />
                    </div>

                    {/* Info */}
                    <div className="w-full flex flex-col items-start px-4">
                        <h3 className="flex gap-2 items-center text-3xl font-medium mt-10 mb-5">
                            <MapPin />
                            {pkg.country}
                        </h3>

                        {/* Icons */}
                        <div className="flex items-center gap-10 w-full mb-5">
                            {pkg.icons.map((icon, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    {icon.icon}
                                    <p>{icon.label}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="mb-5 w-full bg-black/20" />

                        {/* Description */}
                        <p>{pkg.description}</p>

                        <hr className="my-5 w-full bg-black/20" />

                        {/* Actions */}
                        <div className="mb-5 flex justify-between w-full gap-2 flex-wrap">
                            <div className="flex gap-5 md:gap-2 lg:gap-2">
                                <button
                                    className="cursor-pointer p-3 bg-transparent backdrop-blur-sm rounded-lg
                                        hover:bg-black/20 transition-all duration-300 border border-black/20"
                                >
                                    <MessageCircle size={20} color="black" />
                                </button>
                                <button
                                    className="cursor-pointer p-3 bg-transparent backdrop-blur-sm rounded-lg
                                        hover:bg-black/20 transition-all duration-300 border border-black/20"
                                >
                                    <PhoneCall size={20} color="black" />
                                </button>
                            </div>
                            <div className=''>
                                <CTAButton
                                    label="Book Now"
                                    textColor="#0a0a0a"
                                    bgColor="bg-black/10"
                                    borderColor="border-black/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PackageCard;
