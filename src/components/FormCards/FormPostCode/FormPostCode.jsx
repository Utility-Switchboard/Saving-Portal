import React, { useState, useEffect } from "react";
// CSS
import "./FormPostCode.css";

// Components
import FormScript from '../FormScript/FormScript';
import Error from '../../Error/Error';

// Images
import saving_icon from '../../../assets/img/savings.png';
import trustpilot from '../../../assets/img/trustpilot.png';

const FormPostCode = ({ addPostCodeData, progressBar, showScript, updateShowFormPostCode, updateShowFormAddres, updateProgressBar, updateShowScript }) => {
  /** STATES */

  // Post Code State
  const [postCodeData, updatePostCodeData] = useState({
    postcode: "",
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Error State
  const [errorPostcode, updateErrorPostcode] = useState(false);

  /** FUNCTIONS */

  // Error smooth scroll
  useEffect(() => {
    if (errorPostcode) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to()
    }
  }, [errorPostcode]);

  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    // Hidde error
    updateErrorPostcode(false);
    // Update Postcode
    updatePostCodeData({
      ...postCodeData,
      [e.target.name]: e.target.value.replace(/[^\w\s]/gi, '').trim(),
    });
  };

  // Extract values
  const { postcode } = postCodeData;
  // const { search } = searchInput;

  // Submit postcode
  const submitPostcode = (e) => {
    e.preventDefault();

    const postcode_raw = postCodeData.postcode;

    // Error to true
    if (postcode_raw.trim() === "") {
      // Show error
      updateErrorPostcode(true);
      // Stop app
      return;
    } else {
      /**--Postcode structure */
      // Postcode unformatted
      let postcode_unformatted = postcode_raw;
      // Postcode without spaces
      let postcode_unformatted_no_space = postcode_unformatted.replace(/ /g, '');
      // Postcode formated
      let postcode_formated = '';

      if ((postcode_unformatted_no_space.length < 5) || (postcode_unformatted_no_space.length > 8)) {
        // Show error
        updateErrorPostcode(true);
        // Stop app
        return;
      } else {
        // For a postcode structure AN-NAA
        if (postcode_unformatted_no_space.length === 5) {
          // First two chars 
          let first_two = postcode_unformatted_no_space.slice(0, 2);
          // Last three chars
          let last_three = postcode_unformatted_no_space.slice(2, 5);
          // Formated Postcode
          postcode_formated = first_two + ' ' + last_three;
        }

        // For a postcode structure ANN-NAA, AAN-NAA, ANA-NAA
        if (postcode_unformatted_no_space.length === 6) {
          // First three chars 
          let first_three = postcode_unformatted_no_space.slice(0, 3);
          // Last three chars
          let last_three = postcode_unformatted_no_space.slice(3, 6);
          // Formated Postcode
          postcode_formated = first_three + ' ' + last_three;
        }

        // For a postcode structure AANN-NAA, AANA-NAA
        if (postcode_unformatted_no_space.length === 7) {
          // First three chars 
          let first_four = postcode_unformatted_no_space.slice(0, 4);
          // Last three chars
          let last_three = postcode_unformatted_no_space.slice(4, 7);
          // Formated Postcode
          postcode_formated = first_four + ' ' + last_three;
        }

        // Validation passed - delete message
        updateErrorPostcode(false);
        // Add postcode to customerData
        addPostCodeData(postcode_formated);
        // Hidde Form Post Code
        updateShowFormPostCode(false);
        // Show Form Address
        updateShowFormAddres(true);
        // Update porgress bar
        updateProgressBar({ ...progressBar, step: 1 });
      }
    }
  };

  // Handle click for Show Script
  const handleClick = (e) => {
    e.preventDefault();
    // Update Show Script
    updateShowScript(!showScript);
  }

  return (
    <>
      <section className="postcode-header-section">
        <div>
          <div className="postcode-header animate__animated animate__bounceInLeft">
            <h1>Utility Switchboard</h1>
            <h1><span>Savings Portal</span>.</h1>
          </div>

          <div className="postcode-script">
            <button className="animate__animated animate__bounceInLeft" onClick={(e) => handleClick(e)}>Start script<span></span></button>
          </div>
        </div>

        <div className="postcode-img">
          <img className="animate__animated animate__zoomIn" src={saving_icon} alt="Saving icon" />
        </div>
      </section>

      <section className="postcode-input-section">
        <div className="postcode-input-container">
          <div>
            <h2>Let's get started</h2>

            <div className="postcode-input-content">
              <input
                type="text"
                placeholder="Enter postcode here"
                name="postcode"
                onChange={handleChange}
                value={postcode}
                required
                data-cy="postcode-input"
              />
              <button data-cy="postcode-btn" type="button" onClick={(e) => submitPostcode(e)}>
                Find postcode
              </button>
            </div>

            {errorPostcode ?
              (<Error message={'Please, enter a valid postcode'} />)
              :
              null
            }

            <div className="postcode-trustpilot">
              <a href="https://uk.trustpilot.com/review/utilityswitchboard.com" target="_blank" rel="noreferrer" ><img src={trustpilot} alt="Trustpilot review" loading="lazy" width="100" /></a>
            </div>
          </div>

          {showScript ?
            (
              <div className="script-postcode" id="script-postcode">
                <FormScript step={1} />
              </div>
            )
            :
            null
          }
        </div>
      </section>

      <section className="postcode-panel-section">
        <div className="postcode-panel-container">
          <div className="postcode-panel-content">
            <h1>Our Panel</h1>

            <div className="postcode-panel-images-content">
              <div className="postcode-panel-images">
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/ovo-energy-logo-square.png" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/scottish-power-logo-square-300x300.jpg" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/edf-energy-logo-square-300x300.jpeg" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png" alt="" loading="lazy" width="120" />
                <img className="d-none" src="https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png" alt="" loading="lazy" width="120" />
              </div>

              <div className="postcode-panel-images">
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/ovo-energy-logo-square.png" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/scottish-power-logo-square-300x300.jpg" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/edf-energy-logo-square-300x300.jpeg" alt="" loading="lazy" width="120" />
                <img src="https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png" alt="" loading="lazy" width="120" />
                <img className="d-none" src="https://utilityswitchboard.com/wp-content/uploads/2020/09/orbit-energy-logo-square.png" alt="" loading="lazy" width="120" />
              </div>
            </div>
          </div>

          <div className="postcode-information">
            <h2>Disclaimer</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormPostCode;
