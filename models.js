/**-- STEP 0 -- */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 0,
    customerAddres: {
        postcode: 'AB344YH'
    }
});

/**-- STEP 1 -- */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 1,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'SM1 2UF',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: '',
        current_supplier_id: '',
        gas_transport_id: '',
        company_name: ''
    }
});

/**-- STEP 2 -- */

db.collection("customers").doc(uid).set({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 2,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'NR14 7PZ',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: '',
        current_supplier_id: '',
        gas_transport_id: '',
        company_name: ''
    },
    useGas: {
        gas_apply: false
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: false,
        elec_only: true
    }
});

/**-- STEP 3 -- */

db.collection("customers").doc(uid).set({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 3,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'CR0 5PE',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: '',
        current_supplier_id: '',
        gas_transport_id: '',
        company_name: ''
    },
    useGas: {
        gas_apply: false
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: false,
        elec_only: true
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: '',
            meter_mechanism_code: '',
            mprn: '',
            company_name: ''
        }
    }
});

/**-- STEP 3 --  TESTIING FOR DUAL SUPPLIER / Different supplier */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 3,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'CR0 5PE',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'K',
        supplier_mpid: 'BGAS',
        company_name: 'British Gas Trading Ltd'
    },
    dataGas: {
        mprn: '1010101001',
        meter_mechanism_code: 'S1',
        current_supplier_id: 'LED',
        gas_transport_id: '',
        company_name: 'EDF Energy Customers Limited'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: true
    },
    fuel_description: {
        same_supplier: false,
        dual_active: true,
        gas_only: false,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: 'LED',
            meter_mechanism_code: 'S1',
            mprn: '1010101001',
            company_name: 'EDF Energy Customers Limited'
        }
    }
});

/**-- STEP 4 -- */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 4,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'AB344YH',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: '',
        current_supplier_id: '',
        gas_transport_id: '',
        company_name: ''
    },
    useGas: {
        gas_apply: false
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: false,
        elec_only: true
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: '',
            meter_mechanism_code: '',
            mprn: '',
            company_name: ''
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: 'QDD',
        electricity_payment_type_method: 'Quarterly direct debit'
    },
    gasPaymentType: {
        gas_payment_type_id: '',
        gas_payment_type_method: ''
    }
});

/**-- STEP 4 -- TESTING FOR DUAL SUPPLIER / Same supplier*/

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 4,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'AB344YH',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: 'N',
        current_supplier_id: 'INDE',
        gas_transport_id: '',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: true
    },
    fuel_description: {
        same_supplier: true,
        dual_active: true,
        gas_only: false,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: 'INDE',
            meter_mechanism_code: 'N',
            mprn: '',
            company_name: 'NPOWER DIRECT LTD NHH'
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: 'QDD',
        electricity_payment_type_method: 'Quarterly direct debit'
    },
    gasPaymentType: {
        gas_payment_type_id: 'QDD',
        gas_payment_type_method: 'Quarterly direct debit'
    }
});

/**-- STEP 4 -- TESTING FOR GAS SUPPLIER */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 4,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'AB344YH',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '',
        meter_serial_number: '',
        meter_type: '',
        supplier_mpid: '',
        company_name: ''
    },
    dataGas: {
        mprn: '1010101006',
        meter_mechanism_code: 'N',
        current_supplier_id: 'INDE',
        gas_transport_id: '',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: true,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '',
            meter_type: '',
            supplier_mpid: '',
            company_name: ''
        },

        gas_supplier: {
            current_supplier_id: 'INDE',
            meter_mechanism_code: 'N',
            mprn: '1010101006',
            company_name: 'NPOWER DIRECT LTD NHH'
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: 'QDD',
        electricity_payment_type_method: 'Quarterly direct debit'
    },
    gasPaymentType: {
        gas_payment_type_id: '',
        gas_payment_type_method: ''
    }
});

/**-- STEP 5 -- */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 5,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'DD4 6HT',
        mpan: '8010000037480',
        mprn: ''
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '',
        meter_mechanism_code: '',
        current_supplier_id: '',
        gas_transport_id: '',
        company_name: ''
    },
    useGas: {
        gas_apply: false
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: false,
        elec_only: true
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: '',
            meter_mechanism_code: '',
            mprn: '',
            company_name: ''
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: 'QDD',
        electricity_payment_type_method: 'Quarterly direct debit'
    },
    gasPaymentType: {
        gas_payment_type_id: '',
        gas_payment_type_method: ''
    },
    economy7: {
        economy7_apply: true,
        economy7_split: 22
    }
});

/**-- STEP 5 -- Testing with gas */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 5,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'DD4 6HT',
        mpan: '',
        mprn: '1010101006'
    },
    MPANDetails: {
        mpan_core: '',
        meter_serial_number: '',
        meter_type: '',
        supplier_mpid: '',
        company_name: ''
    },
    dataGas: {
        mprn: '1010101006',
        meter_mechanism_code: 'NS',
        current_supplier_id: 'BGT',
        gas_transport_id: '',
        company_name: 'British Gas Trading Limited'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: false
    },
    fuel_description: {
        same_supplier: false,
        dual_active: false,
        gas_only: true,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '',
            meter_type: '',
            supplier_mpid: '',
            company_name: ''
        },

        gas_supplier: {
            current_supplier_id: 'BGT',
            meter_mechanism_code: 'NS',
            mprn: '1010101006',
            company_name: 'British Gas Trading Limited'
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: '',
        electricity_payment_type_method: ''
    },
    gasPaymentType: {
        gas_payment_type_id: 'MDD',
        gas_payment_type_method: 'Monthly direct debit'
    },
    economy7: {
        economy7_apply: true,
        economy7_split: 45
    }
});

/**-- STEP 5 -- Testing with dual supplier */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 5,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'AB344YH',
        mpan: '8010000037480',
        mprn: '1010101006'
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'INDE',
        company_name: 'NPOWER DIRECT LTD NHH'
    },
    dataGas: {
        mprn: '1010101006',
        meter_mechanism_code: 'NS',
        current_supplier_id: 'BGT',
        gas_transport_id: '',
        company_name: 'British Gas Trading Limited'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: true
    },
    fuel_description: {
        same_supplier: false,
        dual_active: true,
        gas_only: false,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'INDE',
            company_name: 'NPOWER DIRECT LTD NHH'
        },

        gas_supplier: {
            current_supplier_id: 'BGT',
            meter_mechanism_code: 'NS',
            mprn: '1010101006',
            company_name: 'British Gas Trading Limited'
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: '',
        electricity_payment_type_method: ''
    },
    gasPaymentType: {
        gas_payment_type_id: 'MDD',
        gas_payment_type_method: 'Monthly direct debit'
    },
    economy7: {
        economy7_apply: true,
        economy7_split: 45
    }
});

/**-- STEP 6 -- Dual - Different suppliers */

db.collection("customers").doc(uid).set({
    // created: firebase.firestore.FieldValue.serverTimestamp(),
    step: 6,
    customerAddres: {
        doornumber: 'Flat 34',
        addressline1: 'Cypress Court',
        addressline2: '60 Cheam Road',
        city: 'Sutton',
        postcode: 'SM1 2SU',
        mpan: '8010000037480',
        mprn: '1010101006'
    },
    MPANDetails: {
        mpan_core: '8010000037480',
        meter_serial_number: '',
        meter_type: 'N',
        supplier_mpid: 'BGAS',
        company_name: 'British Gas Trading Limited'
    },
    dataGas: {
        mprn: '1010101006',
        meter_mechanism_code: 'PP',
        current_supplier_id: 'LED',
        gas_transport_id: '',
        company_name: 'EDF Energy Customers Limited'
    },
    useGas: {
        gas_apply: true
    },
    fuel: {
        dual_fuel_apply: true
    },
    fuel_description: {
        same_supplier: false,
        dual_active: true,
        gas_only: false,
        elec_only: false
    },
    supplierInformation: {
        electricity_supplier: {
            mpan_core: '8010000037480',
            meter_type: 'N',
            supplier_mpid: 'BGT',
            company_name: 'British Gas Trading Limited'
        },

        gas_supplier: {
            current_supplier_id: 'LED',
            meter_mechanism_code: 'PP',
            mprn: '1010101006',
            company_name: 'EDF Energy Customers Limited'
        }
    },
    electricityPaymentType: {
        electricity_payment_type_id: 'MDD',
        electricity_payment_type_method: 'Monthly direct debit'
    },
    gasPaymentType: {
        gas_payment_type_id: 'PAYG',
        gas_payment_type_method: 'Pay as you go'
    },
    economy7: {
        economy7_apply: true,
        economy7_split: 45
    },
    // AVG
    usage_property_size_dual: {
        usage_size_entered: false,
        usage_size_expended: ''
    },
    usage_property_size_es: {
        usage_size_entered: false,
        usage_size_expended: ''
    },
    usage_property_size_gs: {
        usage_size_entered: true,
        usage_size_expended: '1800'
    },
    // GAS
    usage_gas_description: {
        usage_kwh_entered: false,
        usage_kwh_expended: false,
        usage_kwh_period: false
    },
    usage_gbp_description_gs: {
        usage_gbp_entered: false,
        usage_gbp_expended: false,
        usage_gbp_period: false
    },
    // Elec
    usage_kwh_description: {
        usage_kwh_entered: false,
        usage_kwh_expended: false,
        usage_kwh_period: false
    },
    usage_gbp_description_es: {
        usage_gbp_entered: true,
        usage_gbp_expended: '50',
        usage_gbp_period: 'annu'
    },
    // AVG ELEC
    avgElec: false,
    // AVG Gas
    avgGas: true
});

const lolo = {
    // AVG
    usage_property_size_dual: {
        usage_size_entered: false,
        usage_size_expended: ''
    },
    usage_property_size_es: {
        usage_size_entered: false,
        usage_size_expended: ''
    },
    usage_property_size_gs: {
        usage_size_entered: false,
        usage_size_expended: ''
    },
    // GAS
    usage_gas_description: {
        usage_kwh_entered: false,
        usage_kwh_expended: false,
        usage_kwh_period: false
    },
    usage_gbp_description_gs: {
        usage_gbp_entered: false,
        usage_gbp_expended: false,
        usage_gbp_period: false
    },
    // Elec
    usage_kwh_description: {
        usage_kwh_entered: false,
        usage_kwh_expended: false,
        usage_kwh_period: false
    },
    usage_gbp_description_es: {
        usage_gbp_entered: false,
        usage_gbp_expended: false,
        usage_gbp_period: false
    }
}

usage_property_size_dual,
usage_property_size_es,
usage_property_size_gs,
usage_gas_description,
usage_gbp_description_gs,
usage_kwh_description,
usage_gbp_description_es