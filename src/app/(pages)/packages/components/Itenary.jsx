"use client"
import React from "react";
import ItenarySwiperSlider2 from "./ItenarySwiperSlider2";
import { PackageSearch } from "lucide-react";

const Itenary = ({ travelPackage }) => {
    if (!Array.isArray(travelPackage) || travelPackage.length === 0) {
        return (
            <div className="h-[50vh] flex flex-col items-center justify-center w-full text-gray-500 px-8">
                <PackageSearch size={60} className="mb-4 text-gray-400" />
                <h2 className="text-xl font-semibold">No Packages Found</h2>
                <p className="text-sm text-center mt-2">
                    Try exploring other packages or check back later.
                </p>
            </div>
        )
    }
    return (
        <section
            className="
                px-[0px] py-[0px]          /* default mobile */
                sm:px-[0px] sm:py-[40px]    /* ≥415px */
                md:px-[30px] md:py-[96px]    /* ≥769px */
                lg:px-[70px] lg:py-[96px]    /* ≥1034px */
                2xl:px-[140px] 2xl:py-[96px] /* ≥1401px */
                flex-shrink-0
            "
        >
            <div className="mt-10 md:mt-0">
                <div className="md:p-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight">
                        Sample Itinerary
                    </h2>
                    {/* <ItenarySwiperSlider pkgs={travelPackage} /> */}
                    <ItenarySwiperSlider2 pkgs={travelPackage} />
                </div>
            </div>
        </section>
    );
};

export default Itenary;