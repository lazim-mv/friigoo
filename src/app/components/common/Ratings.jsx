"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Ratings({ classes }) {
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    setRating((Math.random() * (4.9 - 4.1) + 4.1).toFixed(1));
    setReviews(Math.floor(Math.random() * (399 - 101 + 1) + 101));
  }, []);

  if (!rating) return null; // prevent rendering on server

  return (
    <div className={`meta-icons flex ${classes} items-center gap-2`}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {rating} ({reviews} reviews)
      </span>
    </div>
  );
}
