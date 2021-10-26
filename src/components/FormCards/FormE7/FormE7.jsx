import React, { useState, useEffect } from "react";
import "./FormE7.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { FaCheckSquare, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from "../FormAssistant/FormAssistant";
import Error from '../../Error/Error';

function FormE7({ economy7, customerInformation, electricityPaymentType, gasPaymentType, electricityInformation, gasInformation, supplierInformation, progressBar, showScript, updateEconomy7, updateCustomerInformation, updateShowFormSupply, updateShowE7, updateShowFormTariffs, updateElectricityPaymentType, updateGasPaymentType, updateProgressBar, updateShowOverlay, updateSupplierInformation, updateGasInformation, updateElectricityInformation, updateShowFormUsageKWH, updateShowFormUsageGAS }) {
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

  // Variables
  // elec_only
  const elec_only = customerInformation.fuel_description.elec_only;
  // gas_only
  const gas_only = customerInformation.fuel_description.gas_only;
  // same_supplier
  const same_supplier = customerInformation.fuel_description.same_supplier;
  // dual_active
  const dual_active = customerInformation.fuel_description.dual_active;
  // postcode_formatted
  const postcode_formatted = customerInformation.customerAddres.postcode.replace(/\s/g, '').trim().toLowerCase();
  // doornumber_formatted
  const doornumber_formatted = customerInformation.customerAddres.doornumber.replace(/\s/g, '').trim().toLowerCase();
  // uid
  const uid = `${postcode_formatted}-${doornumber_formatted}`;

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

      scroll_to();
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
    updateEconomy7({
      ...economy7,
      economy7: {
        economy7_apply: true
      }
    });
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
    updateEconomy7({
      ...economy7,
      economy7: {
        economy7_apply: false,
        economy7_split: false
      }
    });
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

    // Update Economy 7
    updateEconomy7({
      economy7: {
        economy7_apply: true,
        economy7_split: e7_split_value
      }
    });
  }

  // Default unit rate for electricity
  const general_unit_rate_elec = { unit_rate: 19 };

  // Default unit rate for gas
  const general_unit_rate_gas = { unit_rate: 3 };

  // useEffect to assign the svt for the supplier selected
  useEffect(() => {

    (async () => {

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

      // Market cap unit rates
      let unit_rate_svt_elec = unitRateElec.unit_rate;
      let unit_rate_svt_gas = unitRateGas.unit_rate;

      if (elec_only) {
        console.log('elec_only');

        // Update customer information
        updateCustomerInformation({
          ...customerInformation,
          tariff_description: {
            unit_rate: unit_rate_svt_elec
          }
        });
      }

      if (gas_only) {
        console.log('gas_only');
        // Update customer information
        updateCustomerInformation({
          ...customerInformation,
          tariff_description: {
            unit_rate: unit_rate_svt_gas
          }
        });
      }

      if (dual_active) {
        if (same_supplier) {
          // Update customer information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description: {
              unit_rate_elec: unit_rate_svt_elec,
              unit_rate_gas: unit_rate_svt_gas,
            }
          });
        } else {
          console.log('Same supplier false');
          // Update customer information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_elec: {
              elec_tariff: {
                unit_rate: unit_rate_svt_elec
              }
            },
            tariff_description_gas: {
              gas_tariff: {
                unit_rate: unit_rate_svt_gas
              }
            }
          });
        }
      }

    })();

  }, []);

  // sendE7
  const sendE7 = async (e) => {
    e.preventDefault();

    /**-- Validation --*/
    if (error_e7_split) {
      return;
    };

    if ((active_rb_yes === false) && (active_rb_no === false)) {
      // Update error
      updateError(true);
      return;
    };

    if (e7_split) {
      const e7_split_value = document.getElementById('e7-split').value;
      if (e7_split_value === '') {
        update_error_e7_split(true);
        return;
      }
    };

    // Show overlay
    updateShowOverlay(true);
    // Hidde Economy 7
    updateShowE7(false);
    // Update Progressbar
    updateProgressBar({ ...progressBar, step: 6 });

    // Conditional to usage section
    if (gas_only) {
      // Show Gas
      updateShowFormUsageGAS(true)
    } else {
      // Show KWH
      updateShowFormUsageKWH(true);
    }

    /**-- Firebase --*/
    const { customerAddres, useGas, fuel, fuel_description, tariff_description, tariff_description_elec, tariff_description_gas, economy7 } = customerInformation;

    // elec_only
    if (elec_only) {
      // Firebase
      await db.collection("customers").doc(uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        step: 5,
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
          mpan_core: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
          meter_type: electricityInformation.MPANDetails.meter_type ? electricityInformation.MPANDetails.meter_type : '',
          supplier_mpid: electricityInformation.MPANDetails.supplier_mpid ? electricityInformation.MPANDetails.supplier_mpid : '',
          company_name: electricityInformation.MPANDetails.company_name ? electricityInformation.MPANDetails.company_name : ''
        },
        dataGas: {
          current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
          meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
          mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
          company_name: gasInformation.dataGas.company_name ? gasInformation.dataGas.company_name : ''
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
        supplierInformation: {
          electricity_supplier: {
            company_name: supplierInformation.electricity_supplier.company_name ? supplierInformation.electricity_supplier.company_name : '',
            meter_type: supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '',
            mpan_core: supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '',
            supplier_mpid: supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : ''
          },
          gas_supplier: {
            company_name: supplierInformation.gas_supplier.company_name ? supplierInformation.gas_supplier.company_name : '',
            current_supplier_id: supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '',
            meter_mechanism_code: supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '',
            mprn: supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : ''
          }
        },
        electricityPaymentType: {
          electricity_payment_type_id: electricityPaymentType.electricity_payment_type_id ? electricityPaymentType.electricity_payment_type_id : '',
          electricity_payment_type_method: electricityPaymentType.electricity_payment_type_method ? electricityPaymentType.electricity_payment_type_method : ''
        },
        gasPaymentType: {
          gas_payment_type_id: gasPaymentType.gas_payment_type_id ? gasPaymentType.gas_payment_type_id : '',
          gas_payment_type_method: gasPaymentType.gas_payment_type_method ? gasPaymentType.gas_payment_type_method : ''
        },
        tariff_description: {
          unit_rate: tariff_description.unit_rate ? tariff_description.unit_rate : general_unit_rate_elec
        },
        economy7: {
          economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
          economy7_split: economy7.economy7_split ? economy7.economy7_split : false
        }
      });
    }

    // gas_only
    if (gas_only) {
      // Firebase
      await db.collection("customers").doc(uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        step: 5,
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
          mpan_core: electricityInformation.MPANDetails.mpan_core,
          meter_type: electricityInformation.MPANDetails.meter_type,
          supplier_mpid: electricityInformation.MPANDetails.supplier_mpid,
          company_name: electricityInformation.MPANDetails.company_name ? electricityInformation.MPANDetails.company_name : ''
        },
        dataGas: {
          current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
          meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
          mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
          company_name: gasInformation.dataGas.company_name ? gasInformation.dataGas.company_name : ''
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
        supplierInformation: {
          electricity_supplier: {
            company_name: supplierInformation.electricity_supplier.company_name ? supplierInformation.electricity_supplier.company_name : '',
            meter_type: supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '',
            mpan_core: supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '',
            supplier_mpid: supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : ''
          },
          gas_supplier: {
            company_name: supplierInformation.gas_supplier.company_name ? supplierInformation.gas_supplier.company_name : '',
            current_supplier_id: supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '',
            meter_mechanism_code: supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '',
            mprn: supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : ''
          }
        },
        electricityPaymentType: {
          electricity_payment_type_id: electricityPaymentType.electricity_payment_type_id ? electricityPaymentType.electricity_payment_type_id : '',
          electricity_payment_type_method: electricityPaymentType.electricity_payment_type_method ? electricityPaymentType.electricity_payment_type_method : ''
        },
        gasPaymentType: {
          gas_payment_type_id: gasPaymentType.gas_payment_type_id ? gasPaymentType.gas_payment_type_id : '',
          gas_payment_type_method: gasPaymentType.gas_payment_type_method ? gasPaymentType.gas_payment_type_method : ''
        },
        tariff_description: {
          unit_rate: tariff_description.unit_rate ? tariff_description.unit_rate : general_unit_rate_gas
        },
        economy7: {
          economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
          economy7_split: economy7.economy7_split ? economy7.economy7_split : false
        }
      });
    }

    // dual_active
    if (dual_active) {
      // same_supplier
      if (same_supplier) {
        // Firebase
        await db.collection("customers").doc(uid).set({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          step: 5,
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
            mpan_core: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
            meter_type: electricityInformation.MPANDetails.meter_type ? electricityInformation.MPANDetails.meter_type : '',
            supplier_mpid: electricityInformation.MPANDetails.supplier_mpid ? electricityInformation.MPANDetails.supplier_mpid : '',
            company_name: electricityInformation.MPANDetails.company_name ? electricityInformation.MPANDetails.company_name : ''
          },
          dataGas: {
            current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
            meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
            mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
            company_name: gasInformation.dataGas.company_name ? gasInformation.dataGas.company_name : ''
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
          supplierInformation: {
            electricity_supplier: {
              company_name: supplierInformation.electricity_supplier.company_name ? supplierInformation.electricity_supplier.company_name : '',
              meter_type: supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '',
              mpan_core: supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '',
              supplier_mpid: supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : ''
            },
            gas_supplier: {
              company_name: supplierInformation.gas_supplier.company_name ? supplierInformation.gas_supplier.company_name : '',
              current_supplier_id: supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '',
              meter_mechanism_code: supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '',
              mprn: supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : ''
            }
          },
          electricityPaymentType: {
            electricity_payment_type_id: electricityPaymentType.electricity_payment_type_id ? electricityPaymentType.electricity_payment_type_id : '',
            electricity_payment_type_method: electricityPaymentType.electricity_payment_type_method ? electricityPaymentType.electricity_payment_type_method : ''
          },
          gasPaymentType: {
            gas_payment_type_id: gasPaymentType.gas_payment_type_id ? gasPaymentType.gas_payment_type_id : '',
            gas_payment_type_method: gasPaymentType.gas_payment_type_method ? gasPaymentType.gas_payment_type_method : ''
          },
          tariff_description: {
            unit_rate_elec: tariff_description.unit_rate_elec ? tariff_description.unit_rate_elec : general_unit_rate_elec,
            unit_rate_gas: tariff_description.unit_rate_gas ? tariff_description.unit_rate_gas : general_unit_rate_gas
          },
          economy7: {
            economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
            economy7_split: economy7.economy7_split ? economy7.economy7_split : false
          }
        });
      } else {
        // Firebase
        await db.collection("customers").doc(uid).set({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          step: 5,
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
            mpan_core: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
            meter_type: electricityInformation.MPANDetails.meter_type ? electricityInformation.MPANDetails.meter_type : '',
            supplier_mpid: electricityInformation.MPANDetails.supplier_mpid ? electricityInformation.MPANDetails.supplier_mpid : '',
            company_name: electricityInformation.MPANDetails.company_name ? electricityInformation.MPANDetails.company_name : ''
          },
          dataGas: {
            current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
            meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
            mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
            company_name: gasInformation.dataGas.company_name ? gasInformation.dataGas.company_name : ''
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
          supplierInformation: {
            electricity_supplier: {
              company_name: supplierInformation.electricity_supplier.company_name ? supplierInformation.electricity_supplier.company_name : '',
              meter_type: supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '',
              mpan_core: supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '',
              supplier_mpid: supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : ''
            },
            gas_supplier: {
              company_name: supplierInformation.gas_supplier.company_name ? supplierInformation.gas_supplier.company_name : '',
              current_supplier_id: supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '',
              meter_mechanism_code: supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '',
              mprn: supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : ''
            }
          },
          electricityPaymentType: {
            electricity_payment_type_id: electricityPaymentType.electricity_payment_type_id ? electricityPaymentType.electricity_payment_type_id : '',
            electricity_payment_type_method: electricityPaymentType.electricity_payment_type_method ? electricityPaymentType.electricity_payment_type_method : ''
          },
          gasPaymentType: {
            gas_payment_type_id: gasPaymentType.gas_payment_type_id ? gasPaymentType.gas_payment_type_id : '',
            gas_payment_type_method: gasPaymentType.gas_payment_type_method ? gasPaymentType.gas_payment_type_method : ''
          },
          tariff_description_elec: {
            elec_tariff: {
              unit_rate: tariff_description_elec.elec_tariff.unit_rate ? tariff_description_elec.elec_tariff.unit_rate : general_unit_rate_elec
            }
          },
          tariff_description_gas: {
            gas_tariff: {
              unit_rate: tariff_description_gas.gas_tariff.unit_rate ? tariff_description_gas.gas_tariff.unit_rate : general_unit_rate_gas
            }
          },
          economy7: {
            economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
            economy7_split: economy7.economy7_split ? economy7.economy7_split : false
          }
        });
      }
    }
  };

  // Adding initial customer data to firebase (Coming from Supply cc)
  useEffect(() => {
    (async () => {
      /**-- Firebase --*/
      const { customerAddres, useGas, fuel, fuel_description } = customerInformation;
      // Firebase
      await db.collection("customers").doc(uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        step: 4,
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
          mpan_core: electricityInformation.MPANDetails.mpan_core ? electricityInformation.MPANDetails.mpan_core : '',
          meter_type: electricityInformation.MPANDetails.meter_type ? electricityInformation.MPANDetails.meter_type : '',
          supplier_mpid: electricityInformation.MPANDetails.supplier_mpid ? electricityInformation.MPANDetails.supplier_mpid : '',
          company_name: electricityInformation.MPANDetails.company_name ? electricityInformation.MPANDetails.company_name : ''
        },
        dataGas: {
          current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
          meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
          mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
          company_name: gasInformation.dataGas.company_name ? gasInformation.dataGas.company_name : ''
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
        supplierInformation: {
          electricity_supplier: {
            company_name: supplierInformation.electricity_supplier.company_name ? supplierInformation.electricity_supplier.company_name : '',
            meter_type: supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '',
            mpan_core: supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '',
            supplier_mpid: supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : ''
          },
          gas_supplier: {
            company_name: supplierInformation.gas_supplier.company_name ? supplierInformation.gas_supplier.company_name : '',
            current_supplier_id: supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '',
            meter_mechanism_code: supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '',
            mprn: supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : ''
          }
        },
        electricityPaymentType: {
          electricity_payment_type_id: electricityPaymentType.electricity_payment_type_id ? electricityPaymentType.electricity_payment_type_id : '',
          electricity_payment_type_method: electricityPaymentType.electricity_payment_type_method ? electricityPaymentType.electricity_payment_type_method : ''
        },
        gasPaymentType: {
          gas_payment_type_id: gasPaymentType.gas_payment_type_id ? gasPaymentType.gas_payment_type_id : '',
          gas_payment_type_method: gasPaymentType.gas_payment_type_method ? gasPaymentType.gas_payment_type_method : ''
        },
      });
    })();

  }, [FormE7]);

  // Go back
  const goBack = (e) => {
    e.preventDefault();
    // Update Progressbar
    updateProgressBar({ ...progressBar, step: 4 });

    // Delete economy7_apply from economy7
    const copy_economy7 = { ...economy7 };
    delete copy_economy7['economy7'];
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
              <div data-cy="e7-yes" className="form-e7-blocks-dual">
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
                <div data-cy="e7-no" className={active_rb_no ? "form-e7-btn-selection-content isDual active" : "form-e7-btn-selection-content isDual"} id="no_selected" onClick={() => handleClickRB_no()}>
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
                        <input data-cy="e7-input" className="form-e7split-input" ype="text" maxLength="3" id="e7-split" onChange={(e) => handleChange(e)} />
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

              <button data-cy="e7-continue" className="form-e7-btn btn-next" onClick={(e) => sendE7(e)}>
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
                  <FormScript step={6} />
                </div>

                <div className="assistant-e7-custom">
                  <FormAssistant tips={5} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-e7">
                <FormAssistant tips={5} />
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}

export default FormE7;
