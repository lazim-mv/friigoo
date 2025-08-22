import React from "react";
import img1 from "../../../../../public/trek/6.jpg";
import img2 from "../../../../../public/trek/2.jpg";
import img3 from "../../../../../public/trek/8.jpg";
import img4 from "../../../../../public/trek/7.jpg";
import ItenarySwiperSlider from "./ItenarySwiperSlider";

const Itenary = () => {
    const travelPackage = [
        {
            day: "Day 1",
            title: "Arrival in Pattaya",
            transport: "01 Van + 01 Car (for luggage)",
            meals: "No meals included",
            content: [
                {
                    type: "description",
                    items: [
                        "Welcome to Pattaya! Upon arrival, our team will assist you with smooth transfers to your hotel.",
                        "Enjoy your first day exploring iconic landmarks and soaking in the local culture.",
                        "Arrival & departure service will have 01 van & 01 car considering luggage (costing is based on this arrangement).",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Arrival at the hotel and check-in",
                        "Visit Big Buddha Temple",
                        "Stop at Pattaya Viewpoint for panoramic city views",
                        "Explore the Pattaya Game Gallery",
                        "Stroll along Walking Street Pattaya (optional nightlife experience)",
                        "Relax at Pattaya Beach",
                    ],
                },
            ],
            img: img1,
        },
        {
            day: "Day 2",
            title: "Coral Island Tour (Join-in SIC)",
            transport: "1 Van (SIC speedboat transfer to Coral Island)",
            meals: "Indian Lunch included",
            content: [
                {
                    type: "description",
                    items: [
                        "Experience the thrill of Pattaya's famous Coral Island adventure.",
                        "This day is perfect for water sports lovers or those who just want to relax by the sea.",
                        "Transfers are arranged by speedboat and include a local Indian lunch.",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Transfer by speedboat to Coral Island (Koh Larn)",
                        "Enjoy optional water activities (at own cost)",
                        "Indian lunch at a local restaurant",
                        "Return to Pattaya and evening at leisure",
                    ],
                },
            ],
            img: img2,
        },
        {
            day: "Day 3",
            title: "Wildlife & Culture",
            transport: "1 Van",
            meals: "No meals included",
            content: [
                {
                    type: "description",
                    items: [
                        "A perfect mix of wildlife encounters and cultural exploration awaits you.",
                        "Spend your day meeting majestic animals and discovering the traditional Thai market atmosphere.",
                        "This is a relaxed day with plenty of free time in the evening.",
                    ],
                },
                {
                    type: "points",
                    items: [
                        "Visit Tiger Park Pattaya – walk around and interact",
                        "Explore Pattaya Floating Market (Entry only)",
                        "Return to hotel and enjoy free time",
                    ],
                },
            ],
            img: img3,
        },
        {
            day: "Day 4",
            title: "Culture, Art & Shopping",
            transport: "1 Van",
            meals: "Lunch included at Nong Nooch Tropical Garden",
            content: [
                {
                    type: "points",
                    items: [
                        "Visit Sanctuary of Truth (Admission included)",
                        "Explore Nong Nooch Tropical Garden (Admission + Cultural show + Lunch included)",
                        "Experience 3D fun at Art in Paradise",
                        "Visit Mini Siam – miniature landmarks from around the world",
                        "Shopping at Terminal 21 Pattaya",
                        "Evening airport transfer for departure",
                        "Visit Sanctuary of Truth (Admission included)",
                        "Explore Nong Nooch Tropical Garden (Admission + Cultural show + Lunch included)",
                        "Experience 3D fun at Art in Paradise",
                        "Visit Mini Siam – miniature landmarks from around the world",
                        "Shopping at Terminal 21 Pattaya",
                        "Evening airport transfer for departure",
                        "Visit Sanctuary of Truth (Admission included)",
                        "Explore Nong Nooch Tropical Garden (Admission + Cultural show + Lunch included)",
                        "Experience 3D fun at Art in Paradise",
                        "Visit Mini Siam – miniature landmarks from around the world",
                        "Shopping at Terminal 21 Pattaya",
                        "Evening airport transfer for departure",
                    ],
                },
                {
                    type: "description",
                    items: [
                        "On your last day in Pattaya, immerse yourself in culture, art, and shopping.",
                        "From majestic temples to lush gardens and interactive museums, this day has it all.",
                        "Wrap up your trip with shopping at Terminal 21 before your departure transfer.",
                    ],
                },
            ],
            img: img4,
        },
    ];

    return (
        <section
            className="
                px-[0px] py-[0px]          /* default mobile */
                sm:px-[0px] sm:py-[40px]    /* ≥415px */
                md:px-[30px] md:py-[0px]    /* ≥769px */
                lg:px-[70px] lg:py-[0px]    /* ≥1034px */
                2xl:px-[140px] 2xl:py-[0px] /* ≥1401px */
                flex-shrink-0
            "
        >
            <div className="mt-10 md:mt-0">
                <div className="md:p-5">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight">
                        Sample Itinerary
                    </h2>
                    <ItenarySwiperSlider pkgs={travelPackage} />
                </div>
            </div>
        </section>
    );
};

export default Itenary;