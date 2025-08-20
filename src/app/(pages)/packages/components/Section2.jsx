import { Map } from 'lucide-react';
import React from 'react'

const Section2 = () => {
    const packageHighlights = [
        "Private guided hiking and biking excursions",
        "Explore Ireland’s natural ruins",
        "Adventure Seeking",
        "Castle Stays",
        "Cliffs of Moher & The Wild Atlantic Way",
    ];
    return (

        <div
            className="
    px-[30px] py-[40px]          /* default mobile */
    sm:px-[30px] sm:py-[40px]    /* ≥415px */
    md:px-[30px] md:py-[96px]    /* ≥769px */
    lg:px-[70px] lg:py-[96px]    /* ≥1034px */
    2xl:px-[140px] 2xl:py-[96px] /* ≥1401px */
  "
        >
            <div className='md:p-16 bg-white max-w-6xl mx-auto shadow-lg rounded-lg p-4 md:shadow-none'>
                <h2
                    className="text-3xl md:text-4xl lg:text-6xl mb-6 md:mb-8 lg:mb-10 text-center drop-shadow-lg leading-tight"
                >
                    Highlights
                </h2>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center '>
                    <ul className='space-y-3 md:space-y-0 md:space-x-6 pl-[30px] md:pl-0'>
                        {packageHighlights.map((point, index) => (
                            <li key={index} className='text-[17px] font-light leading-relaxed list-disc'>{point}</li>
                        ))}
                    </ul>
                    <div className="order-[-1] md:order-1 flex flex-col md:flex-row gap-4 mb-10 md:mb-0 pb-10 md:pb-0 items-center border-b md:border-b-0 md:border-l border-black md:pl-9">
                        <Map strokeWidth={.5} size={32} className='w-14 h-14 md:w-16 md:h-16 hidden md:block' />
                        <h3 className='text-[17px] font-light leading-relaxed text-center md:text-left'>Mayo, Connemara, Galway, Clare</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section2