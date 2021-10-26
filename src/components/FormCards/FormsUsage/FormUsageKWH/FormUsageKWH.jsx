import React, { useState, useEffect } from "react";
import "./FormUsageKWH.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// Components
import FormScript from '../../FormScript/FormScript';
import FormAssistant from "../../FormAssistant/FormAssistant";
import Error from '../../../Error/Error'

function FormUsageKWH({ customerInformation, progressBar, showScript, updateAvgElec, updateCustomerInformation, updateShowFormUsageKWH, updateShowFormUsageGAS, updateShowFormUsageGBP_es, updateShowFormDebt, updateShowFormTariffs, updateShowE7, updateProgressBar, updateShowOverlay }) {
  /* STATES */
  const [idk_active, update_idk_active] = useState(false);

  // Error State
  const [error, updateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: ''
  });

  /* FUNCTIONS */
  // Scroll to top & hide overlay
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show overlay
    updateShowOverlay(false);
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
    const usage_kwh_description = {
      usage_kwh_entered: false,
      usage_kwh_expended: false,
      usage_kwh_period: false
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_kwh_description
    });
  }

  // Handle Change - Input
  const handleChange = (e) => {
    // Update Error
    updateError(false);
    const usage_select = document.getElementById('usage_select').value;
    const usage_kwh_description = {
      usage_kwh_entered: true,
      usage_kwh_expended: e.target.value.replace(/[^0-9\.]+/g, '').trim(),
      usage_kwh_period: usage_select
    }
    // Update state
    updateCustomerInformation({
      ...customerInformation,
      usage_kwh_description
    });
  }

  // Initial Values - Inputs
  let value_kwh = '';
  if (value_kwh) {
    value_kwh = customerInformation.usage_kwh_description.usage_kwh_expended;
  }

  // Send usage
  const sendUsage = (e) => {
    e.preventDefault();
    // Validation
    const usage_value = document.getElementById('usage_kwh_id').value;
    const usage_kwh_period = document.getElementById('usage_select').value;

    // Validation
    if (((parseFloat(usage_value) > 50000) && (usage_kwh_period === 'annu')) || ((parseFloat(usage_value) > 4166.666) && (usage_kwh_period === 'mo'))) {
      let amount = '';
      let period = '';

      // Amount & period
      if (usage_kwh_period === 'annu') {
        amount = 50000;
        period = 'year';
      } else {
        amount = 4166.666;
        period = 'month';
      }
      // Set error message
      setErrorMessage({
        ...errorMessage,
        message: `Please check how much you use on electricity. If you use more than ${amount.toFixed(2)} kWh per ${period} we can't compare this against domestic consumption tariffs.`
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
      const usage_kwh_entered = customerInformation.usage_kwh_description.usage_kwh_entered;
      const usage_kwh_expended = customerInformation.usage_kwh_description.usage_kwh_expended;
      // Update State
      updateAvgElec(false);
      // View conditional
      if (usage_kwh_entered === false) {
        // Hidde Form Usage
        updateShowFormUsageKWH(false);
        // Show FormUsageGBP_es
        updateShowFormUsageGBP_es(true);
        console.log('Show UsageGBP_es');
      } else {
        // Update state
        updateCustomerInformation({
          ...customerInformation,
          usage_kwh_description: {
            usage_kwh_entered,
            usage_kwh_expended,
            usage_kwh_period
          }
        });

        // Conditional view controller - Form compare / Gas section
        if (dual_active) {
          // Show Form Usage Gas
          console.log('Show Form Usage Gas');
          // Hidde Form Usage KWH
          updateShowFormUsageKWH(false);
          // Show Form Usage Gas
          updateShowFormUsageGAS(true);
        } else {
          // Hidde Form usage
          updateShowFormUsageKWH(false);
          // Show Debt
          updateShowFormDebt(true);
          // Update Progressbar
          updateProgressBar({ ...progressBar, step: 7 });
          console.log('Send usage');
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
    delete copy_customer_tariff['tariff_description'];
    delete copy_customer_tariff['tariff_description_elec'];
    delete copy_customer_tariff['tariff_description_gas'];
    delete copy_customer_tariff['usage_kwh_description'];
    //Update Customer Information
    updateCustomerInformation({ ...copy_customer_tariff });
    // Hidde Form Usage
    updateShowFormUsageKWH(false);
    // Show Form E7
    updateShowE7(true);
    // Update progress bar
    updateProgressBar({ ...progressBar, step: 5 });
  };

  return (
    <>
      <section className="form-usagekwh-section">
        <div className="form-usagekwh-container">
          <div className="form-usagekwh-content">
            <div className="form-usagekwh">
              <h1>How much electricity do you use?</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut sint, possimus suscipit hic obcaecati ad necessitatibus eum asperiores maiores in, inventore quidem quibusdam modi. Veniam recusandae maiores voluptatem voluptates?</p>
            </div>

            {idk_active ?
              (
                <>
                  <div style={{ display: 'flex' }}>
                    <div className={idk_active ? "form-usagekwh-input-container customContainer" : null} >
                      <input id="usage_kwh_id" type="text" name="usage_kwh" onChange={(e) => handleChange(e)} className="form-usagekwh-input" disabled={true} value="I don't know" />
                      <span className={idk_active ? "customSpan" : null}>kWh</span>
                    </div>
                    <select className="form-usagekwh-select" id="usage_select">
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
                    <div className="form-usagekwh-input-container" >
                      <input data-cy="kwh-input" id="usage_kwh_id" type="number" name="usage_kwh" onChange={(e) => handleChange(e)} className="form-usagekwh-input" defaultValue={value_kwh || ''} />
                      <span>kWh</span>
                    </div>
                    <select className="form-usagekwh-select" id="usage_select">
                      <option value="annu">Annually</option>
                      <option value="mo">Monthly</option>
                    </select>
                  </div>
                </>
              )
            }

            <button data-cy="kwh-idk" className="form-usagekwh-idk" onClick={(e) => handleClick(e)}>{idk_active ? "Enable input" : "I don't know"}</button>

            {/* Error */}
            {error === true ?
              (
                <Error message={errorMessage.message} />
              )
              :
              null}

            {/* Buttons */}
            <div className="form-usagekwh-btn-container">
              <button className="form-usagekwh-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="kwh-continue" className="form-usagekwh-btn btn-next" onClick={(e) => sendUsage(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-usagekwh">
                <div className="script-usagekwh">
                  <FormScript step={7} use={'kwh'} />
                </div>

                <div className="assistant-usagekwh-custom">
                  <FormAssistant tips={6} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-usagekwh">
                <FormAssistant tips={6} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormUsageKWH;
