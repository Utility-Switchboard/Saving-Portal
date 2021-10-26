import React, { useState, useEffect } from "react";
import "./FormUsageGBP_gs.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// Components
import FormScript from '../../FormScript/FormScript';
import FormAssistant from "../../FormAssistant/FormAssistant";
import Error from '../../../Error/Error'

function FormUsageGBP_gs({ customerInformation, avgElec, progressBar, showScript, updateCustomerInformation, updateShowFormUsageGAS, updateShowFormUsageGBP_gs, updateShowFormUsageAVG, updateShowFormDebt, updateAvgGas, updateProgressBar }) {
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
    const usage_gbp_description_gs = {
      usage_gbp_entered: false,
      usage_gbp_expended: false,
      usage_gbp_period: false
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gbp_description_gs
    });
  }

  // Handle Change - Input
  const handleChange = (e) => {
    // Update Error
    updateError(false);
    const usage_select = document.getElementById('usage_select').value;
    const usage_gbp_description_gs = {
      usage_gbp_entered: true,
      usage_gbp_expended: e.target.value.replace(/[^0-9\.]+/g, '').trim(),
      usage_gbp_period: usage_select
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gbp_description_gs
    });
  }

  // Initial Values - Inputs
  let value_gbp = '';
  if (value_gbp) {
    value_gbp = customerInformation.usage_gbp_description_gs.usage_gbp_expended;
  }

  // Send usage
  const sendUsage = (e) => {
    e.preventDefault();
    const usage_value = document.getElementById('usage_gbp_id').value;
    const usage_gbp_period = document.getElementById('usage_select').value;

    // Validation
    if (((parseFloat(usage_value) > 3540.36) && (usage_gbp_period === 'annu')) || ((parseFloat(usage_value) > 295.03) && (usage_gbp_period === 'mo'))) {
      let amount = '';
      let period = '';

      // Amount & period
      if (usage_gbp_period === 'annu') {
        amount = 3540.36;
        period = 'year';
      } else {
        amount = 295.03;
        period = 'month';
      }
      // Set Error message
      setErrorMessage({
        ...errorMessage,
        message: `Please check how much you spend on gas per ${period}. If you spend more than £${amount.toFixed(2)} per ${period} we can't compare this against domestic consumption tariffs.`
      });
      // Show error
      updateError(true);
      return;
    }

    // Validation
    if (usage_value === '') {
      // Update Error
      updateError(true);
      return;
    } else {
      const usage_gbp_expended = customerInformation.usage_gbp_description_gs.usage_gbp_expended;
      // View conditional
      const usage_kwh_entered = customerInformation.usage_gbp_description_gs.usage_gbp_entered;
      const usage_gbp_entered = customerInformation.usage_gbp_description_gs.usage_gbp_entered;
      if ((usage_kwh_entered === false) && (usage_gbp_entered === false)) {
        // Hidde usage GBP
        updateShowFormUsageGBP_gs(false);
        // Show usage AVG
        updateShowFormUsageAVG(true);
        // Update state
        updateAvgGas(true);
        console.log('Show AVG');
      } else {
        // Update state
        updateAvgGas(false);
        const usage_gbp_description_gs = {
          usage_gbp_entered,
          usage_gbp_expended,
          usage_gbp_period
        }
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          usage_gbp_description_gs
        });

        if (dual_active) {
          // const usage_gbp_entered = customerInformation.usage_gbp_description_es.usage_gbp_entered;
          if (avgElec) { //usage_gbp_entered === false
            // Hidde GBP_gs
            updateShowFormUsageGBP_gs(false);
            // Show Form AVG 
            updateShowFormUsageAVG(true);
          } else {
            // Update state
            updateAvgGas(false);
            // Hidde GBP_gs
            updateShowFormUsageGBP_gs(false);
            // Show Form Debt
            updateShowFormDebt(true);
            // Update Progressbar
            updateProgressBar({ ...progressBar, step: 7 });
            console.log('Show Form Debt');
          }
        } else {
          // Update state
          updateAvgGas(false);
          // Hidde GBP_gs
          updateShowFormUsageGBP_gs(false);
          // Show Form Debt
          updateShowFormDebt(true);
          // Update Progressbar
          updateProgressBar({ ...progressBar, step: 7 });
          console.log('Show Form Debt');
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
    delete copy_customer_usage['usage_gbp_description_gs'];
    delete copy_customer_usage['usage_gas_description'];
    //Update Customer Information
    updateCustomerInformation({ ...copy_customer_usage });
    // Hidde Form GBP
    updateShowFormUsageGBP_gs(false);
    // Show Form KWH
    updateShowFormUsageGAS(true);
  };

  return (
    <>
      <section className="form-usagegbp-gs-section">
        <div className="form-usagegbp-gs-container">
          <div className="form-usagegbp-gs-content">
            <div className="form-usagegbp-gs">
              <h1>How much spend in gas?</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut sint, possimus suscipit hic obcaecati ad necessitatibus eum asperiores maiores in, inventore quidem quibusdam modi. Veniam recusandae maiores voluptatem voluptates?</p>
            </div>

            {idk_active ?
              (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className={idk_active ? "form-usagegbp-gs-input-container customContainer" : null}>
                      <span className={idk_active ? "customSpan" : null}>£</span>
                      <input id="usage_gbp_id" type="text" name="usage_gbp" onChange={(e) => handleChange(e)} className="form-usagegbp-gs-input" disabled value="I don't know" />
                    </div>
                    <select className="form-usagegbp-gs-select" id="usage_select">
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
                    <div className="form-usagegbp-gs-input-container" >
                      <span>£</span>
                      <input data-cy="gbpgs-input" id="usage_gbp_id" type="number" name="usage_gbp" onChange={(e) => handleChange(e)} className="form-usagegbp-gs-input" defaultValue={value_gbp || ''} />
                    </div>
                    <select className="form-usagegbp-gs-select" id="usage_select">
                      <option value="annu">Annually</option>
                      <option value="mo">Monthly</option>
                    </select>
                  </div>
                </>
              )
            }

            <button data-cy="gbpgs-idk" className="form-usagegbp-gs-idk" onClick={(e) => handleClick(e)}>{idk_active ? "Enable input" : "I don't know"}</button>

            {/* Error */}
            {error === true ?
              (
                <Error message={errorMessage.message} />
              )
              :
              null}

            {/* Buttons */}
            <div className="form-usagegbp-gs-btn-container">
              <button className="form-usagegbp-gs-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="gbpgs-continue" className="form-usagegbp-gs-btn btn-next" onClick={(e) => sendUsage(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-usagegbp-gs">
                <div className="script-usagegbp-gs">
                  <FormScript step={7} use={'gbp_gs'} />
                </div>

                <div className="assistant-usagegbp-gs-custom">
                  <FormAssistant tips={6} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-usagegbp-gs">
                <FormAssistant tips={6} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormUsageGBP_gs;
