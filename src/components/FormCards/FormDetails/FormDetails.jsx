import React, { useState, useEffect } from "react";
// CSS
import "./FormDetails.css";
import { IconContext } from "react-icons";
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
// Utils
import { validateEmail } from '../../../utils/utils';
// Phone Number Validation
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
// Components
import Error from '../../Error/Error';

const FormDetails = ({ customerInformation, progressBar, updateCustomerInformation, updateShowFormCompare, updateShowFormDetails, updateShowFormBankDetails, updateProgressBar, updateShowOverlay }) => {

    /** STATES */
    // disableInput
    const [disableInput, updateDisableInput] = useState(true);

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
    const { tariff_name, exit_fees, monthly_cost } = customerInformation.switching_details.supplier_selected;
    const { debt_apply, debt_amount } = customerInformation.debt;

    // console.log('Desde');
    // console.log(customerInformation);

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
        // Update Customer details
        updateCustomerInformation({
            ...customerInformation,
            customerDetails: {
                ...customerInformation.customerDetails,
                [e.target.name]: e.target.value
            }
        });
    };

    // Verify button
    const verifyCustomer = async (e) => {
        e.preventDefault();

        // Show Overlay
        updateShowOverlay(true);

        let phone = { 'phone': customerInformation.customerDetails.phone.replace(/[^0-9\.]+/g, '').trim().toString() };

        await fetch('https://zohosdkfunction.azurewebsites.net/api/httptrigger1?method=verify', {
            method: 'POST',
            body: JSON.stringify(phone),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status !== 200) {
                return Promise.reject(response.json());
            }

            return response.json();

        }).then((response) => {
            // console.log(response);
            if (response.status !== 200) {
                // Disable input
                updateDisableInput(false);
                return Promise.reject(response);
            }
            // Update Customer details
            updateCustomerInformation({
                ...customerInformation,
                customerDetails: {
                    ...customerInformation.customerDetails,
                    first_name: response.first_name ? response.first_name : '',
                    last_name: response.last_name ? response.last_name : '',
                    email: response.email ? response.email : '',
                    phone: response.phone ? response.phone : ''
                },
                bankDetails: {
                    account_holder: '',
                    account_number: '',
                    sort_code: ''
                }
            });

            // Disable input
            updateDisableInput(true);

        }).catch((error) => {
            console.error('Error: ', error);
            // Update Customer details
            updateCustomerInformation({
                ...customerInformation,
                customerDetails: {
                    ...customerInformation.customerDetails,
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: phone.phone
                },
                bankDetails: {
                    account_holder: '',
                    account_number: '',
                    sort_code: ''
                }
            });
        });

        // Hide Overlay
        updateShowOverlay(false);
    }

    // Edit button
    const editCustomer = (e) => {
        e.preventDefault();

        // Update disable input
        updateDisableInput(false);
    }

    // goToBankDetails
    const goToBankDetails = async (e) => {
        e.preventDefault();

        // Customer Details
        const { first_name, last_name, email, phone } = customerInformation.customerDetails;
        // Validated details
        const first_name_validated = first_name.replace(/[^a-zA-Z ]/g, "").trim();
        const last_name_validated = last_name.replace(/[^a-zA-Z ]/g, "").trim();
        const email_validated = email.replace(/[^A-Za-z0-9|@.-]/g, "").trim();
        const phone_validated = phone.replace(/[^0-9\.]+/g, '').trim().toString();

        // Validate email
        if (!validateEmail(email_validated)) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'Please introduce a valid email address'
            });
            // Show error
            updateError(true);
            return;
        };

        console.log(phone_validated)

        // Validate phone number length
        if (phone_validated.length <= 10 || phone_validated.length > 12) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'Please introduce a valid phone number'
            });
            // Show Error
            updateError(true);
            return;
        };

        // Phone number parsed
        const parsedPhoneNumber = parsePhoneNumber(phone_validated, 'GB');
        // Phone number
        const phoneNumber = parsedPhoneNumber.number;

        // Phone number validation
        if (!isValidPhoneNumber(phoneNumber, 'GB')) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'Please introduce a valid phone number'
            });
            // Show Error
            updateError(true);
            return;
        };

        // Validation
        if (!first_name_validated || !last_name_validated || !email_validated || !phone_validated) {
            // Set error message
            setErrorMessage({
                ...errorMessage,
                message: 'All fields are required'
            });
            // Show Error
            updateError(true);
            return;
        };

        if (!disableInput) {
            // Show Overlay
            updateShowOverlay(true);

            // Customer Object
            const customerObj = {
                "fullname": `${first_name_validated} ${last_name_validated}`,
                "email": email_validated,
                "phone": phoneNumber,
                "authorised_by": customerInformation.agent.email
            }

            console.log(customerObj)

            // Endpoint
            const url = 'https://zohocontactcreatefunction.azurewebsites.net/api/HttpTrigger1?method=createContact';
            // Fetch Create contact
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(customerObj),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function (response) {
                console.log(response);
                return response.json();

            }).then(function (response) {
                console.log(response);
                return response;
            }).catch(function (error) {
                console.error(`Catch an error fetching to postcoder ${error}`);
            });

            // Hide Overlay
            updateShowOverlay(false);
        }

        // Update Customer details
        updateCustomerInformation({
            ...customerInformation,
            customerDetails: {
                ...customerInformation.customerDetails,
                first_name: first_name_validated,
                last_name: last_name_validated,
                email: email_validated,
                phone: phoneNumber.replace(/[^0-9\.]+/g, '')
            },
            bankDetails: {
                account_holder: '',
                account_number: '',
                sort_code: ''
            }
        });

        // Update Error
        updateError(false);
        // Hide Form Customer details
        updateShowFormDetails(false);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 10 });
        // Show Bank Details
        updateShowFormBankDetails(true);
    }

    // goToCompareSection
    const goToCompareSection = (e) => {
        e.preventDefault();

        // Delete Switching details
        const copy_customer_switching = { ...customerInformation };
        delete copy_customer_switching['switching_details'];
        delete copy_customer_switching['customerDetails'];
        // Update customer information
        updateCustomerInformation({ ...copy_customer_switching });
        // Update Error
        updateError(false);
        // Hide Customer details
        updateShowFormDetails(false);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 8 });
        // Show compare section 
        updateShowFormCompare(true);
    }

    // UseEffect - conditional disable state
    useEffect(() => {
        if ((!customerInformation.customerDetails.first_name) || (!customerInformation.customerDetails.last_name) || (!customerInformation.customerDetails.email) || (!customerInformation.customerDetails.phone)) {
            // Update disable input
            updateDisableInput(false)
        }
    }, []);

    return (
        <>
            <section className="form-details-section">
                <div className="form-details-container">

                    {/* Content */}
                    <div className="form-details-content">
                        <div className="form-details">
                            <h1>Customer Details</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dicta libero tenetur commodi id? Eius aperiam illo voluptatem fuga nobis nulla vitae obcaecati. Rerum doloribus veniam accusamus ad quibusdam sequi!</p>
                        </div>

                        {/* Inputs */}
                        <form className="form-details-input-container" onSubmit={(e) => goToBankDetails(e)}>
                            <div className="form-details-input-content-custom">
                                <div className="form-details-input-element-custom">
                                    <label htmlFor="firstName">First Name<span>*</span></label>
                                    <input type="text" id="firstName" name='first_name' onChange={handleChange} value={customerInformation.customerDetails.first_name.replace(/[^a-zA-Z ]/g, "") || ''} disabled={disableInput} />
                                </div>

                                <div className="form-details-input-element-custom">
                                    <label htmlFor="lastName">Last Name<span>*</span></label>
                                    <input type="text" id="lastName" name='last_name' onChange={handleChange} value={customerInformation.customerDetails.last_name.replace(/[^a-zA-Z ]/g, "") || ''} disabled={disableInput} />
                                </div>
                            </div>

                            <div className="form-details-input-element">
                                <label htmlFor="emailAddress">Email address<span>*</span></label>
                                <input type="text" id="emailAddress" name='email' onChange={handleChange} value={customerInformation.customerDetails.email.replace(/[^A-Za-z0-9|@.-]/g, "") || ''} disabled={disableInput} required={true} />
                            </div>

                            <div className="form-details-input-content-custom" style={error ? { marginBottom: '1.9rem' } : null} >
                                <div className="form-details-input-element-custom">
                                    <label htmlFor="phoneNumber">Phone Number<span>*</span></label>
                                    <input type="text" id="phoneNumber" name='phone' onChange={handleChange} value={customerInformation.customerDetails.phone.replace(/[^0-9\.]+/g, '') || ''} disabled={disableInput} required={true} />
                                </div>

                                {/* Verify and Edit buttons */}
                                <div className="form-details-btn-container-custom">
                                    <div>
                                        <button className="form-details-btn-custom" type="button" disabled={disableInput} onClick={(e) => verifyCustomer(e)}>Verify</button>

                                        <button className="form-details-btn-custom" type="button" onClick={(e) => editCustomer(e)}>Edit</button>
                                    </div>
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
                            <div className="form-details-btn-container">
                                <button className="form-details-btn btn-back" onClick={(e) => goToCompareSection(e)}>
                                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                                        <IoMdArrowDropleft className="icon-back" />
                                    </IconContext.Provider>
                                    Go back
                                </button>

                                <button data-cy="addrtyped-continue" className="form-details-btn btn-next">
                                    Continue

                                    <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                                        <IoMdArrowDropright className="icon-next" />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="form-summary-container">
                        <h1>Summary</h1>

                        <div className="form-summary-section">
                            <h2>Customer Information</h2>

                            <div className="form-summary-content">
                                <div className="form-summary-element">
                                    <p><span>Door number:</span></p>
                                    <p className="text-end">{doornumber}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Address line 1:</span></p>
                                    <p className="text-end">{addressline1}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Address line 2:</span></p>
                                    <p className="text-end">{addressline2}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>City:</span></p>
                                    <p className="text-end">{city}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Postcode:</span></p>
                                    <p className="text-end">{postcode}</p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="form-summary-section">
                            <h2>About your chosen plan</h2>

                            <div className="form-summary-content">
                                <div className="form-summary-element">
                                    <p><span>Plan name:</span></p>
                                    <p className="text-end">{tariff_name}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Annual saving:</span></p>
                                    <p className="text-end"><span>£</span>{148}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Early exit fee:</span></p>
                                    <p className="text-end"><span>£</span>{exit_fees}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Contract length:</span></p>
                                    <p className="text-end">{24} months</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Monthly direct debit:</span></p>
                                    <p className="text-end"><span>£</span>{monthly_cost}</p>
                                </div>

                                <div className="form-summary-element">
                                    <p><span>Existing debt:</span></p>
                                    <p className="text-end">{debt_apply ? <><span>£</span>{debt_amount}</> : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FormDetails;
