import React, { useEffect } from "react";
// CSS
import "./FormSuccessful.css";
// Icons 
// import { BsStarFill, BsStar } from 'react-icons/bs';
// Images
import Successful from '../../../assets/img/successful.svg';

const FormSuccessful = ({ }) => {
    /** STATES */

    // Scroll to middle
    useEffect(() => {
        window.scrollTo({ top: window.innerHeight / 5, behavior: 'smooth' });
    }, []);

    const newDeal = (e) => {
        e.preventDefault();

        // Reload page
        window.location.reload();
    }

    return (
        <>
            <section className="successful-section">
                <div className="successful-container">
                    <div className="successful-img-container">
                        <img src={Successful} alt="Successful image" />
                    </div>

                    <div className="successful-message" >
                        <h1>All data has now been submitted successfully.</h1>

                        <h2>Zoho contact has now been updated with new deal</h2>
                    </div>

                    <div className="successful-done-btn-container">
                        <button className="successful-done-btn" type="button" onClick={(e) => newDeal(e)}>Start a new deal</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FormSuccessful;
