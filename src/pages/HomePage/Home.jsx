import React, { useState, lazy, Suspense } from "react";
// Firebase
import { db } from "../../firebase/firebase";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Overlay from "../../components/Overlay/Overlay";
const FormPostCode = lazy(() => import('../../components/FormCards/FormPostCode/FormPostCode'));
const FormAddress = lazy(() => import('../../components/FormCards/FormAddress/FormAddress'));
const FormFuelType = lazy(() => import('../../components/FormCards/FormFuelType/FormFuelType'));
const FormMpanMprn = lazy(() => import('../../components/FormCards/FormMPN-MPRN/FormMpanMprn'));
const FormSupply = lazy(() => import('../../components/FormCards/FormSupply/FormSupply'));
const FormE7 = lazy(() => import('../../components/FormCards/FormE7/FormE7'));
// const FormTariffs = lazy(() => import('../../components/FormCards/FormTariffs/FormTariffs'));
const FormUsageKWH = lazy(() => import('../../components/FormCards/FormsUsage/FormUsageKWH/FormUsageKWH'));
const FormUsageGAS = lazy(() => import('../../components/FormCards/FormsUsage/FormUsageGAS/FormUsageGAS'));
const FormUsageGBP_es = lazy(() => import('../../components/FormCards/FormsUsage/FormUsageGBP_es/FormUsageGBP_es'));
const FormUsageGBP_gs = lazy(() => import('../../components/FormCards/FormsUsage/FormUsageGBP_gs/FormUsageGBP_gs'));
const FormUsageAVG = lazy(() => import('../../components/FormCards/FormsUsage/FormUsageAVG/FormUsageAVG'));
const FormDebt = lazy(() => import('../../components/FormCards/FormDebt/FormDebt'));
const FormCompare = lazy(() => import('../../components/FormCards/FormCompare/FormCompare'));
const FormDetails = lazy(() => import('../../components/FormCards/FormDetails/FormDetails'));
const FormBankDetails = lazy(() => import('../../components/FormCards/FormBankDetails/FormBankDetails'));
const FormRating = lazy(() => import('../../components/FormCards/FormRating/FormRating'));
const FormSuccessful = lazy(() => import('../../components/FormCards/FormSuccessful/FormSuccessful'));

function Home({ user }) {
    /* -- STATES -- */
    // Progress bar 
    const [progressBar, updateProgressBar] = useState({ step: 0 });

    // Script
    const [showScript, updateShowScript] = useState(true);

    // Customer Postcode State
    const [customerPostCode, updateCustomerPostCode] = useState({
        postcode: ""
    });

    // Customer Address
    const [customerAddres, updateCustomerAddress] = useState({});

    // Use gas 
    const [useGas, updateUseGas] = useState({});

    // Fuel
    const [fuel, updateFuel] = useState({});

    // Customer Electricity Information
    const [electricityInformation, updateElectricityInformation] = useState({});

    // Customer Gas Information
    const [gasInformation, updateGasInformation] = useState({});

    // Customer supplier information
    const [supplierInformation, updateSupplierInformation] = useState({});

    // Customer Information
    const [customerInformation, updateCustomerInformation] = useState({});

    // Customer Electricity Payment Type
    const [electricityPaymentType, updateElectricityPaymentType] = useState({});

    // Customer Gas Payment Type
    const [gasPaymentType, updateGasPaymentType] = useState({});

    // Customer Economy 7
    const [economy7, updateEconomy7] = useState({});

    /** -- VIEWS states -- */

    // Show Overlay
    const [showOverlay, updateShowOverlay] = useState(false);

    // Show Form PostCode
    const [showFormPostCode, updateShowFormPostCode] = useState(true);

    // Show Form Address
    const [showFormAddres, updateShowFormAddres] = useState(false);

    // Show form Fuel type
    const [showFormFuelType, updateShowFomrFuelType] = useState(false);

    // Show Form MPAN/MPRN 
    const [showFormMpanMprn, updateShowFormMpanMprn] = useState(false);

    // Show Form Supply 
    const [showFormSupply, updateShowFormSupply] = useState(false);

    // Show Form E7
    const [showE7, updateShowE7] = useState(false);

    // // Show Form Tariffs
    // const [showFormTariffs, updateShowFormTariffs] = useState(false);

    // Show Form Usage KWH
    const [showFormUsageKWH, updateShowFormUsageKWH] = useState(false);

    // Show Form Usage GAS
    const [showFormUsageGAS, updateShowFormUsageGAS] = useState(false);

    // Show Form Usage GBP_es
    const [showFormUsageGBP_es, updateShowFormUsageGBP_es] = useState(false);

    // Show Form Usage GBP_gs
    const [showFormUsageGBP_gs, updateShowFormUsageGBP_gs] = useState(false);

    // Show Form Usage AVG
    const [showFormUsageAVG, updateShowFormUsageAVG] = useState(false);

    // AVG for elec
    const [avgElec, updateAvgElec] = useState(false);

    // AVG for gas
    const [avgGas, updateAvgGas] = useState(false);

    // Show Form Debt
    const [showFormDebt, updateShowFormDebt] = useState(false);

    // Show Form Compare
    const [showFormCompare, updateShowFormCompare] = useState(false);

    // Show Form Details
    const [showFormDetails, updateShowFormDetails] = useState(false);

    // Show Form Bank Details
    const [showFormBankDetails, updateShowFormBankDetails] = useState(false);

    // Show rating
    const [showFormRating, updateShowFormRating] = useState(false);

    // Show Successful
    const [showSuccessFul, updateShowSuccessFul] = useState(false);

    // Add postcode to customer 
    const addPostCodeData = (postcode) => {
        const postCodeData = postcode;
        updateCustomerPostCode({
            postcode: postCodeData.toUpperCase()
        });
    };

    // Customer step
    const customerStep = async (customer) => {

        const { step, customerAddres, MPANDetails, dataGas, fuel, useGas, fuel_description, supplierInformation, electricityPaymentType, gasPaymentType, economy7, usage_property_size_dual, usage_property_size_es, usage_property_size_gs, usage_gas_description, usage_gbp_description_gs, usage_kwh_description, usage_gbp_description_es, avgElec, avgGas, debt } = customer;

        console.log('Aqui aqui');

        console.log(debt)

        // Postcode
        const { postcode } = customerAddres;

        // Variables
        let gas_only;
        let elec_only;
        let same_supplier;
        let dual_active;

        if (step > 1) {
            /**-- Assign Values   */
            gas_only = fuel_description.gas_only;
            elec_only = fuel_description.elec_only;
            same_supplier = fuel_description.same_supplier;
            dual_active = fuel_description.dual_active;
        }

        // Variables for electricity and gas payment methods validated
        let electricityPaymentType_validated;
        let gasPaymentType_validated;

        // Validation Electricity payment type
        let electricity_payment_type_id;
        let electricity_payment_type_method;

        // Validation Gas payment type
        let gas_payment_type_id;
        let gas_payment_type_method;

        // Default unit rate for electricity
        const general_unit_rate_elec = { unit_rate: 17 };

        // Default unit rate for gas
        const general_unit_rate_gas = { unit_rate: 27 };

        /**-- Unit rate for electricity --*/

        // DocRef Unit Rate Elec
        let unitRateElecRef = await db.collection("unitRates").doc('unit_rate_svt_elec');

        let unitRateElec = await unitRateElecRef.get().then((doc) => {
            if (doc.exists) {

                return doc.data();

            } else {

                // console.log(general_unit_rate_elec);

                return general_unit_rate_elec;
            }
        }).catch((error) => {

            console.log("Error getting document:", error);
            // console.log(general_unit_rate_elec);

            return general_unit_rate_elec;
        });

        /**-- Unit rate for gas --*/

        // DocRef Unit Rate gas
        let unitRateGasRef = await db.collection("unitRates").doc('unit_rate_svt_gas');

        let unitRateGas = await unitRateGasRef.get().then((doc) => {
            if (doc.exists) {

                return doc.data();

            } else {

                // console.log(general_unit_rate_elec);

                return general_unit_rate_gas;
            }
        }).catch((error) => {

            console.log("Error getting document:", error);
            // console.log(general_unit_rate_elec);

            return general_unit_rate_gas;
        });

        // Step 0 - Enter your postcode
        switch (step) {
            case 0:
                console.log('Step 0');

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 1 });
                // Add postcode to customerData
                addPostCodeData(postcode);
                // Hidde Form Post Code
                updateShowFormPostCode(false);
                // Show Form Address
                updateShowFormAddres(true);
                // Hide Overlay
                updateShowOverlay(false);
                break;

            // Step 1 - Enter your full address -> Choose your fuel type
            case 1:
                console.log('Step 1');

                // Add postcode to customerData
                addPostCodeData(postcode);

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 2 });
                // Hide Address
                updateShowFormAddres(false);
                // Show Form Fuel type
                updateShowFomrFuelType(true);
                // Hide Overlay
                updateShowOverlay(false);

                break;

            // Step 2 - Choose your fuel type -> Supply number
            case 2:
                console.log('Step 2');

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update fuel state
                updateFuel({ ...fuel });

                // Update useGas
                updateUseGas({ ...useGas });

                // Update Customer
                updateCustomerInformation({
                    ...customerInformation,
                    fuel_description
                });

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 3 });
                // Hide Address
                updateShowFormAddres(false);
                // Show MPAN/MPRN
                updateShowFormMpanMprn(true);
                // Hide Overlay
                updateShowOverlay(false);

                break;

            // Step 3 - Supply number -> Choose your energy supplier(s)
            case 3:
                console.log('Step 3');

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update fuel state
                updateFuel({ ...fuel });

                // Update useGas
                updateUseGas({ ...useGas });

                // Update Supplier Information
                updateSupplierInformation({ ...supplierInformation });

                // Update Customer
                updateCustomerInformation({
                    ...customerInformation,
                    fuel_description
                });

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 4 });
                // Hide Address
                updateShowFormAddres(false);
                // Show Form Supply
                updateShowFormSupply(true);
                // Hide Overlay
                updateShowOverlay(false);

                break;

            // Step 4 - Choose your energy supplier(s) -> Economy 7
            case 4:
                console.log('Step 4');

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update fuel state
                updateFuel({ ...fuel });

                // Update useGas
                updateUseGas({ ...useGas });

                // Update Supplier Information
                updateSupplierInformation({ ...supplierInformation });

                /**-- Payment type validation --*/

                // Validation Electricity payment type
                electricity_payment_type_id = electricityPaymentType.electricity_payment_type_id;
                electricity_payment_type_method = electricityPaymentType.electricity_payment_type_method;

                if ((electricity_payment_type_id === '') && (electricity_payment_type_method === '')) {
                    // Delete Electricity payment type if it is empty
                    const copy_electricityPaymentType = { ...electricityPaymentType };
                    delete copy_electricityPaymentType['electricity_payment_type_id'];
                    delete copy_electricityPaymentType['electricity_payment_type_method'];
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...copy_electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = copy_electricityPaymentType;
                } else {
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = electricityPaymentType;
                }

                // Validation Gas payment type
                gas_payment_type_id = gasPaymentType.gas_payment_type_id;
                gas_payment_type_method = gasPaymentType.gas_payment_type_method;

                if ((gas_payment_type_id === '') && (gas_payment_type_method === '')) {
                    // Delete Gas payment type if it is empty
                    const copy_gasPaymentType = { ...gasPaymentType };
                    delete copy_gasPaymentType['gas_payment_type_id'];
                    delete copy_gasPaymentType['gas_payment_type_method'];
                    // Update Gas payment type
                    updateGasPaymentType({ ...copy_gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = copy_gasPaymentType;
                } else {
                    // Update Gas payment type
                    updateGasPaymentType({ ...gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = gasPaymentType;
                }

                // Update customer information
                updateCustomerInformation({
                    ...customerInformation,
                    customerAddres,
                    useGas,
                    fuel,
                    supplierInformation,
                    electricityPaymentType: electricityPaymentType_validated,
                    gasPaymentType: gasPaymentType_validated,
                    fuel_description,
                });

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 5 });
                // Hide Address
                updateShowFormAddres(false);
                // Show FormE7
                updateShowE7(true);
                // Hide Overlay
                updateShowOverlay(false);

                break;

            // Step 5 - Economy 7 -> How much energy do you use?
            case 5:
                console.log('Step 5');

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update fuel state
                updateFuel({ ...fuel });

                // Update useGas
                updateUseGas({ ...useGas });

                // Update Supplier Information
                updateSupplierInformation({ ...supplierInformation });

                /**-- Payment type validation --*/

                // Validation Electricity payment type
                electricity_payment_type_id = electricityPaymentType.electricity_payment_type_id;
                electricity_payment_type_method = electricityPaymentType.electricity_payment_type_method;

                if ((electricity_payment_type_id === '') && (electricity_payment_type_method === '')) {
                    // Delete Electricity payment type if it is empty
                    const copy_electricityPaymentType = { ...electricityPaymentType };
                    delete copy_electricityPaymentType['electricity_payment_type_id'];
                    delete copy_electricityPaymentType['electricity_payment_type_method'];
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...copy_electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = copy_electricityPaymentType;
                } else {
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = electricityPaymentType;
                }

                // Validation Gas payment type
                gas_payment_type_id = gasPaymentType.gas_payment_type_id;
                gas_payment_type_method = gasPaymentType.gas_payment_type_method;

                if ((gas_payment_type_id === '') && (gas_payment_type_method === '')) {
                    // Delete Gas payment type if it is empty
                    const copy_gasPaymentType = { ...gasPaymentType };
                    delete copy_gasPaymentType['gas_payment_type_id'];
                    delete copy_gasPaymentType['gas_payment_type_method'];
                    // Update Gas payment type
                    updateGasPaymentType({ ...copy_gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = copy_gasPaymentType;
                } else {
                    // Update Gas payment type
                    updateGasPaymentType({ ...gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = gasPaymentType;
                }

                // Update Economy 7
                updateEconomy7({
                    economy7: {
                        ...economy7
                    }
                });

                /**-- Assign Tariff description  */

                // elec_only
                if (elec_only) {
                    console.log('elec_only, Assign Tariff description');

                    // Update customer information
                    updateCustomerInformation({
                        ...customerInformation,
                        customerAddres,
                        useGas,
                        fuel,
                        supplierInformation,
                        electricityPaymentType: electricityPaymentType_validated,
                        gasPaymentType: gasPaymentType_validated,
                        fuel_description,
                        economy7,
                        tariff_description: {
                            unit_rate: unitRateElec.unit_rate
                        }
                    });
                }

                // gas_only
                if (gas_only) {
                    console.log('gas_only, Assign Tariff description');

                    // Update customer information
                    updateCustomerInformation({
                        ...customerInformation,
                        customerAddres,
                        useGas,
                        fuel,
                        supplierInformation,
                        electricityPaymentType: electricityPaymentType_validated,
                        gasPaymentType: gasPaymentType_validated,
                        fuel_description,
                        economy7,
                        tariff_description: {
                            unit_rate: unitRateGas.unit_rate
                        }
                    });
                }

                // dual_active
                if (dual_active) {
                    // same_supplier
                    if (same_supplier) {
                        console.log('Same supplier true, Assign Tariff description');

                        // Update customer information
                        updateCustomerInformation({
                            ...customerInformation,
                            customerAddres,
                            useGas,
                            fuel,
                            supplierInformation,
                            electricityPaymentType: electricityPaymentType_validated,
                            gasPaymentType: gasPaymentType_validated,
                            fuel_description,
                            economy7,
                            tariff_description: {
                                unit_rate_elec: unitRateElec.unit_rate,
                                unit_rate_gas: unitRateGas.unit_rate,
                            }
                        });
                    } else {
                        console.log('Same supplier false, Assign Tariff description');

                        // Update customer information
                        updateCustomerInformation({
                            ...customerInformation,
                            customerAddres,
                            useGas,
                            fuel,
                            supplierInformation,
                            electricityPaymentType: electricityPaymentType_validated,
                            gasPaymentType: gasPaymentType_validated,
                            fuel_description,
                            economy7,
                            tariff_description_elec: {
                                elec_tariff: {
                                    unit_rate: unitRateElec.unit_rate
                                }
                            },
                            tariff_description_gas: {
                                gas_tariff: {
                                    unit_rate: unitRateGas.unit_rate
                                }
                            }
                        });
                    }
                }

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 6 });
                // Hide Address
                updateShowFormAddres(false);

                // Conditional to usage section
                if (gas_only) {
                    // Show Gas
                    updateShowFormUsageGAS(true)
                } else {
                    // Show KWH
                    updateShowFormUsageKWH(true);
                }

                // Hide Overlay
                updateShowOverlay(false);

                break;
            
            // Step 6 - How much energy do you use? -> Existing debt
            case 6:
                console.log('Step 6');
                break;

            // Step 7 - How much energy do you use? -> Compare section
            case 7:
                console.log('Step 7');

                // Update customer address
                updateCustomerAddress({ ...customerAddres });

                // Update Electricity information
                updateElectricityInformation({ ...electricityInformation, MPANDetails });

                // Update Gas information
                updateGasInformation({ ...gasInformation, dataGas });

                // Update fuel state
                updateFuel({ ...fuel });

                // Update useGas
                updateUseGas({ ...useGas });

                // Update Supplier Information
                updateSupplierInformation({ ...supplierInformation });

                /**-- Payment type validation --*/

                // Validation Electricity payment type
                electricity_payment_type_id = electricityPaymentType.electricity_payment_type_id;
                electricity_payment_type_method = electricityPaymentType.electricity_payment_type_method;

                if ((electricity_payment_type_id === '') && (electricity_payment_type_method === '')) {
                    // Delete Electricity payment type if it is empty
                    const copy_electricityPaymentType = { ...electricityPaymentType };
                    delete copy_electricityPaymentType['electricity_payment_type_id'];
                    delete copy_electricityPaymentType['electricity_payment_type_method'];
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...copy_electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = copy_electricityPaymentType;
                } else {
                    // Update Electricity payment type
                    updateElectricityPaymentType({ ...electricityPaymentType });
                    // Assigning validated value
                    electricityPaymentType_validated = electricityPaymentType;
                }

                // Validation Gas payment type
                gas_payment_type_id = gasPaymentType.gas_payment_type_id;
                gas_payment_type_method = gasPaymentType.gas_payment_type_method;

                if ((gas_payment_type_id === '') && (gas_payment_type_method === '')) {
                    // Delete Gas payment type if it is empty
                    const copy_gasPaymentType = { ...gasPaymentType };
                    delete copy_gasPaymentType['gas_payment_type_id'];
                    delete copy_gasPaymentType['gas_payment_type_method'];
                    // Update Gas payment type
                    updateGasPaymentType({ ...copy_gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = copy_gasPaymentType;
                } else {
                    // Update Gas payment type
                    updateGasPaymentType({ ...gasPaymentType });
                    // Assigning validated value
                    gasPaymentType_validated = gasPaymentType;
                }

                // Update Economy 7
                updateEconomy7({
                    economy7: {
                        ...economy7
                    }
                });

                /**-- Assign Tariff description && Usage */

                // Entered usage boolean values 
                // Elec
                const usage_kwh_entered = usage_kwh_description.usage_kwh_entered;
                const usage_gbp_entered_es = usage_gbp_description_es.usage_gbp_entered;
                const usage_size_entered_es = usage_property_size_es.usage_size_entered;

                // Gas
                const usage_gas_entered = usage_gas_description.usage_kwh_entered;
                const usage_gbp_entered_gs = usage_gbp_description_gs.usage_gbp_entered;
                const usage_size_entered_gs = usage_property_size_gs.usage_size_entered;

                // Dual
                const usage_size_entered_dual = usage_property_size_dual.usage_size_entered;

                // usage_validated
                const usage_validated = {
                    usage_kwh_description,
                    usage_gbp_description_es,
                    usage_gas_description,
                    usage_gbp_description_gs,
                    usage_property_size_es,
                    usage_property_size_gs,
                    usage_property_size_dual
                };

                // copy_usage_validated
                let copy_usage_validated = { ...usage_validated };

                /**-- Electricity Values --*/

                // Validation usage_kwh_entered
                if (usage_kwh_entered) {
                    delete copy_usage_validated['usage_gbp_description_es'];
                    delete copy_usage_validated['usage_property_size_es'];
                    delete copy_usage_validated['usage_property_size_dual'];
                }

                //  Validation usage_gbp_entered_es
                if (usage_gbp_entered_es) {
                    delete copy_usage_validated['usage_property_size_es'];
                    delete copy_usage_validated['usage_property_size_dual'];
                }

                // Validation usage_size_entered_es
                if (usage_size_entered_es) {
                    delete copy_usage_validated['usage_property_size_dual'];
                    delete copy_usage_validated['usage_property_size_gs'];
                }

                /**-- Gas Values --*/

                // usage_gas_entered
                if (usage_gas_entered) {
                    delete copy_usage_validated['usage_gbp_description_gs'];
                    delete copy_usage_validated['usage_property_size_gs'];
                    delete copy_usage_validated['usage_property_size_dual'];
                }

                // Validation usage_gbp_entered_gs
                if (usage_gbp_entered_gs) {
                    delete copy_usage_validated['usage_property_size_gs'];
                    delete copy_usage_validated['usage_property_size_dual'];
                }

                // Validation usage_size_entered_gs
                if (usage_size_entered_gs) {
                    delete copy_usage_validated['usage_property_size_dual'];
                    delete copy_usage_validated['usage_property_size_es'];
                }

                /**-- Dual Values --*/

                // Validation usage_size_entered_dual
                if (usage_size_entered_dual) {
                    delete copy_usage_validated['usage_property_size_es'];
                    delete copy_usage_validated['usage_property_size_gs'];
                }

                // elec_only
                if (elec_only) {
                    console.log('elec_only, Assign Tariff description');

                    delete copy_usage_validated['usage_gas_description'];
                    delete copy_usage_validated['usage_gbp_description_gs'];
                    delete copy_usage_validated['usage_property_size_gs'];
                    delete copy_usage_validated['usage_property_size_dual'];

                    // Update customer information
                    updateCustomerInformation({
                        ...customerInformation,
                        customerAddres,
                        useGas,
                        fuel,
                        supplierInformation,
                        electricityPaymentType: electricityPaymentType_validated,
                        gasPaymentType: gasPaymentType_validated,
                        fuel_description,
                        economy7,
                        tariff_description: {
                            unit_rate: unitRateElec.unit_rate
                        },
                        debt,
                        ...copy_usage_validated
                    });
                }

                // gas_only
                if (gas_only) {
                    console.log('gas_only, Assign Tariff description');

                    delete copy_usage_validated['usage_kwh_description'];
                    delete copy_usage_validated['usage_gbp_description_es'];
                    delete copy_usage_validated['usage_property_size_es'];
                    delete copy_usage_validated['usage_property_size_dual'];

                    // Update customer information
                    updateCustomerInformation({
                        ...customerInformation,
                        customerAddres,
                        useGas,
                        fuel,
                        supplierInformation,
                        electricityPaymentType: electricityPaymentType_validated,
                        gasPaymentType: gasPaymentType_validated,
                        fuel_description,
                        economy7,
                        tariff_description: {
                            unit_rate: unitRateGas.unit_rate
                        },
                        debt,
                        ...copy_usage_validated
                    });
                }

                // dual_active
                if (dual_active) {
                    // same_supplier
                    if (same_supplier) {
                        console.log('Same supplier true, Assign Tariff description');

                        // Update customer information
                        updateCustomerInformation({
                            ...customerInformation,
                            customerAddres,
                            useGas,
                            fuel,
                            supplierInformation,
                            electricityPaymentType: electricityPaymentType_validated,
                            gasPaymentType: gasPaymentType_validated,
                            fuel_description,
                            economy7,
                            tariff_description: {
                                unit_rate_elec: unitRateElec.unit_rate,
                                unit_rate_gas: unitRateGas.unit_rate,
                            },
                            debt,
                            ...copy_usage_validated
                        });

                    } else {
                        console.log('Same supplier false, Assign Tariff description');

                        // Update customer information
                        updateCustomerInformation({
                            ...customerInformation,
                            customerAddres,
                            useGas,
                            fuel,
                            supplierInformation,
                            electricityPaymentType: electricityPaymentType_validated,
                            gasPaymentType: gasPaymentType_validated,
                            fuel_description,
                            economy7,
                            tariff_description_elec: {
                                elec_tariff: {
                                    unit_rate: unitRateElec.unit_rate
                                }
                            },
                            tariff_description_gas: {
                                gas_tariff: {
                                    unit_rate: unitRateGas.unit_rate
                                }
                            },
                            debt,
                            ...copy_usage_validated
                        });
                    }
                }

                // Update AvgElec
                updateAvgElec(avgElec);
                // Update AvgGas
                updateAvgGas(avgGas);

                // Update progress bar
                updateProgressBar({ ...progressBar, step: 8 });
                // Hide Form Address
                updateShowFormAddres(false);
                // Show Compare
                updateShowFormCompare(true);

                // Hide Overlay
                updateShowOverlay(false);

                break;

            // Step 8
            case 8:
                console.log('Step 8');
                break;
            default:
                break;
        }
    }

    // States control
    // console.log('De aqui para abajo');
    // console.log(customerAddres);
    // console.log(useGas);
    // console.log(fuel);   
    // console.log(electricityInformation);
    // console.log(gasInformation);
    // console.log(supplierInformation);
    console.log(customerInformation);
    // console.log(electricityPaymentType);
    // console.log(gasPaymentType);
    // console.log(economy7);

    // console.log(electricityInformation);
    // console.log(gasInformation);
    // console.log(supplierInformation);
    // console.log(customerInformation);
    // console.log(electricityPaymentType);
    // console.log(customerAddres);
    // console.log(economy7);
    // console.log(useGas);
    // console.log(fuel);

    return (
        <>
            {/* Navbar */}
            <Navbar
                progressBar={progressBar}
                user={user}
            />

            {/* Overlay */}
            {showOverlay ? <Overlay text={'Loading data, please wait...'} spinner={true} /> : null}

            <>
                {/* Postcode form*/}
                {showFormPostCode ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormPostCode
                                addPostCodeData={addPostCodeData}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateShowFormPostCode={updateShowFormPostCode}
                                updateShowFormAddres={updateShowFormAddres}
                                updateProgressBar={updateProgressBar}
                                updateShowScript={updateShowScript}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                }

                {/* Address form*/}
                {showFormAddres ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormAddress
                                postcodeValue={customerPostCode.postcode}
                                gasInformation={gasInformation}
                                electricityInformation={electricityInformation}
                                progressBar={progressBar}
                                showScript={showScript}
                                customerStep={customerStep}
                                updateCustomerAddress={updateCustomerAddress}
                                updateGasInformation={updateGasInformation}
                                updateElectricityInformation={updateElectricityInformation}
                                updateShowFormPostCode={updateShowFormPostCode}
                                updateShowFormAddres={updateShowFormAddres}
                                updateShowOverlay={updateShowOverlay}
                                updateProgressBar={updateProgressBar}
                                updateShowScript={updateShowScript}
                                updateShowFomrFuelType={updateShowFomrFuelType}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                }

                {/* Fuel type */}
                {showFormFuelType ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormFuelType
                                customerInformation={customerInformation}
                                showScript={showScript}
                                fuel={fuel}
                                useGas={useGas}
                                electricityInformation={electricityInformation}
                                gasInformation={gasInformation}
                                supplierInformation={supplierInformation}
                                customerAddres={customerAddres}
                                progressBar={progressBar}
                                updateCustomerInformation={updateCustomerInformation}
                                updateFuel={updateFuel}
                                updateUseGas={updateUseGas}
                                updateElectricityInformation={updateElectricityInformation}
                                updateGasInformation={updateGasInformation}
                                updateSupplierInformation={updateSupplierInformation}
                                updateCustomerAddress={updateCustomerAddress}
                                updateShowFomrFuelType={updateShowFomrFuelType}
                                updateShowFormMpanMprn={updateShowFormMpanMprn}
                                updateShowFormAddres={updateShowFormAddres}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    null
                }

                {/* MPAN/MPRN form*/}
                {showFormMpanMprn ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormMpanMprn
                                customerAddres={customerAddres}
                                electricityInformation={electricityInformation}
                                gasInformation={gasInformation}
                                customerInformation={customerInformation}
                                useGas={useGas}
                                fuel={fuel}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateCustomerAddress={updateCustomerAddress}
                                updateElectricityInformation={updateElectricityInformation}
                                updateGasInformation={updateGasInformation}
                                updateCustomerInformation={updateCustomerInformation}
                                updateProgressBar={updateProgressBar}
                                updateShowFormMpanMprn={updateShowFormMpanMprn}
                                updateShowFormSupply={updateShowFormSupply}
                                updateShowFomrFuelType={updateShowFomrFuelType}
                                updateShowOverlay={updateShowOverlay}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                }
                {/* Supplier Information form*/}
                {showFormSupply ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormSupply
                                customerAddres={customerAddres}
                                electricityInformation={electricityInformation}
                                gasInformation={gasInformation}
                                supplierInformation={supplierInformation}
                                useGas={useGas}
                                fuel={fuel}
                                customerInformation={customerInformation}
                                electricityPaymentType={electricityPaymentType}
                                gasPaymentType={gasPaymentType}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateCustomerAddress={updateCustomerAddress}
                                updateShowFormMpanMprn={updateShowFormMpanMprn}
                                updateShowFormSupply={updateShowFormSupply}
                                updateShowE7={updateShowE7}
                                updateSupplierInformation={updateSupplierInformation}
                                updateElectricityInformation={updateElectricityInformation}
                                updateGasInformation={updateGasInformation}
                                updateCustomerInformation={updateCustomerInformation}
                                updateElectricityPaymentType={updateElectricityPaymentType}
                                updateGasPaymentType={updateGasPaymentType}
                                updateFuel={updateFuel}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                }
                {/* Economy 7 form */}
                {showE7 ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormE7
                                economy7={economy7}
                                customerInformation={customerInformation}
                                electricityPaymentType={electricityPaymentType}
                                gasPaymentType={gasPaymentType}
                                electricityInformation={electricityInformation}
                                gasInformation={gasInformation}
                                supplierInformation={supplierInformation}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateEconomy7={updateEconomy7}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormSupply={updateShowFormSupply}
                                updateShowE7={updateShowE7}
                                // updateShowFormTariffs={updateShowFormTariffs}
                                updateElectricityPaymentType={updateElectricityPaymentType}
                                updateGasPaymentType={updateGasPaymentType}
                                updateProgressBar={updateProgressBar}
                                updateShowOverlay={updateShowOverlay}
                                updateSupplierInformation={updateSupplierInformation}
                                updateGasInformation={updateGasInformation}
                                updateElectricityInformation={updateElectricityInformation}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                }
                {/* Form Tariffs
                {showFormTariffs ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormTariffs
                                customerInformation={customerInformation}
                                showScript={showScript}
                                progressBar={progressBar}
                                updateShowE7={updateShowE7}
                                // updateShowFormTariffs={updateShowFormTariffs}
                                updateShowOverlay={updateShowOverlay}
                                updateCustomerInformation={updateCustomerInformation}
                                updateElectricityPaymentType={updateElectricityPaymentType}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    (
                        null
                    )
                } */}
                {/* Form Usage */}
                {showFormUsageKWH ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormUsageKWH
                                customerInformation={customerInformation}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateAvgElec={updateAvgElec}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormDebt={updateShowFormDebt}
                                // updateShowFormTariffs={updateShowFormTariffs}
                                updateProgressBar={updateProgressBar}
                                updateShowOverlay={updateShowOverlay}
                                updateShowE7={updateShowE7}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Usage */}
                {showFormUsageGAS ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormUsageGAS
                                customerInformation={customerInformation}
                                progressBar={progressBar}
                                avgElec={avgElec}
                                showScript={showScript}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateShowFormDebt={updateShowFormDebt}
                                // updateShowFormTariffs={updateShowFormTariffs}
                                updateAvgGas={updateAvgGas}
                                updateAvgElec={updateAvgElec}
                                updateProgressBar={updateProgressBar}
                                updateShowOverlay={updateShowOverlay}
                                updateShowE7={updateShowE7}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Usage GBP */}
                {showFormUsageGBP_es ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormUsageGBP_es
                                customerInformation={customerInformation}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormDebt={updateShowFormDebt}
                                updateAvgElec={updateAvgElec}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Usage GBP */}
                {showFormUsageGBP_gs ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormUsageGBP_gs
                                customerInformation={customerInformation}
                                avgElec={avgElec}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateShowFormDebt={updateShowFormDebt}
                                updateAvgGas={updateAvgGas}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Usage AVG*/}
                {showFormUsageAVG ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormUsageAVG
                                customerInformation={customerInformation}
                                avgElec={avgElec}
                                avgGas={avgGas}
                                progressBar={progressBar}
                                showScript={showScript}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormDebt={updateShowFormDebt}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Debt */}
                {showFormDebt ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormDebt
                                customerInformation={customerInformation}
                                showScript={showScript}
                                progressBar={progressBar}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateProgressBar={updateProgressBar}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
                                updateShowFormDebt={updateShowFormDebt}
                                updateShowFormCompare={updateShowFormCompare}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Compare */}
                {showFormCompare ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormCompare
                                customerInformation={customerInformation}
                                user={user}
                                electricityInformation={electricityInformation}
                                gasInformation={gasInformation}
                                avgElec={avgElec}
                                avgGas={avgGas}
                                showScript={showScript}
                                progressBar={progressBar}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowOverlay={updateShowOverlay}
                                updateShowFormCompare={updateShowFormCompare}
                                updateShowFormUsageKWH={updateShowFormUsageKWH}
                                updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
                                updateShowFormUsageAVG={updateShowFormUsageAVG}
                                updateShowFormUsageGAS={updateShowFormUsageGAS}
                                updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
                                updateShowFormDetails={updateShowFormDetails}
                                updateShowFormDebt={updateShowFormDebt}
                                updateProgressBar={updateProgressBar}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Details */}
                {showFormDetails ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormDetails
                                customerInformation={customerInformation}
                                progressBar={progressBar}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormCompare={updateShowFormCompare}
                                updateShowFormDetails={updateShowFormDetails}
                                updateProgressBar={updateProgressBar}
                                updateShowFormBankDetails={updateShowFormBankDetails}
                                updateShowOverlay={updateShowOverlay}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form Bank Details */}
                {showFormBankDetails ?
                    (
                        <Suspense fallback={<Overlay text={'Loading data, please wait...'} spinner={true} />}>
                            <FormBankDetails
                                customerInformation={customerInformation}
                                progressBar={progressBar}
                                updateCustomerInformation={updateCustomerInformation}
                                updateShowFormDetails={updateShowFormDetails}
                                updateProgressBar={updateProgressBar}
                                updateShowFormBankDetails={updateShowFormBankDetails}
                                updateShowFormRating={updateShowFormRating}
                                updateShowOverlay={updateShowOverlay}
                            />
                        </Suspense>
                    )
                    :
                    null
                }
                {/* Form rating */}
                {showFormRating ?
                    (
                        <FormRating
                            customerInformation={customerInformation}
                            progressBar={progressBar}
                            updateCustomerInformation={updateCustomerInformation}
                            updateShowFormRating={updateShowFormRating}
                            updateShowSuccessFul={updateShowSuccessFul}
                            updateProgressBar={updateProgressBar}
                        />
                    )
                    :
                    null
                }
                {/* Form successful */}
                {showSuccessFul ?
                    (
                        <FormSuccessful

                        />
                    )
                    :
                    null
                }
            </>
            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home;
