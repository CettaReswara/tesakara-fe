import React, { useState, useEffect } from 'react';
import styles from './carousel.module.css';

const AdabCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    'https://lh3.googleusercontent.com/d/1TidtBYJu1LwXmFTsbzebgyyMDt6Qex2a=w810-h810',
    'https://lh3.googleusercontent.com/d/1CzDgfhUD23ALRhIKEk3TiIrkWN1l-iiq=w810-h810',
    'https://lh3.googleusercontent.com/d/1yWDec05FaDqvNHVy0szjY8T6T0wq4Q7U=w810-h810',
    'https://lh3.googleusercontent.com/d/1T3F-_zbaTkvhVssFc9Elluc1rpMmiGSk=w810-h810',
    'https://lh3.googleusercontent.com/d/173NnEs-4zW1I5yXANl0XKCs6s1FQ2NvR=w810-h810',
    // 'https://lh3.googleusercontent.com/d/1uh9TlCzg4VeH4R4S31L7ZFwAK7ibO69K=w810-h810',
  ];



  const totalSlides = slides.length;

  const nextIndex = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevIndex = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextIndex, 5000); 
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlideIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  const nextSlideIndex = (currentIndex + 1) % totalSlides;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Body */}
      <div
        className="flex transition-transform duration-500 ease-linear justify-center"
        // style={{ transform: `translateX(-${currentIndex * 300}%)` }}
      >
        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <div className={`${styles.wrapperl} h-80`}>
            <img
              src={slides[prevSlideIndex]}
              alt={`Previous Slide`}
              className={`${styles.current} object-cover`}
              style={{ filter: 'blur(2px)', opacity: 0.5 }}
            />
          </div>
        </div>

        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <div className={`${styles.wrapper} h-80`}>
            <img
              src={slides[currentIndex]}
              alt={`Current Slide`}
              className={`${styles.current} object-cover`}
              style={{ filter: 'none', opacity: 1 }}
            />
          </div>
        </div>

        <div className="flex-shrink-0 w-full flex justify-center items-center">
          <div className={`${styles.wrapperr} h-80`}>
            <img
              src={slides[nextSlideIndex]}
              alt={`Next Slide`}
              className={`${styles.current} object-cover`}
              style={{ filter: 'blur(2px)', opacity: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Previous Slide Button */}
      <button
        type="button"
        className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-base-100 rounded-full shadow-md opacity-50 hover:opacity-100"
        onClick={prevIndex}
      >
        <span className="icon-[tabler--chevron-left] text-lg"></span>
        <span className="sr-only">Previous</span>
      </button>

      {/* Next Slide Button */}
      <button
        type="button"
        className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-base-100 rounded-full shadow-md opacity-50 hover:opacity-100"
        onClick={nextIndex}
      >
        <span className="icon-[tabler--chevron-right] text-lg"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default AdabCarousel;
