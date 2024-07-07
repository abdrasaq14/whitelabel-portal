import React, { useState, useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductImageCarouselProps {
  images: string[];
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const mainCarouselRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const mainCarouselSettings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex)
  };

  const thumbnailCarouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    mainCarouselRef.current?.slickGoTo(index);
  };

  return (
    <div>
      <Slider ref={mainCarouselRef} {...mainCarouselSettings}>
        {images.map((image, index) => (
          <div key={index} className='w-full flex h-[150px]'>
            <img src={image} alt={`Product ${index + 1}`} className='object-cover h-full w-full' />
          </div>
        ))}
      </Slider>
      {images.length > 1 && (
        <Slider {...thumbnailCarouselSettings}>
          {images.map((image, index) => (
            <div
              className={`thumbnail-wrapper h-14 w-28 mr-2 border   ${currentSlide === index ? 'active' : ''}`}
              key={index}
              onClick={() => handleThumbnailClick(index)}
            >
              <img className='thumbnail-image object-contain h-full w-full' src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
