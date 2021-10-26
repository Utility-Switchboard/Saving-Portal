import React, { useState, useEffect } from "react";
// CSS
import "./FormBankDetails.css";
import { IconContext } from "react-icons";
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
// Components
import Error from '../../Error/Error';
// Images
import BankDetails from '../../../assets/img/bank_details.svg'

const FormBankDetails = ({ customerInformation, progressBar, updateCustomerInformation, updateShowFormDetails, updateShowFormBankDetails, updateProgressBar, updateShowFormRating, updateShowOverlay }) => {

    /** STATES */
    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Error State
    const [error, updateError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        message: ''
    });

    // Variables
    const { doornumber, addressline1, addressline2, city, postcode } = customerInformation.customerAddres;
    const { tariff_name, exit_fees } = customerInformation.switching_details.supplier_selected;
    const { first_name, last_name, email, phone } = customerInformation.customerDetails;

    /** FUNCTIONS */

    // Error smooth scroll
    useEffect(() => {
        if (error) {
            const scroll_to = () => {
                var element = document.querySelector("#error");
                // smooth scroll to element and align it at the bottom
                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
            }

            scroll_to();
        }
    }, [error]);

    // Function that runs every time the user writes to the input
    const handleChange = (e) => {
        // Hidde error
        updateError(false);
        console.log('handleChange');
        // Update Customer details
        updateCustomerInformation({
            ...customerInformation,
            bankDetails: {
                ...customerInformation.bankDetails,
                [e.target.name]: e.target.value
            }
        });
    };

    // dispatchSwitching
    const dispatchSwitching = async (e) => {
        e.preventDefault();

        // Customer Details
        const { account_holder, account_number, sort_code } = customerInformation.bankDetails;

        // Validation
        if (!account_holder || !account_number || !sort_code) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'All fields are required'
            });
            // Show Error
            updateError(true);
            return;
        };

        if (account_number.length < 8) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'Please verify the account number'
            });
            // Show Error
            updateError(true);
            return;
        };

        if (sort_code.length < 6) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'Please verify the sort code'
            });
            // Show Error
            updateError(true);
            return;
        };

        // Update error
        updateError(false);

        // Show Overlay
        updateShowOverlay(true);
        // Agent email
        const { agent } = customerInformation;
        // Customer details
        const { phone, first_name, last_name, email } = customerInformation.customerDetails;
        const { debt_apply, debt_amount } = customerInformation.debt;
        // Customer Address
        const { doornumber, addressline1, addressline2, city, postcode } = customerInformation.customerAddres;
        // Fuel description
        const { same_supplier, gas_only, elec_only, dual_active } = customerInformation.fuel_description;
        // Supplier Information
        const { electricity_supplier, gas_supplier } = customerInformation.supplierInformation;
        // Switching details
        const { tariff_name, supplier_name } = customerInformation.switching_details.supplier_selected;

        console.log(supplier_name)

        let Existing_Energy_Provider;

        // Conditional Existing_Energy_Provider 
        if (dual_active) {
            if (same_supplier) {
                // Take electricity provider as mandatory
                Existing_Energy_Provider = electricity_supplier.company_name;
            } else {
                // We should add the fields in the CRM to add "Electricity energy provider" and "Gas energy provider" / At the moment we are selecting the electricity provider
                Existing_Energy_Provider = electricity_supplier.company_name;
            };
        } else {
            if (elec_only) {
                // Assing Electricty provider
                Existing_Energy_Provider = electricity_supplier.company_name;
            };

            if (gas_only) {
                // Assing Electricty provider
                Existing_Energy_Provider = gas_supplier.company_name;
            };
        };

        // Endpoint
        const url = 'https://smartdebittestapi.azurewebsites.net/api/HttpTrigger1?method=savingVal';

        const customer = {
            fullname: `${first_name} ${last_name}`,
            phone,
            email,
            doornumber,
            addline1: addressline1.replaceAll(',', ' -').replace(/\s+/g, ' '),
            addline2: addressline2,
            city,
            postcode,
            vendor: "EDF",
            plan: tariff_name,
            Existing_debt: debt_apply,
            If_debt_how_much: debt_amount,
            Customer_rating_for_TP: 5,
            Meter_Type: "Legacy PAYG",
            Select_Provider: supplier_name,
            Existing_Energy_Provider,
            boiler_age: "",
            boiler_power: "",
            bank: {
                account_holder,
                account_number,
                account_sortcode: sort_code
            },
            summary: 0.0,
            authorised_by: agent.email,
            supplier_notes: ""
        }

        // Fetch - Validate bank details
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.status !== 200) {
                return Promise.reject(response.json());
            }

            return response.json();
        }).then((response) => {
            console.log(response);
            if (response.status !== 'success') {
                const message = response.message.error;
                // Set error message
                setErrorMessage({
                    ...errorMessage,
                    message: message ? message : 'Please check your bank details'
                });
                // Show Error
                updateError(true);

                return;
            }

            // Hide Bank Details
            updateShowFormBankDetails(false);
            // Update progress bar
            updateProgressBar({ ...progressBar, step: 10 });
            // Show Rating
            updateShowFormRating(true);

            console.log('dispatchSwitching');

            return response;
        }).catch((error) => {
            // Error
            console.error(`Catch an error fetching to postcoder ${error}`);
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'We can not connect to smart debit, please try again'
            });
            // Show Error
            updateError(true);

            return;
        });

        // Hide Overlay
        updateShowOverlay(false);

        return;
    }

    // goToCustomerDetails
    const goToCustomerDetails = (e) => {
        e.preventDefault();

        // Delete Switching details
        const copy_customer_switching = { ...customerInformation };
        delete copy_customer_switching['bankDetails'];
        // Update customer information
        updateCustomerInformation({ ...copy_customer_switching });
        // Update Error
        updateError(false);
        // Hide Bank details
        updateShowFormBankDetails(false);
        // Show Customer Details
        updateShowFormDetails(true);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 9 });

        console.log('goToCustomerDetails');
    }

    return (
        <>
            <section className="form-bank-details-section">
                <div className="form-bank-details-container">

                    {/* Content */}
                    <div className="form-bank-details-content">
                        <div className="form-bank-details">
                            <h1>Bank Details</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dicta libero tenetur commodi id? Eius aperiam illo voluptatem fuga nobis nulla vitae obcaecati. Rerum doloribus veniam accusamus ad quibusdam sequi!</p>
                        </div>

                        {/* Inputs */}
                        <form className="form-bank-details-input-container" onSubmit={(e) => dispatchSwitching(e)}>
                            <div className="form-bank-details-split-content">
                                <div className="form-bank-details-input-content" style={error ? { marginBottom: '1rem' } : null}>
                                    {/* Bank Details */}
                                    <div className="form-bank-details-input-element">
                                        <label htmlFor="acch">Account holder<span>*</span></label>
                                        <input type="text" id="acch" name='account_holder' onChange={handleChange} required maxLength="18" placeholder="Introduce account holder" value={customerInformation.bankDetails.account_holder.replace(/[^a-zA-Z ]/g, "").toUpperCase() || ''} />
                                        <p>18 characters max</p>
                                    </div>

                                    <div className="form-bank-details-input-element">
                                        <label htmlFor="accn">Account number<span>*</span></label>
                                        <input type="text" id="accn" name='account_number' onChange={handleChange} required maxLength="8" placeholder="12345678" value={customerInformation.bankDetails.account_number.replace(/[^0-9.]/g, '').trim() || ''} />
                                    </div>

                                    <div className="form-bank-details-input-element" style={error ? { marginBottom: '0' } : null}>
                                        <label htmlFor="sc">Sort code<span>*</span></label>
                                        <input type="text" id="sc" name='sort_code' onChange={handleChange} required maxLength="6" placeholder="123456" value={customerInformation.bankDetails.sort_code.replace(/[^0-9.]/g, '').trim() || ''} />
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="form-bank-details-img-content">
                                    <img src={BankDetails} alt="Bank Details" />
                                </div>
                            </div>


                            {error ?
                                (
                                    // <Error message={ errorEmail ? 'Please introduce a valid email address' : 'All fields are required, please check'} />
                                    <Error message={errorMessage.message} />
                                )
                                :
                                null
                            }

                            {/* Buttons */}
                            <div className="form-bank-details-btn-container">
                                <button className="form-bank-details-btn btn-back" onClick={(e) => goToCustomerDetails(e)}>
                                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                                        <IoMdArrowDropleft className="icon-back" />
                                    </IconContext.Provider>
                                    Go back
                                </button>

                                <button data-cy="addrtyped-continue" className="form-bank-details-btn btn-next">
                                    Continue

                                    <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                                        <IoMdArrowDropright className="icon-next" />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="form-summary-bank-container">
                        <h1>Summary</h1>

                        <div className="form-summary-bank-section">
                            <h2>Customer Information</h2>

                            <div className="form-summary-bank-content">
                                <div className="form-summary-bank-element">
                                    <p><span>Full name:</span></p>
                                    <p className="text-end">{`${first_name} ${last_name}`}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Email:</span></p>
                                    <p className="text-end">{email}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Phone:</span></p>
                                    <p className="text-end">{phone}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Door number:</span></p>
                                    <p className="text-end">{doornumber}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Address line 1:</span></p>
                                    <p className="text-end">{addressline1}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Address line 2:</span></p>
                                    <p className="text-end">{addressline2}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>City:</span></p>
                                    <p className="text-end">{city}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Postcode:</span></p>
                                    <p className="text-end">{postcode}</p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="form-summary-bank-section">
                            <h2>About your chosen plan</h2>

                            <div className="form-summary-bank-content">
                                <div className="form-summary-bank-element">
                                    <p><span>Plan name:</span></p>
                                    <p className="text-end">{tariff_name}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Annual saving:</span></p>
                                    <p className="text-end"><span>£</span>{148}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Early exit fee:</span></p>
                                    <p className="text-end"><span>£</span>{exit_fees}</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Contract lenght:</span></p>
                                    <p className="text-end">{24} months</p>
                                </div>

                                <div className="form-summary-bank-element">
                                    <p><span>Monthly direct debit:</span></p>
                                    <p className="text-end"><span>£</span>{'31.76'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FormBankDetails;
