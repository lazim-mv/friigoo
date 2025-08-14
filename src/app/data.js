import { Clock, CircleDollarSign, } from "lucide-react";
import img1 from '../../public/cards/thai.jpg'
import img2 from '../../public/cards/thai2.jpg'
import img3 from '../../public/cards/newz.jpg'

export const travelPackages = [
    {
        country: "Thailand",
        duration: "1 Week",
        price: 490,
        img: img1,
        description:
            "Visit the temples and the Chiang Mai Night Bazaar, a bustling night market located on Chiang Klan Road.",
        icons: [
            { icon: <Clock size={16} />, label: "1 Week" },
            { icon: <CircleDollarSign size={16} />, label: "Price: 490" },
        ],

    },
    {
        country: "Greece",
        duration: "5 Days",
        price: 850,
        img: img2,
        description:
            "Experience the stunning whitewashed houses, blue domes, and sunsets over the caldera.",
        icons: [
            { icon: <Clock size={16} />, label: "5 Days" },
            { icon: <CircleDollarSign size={16} />, label: "Price: 490" },
        ],

    },
    {
        country: "Japan",
        duration: "8 Days",
        price: 1100,
        img: img3,
        description:
            "Explore ancient temples, traditional tea houses, and the scenic Arashiyama bamboo forest.",
        icons: [
            { icon: <Clock size={16} />, label: "8 Days" },
            { icon: <CircleDollarSign size={16} />, label: "Price: 490" },
        ],

    },
];