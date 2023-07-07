import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"

export default function StarRating() {
const [rating, setRating] = useState(null);
const [hover, setHover] = useState(null);

  return (
    <div className='flex flex-wrap'>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
            <label>
                <input type='radio' 
                  id='star' 
                  className='hidden' 
                  value={ratingValue} 
                  onClick={()=> setRating(ratingValue)} 

                  />
                <FaStar size={30} 
                 className='cursor-pointer' 
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                 color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} />
            </label>
        )
      })}
    </div>
  )
}
