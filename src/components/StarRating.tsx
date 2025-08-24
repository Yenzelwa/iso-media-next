import React from "react"; 
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating
              ? "text-yellow-400 fill-current"
              : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
};
