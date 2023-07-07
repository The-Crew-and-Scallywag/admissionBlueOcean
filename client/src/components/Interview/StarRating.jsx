import React, { useState } from 'react';
import { AiFillFire } from 'react-icons/ai';

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className='flex flex-wrap'>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type='radio'
              id='star-radio'
              className='hidden'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <AiFillFire
              id='star-icon'
              size={30}
              className='cursor-pointer'
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              color={ratingValue <= (hover || rating) ? '#bf2534' : '#e4e5e9'}
            />
          </label>
        );
      })}
    </div>
  );
}
