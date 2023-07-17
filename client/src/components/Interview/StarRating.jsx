import React, { useState } from "react";
import { AiFillFire } from "react-icons/ai";

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex justify-center	items-center">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
            <label key={ratingValue} className="pb-1">
                <input
                type="radio"
                className="hidden"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                />
                <AiFillFire 
                className="cursor-pointer"
                color={ratingValue <= (hover || rating) ? "#bf1111" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                size={30}

                />
            </label>
        )
      })}
    </div>
  )
}
