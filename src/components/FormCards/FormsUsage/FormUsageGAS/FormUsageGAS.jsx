import React, { useState, useEffect } from "react";
import "./FormUsageGAS.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// Components
import FormScript from '../../FormScript/FormScript';
import FormAssistant from "../../FormAssistant/FormAssistant";
import Error from '../../../Error/Error'

function FormUsageGAS({ customerInformation, avgElec, progressBar, showScript, updateCustomerInformation, updateShowFormUsageGAS, updateShowFormUsageKWH, updateShowFormUsageGBP_gs, updateShowFormUsageGBP_es, updateShowFormDebt, updateShowFormUsageAVG, updateShowFormTariffs, updateAvgGas, updateAvgElec, updateProgressBar, updateShowOverlay, updateShowE7 }) {
  /* STATES */
  const [idk_active, update_idk_active] = useState(false);

  // Error State
  const [error, updateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: ''
  });

  /* FUNCTIONS */

  // Scroll to top and hide overlay
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update state
    updateShowOverlay(false);
  }, []);

  // Variables
  const gas_only = customerInformation.fuel_description.gas_only;

  // Handle Click - idk
  const handleClick = (e) => {
    e.preventDefault();
    // Update Error
    updateError(false);
    // Update state
    update_idk_active(!idk_active);
    const usage_gas_description = {
      usage_kwh_entered: false,
      usage_kwh_expended: false,
      usage_kwh_period: false
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gas_description
    });
  }

  // Handle Change - Input
  const handleChange = (e) => {
    // Update Error
    updateError(false);
    const usage_select = document.getElementById('usage_select').value;
    const usage_gas_description = {
      usage_kwh_entered: true,
      usage_kwh_expended: e.target.value.replace(/[^0-9\.]+/g, '').trim(),
      usage_kwh_period: usage_select
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_gas_description
    });
  }

  // Initial Values - Inputs
  let value_kwh = '';
  if (value_kwh) {
    value_kwh = customerInformation.usage_gas_description.usage_kwh_expended;
  }

  // Send usage
  const sendUsage = (e) => {
    e.preventDefault();
    // Validation
    const usage_value = document.getElementById('usage_kwh_id').value;
    const usage_kwh_period = document.getElementById('usage_select').value;
    
    // Validation
    if (((parseFloat(usage_value) > 85000) && (usage_kwh_period === 'annu')) || ((parseFloat(usage_value) > 7083.8333) && (usage_kwh_period === 'mo'))) {
      let amount = '';
      let period = '';

      // Amount & period
      if (usage_kwh_period === 'annu') {
        amount = 85000;
        period = 'year';
      } else {
        amount = 7083.8333;
        period = 'month';
      }
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: `Please check how much you use on gas. If you use more than ${amount.toFixed(2)} kWh per ${period} we can't compare this against domestic consumption tariffs.`
      });
      // Show error
      updateError(true);
      return;
    }

    if (usage_value === '') {
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: "Please introduce a valid usage"
      });
      // Update Error
      updateError(true);
      return;
    } else {
      // Variables - usage_gas_description
      const usage_kwh_entered = customerInformation.usage_gas_description.usage_kwh_entered;
      const usage_kwh_expended = customerInformation.usage_gas_description.usage_kwh_expended;
      // View conditional
      if (usage_kwh_entered === false) {
        // Hidde Form Usage
        updateShowFormUsageGAS(false);
        // Show FormUsageGBP_es
        updateShowFormUsageGBP_gs(true);
        // Update state
        updateAvgGas(true);
        console.log('Show UsageGBP');
      } else {
        // Update state
        updateAvgGas(false);
        // Update state
        updateCustomerInformation({
          ...customerInformation,
          usage_gas_description: {
            usage_kwh_entered,
            usage_kwh_expended,
            usage_kwh_period
          }
        });

        // Hidde Form Usage Gas
        updateShowFormUsageGAS(false);
        // Variables - usage_kwh_description
        // const usage_gbp_entered_es = customerInformation.usage_gbp_description_es.usage_gbp_entered;
        // const usage_kwh_entered_es = customerInformation.usage_kwh_description.usage_kwh_entered;
        // Validation
        if (avgElec) { //(usage_gbp_entered_es === false) && (usage_kwh_entered_es === false)
          // Show Form AVG
          updateShowFormUsageAVG(true);
          // Update state 
          updateAvgElec(true);
        } else {
          // Show Form Debt
          updateShowFormDebt(true);
          // Update Progressbar
          updateProgressBar({ ...progressBar, step: 7 });
          // Update state 
          updateAvgElec(false);
        }
      }
    }

    // Update error
    updateError(false);

  }

  // Go back
  const goBack = (e) => {
    e.preventDefault();
    // Delete Customer tariff
    const copy_customer_tariff = { ...customerInformation };
    delete copy_customer_tariff['usage_gas_description'];
    delete copy_customer_tariff['usage_gbp_description_es'];
    //Update Customer Information
    updateCustomerInformation({ ...copy_customer_tariff });
    // Hidde Form Usage
    updateShowFormUsageGAS(false);

    if (customerInformation.hasOwnProperty('usage_kwh_description')) {
      if (customerInformation.usage_kwh_description.usage_kwh_entered) {
        // Show Form  KWH
        updateShowFormUsageKWH(true);
        //Update Customer Information
        delete copy_customer_tariff['usage_kwh_description'];
        updateCustomerInformation({ ...copy_customer_tariff });
      } else {
        console.log('O Aqui');
        // Show Form GBP
        updateShowFormUsageGBP_es(true);
      }
    }

    if (gas_only) {
      // Show Form Tariffs - It should be true, but for the moment it's false due we are not using it
      // updateShowFormTariffs(false);
      // Show E7
      updateShowE7(true);
    }

    // Update progress bar
    updateProgressBar({ ...progressBar, step: 5 });
  };

  return (
    <>
      <section className="form-usagegas-section">
        <div className="form-usagegas-container">
          <div className="form-usagegas-content">
            <div className="form-usagegas">
              <h1>How much gas do you use?</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut sint, possimus suscipit hic obcaecati ad necessitatibus eum asperiores maiores in, inventore quidem quibusdam modi. Veniam recusandae maiores voluptatem voluptates?</p>
            </div>

            {idk_active ?
              (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className={idk_active ? "form-usagegas-input-container customContainer" : null} >
                      <input id="usage_kwh_id" type="text" name="usage_kwh" onChange={(e) => handleChange(e)} className="form-usagegas-input" disabled value="I don't know" />
                      <span className={idk_active ? "customSpan" : null}>kWh</span>
                    </div>
                    <select className="form-usagegas-select" id="usage_select">
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
                    <div className="form-usagegas-input-container" >
                      <input data-cy="gas-input" id="usage_kwh_id" type="number" name="usage_kwh" onChange={(e) => handleChange(e)} className="form-usagegas-input" defaultValue={value_kwh || ''} />
                      <span>kWh</span>
                    </div>
                    <select className="form-usagegas-select" id="usage_select">
                      <option value="annu">Annually</option>
                      <option value="mo">Monthly</option>
                    </select>
                  </div>
                </>
              )
            }

            <button data-cy="gas-idk" className="form-usagegas-idk" onClick={(e) => handleClick(e)}>{idk_active ? "Enable input" : "I don't know"}</button>

            {/* Error */}
            {error === true ?
              (
                <Error message={errorMessage.message} />
              )
              :
              null}

            {/* Buttons */}
            <div className="form-usagegas-btn-container">
              <button className="form-usagegas-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="gas-continue" className="form-usagegas-btn btn-next" onClick={(e) => sendUsage(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-usagegas">
                <div className="script-usagegas">
                  <FormScript step={7} use={'gas'} />
                </div>

                <div className="assistant-usagegas-custom">
                  <FormAssistant tips={6} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-usagegas">
                <FormAssistant tips={6} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormUsageGAS;
