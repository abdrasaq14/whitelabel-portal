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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentSlide(newIndex)
  };

  const thumbnailCarouselSettings = {
    dots: false,
    infinite: true,
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
          <div key={index} className='w-full h-[150px]  '>
            <img src={image} alt={`Product ${index + 1}`} className='object-cover h-full w-full' />
          </div>
        ))}
      </Slider>
      <Slider {...thumbnailCarouselSettings}>
        {images.map((image, index) => (
          <div className='grid grid-cols-4 h-28 w-14 gap-1 ' key={index} onClick={() => handleThumbnailClick(index)}>
            <img className='col-span-1 object-cover h-full w-full ' src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}


