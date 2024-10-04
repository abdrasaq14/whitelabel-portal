import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductImageCarouselProps {
  media: string[]; // Array of URLs (images or videos)
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ media }) => {
  const mainCarouselRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const mainCarouselSettings = {
    dots: false,
    infinite: media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: media.length > 1,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    mainCarouselRef.current?.slickGoTo(index);
  };

  // Infinite scroll by looping through thumbnails
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (container && media.length > 4) {
      const scroll = () => {
        container.scrollLeft += 1; // Adjust scrolling speed
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0; // Reset to the beginning when reaching the end
        }
      };
      const scrollInterval = setInterval(scroll, 30); // Adjust speed
      return () => clearInterval(scrollInterval); // Clear interval on component unmount
    }
  }, [media]);

  // Function to check if the media is a video based on the file extension
  const isVideo = (url: string) => {
    const videoExtensions = ['mp4', 'webm', 'ogg']; // Add any other video extensions you need
    const extension = url.split('.').pop()?.toLowerCase();
    return extension ? videoExtensions.includes(extension) : false;
  };

  return (
    <div>
      <Slider ref={mainCarouselRef} {...mainCarouselSettings}>
        {media.map((item, index) => (
          <div key={index} className="w-full flex h-[150px]">
            {isVideo(item) ? (
              <video controls className="object-cover h-full w-full">
                <source src={item} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item} alt={`Media ${index + 1}`} className="object-cover h-full w-full" />
            )}
          </div>
        ))}
      </Slider>

      <div
        className="thumbnail-container w-full mt-4 overflow-x-auto whitespace-nowrap flex"
        ref={thumbnailContainerRef}
      >
        {media.map((item, index) => (
          <div
            className={`thumbnail-wrapper h-14 w-28 inline-block cursor-pointer border ${currentSlide === index ? 'active' : ''
              }`}
            key={index}
            onClick={() => handleThumbnailClick(index)}
            style={{ marginRight: '10px' }}
          >
            {isVideo(item) ? (
              <video className="thumbnail-image object-contain h-full w-full">
                <source src={item} type="video/mp4" />
              </video>
            ) : (
              <img className="thumbnail-image object-contain h-full w-full" src={item} alt={`Thumbnail ${index + 1}`} />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
