import React, { useState, useEffect } from "react";
import "./FormE7.css";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { FaCheckSquare, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from "../FormAssistant/FormAssistant";
import Error from '../../Error/Error';

function FormE7({ economy7, customerInformation, electricityPaymentType, gasPaymentType, electricityInformation, gasInformation, supplierInformation, progressBar, showScript, updateEconomy7, updateCustomerInformation, updateShowFormSupply, updateShowE7, updateShowFormTariffs, updateElectricityPaymentType, updateGasPaymentType, updateProgressBar, updateShowOverlay, updateSupplierInformation, updateGasInformation, updateElectricityInformation }) {
  /* STATES */
  // Radio button active class
  const [radioActive, updateRadioActive] = useState({
    e7_yes: false,
    e7_no: false
  });

  // Split for E7
  const [e7_split, update_e7_split] = useState(false);

  // Error State
  const [error, updateError] = useState(false);
  const [error_e7_split, update_error_e7_split] = useState(false);

  /* FUNCTIONS */
  // const elec_only = customerInformation.fuel_description.elec_only;

  // Scroll to top & asign data to 'IDK' supplier
  useEffect(() => {
    // Scroll to top
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

      scroll_to()
    }

    if (error_e7_split) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to()
    }
  }, [error, error_e7_split]);

  const active_rb_yes = radioActive.e7_yes;
  const active_rb_no = radioActive.e7_no;

  const handleClickRB_yes = () => {
    // Update error
    updateError(false);
    // Update state
    updateRadioActive({
      ...radioActive,
      e7_yes: true,
      e7_no: false
    });
    // Update Economy 7
    updateEconomy7({ ...economy7, economy7_apply: true });
    // Update Customer Information
    updateCustomerInformation({
      ...customerInformation,
      economy7: {
        economy7_apply: true
      }
    });
    // Update state
    update_e7_split(true);
  }

  const handleClickRB_no = () => {
    // Update error
    updateError(false);
    // Update state
    updateRadioActive({
      ...radioActive,
      e7_yes: false,
      e7_no: true
    });
    // Update Economy 7
    updateEconomy7({ ...economy7, economy7_apply: false });
    // Update Customer Information
    updateCustomerInformation({
      ...customerInformation,
      economy7: {
        economy7_apply: false,
        economy7_split: false
      }
    });
    // Update state
    update_e7_split(false);
    // Update Error
    update_error_e7_split(false);
  }

  const handleChange = (e) => {
    const e7_split_value = parseFloat(document.getElementById('e7-split').value.trim().replace(/[^\w\s]/gi, ''));

    if (isNaN(e7_split_value) || e7_split_value < 1 || e7_split_value > 100) {
      // Update error
      update_error_e7_split(true);
      return;
    } else {
      // Update error
      update_error_e7_split(false);
    }

    // Update Customer Inforation 
    updateCustomerInformation({
      ...customerInformation,
      economy7: {
        economy7_apply: true,
        economy7_split: e7_split_value
      }
    });
  }

  const sendE7 = (e) => {
    e.preventDefault();

    if (error_e7_split) {
      return;
    }

    if ((active_rb_yes === false) && (active_rb_no === false)) {
      // Update error
      updateError(true);
      return;
    }

    if (e7_split) {
      const e7_split_value = document.getElementById('e7-split').value;
      if (e7_split_value === '') {
        update_error_e7_split(true);
        return;
      }
    }

    // if (elec_only) {
    //   const supplierid = customerInformation.supplierInformation.electricity_supplier.supplier_mpid;
    //   if (supplierid === 'MINT') {
    //     console.log(supplierid);
    //     console.log(elec_only);
    //     // Hidde Economy 7
    //     updateShowE7(false);
    //     // Show KWH
    //     updateShowFormUsageKWH(true)
    //     return;
    //   }
    // }

    // Show overlay
    updateShowOverlay(true);
    // Hidde Economy 7
    updateShowE7(false);
    // Update Progressbar
    updateProgressBar({ ...progressBar, step: 6 });
    // Show Tariffs
    updateShowFormTariffs(true);
  }

  // Go back
  const goBack = (e) => {
    e.preventDefault();
    // Update Progressbar
    updateProgressBar({ ...progressBar, step: 4 });

    // Delete economy7_apply from economy7
    const copy_economy7 = { ...economy7 };
    delete copy_economy7['economy7_apply'];
    // Update economy7
    updateEconomy7({ ...copy_economy7 });
    // Delete economy7, supplierInformation and electricityPaymentType from Customer Information
    const copy_customerInformation = { ...customerInformation };
    delete copy_customerInformation['economy7'];
    delete copy_customerInformation['supplierInformation'];
    delete copy_customerInformation['electricityPaymentType'];
    delete copy_customerInformation['gasPaymentType'];
    // Update Customer Information
    updateCustomerInformation({ ...copy_customerInformation });
    // Update ElectricityPaymentType
    const copy_electricityPaymentType = { ...electricityPaymentType.delete };
    updateElectricityPaymentType({ ...copy_electricityPaymentType });
    // Update gasPaymentType
    const copy_gasPaymentType = { ...gasPaymentType.delete };
    updateGasPaymentType({ ...copy_gasPaymentType });
    // Hidde E7
    updateShowE7(false);
    // Hidde Error
    updateError(false);
    // Show Form Supply
    updateShowFormSupply(true);
  };

  return (
    <>
      <section className="form-e7-section">
        <div className="form-e7-container">
          <div className="form-e7-content">
            <div className="form-e7">
              <h1>Do you have an Economy 7 meter?</h1>
              <p>Economy 7 electricity tariffs work alongside Economy 7 meters to provide a different price per kWh based on your time of use. These tariffs are based around day and night-time usage, with electricity being cheaper at night but more expensive than normal during the day.</p>
            </div>

            <form className="form-e7-btn-selection-container">
              <div className="form-e7-blocks-dual">
                <div className={active_rb_yes ? "form-e7-btn-selection-content isDual active" : "form-e7-btn-selection-content isDual"} id="yes_selected" onClick={() => handleClickRB_yes()}>
                  <input className="d-none" type="radio" name="dual-type" id="dual_yes" />
                  <div className="form-e7-cb-container">
                    <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                      <FaCheckSquare className="form-e7-cb" />
                    </IconContext.Provider>
                  </div>

                  <div className="form-e7-btn-selection-dual">
                    <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                      <FaRegThumbsUp className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>Yes</p>
                </div>
              </div>

              <div className="form-e7-blocks-dual">
                <div className={active_rb_no ? "form-e7-btn-selection-content isDual active" : "form-e7-btn-selection-content isDual"} id="no_selected" onClick={() => handleClickRB_no()}>
                  <input className="d-none" type="radio" name="dual-type" id="dual_no" />
                  <div className="form-e7-cb-container">
                    <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                      <FaCheckSquare className="form-e7-cb" />
                    </IconContext.Provider>
                  </div>

                  <div className="form-e7-btn-selection-dual">
                    <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                      <FaRegThumbsDown className="fuel-icon" />
                    </IconContext.Provider>
                  </div>
                  <p>No</p>
                </div>
              </div>
            </form>

            {/* Error */}
            {error === true ?
              (
                <div className="error-center">
                  <Error message={'Please select above'} />
                </div>
              )
              :
              null}

            {e7_split ?
              (
                <>
                  <div className="form-e7-split-container">
                    <label htmlFor="e7-split">What is your Economy 7 split?</label>
                    <div style={{ display: 'flex' }}>
                      <div className="form-e7-input-content" >
                        <input className="form-e7split-input" ype="text" maxLength="3" id="e7-split" onChange={(e) => handleChange(e)} />
                        <span>%</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="form-e7-input-container">
                    <div className="form-e7-input-content">
                      <label htmlFor="e7-split">What is your Economy 7 split?</label>
                      <input className="form-e7-input" type="text" maxLength="3" id="e7-split" onChange={(e) => handleChange(e)} />
                    </div>
                  </div> */}
                </>
              )

              :
              null
            }

            {error_e7_split ?
              (
                <div className="error-e7">
                  <Error message={'Please check your Economy 7 split'} />
                </div>
              )
              :
              null
            }

            {/* Buttons */}
            <div className="form-e7-btn-container">
              <button className="form-e7-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button className="form-e7-btn btn-next" onClick={(e) => sendE7(e)}>
                Continue

                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-e7">
                <div className="script-e7">
                  <FormScript />
                </div>

                <div className="assistant-e7-custom">
                  <FormAssistant tips="Hello world" />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-e7">
                <FormAssistant tips="Hello world" />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormE7;
