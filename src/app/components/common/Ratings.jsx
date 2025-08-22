import { Star } from "lucide-react";

export default function Ratings({ classes, }) {
    // random rating between 4.1 and 4.9
    const rating = (Math.random() * (4.9 - 4.1) + 4.1).toFixed(1);

    // random reviews between 101 and 399
    const reviews = Math.floor(Math.random() * (399 - 101 + 1) + 101);

    return (
        <div className={`meta-icons flex ${classes} items-center gap-2`}>
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
                {rating} ({reviews} reviews)
            </span>
        </div>
    );
}
