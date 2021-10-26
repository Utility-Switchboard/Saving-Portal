import React, { useState, useEffect } from "react";
// Styles
import "./FormFuelType.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { GiElectric } from 'react-icons/gi';
import { ImFire } from 'react-icons/im';
import { FaCheckSquare, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

// Components
import FormAssistant from '../FormAssistant/FormAssistant';
import FormScript from '../FormScript/FormScript';
import Error from '../../Error/Error';

function FormFuelType({ customerInformation, showScript, fuel, useGas, electricityInformation, gasInformation, supplierInformation, customerAddres, progressBar, updateCustomerInformation, updateFuel, updateUseGas, updateElectricityInformation, updateGasInformation, updateSupplierInformation, updateCustomerAddress, updateShowFomrFuelType, updateShowFormMpanMprn, updateShowFormAddres, updateProgressBar }) {
    /* STATES */

    const [isActive, updateIsActive] = useState({
        dual_active: false,
        gas_only: false,
        elec_only: false
    });

    const [radioActive, updateRadioActive] = useState({
        dual_yes: false,
        dual_no: false
    });

    // Active class for fuel type
    const active_dual = isActive.dual_active;
    const active_gas = isActive.gas_only;
    const active_elec = isActive.elec_only;

    // Active class for radio buttons (Dual tariff)
    const active_rb_yes = radioActive.dual_yes;
    const active_rb_no = radioActive.dual_no;

    // Error State
    const [error_fuel, update_error_fuel] = useState(false);
    const [error_dual, update_error_dual] = useState(false);

    // Error smooth scroll
    useEffect(() => {
        if (error_fuel) {
            const scroll_to = () => {
                var element = document.querySelector("#error");
                // smooth scroll to element and align it at the bottom
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            scroll_to();
        }

        if (error_dual) {
            const scroll_to = () => {
                var element = document.querySelector("#error");
                // smooth scroll to element and align it at the bottom
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            scroll_to();
        }
    }, [error_fuel, error_dual]);

    /**-- Functions --*/

    // postcode_formatted
    const postcode_formatted = customerAddres.postcode.replace(/\s/g, '').trim().toLowerCase();
    // doornumber_formatted
    const doornumber_formatted = customerAddres.doornumber.replace(/\s/g, '').trim().toLowerCase();
    // uid
    const uid = `${postcode_formatted}-${doornumber_formatted}`;

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Handle Click Dual
    const handleClickDual = (e) => {
        e.preventDefault();
        // Update Error
        update_error_fuel(false);

        // Udpate state
        updateIsActive({
            ...isActive,
            dual_active: true,
            gas_only: false,
            elec_only: false
        });

        // Update useGas
        updateUseGas({ ...useGas, gas_apply: true });

        // Update fuel state
        updateFuel({
            ...fuel,
            dual_fuel_apply: true
        });
    }

    // Handle Click Gas only
    const handleClickGas = (e) => {
        e.preventDefault();
        // Update state
        updateRadioActive({
            ...radioActive,
            dual_yes: false,
            dual_no: false
        });
        // Update Error
        update_error_fuel(false);
        update_error_dual(false);

        // Udpate state
        updateIsActive({
            ...isActive,
            dual_active: false,
            gas_only: true,
            elec_only: false
        });

        // Update useGas
        updateUseGas({ ...useGas, gas_apply: true });

        // Update fuel state
        updateFuel({
            ...fuel,
            dual_fuel_apply: false
        });

        // Update Customer
        updateCustomerInformation({
            ...customerInformation,
            fuel_description: {
                same_supplier: false,
                dual_active: false,
                gas_only: true,
                elec_only: false
            }
        });
    }

    // Handle Click Electricity only
    const handleClickElec = (e) => {
        e.preventDefault();
        // Update state
        updateRadioActive({
            ...radioActive,
            dual_yes: false,
            dual_no: false
        });
        // Update Error
        update_error_fuel(false);
        update_error_dual(false);

        // Udpate state
        updateIsActive({
            ...isActive,
            dual_active: false,
            gas_only: false,
            elec_only: true
        });

        // Update useGas
        updateUseGas({ ...useGas, gas_apply: false });

        // Update fuel state
        updateFuel({
            ...fuel,
            dual_fuel_apply: false
        });

        // Update Customer
        updateCustomerInformation({
            ...customerInformation,
            fuel_description: {
                same_supplier: false,
                dual_active: false,
                gas_only: false,
                elec_only: true
            }
        });
    }

    // Handle Click Radio button - Yes
    const handleClickRB_yes = () => {
        // Update Error
        update_error_dual(false);

        // Checkbox
        const dual_yes = document.getElementById('dual_yes');
        dual_yes.checked = true;
        // Update state
        updateRadioActive({
            ...radioActive,
            dual_yes: true,
            dual_no: false
        });

        // Update Customer
        updateCustomerInformation({
            ...customerInformation,
            same_supplier: false
        });

        // Update Customer
        updateCustomerInformation({
            ...customerInformation,
            fuel_description: {
                same_supplier: true,
                dual_active: true,
                gas_only: false,
                elec_only: false
            }
        });

    }

    // Handle Click Radio button - No
    const handleClickRB_no = () => {
        // Update Error
        update_error_dual(false);

        // Checkbox
        const dual_no = document.getElementById('dual_no');
        dual_no.checked = true;
        // Update state
        updateRadioActive({
            ...radioActive,
            dual_yes: false,
            dual_no: true
        });

        // Update Customer
        updateCustomerInformation({
            ...customerInformation,
            fuel_description: {
                same_supplier: false,
                dual_active: true,
                gas_only: false,
                elec_only: false
            }
        });
    }

    // Send Fuel type - Continue
    const sendFuelType = async (e) => {
        e.preventDefault();

        // Validation
        if ((active_dual === false) && (active_gas === false) && (active_elec === false)) {
            update_error_fuel(true);
            return;
        }

        if (active_dual) {
            if ((active_rb_yes === false) && (active_rb_no === false)) {
                update_error_dual(true);
                return;
            }
        }

        // Update progress bar
        updateProgressBar({
            ...progressBar,
            step: 3
        });

        // Hidde Fuel Type
        updateShowFomrFuelType(false);
        // Show MPAN/MPRN
        updateShowFormMpanMprn(true);

        /**-- Firebase --*/

        const { fuel_description } = customerInformation;

        // Update customer information in firebase
        await db.collection("customers").doc(uid).set({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            step: 2,
            customerAddres: {
                doornumber: customerAddres.doornumber ? customerAddres.doornumber : '',
                addressline1: customerAddres.addressline1 ? customerAddres.addressline1 : '',
                addressline2: customerAddres.addressline2 ? customerAddres.addressline2 : '',
                city: customerAddres.city ? customerAddres.city : '',
                postcode: customerAddres.postcode ? customerAddres.postcode : '',
                mpan: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
                mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : ''
            },
            MPANDetails: {
                meter_serial_number: electricityInformation.MPANDetails.meter_serial_number ? electricityInformation.MPANDetails.meter_serial_number : '',
                meter_type: electricityInformation.MPANDetails.meter_type ? electricityInformation.MPANDetails.meter_type : '',
                mpan_core: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
                supplier_mpid: electricityInformation.MPANDetails.supplier_mpid ? electricityInformation.MPANDetails.supplier_mpid : ''
            },
            dataGas: {
                mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
                meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
                current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
                gas_transport_id: gasInformation.dataGas.gas_transport_id ? gasInformation.dataGas.gas_transport_id : ''
            },
            useGas: {
                gas_apply: useGas.gas_apply ? useGas.gas_apply : false
            },
            fuel: {
                dual_fuel_apply: fuel.dual_fuel_apply ? fuel.dual_fuel_apply : false
            },
            fuel_description: {
                dual_active: fuel_description.dual_active ? fuel_description.dual_active : false,
                elec_only: fuel_description.elec_only ? fuel_description.elec_only : false,
                gas_only: fuel_description.gas_only ? fuel_description.gas_only : false,
                same_supplier: fuel_description.same_supplier ? fuel_description.same_supplier : false
            },
        });

        return;
    }

    // Go back
    const goBack = async (e) => {
        e.preventDefault();

        // Update error
        update_error_fuel(false);
        update_error_dual(false);

        // Update progress bar
        updateProgressBar({
            ...progressBar,
            step: 1
        });

        // Hidde Fuel type
        updateShowFomrFuelType(false);
        // Show FormAddress
        updateShowFormAddres(true);
        // Delete MPANDetails from electricityInformation
        const copy_electricityInformation = { ...electricityInformation };
        delete copy_electricityInformation['MPANDetails'];
        // Update electricityInformation
        updateElectricityInformation({ ...copy_electricityInformation })
        // Delete gas_apply from useGas
        const copy_useGas = { ...useGas };
        delete copy_useGas['gas_apply'];
        // Update useGas Information
        updateUseGas({ ...copy_useGas });
        // Delete dataGas from gasInformation
        const copy_gasInformation = { ...gasInformation };
        delete copy_gasInformation['dataGas'];
        // Update gasInformation
        updateGasInformation({ ...copy_gasInformation });
        // Delete electricity_supplier and gas_supplier from supplierInformation
        const copy_supplierInformation = { ...supplierInformation }
        delete copy_supplierInformation['electricity_supplier'];
        delete copy_supplierInformation['gas_supplier'];
        // Update supplierInformation
        updateSupplierInformation({ ...copy_supplierInformation })
        // Delete useGas from Customer Information
        const copy_customerInformation = { ...customerInformation.delete };
        // Update Customer Information
        updateCustomerInformation({ ...copy_customerInformation });
        // Update Customer Adrress
        updateCustomerAddress({
            ...customerAddres,
            doornumber: '',
            addressline1: '',
            addressline2: '',
            city: '',
            postcode: '',
            mpan: '',
            mprn: ''
        });

        // Delete customer information in firebase
        await db.collection("customers").doc(uid).delete();

        return;
    }

    return (
        <section className="form-ft-section">
            <div className="form-ft-container">
                <div className="form-ft-content">
                    <div className="form-ft-compare">
                        <h1>What would you like to compare?</h1>

                        {/* Fuel type */}
                        <form className="form-ft-btn-selection-container">
                            <div data-cy="dual" className="form-ft-blocks">
                                <button type="submit" className={active_dual ? "form-ft-btn-selection-content active" : "form-ft-btn-selection-content"} onClick={(e) => handleClickDual(e)}>
                                    <div className="form-ft-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-ft-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-ft-btn-selection">
                                        <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                                            <ImFire className="fuel-icon" />
                                            <GiElectric className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>Gas &#38; electricity</p>
                                </button>
                            </div>

                            <div className="form-ft-blocks">
                                <button data-cy="gas-only" type="submit" className={active_gas ? "form-ft-btn-selection-content active" : "form-ft-btn-selection-content"} onClick={(e) => handleClickGas(e)}>
                                    <div className="form-ft-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-ft-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-ft-btn-selection">
                                        <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                                            <ImFire className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>Gas only</p>
                                </button>
                            </div>

                            <div className="form-ft-blocks">
                                <button data-cy="elec-only" type="submit" className={active_elec ? "form-ft-btn-selection-content active" : "form-ft-btn-selection-content"} onClick={(e) => handleClickElec(e)}>
                                    <div className="form-ft-cb-container">
                                        <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                            <FaCheckSquare className="form-ft-cb" />
                                        </IconContext.Provider>
                                    </div>

                                    <div className="form-ft-btn-selection">
                                        <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                                            <GiElectric className="fuel-icon" />
                                        </IconContext.Provider>
                                    </div>
                                    <p>Electricity only</p>
                                </button>
                            </div>
                        </form>
                        {/* Error */}
                        {error_fuel === true ? <Error message={'Please select one'} /> : null}

                        {active_dual ?
                            (
                                <>
                                    <h2>Do you have the same supplier for both gas &#38; electricity?</h2>

                                    {/* If is dual */}
                                    <form className="form-ft-btn-selection-container">
                                        <div data-cy="dual-yes" className="form-ft-blocks-dual">
                                            <div className={active_rb_yes ? "form-ft-btn-selection-content isDual active" : "form-ft-btn-selection-content isDual"} id="yes_selected" onClick={() => handleClickRB_yes()}>
                                                <input className="d-none" type="radio" name="dual-type" id="dual_yes" />
                                                <div className="form-ft-cb-container">
                                                    <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                                        <FaCheckSquare className="form-ft-cb" />
                                                    </IconContext.Provider>
                                                </div>

                                                <div className="form-ft-btn-selection-dual">
                                                    <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                                                        <FaRegThumbsUp className="fuel-icon" />
                                                    </IconContext.Provider>
                                                </div>
                                                <p>Yes</p>
                                            </div>
                                        </div>

                                        <div data-cy="dual-no" className="form-ft-blocks-dual">
                                            <div className={active_rb_no ? "form-ft-btn-selection-content isDual active" : "form-ft-btn-selection-content isDual"} id="no_selected" onClick={() => handleClickRB_no()}>
                                                <input className="d-none" type="radio" name="dual-type" id="dual_no" />
                                                <div className="form-ft-cb-container">
                                                    <IconContext.Provider value={{ color: '#31145B', size: '30px' }}>
                                                        <FaCheckSquare className="form-ft-cb" />
                                                    </IconContext.Provider>
                                                </div>

                                                <div className="form-ft-btn-selection-dual">
                                                    <IconContext.Provider value={{ color: '#31145B', size: '35px' }}>
                                                        <FaRegThumbsDown className="fuel-icon" />
                                                    </IconContext.Provider>
                                                </div>
                                                <p>No</p>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Error */}
                                    {error_dual === true ? <div className="error-center mt-2"><Error message={'Please select one'} /></div> : null}
                                </>
                            )
                            :
                            null
                        }


                    </div>

                    {/* Buttons */}
                    <div className="form-ft-btn-container">
                        <button className="form-ft-btn btn-back" onClick={(e) => goBack(e)}>
                            <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                                <IoMdArrowDropleft className="icon-back" />
                            </IconContext.Provider>
                            Go back
                        </button>

                        <button data-cy="ft-continue" className="form-ft-btn btn-next" onClick={(e) => sendFuelType(e)}>
                            Continue
                            <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                                <IoMdArrowDropright className="icon-next" />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>

                {showScript ?
                    (
                        <div className="helper-ft">
                            <div className="script-ft">
                                <FormScript step={3} />
                            </div>

                            <div className="assistant-ft-custom">
                                <FormAssistant tips={2} />
                            </div>
                        </div>
                    )
                    :
                    <div style={{ width: '100%' }}>
                        <div className="assistant-ft">
                            <FormAssistant tips={2} />
                        </div>
                    </div>
                }

            </div>
        </section>
    );
}

export default FormFuelType;
