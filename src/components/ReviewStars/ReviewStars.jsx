import React, { useState, useEffect } from "react";
// Styles
import "./ReviewStars.css";
// Icons 
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

function ReviewStars({ stars, customClass }) {
    const [five_stars, update_five_stars] = useState(false);
    const [four_and_half_stars, update_four_and_half_stars] = useState(false);
    const [four_stars, update_four_stars] = useState(false);

    useEffect(() => {
        if (stars === 5) {
            update_five_stars(true);
        }

        if (stars === 4.5) {
            update_four_and_half_stars(true);
        }

        if (stars === 4) {
            update_four_stars(true);
        }

    }, [stars])

    return (
        <>
            {/* Five stars */}
            {five_stars ?
                (
                    <div className={customClass ? "customClass" : "form-compare-card-rating-container"}>
                        <p>Green rating</p>
                        <div className="form-compare-card-rating-icon-container">
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                        </div>
                    </div>
                )
                :
                null
            }

            {/* Four and a half stars */}
            {four_and_half_stars ?
                (
                    <div className={customClass ? "customClass" : "form-compare-card-rating-container"}>
                        <p>Green rating</p>
                        <div className="form-compare-card-rating-icon-container">
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarHalf className="form-compare-card-rating-icon" />
                        </div>
                    </div>
                )
                :
                null
            }

            {/* Four stars */}
            {four_stars ?
                (
                    <div className={customClass ? "customClass" : "form-compare-card-rating-container"}>
                        <p>Green rating</p>
                        <div className="form-compare-card-rating-icon-container">
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStarFill className="form-compare-card-rating-icon" />
                            <BsStar className="form-compare-card-rating-icon" />
                        </div>
                    </div>
                )
                :
                null
            }
        </>
    )
}

export default ReviewStars;
