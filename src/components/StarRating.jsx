import React from 'react';

function StarRating({ rating }) {
    const stars = [];
    for (let i = 1; 1 <= 5; i++) {
        if (i <= rating) {
            stars.push(<i className="fas fa-star"></i>)
        }
        else {
            stars.push(<i className="far fa-star"></i>)
        }
    }
    return (
        <>
            {stars}
        </>
    )
}

export default StarRating;