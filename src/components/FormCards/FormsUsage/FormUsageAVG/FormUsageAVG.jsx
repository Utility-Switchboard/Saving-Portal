import React, { useState, useEffect } from "react";
import "./FormUsageAVG.css";

// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// Components
import FormScript from '../../FormScript/FormScript';
import FormAssistant from "../../FormAssistant/FormAssistant";
import Error from '../../../Error/Error'

function FormUsageAVG({ customerInformation, avgElec, avgGas, progressBar, showScript, updateCustomerInformation, updateShowFormUsageAVG, updateShowFormUsageGBP_es, updateShowFormUsageGBP_gs, updateShowFormUsageGAS, updateShowFormDebt, updateProgressBar }) {
  /* STATES */

  // Error State
  const [error, updateError] = useState(false);

  /* FUNCTIONS */
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  // Variables
  const dual_active = customerInformation.fuel_description.dual_active;
  const elec_only = customerInformation.fuel_description.elec_only;
  const gas_only = customerInformation.fuel_description.gas_only;

  // Handle Change - Input
  const handleChange = (e) => {
    // Hidde error
    updateError(false);
    const usage_size_expended = document.getElementById(e.target.id).value;

    if (dual_active) {
      if ((avgElec === true) && (avgGas === true)) {
        console.log('AVG Both')
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          usage_property_size_dual: {
            usage_size_entered: true,
            usage_size_expended
          }
        });
        return;
      }

      if ((avgElec === true) && (avgGas === false)) {
        console.log('Avg elec')
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          usage_property_size_es: {
            usage_size_entered: true,
            usage_size_expended
          }
        });
        return;
      }

      if ((avgElec === false) && (avgGas === true)) {
        console.log('AVG gas')
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          usage_property_size_gs: {
            usage_size_entered: true,
            usage_size_expended
          }
        });
        return;
      }
    }

    if (elec_only) {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        usage_property_size_es: {
          usage_size_entered: true,
          usage_size_expended
        }
      });
    }

    if (gas_only) {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        usage_property_size_gs: {
          usage_size_entered: true,
          usage_size_expended
        }
      });
    }
  }

  // Send usage
  const sendUsage = (e) => {
    e.preventDefault();

    // Validation
    if ((customerInformation.hasOwnProperty('usage_property_size_es') || customerInformation.hasOwnProperty('usage_property_size_gs') || customerInformation.hasOwnProperty('usage_property_size_dual'))) {
      // Hidde error
      updateError(false);
      // Hidde Form AVG
      updateShowFormUsageAVG(false);
      // Show Form Debt
      updateShowFormDebt(true);
      // Update Progressbar
      updateProgressBar({ ...progressBar, step: 7 });
    } else {
      // Show error
      updateError(true);
      return;
    }
  }

  // console.log(avgElec);
  // console.log(avgGas);

  // Go back
  const goBack = (e) => {
    e.preventDefault();
    // Update error
    updateError(false);
    // Hidde Form AVG
    updateShowFormUsageAVG(false);

    if (dual_active) {
      if ((avgElec === true) && (avgGas === true)) {
        // Show form GBP_gs
        updateShowFormUsageGBP_gs(true);
        // Delete Customer Usage
        const copy_customer_usage = { ...customerInformation };
        delete copy_customer_usage['usage_gbp_description_gs'];
        delete copy_customer_usage['usage_property_size_dual'];
        // Update customer information
        updateCustomerInformation({ ...copy_customer_usage });

        console.log('1');
        return;
      }

      if ((avgElec === true) && (avgGas === false)) {

        // Validation in case that exist KWH gas information (usage_gas_description)
        if (customerInformation.usage_gas_description.usage_kwh_entered) {
          // Delete Customer Usage
          const copy_customer_usage = { ...customerInformation };
          delete copy_customer_usage['usage_gas_description'];
          delete copy_customer_usage['usage_property_size_es'];
          // Update customer information
          updateCustomerInformation({ ...copy_customer_usage });
          // Show Usage KWH - Gas
          updateShowFormUsageGAS(true);

          console.log('2');

          return;
        }

        // Validation in case that exist GBP gas information (usage_gbp_description_gs)
        if (customerInformation.usage_gbp_description_gs.usage_gbp_entered) {
          // Delete Customer Usage
          const copy_customer_usage = { ...customerInformation };
          delete copy_customer_usage['usage_gbp_description_gs'];
          delete copy_customer_usage['usage_property_size_es'];
          // Update customer information
          updateCustomerInformation({ ...copy_customer_usage });
          // Show GBP_ES
          updateShowFormUsageGBP_gs(true);

          console.log('3');

          return;
        }

        // Show GBP_es
        updateShowFormUsageGBP_es(true);
        // Delete Customer Usage
        const copy_customer_usage = { ...customerInformation };
        delete copy_customer_usage['usage_gbp_description_es'];
        delete copy_customer_usage['usage_property_size_es'];
        // Update customer information
        updateCustomerInformation({ ...copy_customer_usage });

        console.log('4');
        return;

      }

      if ((avgElec === false) && (avgGas === true)) {
        // Show GBP_gs
        updateShowFormUsageGBP_gs(true);
        // Delete Customer Usage
        const copy_customer_usage = { ...customerInformation };
        delete copy_customer_usage['usage_gbp_description_gs'];
        delete copy_customer_usage['usage_property_size_gs'];
        // Update customer information
        updateCustomerInformation({ ...copy_customer_usage });
        return;
      }
    }

    if (gas_only) {
      // Show GBP_gs
      updateShowFormUsageGBP_gs(true);
      // Delete Customer Usage
      const copy_customer_usage = { ...customerInformation };
      delete copy_customer_usage['usage_gbp_description_gs'];
      delete copy_customer_usage['usage_property_size_es'];
      // Update customer information
      updateCustomerInformation({ ...copy_customer_usage });
      return;
    }

    if (elec_only) {
      // Show GBP_es
      updateShowFormUsageGBP_es(true);
      // Delete Customer Usage
      const copy_customer_usage = { ...customerInformation };
      delete copy_customer_usage['usage_gbp_description_es'];
      delete copy_customer_usage['usage_property_size_es'];
      // Update customer information
      updateCustomerInformation({ ...copy_customer_usage });
      return;
    }

  };

  return (
    <>
      <section className="form-usageavg-section">
        <div className="form-usageavg-container">
          <div className="form-usageavg-content">
            <div className="form-usageavg">
              <h1>What size is your property?</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut sint, possimus suscipit hic obcaecati ad necessitatibus eum asperiores maiores in, inventore quidem quibusdam modi. Veniam recusandae maiores voluptatem voluptates?</p>
            </div>

            <form className="form-usageavg-rb-container" onChange={(e) => handleChange(e)}>
              <div className="form-usageavg-rb-content">
                <label className="form-usageavg-rb">
                  <p>1 bedroom</p>
                  <input type="radio" id='one_bedroom' name="usage_bedrooms" value='1800' />
                </label>
              </div>

              <div className="form-usageavg-rb-content">
                <label className="form-usageavg-rb">
                  <p>2 to 3 bedrooms</p>
                  <input data-cy="avg-check2" type="radio" id='one_to_three_bedrooms' name="usage_bedrooms" value='2900' />
                </label>
              </div>

              <div className="form-usageavg-rb-content">
                <label className="form-usageavg-rb">
                  <p>4+ bedrooms</p>
                  <input type="radio" id='more_of_four_bedrooms' name="usage_bedrooms" value='4300' />
                </label>
              </div>
            </form>

            {/* Error */}
            {error === true ?
              (
                <div className="error-center">
                  <Error message={'Please introduce a valid usage'} />
                </div>
              )
              :
              null}

            {/* Buttons */}
            <div className="form-usageavg-btn-container">
              <button className="form-usageavg-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="avg-continue" className="form-usageavg-btn btn-next" onClick={(e) => sendUsage(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-usageavg">
                <div className="script-usageavg">
                  <FormScript step={7} use={'avg'} avgElec={avgElec} avgGas={avgGas} />
                </div>

                <div className="assistant-usageavg-custom">
                  <FormAssistant tips={6} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-usageavg">
                <FormAssistant tips={6} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormUsageAVG;
