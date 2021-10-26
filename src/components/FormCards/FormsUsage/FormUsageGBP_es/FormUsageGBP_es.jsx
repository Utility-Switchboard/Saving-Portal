import React, { useState, useEffect } from "react";
import "./FormUsageGBP_es.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// Components
import FormScript from '../../FormScript/FormScript';
import FormAssistant from "../../FormAssistant/FormAssistant";
import Error from '../../../Error/Error'

function FormUsageGBP_es({ customerInformation, progressBar, showScript, updateCustomerInformation, updateShowFormUsageKWH, updateShowFormUsageGBP_es, updateShowFormUsageAVG, updateShowFormDebt, updateShowFormUsageGAS, updateAvgElec, updateProgressBar }) {
  /* STATES */
  const [idk_active, update_idk_active] = useState(false);

  // Error State
  const [error, updateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: ''
  });

  /* FUNCTIONS */
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Variables
  const dual_active = customerInformation.fuel_description.dual_active;

  // Handle Click - idk
  const handleClick = (e) => {
    e.preventDefault();
    // Update Error
    updateError(false);
    // Update state
    update_idk_active(!idk_active);
    const usage_gbp_description_es = {
      usage_gbp_entered: false,
      usage_gbp_expended: false,
      usage_gbp_period: false
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gbp_description_es
    });
  }

  // Handle Change - Input
  const handleChange = (e) => {
    // Update Error
    updateError(false);
    const usage_select = document.getElementById('usage_select').value;
    const usage_gbp_description_es = {
      usage_gbp_entered: true,
      usage_gbp_expended: e.target.value.replace(/[^0-9\.]+/g, '').trim(),
      usage_gbp_period: usage_select
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gbp_description_es
    });
  }

  // Initial Values - Inputs
  let value_gbp = '';
  if (value_gbp) {
    value_gbp = customerInformation.usage_gbp_description_es.usage_gbp_expended;
  }

  // Send usage
  const sendUsage = (e) => {
    e.preventDefault();
    const usage_value = document.getElementById('usage_gbp_id').value;
    const usage_gbp_period = document.getElementById('usage_select').value;

    // Validation
    if (((parseFloat(usage_value) > 10865.99) && (usage_gbp_period === 'annu')) || ((parseFloat(usage_value) > 905.50) && (usage_gbp_period === 'mo'))) {
      let amount = '';
      let period = '';

      // Amount & period
      if (usage_gbp_period === 'annu') {
        amount = 10865.99;
        period = 'year';
      } else {
        amount = 905.50;
        period = 'month';
      }
      // Set Error message
      setErrorMessage({
        ...errorMessage,
        message: `Please check how much you spend on electricity per ${period}. If you spend more than £${amount.toFixed(2)} per ${period} we can't compare this against domestic consumption tariffs.`
      });
      // Show error
      updateError(true);
      return;
    }

    // Validation
    if (usage_value === '') {
      // Update Error
      updateError(true);
      // Set Error message
      setErrorMessage({
        ...errorMessage,
        message: "Please introduce a valid usage"
      });
      return;
    } else {
      const usage_gbp_expended = customerInformation.usage_gbp_description_es.usage_gbp_expended;
      // View conditional
      const usage_kwh_entered = customerInformation.usage_kwh_description.usage_kwh_entered;
      const usage_gbp_entered = customerInformation.usage_gbp_description_es.usage_gbp_entered;
      if ((usage_kwh_entered === false) && (usage_gbp_entered === false)) {
        if (dual_active) { //Dual_active
          // Show Form Usage Gas
          updateShowFormUsageGAS(true);
        } else {
          // Show usage AVG
          updateShowFormUsageAVG(true);
        }
        // Hidde usage GBP
        updateShowFormUsageGBP_es(false);
        // Update state
        updateAvgElec(true);

      } else {
        // Update state
        updateAvgElec(false);

        const usage_gbp_description_es = {
          usage_gbp_entered,
          usage_gbp_expended,
          usage_gbp_period
        }
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          usage_gbp_description_es
        });

        if (dual_active) {
          // Hidde Form Usage GBP_es
          updateShowFormUsageGBP_es(false);
          // Show Form Usage Gas
          updateShowFormUsageGAS(true);
        } else {
          // Hidde Form Usage GBP_es
          updateShowFormUsageGBP_es(false);
          // Show Form Debt
          updateShowFormDebt(true);
          // Update Progressbar
          updateProgressBar({ ...progressBar, step: 7 });
          console.log('Show Debt');
        }
      }
    }
  }

  // Go back
  const goBack = (e) => {
    e.preventDefault();
    // Update Error
    updateError(false);
    // Delete Customer Usage
    const copy_customer_usage = { ...customerInformation };
    delete copy_customer_usage['usage_gbp_description_es'];
    delete copy_customer_usage['usage_kwh_description'];
    //Update Customer Information
    updateCustomerInformation({ ...copy_customer_usage });
    // Hidde Form GBP
    updateShowFormUsageGBP_es(false);
    // Show Form KWH
    updateShowFormUsageKWH(true);
  };

  return (
    <>
      <section className="form-usagegbp-es-section">
        <div className="form-usagegbp-es-container">
          <div className="form-usagegbp-es-content">
            <div className="form-usagegbp-es">
              <h1>How much spend in electricity?</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut sint, possimus suscipit hic obcaecati ad necessitatibus eum asperiores maiores in, inventore quidem quibusdam modi. Veniam recusandae maiores voluptatem voluptates?</p>
            </div>

            {idk_active ?
              (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className={idk_active ? "form-usagegbp-es-input-container customContainer" : null} >
                      <span className={idk_active ? "customSpan" : null}>£</span>
                      <input id="usage_gbp_id" type="text" name="usage_gbp" onChange={(e) => handleChange(e)} className="form-usagegbp-es-input" disabled value="I don't know" />
                    </div>
                    <select className="form-usagegbp-es-select" id="usage_select">
                      <option value="annu">Annually</option>
                      <option value="mo">Monthly</option>
                    </select>
                  </div>
                </>
              )
              :
              (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className="form-usagegbp-es-input-container" >
                      <span>£</span>
                      <input data-cy="gbpes-input" id="usage_gbp_id" type="number" name="usage_gbp" onChange={(e) => handleChange(e)} className="form-usagegbp-es-input" defaultValue={value_gbp || ''} />
                    </div>
                    <select className="form-usagegbp-es-select" id="usage_select">
                      <option value="annu">Annually</option>
                      <option value="mo">Monthly</option>
                    </select>
                  </div>
                </>
              )
            }

            <button data-cy="gbpes-idk" className="form-usagegbp-es-idk" onClick={(e) => handleClick(e)}>{idk_active ? "Enable input" : "I don't know"}</button>

            {/* Error */}
            {error === true ?
              (
                <Error message={errorMessage.message} />
              )
              :
              null}

            {/* Buttons */}
            <div className="form-usagegbp-es-btn-container">
              <button className="form-usagegbp-es-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="gbpes-continue" className="form-usagegbp-es-btn btn-next" onClick={(e) => sendUsage(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-usagegbp-es">
                <div className="script-usagegbp-es">
                  <FormScript step={7} use={'gbp_es'} />
                </div>

                <div className="assistant-usagegbp-es-custom">
                  <FormAssistant tips={6} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-usagegbp-es">
                <FormAssistant tips={6} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormUsageGBP_es;
