import React from "react";

interface StarRatingProps {
  totalRatings: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalRatings }) => {
  const fullStars = Math.floor(totalRatings);
  const hasHalfStar = totalRatings % 1 !== 0;

  const renderFullStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star-icon text-landingPagePrimaryBg">&#9733;</span>);
    }
    return stars;
  };

  const renderHalfStar = () => {
    return <span className="star-icon text-landingPagePrimaryBg">&#9734;</span>;
  };

  return (
    <div className="star-rating">
      {renderFullStars()}
      {hasHalfStar && renderHalfStar()}
    </div>
  );
};

export default StarRating;
