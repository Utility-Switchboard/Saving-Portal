import React, { useState, useEffect } from "react";
import "./FormDebt.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { FaCheckSquare, FaMoneyCheckAlt, FaCreativeCommonsNcEu, FaRegQuestionCircle } from 'react-icons/fa';
// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from "../FormAssistant/FormAssistant";
import Error from '../../Error/Error';

function FormDebt({ customerInformation, showScript, progressBar, updateCustomerInformation, updateShowFormUsageKWH, updateShowFormUsageGBP_es, updateShowFormUsageAVG, updateProgressBar, updateShowFormUsageGAS, updateShowFormUsageGBP_gs, updateShowFormDebt, updateShowFormCompare }) {
    /* STATES */

    // Radio button active class
    const [radioActive, updateRadioActive] = useState({
        debt_yes: false,
        debt_no: false,
        debt_not_sure: false
    });

    // Debt amount
    const [debt_amount, update_debt_amount] = useState(false);

    // Error State
    const [error, updateError] = useState(false);
    const [error_debt_amount, update_error_debt_amount] = useState(false);

    /* FUNCTIONS */

    /** Variables */
    // dual_active
    const dual_active = customerInformation.fuel_description.dual_active;
    // gas_only
    const gas_only = customerInformation.fuel_description.gas_only;
    // elec_only
    const elec_only = customerInformation.fuel_description.elec_only;

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

        if (error_debt_amount) {
            const scroll_to = () => {
                var element = document.querySelector("#error");
                // smooth scroll to element and align it at the bottom
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            scroll_to();
        }
    }, [error, error_debt_amount]);

    const active_rb_yes = radioActive.debt_yes;
    const active_rb_no = radioActive.debt_no;
    const active_rb_not_sure = radioActive.debt_not_sure;

    const handleClickRB_yes = () => {
        // Update error
        updateError(false);
        // Update state
        updateRadioActive({
            ...radioActive,
            debt_yes: true,
            debt_no: false,
            debt_not_sure: false
        });

        // Update Customer Information
        updateCustomerInformation({
            ...customerInformation,
            debt: {
                debt_apply: 'Yes'
            }
        });
        // Update state
        update_debt_amount(true);
    }

    const handleClickRB_no = () => {
        // Update error
        updateError(false);
        // Update state
        updateRadioActive({
            ...radioActive,
            debt_yes: false,
            debt_no: true,
            debt_not_sure: false
        });
        // Update Customer Information
        updateCustomerInformation({
            ...customerInformation,
            debt: {
                debt_apply: 'No',
                debt_amount: 0
            }
        });
        // Update state
        update_debt_amount(false);
        // Update Error
        update_error_debt_amount(false);
    }

    const handleClickRB_not_sure = () => {
        // Update error
        updateError(false);
        // Update state
        updateRadioActive({
            ...radioActive,
            debt_yes: false,
            debt_no: false,
            debt_not_sure: true
        });
        // Update Customer Information
        updateCustomerInformation({
            ...customerInformation,
            debt: {
                debt_apply: 'Not sure',
                debt_amount: 0
            }
        });
        // Update state
        update_debt_amount(false);
        // Update Error
        update_error_debt_amount(false);
    }

    //  handleChange
    const handleChange = (e) => {
        e.preventDefault();

        // Hide error
        updateError(false);
        // Hide error
        update_error_debt_amount(false);

        let value = parseFloat(e.target.value.replace(/[^0-9.]/g, '').trim()).toFixed(2);

        // Update Customer Information
        updateCustomerInformation({
            ...customerInformation,
            debt: {
                ...customerInformation.debt,
                debt_amount: parseFloat(value)
            }
        });
    }

    // sendDebt
    const sendDebt = (e) => {
        e.preventDefault();

        // Hide error
        updateError(false);

        // Validation
        if (!customerInformation.hasOwnProperty('debt')) {
            // Show error
            updateError(true);
            return;
        }

        // Validation amount
        if (!customerInformation.debt.hasOwnProperty('debt_amount')) {
            // Hide error
            updateError(false);
            // Show error
            update_error_debt_amount(true);
            return;
        }

        // Hidde error
        updateError(false);
        // Hide Form Debt
        updateShowFormDebt(false);
        // Show Form Compare
        updateShowFormCompare(true);
        // Update Progressbar
        updateProgressBar({ ...progressBar, step: 8 });

        console.log('send debt');
    };

    // Go back
    const goBack = (e) => {
        e.preventDefault();

        // Update Error
        updateError(false);
        // Hide Form Debt
        updateShowFormDebt(false);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 6 });

        // Elec Only
        if (elec_only) {
            // KWH
            if (customerInformation.hasOwnProperty('usage_kwh_description')) {
                const usage_kwh_entered = customerInformation.usage_kwh_description.usage_kwh_entered;
                if (usage_kwh_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_kwh_description'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show KWH Form
                    updateShowFormUsageKWH(true);
                    // console.log('Go back to KWH section');
                }
            }

            // GBP
            if (customerInformation.hasOwnProperty('usage_gbp_description_es')) {
                const usage_gbp_entered = customerInformation.usage_gbp_description_es.usage_gbp_entered;
                if (usage_gbp_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_gbp_description_es'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show GBP Form
                    updateShowFormUsageGBP_es(true);
                    // console.log('Gob back to GBP section');
                }
            }

            // Property size
            if (customerInformation.hasOwnProperty('usage_property_size_es')) {
                const usage_size_entered = customerInformation.usage_property_size_es.usage_size_entered;
                if (usage_size_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_property_size_es'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show AVG Form
                    updateShowFormUsageAVG(true);
                    // console.log('Go back to property size');
                }
            }
            return;
        }

        if (gas_only) {
            // KWH - GAS
            if (customerInformation.hasOwnProperty('usage_gas_description')) {
                const usage_kwh_entered = customerInformation.usage_gas_description.usage_kwh_entered;
                if (usage_kwh_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_gas_description'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show GAS Form
                    updateShowFormUsageGAS(true);
                    // console.log('Go back to KWH section');
                }
            }

            // GBP
            if (customerInformation.hasOwnProperty('usage_gbp_description_gs')) {
                const usage_gbp_entered = customerInformation.usage_gbp_description_gs.usage_gbp_entered;
                if (usage_gbp_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_gbp_description_gs'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show GBP Form
                    updateShowFormUsageGBP_gs(true);
                    // console.log('Gob back to GBP section');
                }
            }

            // Property size
            if (customerInformation.hasOwnProperty('usage_property_size_gs')) {
                const usage_size_entered = customerInformation.usage_property_size_gs.usage_size_entered;
                if (usage_size_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_property_size_gs'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show AVG Form
                    updateShowFormUsageAVG(true);
                    // console.log('Go back to property size');
                }
            }
            return;
        }

        if (dual_active) {
            // console.log('Dual active');

            // KWH - GAS
            if (customerInformation.hasOwnProperty('usage_gas_description')) {
                const usage_kwh_entered = customerInformation.usage_gas_description.usage_kwh_entered;
                if (usage_kwh_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_gas_description'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show GAS Form
                    updateShowFormUsageGAS(true);
                    // console.log('Go back to KWH section');
                }
            }

            // GBP - GAS
            if (customerInformation.hasOwnProperty('usage_gbp_description_gs')) {
                const usage_gbp_entered = customerInformation.usage_gbp_description_gs.usage_gbp_entered;
                if (usage_gbp_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_gbp_description_gs'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show GBP Form
                    updateShowFormUsageGBP_gs(true);
                    // console.log('Go back to GBP section');
                }
            }

            // Property size - usage_property_size_es
            if (customerInformation.hasOwnProperty('usage_property_size_es')) {
                const usage_size_entered = customerInformation.usage_property_size_es.usage_size_entered;
                if (usage_size_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_property_size_es'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Hidde Gas usage
                    updateShowFormUsageGBP_gs(false);
                    updateShowFormUsageGAS(false);
                    // Show AVG Form
                    updateShowFormUsageAVG(true);
                    // console.log('Go back to property size - usage_property_size_es');

                }
            }

            // Property size - usage_property_size_gs
            if (customerInformation.hasOwnProperty('usage_property_size_gs')) {
                const usage_size_entered = customerInformation.usage_property_size_gs.usage_size_entered;
                if (usage_size_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_property_size_gs'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show AVG Form
                    updateShowFormUsageAVG(true);
                    // console.log('Go back to property size - usage_property_size_gs');
                }
            }

            // Property_size_dual - usage_property_size_dual
            if (customerInformation.hasOwnProperty('usage_property_size_dual')) {
                const usage_size_entered = customerInformation.usage_property_size_dual.usage_size_entered;
                if (usage_size_entered) {
                    // Delete Customer Usage
                    const copy_customer_usage = { ...customerInformation };
                    delete copy_customer_usage['usage_property_size_dual'];
                    delete copy_customer_usage['switching_details'];
                    delete copy_customer_usage['debt'];
                    // Update customer information
                    updateCustomerInformation({ ...copy_customer_usage });
                    // Show AVG Form
                    updateShowFormUsageAVG(true);
                    // console.log('Go back to property size - usage_property_size_dual');
                }
            }

            return;
        }
    };

    return (
        <>
            <section className="form-debt-section">
                <div className="form-debt-container">
                    <div className="form-debt-content">
                        <div className="form-debt">
                            <h1>Do you have any existing debt?</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ex maiores dignissimos, tempore voluptatum ipsa facere corporis vero quae dolorum sapiente. Ducimus cupiditate quia non officia, aliquid delectus id perferendis.</p>
                        </div>

                        <form className="form-debt-btn-selection-container">
                            {/* Yes */}
                            <div data-cy="debt-yes" className="form-debt-blocks-dual">
                                <div className={active_rb_yes ? "form-debt-btn-selection-content isDual active" : "form-debt-btn-selection-content isDual"} id="yes_selected" onClick={() => handleClickRB_yes()}>
                                    <input className="d-none" type="radio" name="dual-type" id="dual_yes" />
                                    <div className="form-debt-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-debt-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-debt-btn-selection-dual">
                                        <IconContext.Provider value={{ color: '#31145B', size: '50px' }}>
                                            <FaMoneyCheckAlt className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>Yes</p>
                                </div>
                            </div>

                            {/* No */}
                            <div className="form-debt-blocks-dual">
                                <div data-cy="debt-no" className={active_rb_no ? "form-debt-btn-selection-content isDual active" : "form-debt-btn-selection-content isDual"} id="no_selected" onClick={() => handleClickRB_no()}>
                                    <input className="d-none" type="radio" name="dual-type" id="dual_no" />
                                    <div className="form-debt-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-debt-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-debt-btn-selection-dual">
                                        <IconContext.Provider value={{ color: '#31145B', size: '50px' }}>
                                            <FaCreativeCommonsNcEu className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>No</p>
                                </div>
                            </div>

                            {/* Not sure */}
                            <div className="form-debt-blocks-dual">
                                <div data-cy="debt-no" className={active_rb_not_sure ? "form-debt-btn-selection-content isDual active" : "form-debt-btn-selection-content isDual"} id="no_selected" onClick={() => handleClickRB_not_sure()}>
                                    <input className="d-none" type="radio" name="dual-type" id="dual_no" />
                                    <div className="form-debt-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-debt-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-debt-btn-selection-dual">
                                        <IconContext.Provider value={{ color: '#31145B', size: '50px' }}>
                                            <FaRegQuestionCircle className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>Not Sure</p>
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

                        {debt_amount ?
                            (
                                <>
                                    <div className="form-debt-amount-container">
                                        <label htmlFor="debt-amount">How much is your debt?</label>
                                        <div style={{ display: 'flex' }}>
                                            <div className="form-debt-input-content" >
                                                <input data-cy="debt-input" className="form-debt-amount-input" type="number" id="debt-amount" onChange={(e) => handleChange(e)} />
                                                <span>£</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )

                            :
                            null
                        }

                        {error_debt_amount ?
                            (
                                <div className="error-debt">
                                    <Error message={'Please check your Economy 7 split'} />
                                </div>
                            )
                            :
                            null
                        }

                        {/* Buttons */}
                        <div className="form-debt-btn-container">
                            <button className="form-debt-btn btn-back" onClick={(e) => goBack(e)}>
                                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                                    <IoMdArrowDropleft className="icon-back" />
                                </IconContext.Provider>
                                Go back
                            </button>

                            <button data-cy="debt-continue" className="form-debt-btn btn-next" onClick={(e) => sendDebt(e)}>
                                Continue

                                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                                    <IoMdArrowDropright className="icon-next" />
                                </IconContext.Provider>
                            </button>
                        </div>
                    </div>

                    {showScript ?
                        (
                            <div className="helper-debt">
                                <div className="script-debt">
                                    <FormScript step={8} />
                                </div>

                                <div className="assistant-debt-custom">
                                    <FormAssistant tips={7} />
                                </div>
                            </div>
                        )
                        :
                        <div style={{ width: '100%' }}>
                            <div className="assistant-debt">
                                <FormAssistant tips={7} />
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
}

export default FormDebt;
