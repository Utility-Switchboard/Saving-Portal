import React, { useEffect, useState } from "react";
// CSS
import "./FormRating.css";
// Rating stars
import ReactStars from "react-rating-stars-component";
// Components
import Error from '../../Error/Error';

const FormRating = ({ customerInformation, progressBar, updateCustomerInformation, updateShowFormRating, updateShowSuccessFul, updateProgressBar}) => {

    /** STATES */
    // Error State
    const [error, updateError] = useState(false);

    /** FUNCTIONS */
    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Error smooth scroll
    useEffect(() => {
        if (error) {
            const scroll_to = () => {
                var element = document.querySelector("#error");
                // smooth scroll to element and align it at the bottom
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            scroll_to();
        }
    }, [error]);

    // ratingChanged
    const ratingChanged = (newRating) => {
        // Hide error
        updateError(false);
        // Update customer information  
        updateCustomerInformation({
            ...customerInformation,
            customerRating: {
                rating: newRating
            }
        });
    };

    // goToSuccessful
    const goToSuccessful = (e) => {
        e.preventDefault()

        // Validation
        if (!customerInformation.hasOwnProperty('customerRating')) {
            // Show error
            updateError(true);
            return;
        }

        // Hide Form Rating
        updateShowFormRating(false);
        // Show Form Successful
        updateShowSuccessFul(true)
        // Update progress bar
        updateProgressBar({ ...progressBar, step: 11 });
    }

    return (
        <>
            <div className="modal-rating" id="modal-rating" style={{ display: 'flex' }}>
                <form className="modal-rating-content">
                    <div className="rating-container">
                        <h3>How would you rate your experience with us?</h3>

                        <div className="rating">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={50}
                                activeColor="#31145B"
                            />
                            
                        </div>

                        {error ?
                        (
                            <div className="error-center">
                                <Error message={'Please rate our service'} />
                            </div>
                        )
                        :
                        null
                    }
                    </div>

                    <div className="rating-btn-container">
                        <button className="rating-btn" type="submit" onClick={(e) => goToSuccessful(e)}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormRating;
