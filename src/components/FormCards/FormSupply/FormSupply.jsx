import React, { useState, useEffect, Fragment } from "react";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Data Supplier
import data_electricity_supplier_id from "../../../utilities/data_electricity_supplier/data_electricity_supplier_id";
import data_electricity_supplier_name from "../../../utilities/data_electricity_supplier/data_electricity_supplier_name";
import data_gas_supplier_name from "../../../utilities/data_gas_supplier/data_gas_supplier_name";
import data_gas_supplier_id from "../../../utilities/data_gas_supplier/data_gas_supplier_id";
import data_custom_es from '../../../utilities/data_electricity_supplier/data_custom_es';
// Swal
import swal from '@sweetalert/with-react';
// Icons
import { IconContext } from "react-icons";
import { ImProfile, ImSad } from 'react-icons/im';
import { FaRegHandPointer, FaSearchengin, FaCheckSquare, FaTachometerAlt, FaMoneyCheckAlt, FaRegEdit, FaSearch } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
// CSS
import "./FormSupply.css";

// Images
import BGAS_logo from '../../../assets/img/suppliers/brisith-gas-logo.png';
import EDF_logo from '../../../assets/img/suppliers/edf-logo.svg';
import EON_logo from '../../../assets/img/suppliers/eon-logo.png';
import SSE_logo from '../../../assets/img/suppliers/sse-logo.svg';
import Scottish_logo from '../../../assets/img/suppliers/scottish-logo.png';
import Npower_logo from '../../../assets/img/suppliers/npower-logo.svg';

// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from '../FormAssistant/FormAssistant';
import Error from "../../Error/Error";

function FormSupply({
  customerAddres,
  electricityInformation,
  gasInformation,
  supplierInformation,
  useGas,
  fuel,
  customerInformation,
  electricityPaymentType,
  gasPaymentType,
  progressBar,
  showScript,
  updateShowFormMpanMprn,
  updateShowFormSupply,
  updateShowE7,
  updateSupplierInformation,
  updateElectricityInformation,
  updateGasInformation,
  updateCustomerInformation,
  updateElectricityPaymentType,
  updateGasPaymentType,
  updateFuel,
  updateProgressBar
}) {
  /* STATES */
  // Edit Electricity Supplier
  const [editES, updateEditES] = useState(true);
  const [editMTES, updateEditMTES] = useState(true);

  // Edit Gas Supplier
  const [editGS, updateEditGS] = useState(true);
  const [editMTGS, updateEditMTGS] = useState(true);

  // Show Electricity Payment type
  const [payment_electricity_input, update_payment_electricity_input] = useState(false);

  // Show Gas Payment type
  const [payment_gas_input, update_payment_gas_input] = useState(false);

  // Customer Supplier
  const [supplier, updateSupplier] = useState({
    electricity_supplier: {
      supplier_id: "",
      meter_type: "",
      mpan_core: "",
      company_name: ""
    },
    gas_supplier: {
      current_supplier_id: "",
      meter_mechanism_code: "",
      mprn: "",
      company_name: ""
    }
  });

  /**-- Error States --*/
  // Electricity Error
  const [error_electricity_supplier, update_error_electricity_supplier] = useState(false);
  const [error_electricity_meter_type, update_error_electricity_meter_type] = useState(false);
  const [error_electricity_payment, update_error_electricity_payment] = useState(false);
  // Gas Error
  const [error_gas_supplier, update_error_gas_supplier] = useState(false);
  const [error_gas_meter_type, update_error_gas_meter_type] = useState(false);
  const [error_gas_payment, update_error_gas_payment] = useState(false);

  // Button focus animation - Supplier
  const [focusAnimationSupplier, setFocusAnimationSupplier] = useState(false);

  // Button focus animation - Meter
  const [focusAnimationMeter, setFocusAnimationMeter] = useState(false);

  /* FUNCTIONS */

  // // Function to sort the JSON by property
  // const sortByProperty = (property) => {
  //   return function (a, b) {
  //     if (a[property] < b[property])
  //       return 1;
  //     else if (a[property] > b[property])
  //       return -1;

  //     return 0;
  //   }
  // }

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

  // Error smooth scroll
  useEffect(() => {
    if (error_electricity_supplier) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

    if (error_electricity_meter_type) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

    if (error_electricity_payment) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

    if (error_gas_supplier) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

    if (error_gas_meter_type) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

    if (error_gas_payment) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      scroll_to();
    }

  }, [error_electricity_supplier, error_electricity_meter_type, error_electricity_payment, error_gas_supplier, error_gas_meter_type, error_gas_payment]);

  // Variables
  const mpan = customerAddres.mpan;
  const mprn = customerAddres.mprn;
  const dual_fuel = fuel.dual_fuel_apply;
  const dual_active = customerInformation.fuel_description.dual_active;
  const elec_only = customerInformation.fuel_description.elec_only;
  const gas_only = customerInformation.fuel_description.gas_only;
  const same_supplier = customerInformation.fuel_description.same_supplier;

  const { meter_type, supplier_mpid, mpan_core } = electricityInformation.MPANDetails;

  const { meter_mechanism_code, current_supplier_id } = gasInformation.dataGas;

  // Validation Electricity Meter Type Supported
  const meterSupportedElec = () => {
    const { meter_type } = electricityInformation.MPANDetails;
    const start_with_S2 = meter_type.startsWith("S2");

    if (meter_type === "" || meter_type === "K" || meter_type === "N" || meter_type === "NSS" || meter_type === "S" || meter_type === "S1" || start_with_S2 === true) {
      return meter_type;
    } else {
      const not_supported = "NOT";
      return not_supported;
    }
  };

  let electricity_meter_supported = meterSupportedElec();

  const meterSupportedGas = () => {
    const { meter_mechanism_code } = gasInformation.dataGas;
    const start_with_S2 = meter_type.startsWith("S2");

    if (
      meter_mechanism_code === "" ||
      meter_mechanism_code === "PP" ||
      meter_mechanism_code === "CR" ||
      meter_mechanism_code === "NS" ||
      meter_mechanism_code === "S1" ||
      meter_mechanism_code === "S2" ||
      meter_mechanism_code === "NOT" ||
      start_with_S2 === true
    ) {
      return meter_mechanism_code;
    } else {
      const not_supported = "NOT";
      return not_supported;
    }
  };

  let gas_meter_supported = meterSupportedGas();

  // supplier_id value from MPANDetails
  const supplier_id = electricityInformation.MPANDetails.supplier_mpid;

  // Function that runs every time the user select electricity supplier
  const handleChangeES = (e) => {
    // Selectors
    const cb_es_1 = document.getElementById('cb_es-1');
    const cb_es_2 = document.getElementById('cb_es-2');
    const cb_es_3 = document.getElementById('cb_es-3');
    const cb_es_4 = document.getElementById('cb_es-4');
    const cb_es_5 = document.getElementById('cb_es-5');
    const cb_es_6 = document.getElementById('cb_es-6');

    if ((e.target.value !== "BGAS") || (e.target.value !== "BIZZ") || (e.target.value !== "BIZZ") || (e.target.value !== "ECOA") || (e.target.value !== "ENRD") || (e.target.value !== "OGAS") || (e.target.value !== "LOND") || (e.target.value !== "SEEB") || (e.target.value !== "SWEB") || (e.target.value !== "ENRD") || (e.target.value !== "PGEN") || (e.target.value !== "EELC") || (e.target.value !== "EENG") || (e.target.value !== "EMEB") || (e.target.value !== "NORW")(e.target.value !== "HYDE") || (e.target.value !== "IMPO") || (e.target.value !== "SOUT") || (e.target.value !== "SWAE") || (e.target.value !== "MANW") || (e.target.value !== "SPOW") || (e.target.value !== "INDE") || (e.target.value !== "MIDE") || (e.target.value !== "NATP") || (e.target.value !== "NEEB") || (e.target.value !== "PSUK") || (e.target.value !== "YELG")) {
      // Uncheck values
      cb_es_1.checked = false;
      cb_es_2.checked = false;
      cb_es_3.checked = false;
      cb_es_4.checked = false;
      cb_es_5.checked = false;
      cb_es_6.checked = false;

      // Take off border style
      cb_es_1.parentElement.style.border = null;
      cb_es_2.parentElement.style.border = null;
      cb_es_3.parentElement.style.border = null;
      cb_es_4.parentElement.style.border = null;
      cb_es_5.parentElement.style.border = null;
      cb_es_6.parentElement.style.border = null;
      // Check icon
      cb_es_1.parentElement.children[1].style.opacity = null;
      cb_es_2.parentElement.children[1].style.opacity = null;
      cb_es_3.parentElement.children[1].style.opacity = null;
      cb_es_4.parentElement.children[1].style.opacity = null;
      cb_es_5.parentElement.children[1].style.opacity = null;
      cb_es_6.parentElement.children[1].style.opacity = null;
    }

    // Hidde error message
    if (e.target.value !== "") {
      update_error_electricity_supplier(false);
    }

    // Update supplier state
    updateSupplier({
      ...supplier,
      electricity_supplier: {
        [e.target.name]: e.target.value
      }
    });

    // Company name
    let companyName = data_electricity_supplier_name;

    // Supplier selected
    const supplier_selected = document.getElementById("selected").value;

    // Update electricity information state
    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core,
        meter_type,
        supplier_mpid: supplier_selected,
        company_name: companyName[supplier_selected]
      }
    });
  };

  // Function that runs every time the user Select Gas Supplier
  const handleChangeGS = (e) => {

    // Selectors
    const cb_gs_1 = document.getElementById('cb_gs-1');
    const cb_gs_2 = document.getElementById('cb_gs-2');
    const cb_gs_3 = document.getElementById('cb_gs-3');
    const cb_gs_4 = document.getElementById('cb_gs-4');
    const cb_gs_5 = document.getElementById('cb_gs-5');
    const cb_gs_6 = document.getElementById('cb_gs-6');

    if ((e.target.value !== "BGT") || (e.target.value !== "BGB") || (e.target.value !== "BSA") || (e.target.value !== "LED") || (e.target.value !== "SBR") || (e.target.value !== "EDS") || (e.target.value !== "LDE") || (e.target.value !== "LEI") || (e.target.value !== "TUK") || (e.target.value !== "EAS") || (e.target.value !== "PWR") || (e.target.value !== "EMI") || (e.target.value !== "PWG") || (e.target.value !== "OWN") || (e.target.value !== "ATE") || (e.target.value !== "EST") || (e.target.value !== "SGL") || (e.target.value !== "SGY") || (e.target.value !== "TUU") || (e.target.value !== "EOD") || (e.target.value !== "POW") || (e.target.value !== "ATL") || (e.target.value !== "SHH") || (e.target.value !== "SCT") || (e.target.value !== "NGD") || (e.target.value !== "NPC") || (e.target.value !== "NDS") || (e.target.value !== "IND") || (e.target.value !== "CLT") || (e.target.value !== "TCG") || (e.target.value !== "NRZ") || (e.target.value !== "GUK") || (e.target.value !== "YGS") || (e.target.value !== "YGS")) {
      // Uncheck values
      cb_gs_1.checked = false;
      cb_gs_2.checked = false;
      cb_gs_3.checked = false;
      cb_gs_4.checked = false;
      cb_gs_5.checked = false;
      cb_gs_6.checked = false;

      // take off border style
      cb_gs_1.parentElement.style.border = null;
      cb_gs_2.parentElement.style.border = null;
      cb_gs_3.parentElement.style.border = null;
      cb_gs_4.parentElement.style.border = null;
      cb_gs_5.parentElement.style.border = null;
      cb_gs_6.parentElement.style.border = null;
      // Check icon
      cb_gs_1.parentElement.children[1].style.opacity = null;
      cb_gs_2.parentElement.children[1].style.opacity = null;
      cb_gs_3.parentElement.children[1].style.opacity = null;
      cb_gs_4.parentElement.children[1].style.opacity = null;
      cb_gs_5.parentElement.children[1].style.opacity = null;
      cb_gs_6.parentElement.children[1].style.opacity = null;
    }

    // Hidde error message
    if (e.target.value !== "") {
      update_error_gas_supplier(false);
    }

    // Destructuring mprn and meter_mechanism_code values
    const { mprn, meter_mechanism_code } = gasInformation.dataGas;

    // Company name
    let companyName = data_gas_supplier_name;

    // Update supplier state
    updateSupplier({
      ...supplier,
      gas_supplier: {
        [e.target.name]: e.target.value
      }
    });

    // Selected supplier
    const supplier_selected = document.getElementById("gas_selected").value;

    // Update gas information state
    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id: supplier_selected,
        meter_mechanism_code,
        mprn,
        company_name: companyName[supplier_selected]
      }
    });
  };

  // Function that runs every time the user select electricity meter supplier
  const handleChangeMTES = (e) => {
    const meter_type = e.target.value;
    let companyName = data_electricity_supplier_name[supplier_mpid];

    if (e.target.value !== "") {
      update_error_electricity_meter_type(false);
    }

    if (
      meter_type === "K" ||
      meter_type === "N" ||
      meter_type === "NSS" ||
      meter_type === "S" ||
      meter_type === "S1" ||
      meter_type.startsWith("S2") === true ||
      meter_type === "NOT"
    ) {
      update_payment_electricity_input(true);
    } else {
      update_payment_electricity_input(false);
      update_error_electricity_payment(false);
    }

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core,
        meter_type,
        supplier_mpid,
        company_name: companyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core,
        meter_type: meter_type,
        supplier_mpid,
        company_name: companyName
      }
    });
  };

  // Function that runs every time the user select gas meter supplier
  const handleChangeMTGS = (e) => {
    const meter_mechanism_code = e.target.value;
    let companyName = data_gas_supplier_name[current_supplier_id];

    if (e.target.value !== "") {
      update_error_gas_meter_type(false);
    }

    if (
      meter_mechanism_code === "PP" ||
      meter_mechanism_code === "CR" ||
      meter_mechanism_code === "NS" ||
      meter_mechanism_code === "S1" ||
      meter_mechanism_code.startsWith("S2") === true ||
      meter_mechanism_code === "NOT"
    ) {
      update_payment_gas_input(true);
    } else {
      update_payment_gas_input(false);
      update_error_gas_payment(false);
    }

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id,
        meter_mechanism_code,
        mprn,
        company_name: companyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: companyName
      }
    });
  };

  // Function that runs every time the user select electricity payment type
  const handleChangePTES = (e) => {
    // console.log(e.target.value);

    if (e.target.value !== '') {

      let payment_type_electricity_id = document.getElementById('payment_type_electricity').value;
      let payment_type_electricity_name = '';

      // Monthly direct debit
      if (payment_type_electricity_id === "MDD") {
        payment_type_electricity_name = 'Monthly direct debit';
      }

      // Quarterly direct debit
      if (payment_type_electricity_id === "QDD") {
        payment_type_electricity_name = 'Quarterly direct debit';
      }

      // Monthly payment on receipt of bill
      if (payment_type_electricity_id === "MPB") {
        payment_type_electricity_name = 'Monthly payment on receipt of bill';
      }

      // Monthly payment on receipt of bill
      if (payment_type_electricity_id === "QPB") {
        payment_type_electricity_name = 'Quarterly payment on receipt of bill';
      }

      // Monthly payment on receipt of bill
      if (payment_type_electricity_id === "PAYG") {
        payment_type_electricity_name = 'Pay as you go';
      }

      // Payment options not available
      // if (payment_type_electricity_id === "NA") {
      //   payment_type_electricity_name = 'Not available';
      // }

      // console.log(payment_type_electricity_id);

      updateElectricityPaymentType({
        ...electricityPaymentType,
        electricity_payment_type_id: e.target.value,
        electricity_payment_type_method: payment_type_electricity_name
      });

      if (dual_fuel) {
        if (same_supplier) {
          updateGasPaymentType({
            ...gasPaymentType,
            gas_payment_type_id: e.target.value,
            gas_payment_type_method: payment_type_electricity_name
          });
        }
      }

      // Clear the error when a value is selected
      update_error_electricity_payment(false);
    }

  };

  // Function that runs every time the user select electricity payment type
  const handleChangePTGS = (e) => {
    // console.log(e.target.value);

    if (e.target.value !== '') {

      let payment_type_gas_id = document.getElementById('payment_type_gas').value;
      let payment_type_gas_name = '';

      // Monthly direct debit
      if (payment_type_gas_id === "MDD") {
        payment_type_gas_name = 'Monthly direct debit';
      }

      // Quarterly direct debit
      if (payment_type_gas_id === "QDD") {
        payment_type_gas_name = 'Quarterly direct debit';
      }

      // Monthly payment on receipt of bill
      if (payment_type_gas_id === "MPB") {
        payment_type_gas_name = 'Monthly payment on receipt of bill';
      }

      // Monthly payment on receipt of bill
      if (payment_type_gas_id === "QPB") {
        payment_type_gas_name = 'Quarterly payment on receipt of bill';
      }

      // Monthly payment on receipt of bill
      if (payment_type_gas_id === "PAYG") {
        payment_type_gas_name = 'Pay as you go';
      }

      // Payment options not available
      // if (payment_type_gas_id === "NA") {
      //   payment_type_gas_name = 'Not available';
      // }

      // console.log(payment_type_gas_id);

      updateGasPaymentType({
        ...gasPaymentType,
        gas_payment_type_id: e.target.value,
        gas_payment_type_method: payment_type_gas_name
      });

      // Clear the error when a value is selected
      update_error_gas_payment(false);
    }

  };

  // Function to save name of electricity supplier
  useEffect(() => {
    let companyName = data_electricity_supplier_name[supplier_mpid];

    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id,
        meter_type,
        mpan_core: mpan,
        company_name: companyName 
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core,
        meter_type,
        supplier_mpid,
        company_name: companyName
      }
    });

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core,
        meter_type,
        supplier_mpid,
        company_name: companyName
      }
    });
  }, [supplier_id]);

  // Function to save name of gas supplier
  useEffect(() => {
    let companyName = data_gas_supplier_name[current_supplier_id];

    updateSupplier({
      ...supplier,
      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: companyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: companyName
      }
    });

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id,
        meter_mechanism_code,
        mprn,
        company_name: companyName
      }
    });
  }, [current_supplier_id]);

  // Function to save value every time click in editES button
  useEffect(() => {
    // Take value of company
    let GasCompanyName = data_gas_supplier_name[current_supplier_id];
    let ElectricityCompanyName = data_electricity_supplier_name[supplier_mpid];

    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id: supplier_mpid,
        meter_type: meter_type,
        mpan_core: mpan,
        company_name: ElectricityCompanyName
      },
      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: GasCompanyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core: mpan,
        meter_type: meter_type,
        supplier_mpid: supplier_mpid,
        company_name: ElectricityCompanyName
      },

      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: GasCompanyName
      }
    });

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core: mpan,
        meter_type: meter_type,
        supplier_mpid: supplier_mpid,
        company_name: ElectricityCompanyName
      }
    });
  }, [editES]);

  // Function to save value every time click in editGS button
  useEffect(() => {
    // Take value of company
    let GasCompanyName = data_gas_supplier_name[current_supplier_id];
    let ElectricityCompanyName = data_electricity_supplier_name[supplier_mpid];

    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id,
        meter_type,
        mpan_core: mpan,
        company_name: ElectricityCompanyName
      },
      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: GasCompanyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core: mpan,
        meter_type: meter_type,
        supplier_mpid: supplier_mpid,
        company_name: ElectricityCompanyName
      },

      gas_supplier: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: GasCompanyName
      }
    });

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id: current_supplier_id,
        meter_mechanism_code: meter_mechanism_code,
        mprn: mprn,
        company_name: GasCompanyName
      }
    });
  }, [editGS]);

  // Function to show update_payment_electricity_input if it's comes with a value
  useEffect(() => {
    if (meter_type !== '') {
      update_payment_electricity_input(true);
    }

  }, [electricity_meter_supported]);

  // Function to show update_payment_gas_input if it's comes with a value
  useEffect(() => {
    if (meter_mechanism_code !== '') {
      update_payment_gas_input(true);
    }

  }, [gas_meter_supported]);

  /**-- Checkbox Section -- */

  /**-- Electricity Checkboxes --*/
  const selectOnlyThisES = (e) => {
    for (var i = 1; i <= 6; i++) {
      document.getElementById("cb_es-" + i).checked = false;
      document.getElementById("cb_es-" + i).parentElement.style.border = null;
    }

    // Give a border styles to the element selected
    document.getElementById(e.target.id).parentElement.style.border = "0.2rem solid var(--tertiary_background)";

    // Show checkboxes when it's select
    document.getElementById(e.target.id).parentElement.children[1].style.opacity = "1";

    let checkbox = document.getElementById(e.target.id);
    let checkbox_selected = checkbox.checked = true;

    return checkbox_selected;
  }

  // onChange event for electricity checkbox - Update the information in the states
  const handleCheckboxES = (e) => {

    // Hidde error message
    if ((e.target.value === "BGAS") || (e.target.value === "BIZZ") || (e.target.value === "BIZZ") || (e.target.value === "ECOA") || (e.target.value === "ENRD") || (e.target.value === "OGAS")) {
      update_error_electricity_supplier(false);
    }

    if ((e.target.value === "LOND") || (e.target.value === "SEEB") || (e.target.value === "SWEB") || (e.target.value === "ENRD")) {
      update_error_electricity_supplier(false);
    }

    if ((e.target.value === "PGEN") || (e.target.value === "EELC") || (e.target.value === "EENG") || (e.target.value === "EMEB") || (e.target.value === "NORW")) {
      update_error_electricity_supplier(false);
    }

    if ((e.target.value === "HYDE") || (e.target.value === "IMPO") || (e.target.value === "SOUT") || (e.target.value === "SWAE")) {
      update_error_electricity_supplier(false);
    }

    if ((e.target.value === "MANW") || (e.target.value === "SPOW")) {
      update_error_electricity_supplier(false);
    }

    if ((e.target.value === "INDE") || (e.target.value === "MIDE") || (e.target.value === "NATP") || (e.target.value === "NEEB") || (e.target.value === "PSUK") || (e.target.value === "YELG")) {
      update_error_electricity_supplier(false);
    }

    /** Update states */

    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id: e.target.value,
        meter_type,
        mpan_core
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core,
        meter_type,
        supplier_mpid: e.target.value
      }
    });

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core,
        meter_type,
        supplier_mpid: e.target.value
      }
    });
  }

  // Function to load the current electricity checkbox selected if it comes with data from the API
  useEffect(() => {
    if ((elec_only) || (same_supplier === false) && (gas_only === false)) {
      // Selectors
      const cb_es_1 = document.getElementById('cb_es-1');
      const cb_es_2 = document.getElementById('cb_es-2');
      const cb_es_3 = document.getElementById('cb_es-3');
      const cb_es_4 = document.getElementById('cb_es-4');
      const cb_es_5 = document.getElementById('cb_es-5');
      const cb_es_6 = document.getElementById('cb_es-6');

      //British Gas Selected
      if ((supplier_id === "BGAS") || (supplier_id === "BIZZ") || (supplier_id === "ECOA") || (supplier_id === "ENRD") || (supplier_id === "OGAS")) {
        // Activate British Gas Checkbox and border
        cb_es_1.checked = true;
        cb_es_1.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_1.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_2.checked = false;
        cb_es_3.checked = false;
        cb_es_4.checked = false;
        cb_es_5.checked = false;
        cb_es_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_2.parentElement.style.border = null;
        cb_es_3.parentElement.style.border = null;
        cb_es_4.parentElement.style.border = null;
        cb_es_5.parentElement.style.border = null;
        cb_es_6.parentElement.style.border = null;
        // Check icon
        cb_es_2.parentElement.children[1].style.opacity = null;
        cb_es_3.parentElement.children[1].style.opacity = null;
        cb_es_4.parentElement.children[1].style.opacity = null;
        cb_es_5.parentElement.children[1].style.opacity = null;
        cb_es_6.parentElement.children[1].style.opacity = null;
      }

      // EDF Selected
      if ((supplier_id === "LOND") || (supplier_id === "SEEB") || (supplier_id === "SWEB")) {
        // Activate EDF Checkbox and border
        cb_es_2.checked = true;
        cb_es_2.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_2.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_1.checked = false;
        cb_es_3.checked = false;
        cb_es_4.checked = false;
        cb_es_5.checked = false;
        cb_es_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_1.parentElement.style.border = null;
        cb_es_3.parentElement.style.border = null;
        cb_es_4.parentElement.style.border = null;
        cb_es_5.parentElement.style.border = null;
        cb_es_6.parentElement.style.border = null;
        // Check icon
        cb_es_1.parentElement.children[1].style.opacity = null;
        cb_es_3.parentElement.children[1].style.opacity = null;
        cb_es_4.parentElement.children[1].style.opacity = null;
        cb_es_5.parentElement.children[1].style.opacity = null;
        cb_es_6.parentElement.children[1].style.opacity = null;
      }

      // EON Selected
      if ((supplier_id === "PGEN") || (supplier_id === "EELC") || (supplier_id === "EENG") || (supplier_id === "EMEB") || (supplier_id === "NORW")) {
        // Activate EON Checkbox and border
        cb_es_3.checked = true;
        cb_es_3.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_3.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_1.checked = false;
        cb_es_2.checked = false;
        cb_es_4.checked = false;
        cb_es_5.checked = false;
        cb_es_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_1.parentElement.style.border = null;
        cb_es_2.parentElement.style.border = null;
        cb_es_4.parentElement.style.border = null;
        cb_es_5.parentElement.style.border = null;
        cb_es_6.parentElement.style.border = null;
        // Check icon
        cb_es_1.parentElement.children[1].style.opacity = null;
        cb_es_2.parentElement.children[1].style.opacity = null;
        cb_es_4.parentElement.children[1].style.opacity = null;
        cb_es_5.parentElement.children[1].style.opacity = null;
        cb_es_6.parentElement.children[1].style.opacity = null;
      }

      // SSE Selected
      if ((supplier_id === "HYDE") || (supplier_id === "IMPO") || (supplier_id === "SOUT") || (supplier_id === "SWAE")) {
        // Activate SSE Checkbox and border
        cb_es_4.checked = true;
        cb_es_4.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_4.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_1.checked = false;
        cb_es_2.checked = false;
        cb_es_3.checked = false;
        cb_es_5.checked = false;
        cb_es_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_1.parentElement.style.border = null;
        cb_es_2.parentElement.style.border = null;
        cb_es_3.parentElement.style.border = null;
        cb_es_5.parentElement.style.border = null;
        cb_es_6.parentElement.style.border = null;
        // Check icon
        cb_es_1.parentElement.children[1].style.opacity = null;
        cb_es_2.parentElement.children[1].style.opacity = null;
        cb_es_3.parentElement.children[1].style.opacity = null;
        cb_es_5.parentElement.children[1].style.opacity = null;
        cb_es_6.parentElement.children[1].style.opacity = null;
      }

      // Scottish power selected
      if ((supplier_id === "MANW") || (supplier_id === "SPOW")) {
        // Activate Scottish power Checkbox and border
        cb_es_5.checked = true;
        cb_es_5.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_5.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_1.checked = false;
        cb_es_2.checked = false;
        cb_es_3.checked = false;
        cb_es_4.checked = false;
        cb_es_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_1.parentElement.style.border = null;
        cb_es_2.parentElement.style.border = null;
        cb_es_3.parentElement.style.border = null;
        cb_es_4.parentElement.style.border = null;
        cb_es_6.parentElement.style.border = null;
        // Check icon
        cb_es_1.parentElement.children[1].style.opacity = null;
        cb_es_2.parentElement.children[1].style.opacity = null;
        cb_es_3.parentElement.children[1].style.opacity = null;
        cb_es_4.parentElement.children[1].style.opacity = null;
        cb_es_6.parentElement.children[1].style.opacity = null;
      }

      // Npower Selected
      if ((supplier_id === "INDE") || (supplier_id === "MIDE") || (supplier_id === "NATP") || (supplier_id === "NEEB") || (supplier_id === "PSUK") || (supplier_id === "YELG")) {
        // Activate Npower Checkbox and border
        cb_es_6.checked = true;
        cb_es_6.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_es_6.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_es_1.checked = false;
        cb_es_2.checked = false;
        cb_es_3.checked = false;
        cb_es_4.checked = false;
        cb_es_5.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_es_1.parentElement.style.border = null;
        cb_es_2.parentElement.style.border = null;
        cb_es_3.parentElement.style.border = null;
        cb_es_4.parentElement.style.border = null;
        cb_es_5.parentElement.style.border = null;
        // Check icon
        cb_es_1.parentElement.children[1].style.opacity = null;
        cb_es_2.parentElement.children[1].style.opacity = null;
        cb_es_3.parentElement.children[1].style.opacity = null;
        cb_es_4.parentElement.children[1].style.opacity = null;
        cb_es_5.parentElement.children[1].style.opacity = null;
      }
    }
  }, [supplier_id]);

  /**-- Gas checkboxes --*/
  const selectOnlyThisGS = (e) => {
    for (var i = 1; i <= 6; i++) {
      document.getElementById("cb_gs-" + i).checked = false;
      document.getElementById("cb_gs-" + i).parentElement.style.border = null;
    }

    // Give a border styles to the element selected
    document.getElementById(e.target.id).parentElement.style.border = "0.2rem solid var(--tertiary_background)";

    // Show checkboxes when it's select
    document.getElementById(e.target.id).parentElement.children[1].style.opacity = "1";

    let checkbox = document.getElementById(e.target.id);
    let checkbox_selected = checkbox.checked = true;

    return checkbox_selected;
  }

  // onChange event for gas checkbox - Update the information in the states
  const handleCheckboxGS = (e) => {
    // Hidde error message
    if ((e.target.value === "BGT") || (e.target.value === "BGB") || (e.target.value === "BSA")) {
      update_error_gas_supplier(false);
    }

    if ((e.target.value === "LED") || (e.target.value === "SBR") || (e.target.value === "EDS") || (e.target.value === "LDE") || (e.target.value === "LEI")) {
      update_error_gas_supplier(false);
    }

    if ((e.target.value === "TUK") || (e.target.value === "EAS") || (e.target.value === "PWR") || (e.target.value === "EMI") || (e.target.value === "PWG") || (e.target.value === "OWN") || (e.target.value === "ATE") || (e.target.value === "EST") || (e.target.value === "SGL") || (e.target.value === "SGY") || (e.target.value === "TUU") || (e.target.value === "EOD") || (e.target.value === "POW")) {
      update_error_gas_supplier(false);
    }

    if (e.target.value === "ATL" || e.target.value === "SHH") {
      update_error_gas_supplier(false);
    }

    if (e.target.value === "SCT") {
      update_error_gas_supplier(false);
    }

    if ((e.target.value === "NGD") || (e.target.value === "NPC") || (e.target.value === "NDS") || (e.target.value === "IND") || (e.target.value === "CLT") || (e.target.value === "TCG") || (e.target.value === "NRZ") || (e.target.value === "GUK") || (e.target.value === "YGS") || (e.target.value === "YKE")) {
      update_error_gas_supplier(false);
    }

    /** Update states */
    updateSupplier({
      ...supplier,
      gas_supplier: {
        current_supplier_id: e.target.value,
        meter_mechanism_code,
        mprn
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      gas_supplier: {
        current_supplier_id: e.target.value,
        meter_mechanism_code,
        mprn
      }
    });

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id: e.target.value,
        meter_mechanism_code,
        mprn
      }
    });
  }

  // Function to load the current gas checkbox selected if it comes with data from the API
  useEffect(() => {
    if ((gas_only) || (same_supplier === false) && (elec_only === false)) {
      // Selectors
      const cb_gs_1 = document.getElementById('cb_gs-1');
      const cb_gs_2 = document.getElementById('cb_gs-2');
      const cb_gs_3 = document.getElementById('cb_gs-3');
      const cb_gs_4 = document.getElementById('cb_gs-4');
      const cb_gs_5 = document.getElementById('cb_gs-5');
      const cb_gs_6 = document.getElementById('cb_gs-6');

      //British Gas Selected
      if ((current_supplier_id === "BGT") || (current_supplier_id === "BGB") || (current_supplier_id === "BSA")) {
        // Activate British Gas Checkbox and border
        cb_gs_1.checked = true;
        cb_gs_1.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_1.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_2.checked = false;
        cb_gs_3.checked = false;
        cb_gs_4.checked = false;
        cb_gs_5.checked = false;
        cb_gs_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_gs_2.parentElement.style.border = null;
        cb_gs_3.parentElement.style.border = null;
        cb_gs_4.parentElement.style.border = null;
        cb_gs_5.parentElement.style.border = null;
        cb_gs_6.parentElement.style.border = null;
        // Check icon
        cb_gs_2.parentElement.children[1].style.opacity = null;
        cb_gs_3.parentElement.children[1].style.opacity = null;
        cb_gs_4.parentElement.children[1].style.opacity = null;
        cb_gs_5.parentElement.children[1].style.opacity = null;
        cb_gs_6.parentElement.children[1].style.opacity = null;
      }

      // EDF Selected
      if ((current_supplier_id === "LED") || (current_supplier_id === "SBR") || (current_supplier_id === "EDS") || (current_supplier_id === "LDE") || (current_supplier_id === "LEI")) {
        // Activate EDF Checkbox and border
        cb_gs_2.checked = true;
        cb_gs_2.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_2.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_1.checked = false;
        cb_gs_3.checked = false;
        cb_gs_4.checked = false;
        cb_gs_5.checked = false;
        cb_gs_6.checked = false;

        // Desactivate the border and chech icon in checkbox NOT selected
        cb_gs_1.parentElement.style.border = null;
        cb_gs_3.parentElement.style.border = null;
        cb_gs_4.parentElement.style.border = null;
        cb_gs_5.parentElement.style.border = null;
        cb_gs_6.parentElement.style.border = null;
        // Check icon
        cb_gs_1.parentElement.children[1].style.opacity = null;
        cb_gs_3.parentElement.children[1].style.opacity = null;
        cb_gs_4.parentElement.children[1].style.opacity = null;
        cb_gs_5.parentElement.children[1].style.opacity = null;
        cb_gs_6.parentElement.children[1].style.opacity = null;
      }

      // EON Selected
      if ((current_supplier_id === "TUK") || (current_supplier_id === "EAS") || (current_supplier_id === "PWR") || (current_supplier_id === "EMI") || (current_supplier_id === "PWG") || (current_supplier_id === "OWN") || (current_supplier_id === "ATE") || (current_supplier_id === "EST") || (current_supplier_id === "SGL") || (current_supplier_id === "SGY") || (current_supplier_id === "TUU") || (current_supplier_id === "EOD") || (current_supplier_id === "POW")) {
        // Activate EON Checkbox and border
        cb_gs_3.checked = true;
        cb_gs_3.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_3.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_1.checked = false;
        cb_gs_2.checked = false;
        cb_gs_4.checked = false;
        cb_gs_5.checked = false;
        cb_gs_6.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_gs_1.parentElement.style.border = null;
        cb_gs_2.parentElement.style.border = null;
        cb_gs_4.parentElement.style.border = null;
        cb_gs_5.parentElement.style.border = null;
        cb_gs_6.parentElement.style.border = null;
        // Check icon
        cb_gs_1.parentElement.children[1].style.opacity = null;
        cb_gs_2.parentElement.children[1].style.opacity = null;
        cb_gs_4.parentElement.children[1].style.opacity = null;
        cb_gs_5.parentElement.children[1].style.opacity = null;
        cb_gs_6.parentElement.children[1].style.opacity = null;
      }

      // SSE Selected
      if ((current_supplier_id === "ATL") || (current_supplier_id === "SHH")) {
        // Activate SSE Checkbox and border
        cb_gs_4.checked = true;
        cb_gs_4.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_4.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_1.checked = false;
        cb_gs_2.checked = false;
        cb_gs_3.checked = false;
        cb_gs_5.checked = false;
        cb_gs_6.checked = false;

        // Desactivate the border and checkicon in checkbox NOT selected
        cb_gs_1.parentElement.style.border = null;
        cb_gs_2.parentElement.style.border = null;
        cb_gs_3.parentElement.style.border = null;
        cb_gs_5.parentElement.style.border = null;
        cb_gs_6.parentElement.style.border = null;
        // Check icon
        cb_gs_1.parentElement.children[1].style.opacity = null;
        cb_gs_2.parentElement.children[1].style.opacity = null;
        cb_gs_3.parentElement.children[1].style.opacity = null;
        cb_gs_5.parentElement.children[1].style.opacity = null;
        cb_gs_6.parentElement.children[1].style.opacity = null;
      }

      // Scottish power selected
      if ((current_supplier_id === "SCT")) {
        // Activate Scottish power Checkbox and border
        cb_gs_5.checked = true;
        cb_gs_5.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_5.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_1.checked = false;
        cb_gs_2.checked = false;
        cb_gs_3.checked = false;
        cb_gs_4.checked = false;
        cb_gs_6.checked = false;

        // Desactivate the border check icon in checkbox NOT selected
        cb_gs_1.parentElement.style.border = null;
        cb_gs_2.parentElement.style.border = null;
        cb_gs_3.parentElement.style.border = null;
        cb_gs_4.parentElement.style.border = null;
        cb_gs_6.parentElement.style.border = null;
        // Check icon
        cb_gs_1.parentElement.children[1].style.opacity = null;
        cb_gs_2.parentElement.children[1].style.opacity = null;
        cb_gs_3.parentElement.children[1].style.opacity = null;
        cb_gs_4.parentElement.children[1].style.opacity = null;
        cb_gs_6.parentElement.children[1].style.opacity = null;
      }

      // Npower Selected
      if ((current_supplier_id === "NGD") || (current_supplier_id === "NPC") || (current_supplier_id === "NDS") || (current_supplier_id === "IND") || (current_supplier_id === "CLT") || (current_supplier_id === "TCG") || (current_supplier_id === "NRZ") || (current_supplier_id === "GUK") || (current_supplier_id === "YGS") || (current_supplier_id === "YKE")) {
        // Activate Npower Checkbox and border
        cb_gs_6.checked = true;
        cb_gs_6.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
        cb_gs_6.parentElement.children[1].style.opacity = "1";

        // Desactivate the rest of checkboxes
        cb_gs_1.checked = false;
        cb_gs_2.checked = false;
        cb_gs_3.checked = false;
        cb_gs_4.checked = false;
        cb_gs_5.checked = false;

        // Desactivate the border and check icon in checkbox NOT selected
        cb_gs_1.parentElement.style.border = null;
        cb_gs_2.parentElement.style.border = null;
        cb_gs_3.parentElement.style.border = null;
        cb_gs_4.parentElement.style.border = null;
        cb_gs_5.parentElement.style.border = null;
        // Check icon
        cb_gs_1.parentElement.children[1].style.opacity = null;
        cb_gs_2.parentElement.children[1].style.opacity = null;
        cb_gs_3.parentElement.children[1].style.opacity = null;
        cb_gs_4.parentElement.children[1].style.opacity = null;
        cb_gs_5.parentElement.children[1].style.opacity = null;
      }
    }
  }, [current_supplier_id]);

  const handleClickES = (e) => {
    e.preventDefault();

    // Hidde error
    update_error_electricity_supplier(false);

    // Selectors checboxes
    const cb_es_1 = document.getElementById('cb_es-1');
    const cb_es_2 = document.getElementById('cb_es-2');
    const cb_es_3 = document.getElementById('cb_es-3');
    const cb_es_4 = document.getElementById('cb_es-4');
    const cb_es_5 = document.getElementById('cb_es-5');
    const cb_es_6 = document.getElementById('cb_es-6');

    // Uncheck values checkboxes
    cb_es_1.checked = false;
    cb_es_2.checked = false;
    cb_es_3.checked = false;
    cb_es_4.checked = false;
    cb_es_5.checked = false;
    cb_es_6.checked = false;

    // Take off border style checkboxes
    cb_es_1.parentElement.style.border = null;
    cb_es_2.parentElement.style.border = null;
    cb_es_3.parentElement.style.border = null;
    cb_es_4.parentElement.style.border = null;
    cb_es_5.parentElement.style.border = null;
    cb_es_6.parentElement.style.border = null;
    // Check icon
    cb_es_1.parentElement.children[1].style.opacity = null;
    cb_es_2.parentElement.children[1].style.opacity = null;
    cb_es_3.parentElement.children[1].style.opacity = null;
    cb_es_4.parentElement.children[1].style.opacity = null;
    cb_es_5.parentElement.children[1].style.opacity = null;
    cb_es_6.parentElement.children[1].style.opacity = null;

    // Take value of company
    let ElectricityCompanyName = data_electricity_supplier_name['IDK'];

    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id: 'IDK',
        meter_type,
        mpan_core: mpan,
        company_name: ElectricityCompanyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core: mpan,
        meter_type,
        supplier_mpid: 'IDK',
        company_name: ElectricityCompanyName
      }
    });

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core: mpan,
        meter_type,
        supplier_mpid: 'IDK',
        company_name: ElectricityCompanyName
      }
    });
  }

  const handleClickGS = (e) => {
    e.preventDefault();

    // Hidde error
    update_error_gas_supplier(false);

    // Selectors checboxes
    const cb_gs_1 = document.getElementById('cb_gs-1');
    const cb_gs_2 = document.getElementById('cb_gs-2');
    const cb_gs_3 = document.getElementById('cb_gs-3');
    const cb_gs_4 = document.getElementById('cb_gs-4');
    const cb_gs_5 = document.getElementById('cb_gs-5');
    const cb_gs_6 = document.getElementById('cb_gs-6');

    // Uncheck values checkboxes
    cb_gs_1.checked = false;
    cb_gs_2.checked = false;
    cb_gs_3.checked = false;
    cb_gs_4.checked = false;
    cb_gs_5.checked = false;
    cb_gs_6.checked = false;

    // Take off border style checkboxes
    cb_gs_1.parentElement.style.border = null;
    cb_gs_2.parentElement.style.border = null;
    cb_gs_3.parentElement.style.border = null;
    cb_gs_4.parentElement.style.border = null;
    cb_gs_5.parentElement.style.border = null;
    cb_gs_6.parentElement.style.border = null;
    // Check icon
    cb_gs_1.parentElement.children[1].style.opacity = null;
    cb_gs_2.parentElement.children[1].style.opacity = null;
    cb_gs_3.parentElement.children[1].style.opacity = null;
    cb_gs_4.parentElement.children[1].style.opacity = null;
    cb_gs_5.parentElement.children[1].style.opacity = null;
    cb_gs_6.parentElement.children[1].style.opacity = null;

    // Take value of company
    let GasCompanyName = data_gas_supplier_name['IDK'];

    updateSupplier({
      ...supplier,
      gas_supplier: {
        current_supplier_id: 'IDK',
        meter_mechanism_code,
        mprn,
        company_name: GasCompanyName
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      gas_supplier: {
        current_supplier_id: 'IDK',
        meter_mechanism_code,
        mprn,
        company_name: GasCompanyName
      }
    });

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id: 'IDK',
        meter_mechanism_code,
        mprn,
        company_name: GasCompanyName
      }
    });
  }

  // Search Electrical Supplier
  const handleSearchES = (e) => {

    let search_option = (search_input, data_es) => {

      // Removing duplicate values
      const seen = new Set();
      const filteredArr = data_es.filter(el => {
        const duplicate = seen.has(el.company_name);
        seen.add(el.company_name);
        return !duplicate;
      });

      // Second step - Filter -> Look for the first step below
      let filter_es;
      // Filter by search_input 
      filter_es = filteredArr.filter((option) => {

        let options = option.company_name.toLowerCase().includes(search_input);
        return (
          options
        );
      });

      // Print options from filter_es 
      let results_es = filter_es.map((data) => (
        <Fragment key={data.supplier_id + '_search_key'}>
          <input type="radio" id={data.supplier_id + '_search_filtered'} name="search_es" value={data.supplier_id} />
          <label>{data.company_name} - <span style={{ color: 'var(--text_dark)' }}>Supplier ID:</span> {data.supplier_id}</label><br />
        </Fragment>
      ));

      // Validation - No results found
      if (filter_es.length <= 0) {
        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            }
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImSad />
              </IconContext.Provider>
              <h1>No results found...</h1>
            </div>
          )
        });

        return;
      }

      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          },
          confirm: "Select"
        },
        content: (
          <div className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <FaRegHandPointer />
            </IconContext.Provider>

            <h1>Results...</h1>
            <div className="swal-custom-container">
              {results_es}
            </div>
          </div>
        )
      }).then(result => {
        if (result !== true) {
          return;
        }

        let checkedValues = document.getElementsByName('search_es');

        for (var i = 0, length = checkedValues.length; i < length; i++) {
          if (checkedValues[i].checked) {
            const checkedValue = checkedValues[i].value;

            let companyName = data_electricity_supplier_name[checkedValue];

            // Selectors
            const cb_es_1 = document.getElementById('cb_es-1');
            const cb_es_2 = document.getElementById('cb_es-2');
            const cb_es_3 = document.getElementById('cb_es-3');
            const cb_es_4 = document.getElementById('cb_es-4');
            const cb_es_5 = document.getElementById('cb_es-5');
            const cb_es_6 = document.getElementById('cb_es-6');

            /** Evaluate and deactivate Electricity checkboxes supplier when selecting a not checkbox supplier */
            //British Gas not selected
            if (((checkedValue === "BGAS") || (checkedValue === "BIZZ") || (checkedValue === "ECOA") || (checkedValue === "ENRD") || (checkedValue === "OGAS")) !== checkedValue) {
              // Deactivate British Gas checkbox
              cb_es_1.checked = false;
              // Desactivate the border in British Gas checkbox
              cb_es_1.parentElement.style.border = null;
              cb_es_1.parentElement.children[1].style.opacity = null;
            }

            // EDF not selected
            if (((checkedValue === "LOND") || (checkedValue === "SEEB") || (checkedValue === "SWEB")) !== checkedValue) {
              // Desactivate EDF Checkbox and border
              cb_es_2.checked = false;
              // Desactivate the border in EDF checkbox
              cb_es_2.parentElement.style.border = null;
              cb_es_2.parentElement.children[1].style.opacity = null;
            }

            // EON not selected
            if (((checkedValue === "PGEN") || (checkedValue === "EELC") || (checkedValue === "EENG") || (checkedValue === "EMEB") || (checkedValue === "NORW")) !== checkedValue) {
              // Desactivate EON Checkbox and border
              cb_es_3.checked = false;
              // Desactivate the border in EON checkbox
              cb_es_3.parentElement.style.border = null;
              cb_es_3.parentElement.children[1].style.opacity = null;
            }

            // SSE not selected
            if (((checkedValue === "HYDE") || (checkedValue === "IMPO") || (checkedValue === "SOUT") || (checkedValue === "SWAE")) !== checkedValue) {
              // Desactivate SSE Checkbox and border
              cb_es_4.checked = false;
              // Desactivate the border in SSE checkbox
              cb_es_4.parentElement.style.border = null;
              cb_es_4.parentElement.children[1].style.opacity = null;
            }

            // Scottish power not selected
            if (((checkedValue === "MANW") || (checkedValue === "SPOW")) !== checkedValue) {
              // Desactivate Scottish power Checkbox and border
              cb_es_5.checked = false;
              // Desactivate the border in Scottish power checkbox
              cb_es_5.parentElement.style.border = null;
              cb_es_5.parentElement.children[1].style.opacity = null;
            }

            // Npower not selected
            if (((checkedValue === "INDE") || (checkedValue === "MIDE") || (checkedValue === "NATP") || (checkedValue === "NEEB") || (checkedValue === "PSUK") || (checkedValue === "YELG")) !== checkedValue) {
              // Activate Npower Checkbox and border
              cb_es_6.checked = false;
              // Desactivate the border in Npower checkbox
              cb_es_6.parentElement.style.border = null;
              cb_es_6.parentElement.children[1].style.opacity = null;
            }

            /**-- Update states -- */
            updateSupplier({
              ...supplier,
              electricity_supplier: {
                supplier_id: checkedValue,
                meter_type,
                mpan_core: mpan,
                company_name: companyName
              }
            });

            updateSupplierInformation({
              ...supplierInformation,
              electricity_supplier: {
                mpan_core,
                meter_type,
                supplier_mpid: checkedValue,
                company_name: companyName
              }
            });

            updateElectricityInformation({
              ...electricityInformation,
              MPANDetails: {
                mpan_core,
                meter_type,
                supplier_mpid: checkedValue,
                company_name: companyName
              }
            });
          }
        }
      });
    }

    // First step - Take the text introduced in the input
    swal({
      closeOnClickOutside: false,
      buttons: {
        cancel: {
          text: "Go back",
          value: false,
          visible: true
        },
        confirm: "Search"
      },
      content: (
        <div className="swal-text-custom">
          <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
            <FaSearchengin />
          </IconContext.Provider>
          <h1>Search Electricity Supplier...</h1>
          <div>
            <input type="text" id="search-input" />
          </div>
        </div>
      )
    }).then(search => {
      if (search !== true) {
        return;
      }
      const search_input = document.getElementById('search-input').value.toLowerCase();
      // Validation search input
      if (search_input === '') {
        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            }
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImSad />
              </IconContext.Provider>
              <h1>No results found...</h1>
            </div>
          )
        });

        return;
      }
      const data_es = data_electricity_supplier_id;
      return search_option(search_input, data_es);
    });
  }

  // Search Gas Supplier
  const handleSearchGS = (e) => {

    let search_option = (search_input, data_gs) => {

      // Removing duplicate values
      const seen = new Set();
      const filteredArr = data_gs.filter(el => {
        const duplicate = seen.has(el.company_name);
        seen.add(el.company_name);
        return !duplicate;
      });

      // Second step - Filter -> Look for the first step below
      let filter_gs;
      // Filter by search_input 
      filter_gs = filteredArr.filter((option) => {

        let options = option.company_name.toLowerCase().includes(search_input);
        return (
          options
        );
      });

      // Print options from filter_gs 
      let results_gs = filter_gs.map((data) => (
        <Fragment key={data.supplier_id + '_search_key'}>
          <input type="radio" id={data.supplier_id + '_search_filtered'} name="search_gs" value={data.supplier_id} />
          <label>{data.company_name} - <span style={{ color: 'var(--text_dark)' }}>Supplier ID:</span> {data.supplier_id}</label><br />
        </Fragment>
      ));

      // Validation - No results found
      if (filter_gs.length <= 0) {
        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            }
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImSad />
              </IconContext.Provider>
              <h1>No results found...</h1>
            </div>
          )
        });

        return;
      }

      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          },
          confirm: "Select"
        },
        content: (
          <div className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <FaRegHandPointer />
            </IconContext.Provider>

            <h1>Results...</h1>
            <div className="swal-custom-container">
              {results_gs}
            </div>
          </div>
        )
      }).then(result => {
        if (result !== true) {
          return;
        }

        let checkedValues = document.getElementsByName('search_gs');

        for (var i = 0, length = checkedValues.length; i < length; i++) {
          if (checkedValues[i].checked) {
            const checkedValue = checkedValues[i].value;

            let companyName = data_gas_supplier_name[checkedValue];

            // Selectors
            const cb_gs_1 = document.getElementById('cb_gs-1');
            const cb_gs_2 = document.getElementById('cb_gs-2');
            const cb_gs_3 = document.getElementById('cb_gs-3');
            const cb_gs_4 = document.getElementById('cb_gs-4');
            const cb_gs_5 = document.getElementById('cb_gs-5');
            const cb_gs_6 = document.getElementById('cb_gs-6');

            if ((checkedValue !== "BGT") || (checkedValue !== "BGB") || (checkedValue !== "BSA") || (checkedValue !== "LED") || (checkedValue !== "SBR") || (checkedValue !== "EDS") || (checkedValue !== "LDE") || (checkedValue !== "LEI") || (checkedValue !== "TUK") || (checkedValue !== "EAS") || (checkedValue !== "PWR") || (checkedValue !== "EMI") || (checkedValue !== "PWG") || (checkedValue !== "OWN") || (checkedValue !== "ATE") || (checkedValue !== "EST") || (checkedValue !== "SGL") || (checkedValue !== "SGY") || (checkedValue !== "TUU") || (checkedValue !== "EOD") || (checkedValue !== "POW") || (checkedValue !== "ATL") || (checkedValue !== "SHH") || (checkedValue !== "SCT") || (checkedValue !== "NGD") || (checkedValue !== "NPC") || (checkedValue !== "NDS") || (checkedValue !== "IND") || (checkedValue !== "CLT") || (checkedValue !== "TCG") || (checkedValue !== "NRZ") || (checkedValue !== "GUK") || (checkedValue !== "YGS") || (checkedValue !== "YGS")) {

              // Uncheck values
              cb_gs_1.checked = false;
              cb_gs_2.checked = false;
              cb_gs_3.checked = false;
              cb_gs_4.checked = false;
              cb_gs_5.checked = false;
              cb_gs_6.checked = false;

              // take off border style
              cb_gs_1.parentElement.style.border = null;
              cb_gs_2.parentElement.style.border = null;
              cb_gs_3.parentElement.style.border = null;
              cb_gs_4.parentElement.style.border = null;
              cb_gs_5.parentElement.style.border = null;
              cb_gs_6.parentElement.style.border = null;
              // Check Icon
              cb_gs_1.parentElement.children[1].style.opacity = null;
              cb_gs_2.parentElement.children[1].style.opacity = null;
              cb_gs_3.parentElement.children[1].style.opacity = null;
              cb_gs_4.parentElement.children[1].style.opacity = null;
              cb_gs_5.parentElement.children[1].style.opacity = null;
              cb_gs_6.parentElement.children[1].style.opacity = null;
            }

            /**-- Update states -- */
            updateSupplier({
              ...supplier,
              gas_supplier: {
                current_supplier_id: checkedValue,
                meter_mechanism_code,
                mprn,
                company_name: companyName
              }
            });

            updateSupplierInformation({
              ...supplierInformation,
              gas_supplier: {
                current_supplier_id: checkedValue,
                meter_mechanism_code,
                mprn,
                company_name: companyName
              }
            });

            updateGasInformation({
              ...gasInformation,
              dataGas: {
                current_supplier_id: checkedValue,
                meter_mechanism_code,
                mprn,
                company_name: companyName
              }
            });
          }
        }
      });

    }

    // First step - Take the text introduced in the input
    swal({
      closeOnClickOutside: false,
      buttons: {
        cancel: {
          text: "Go back",
          value: false,
          visible: true
        },
        confirm: "Search"
      },
      content: (
        <div className="swal-text-custom">
          <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
            <FaSearchengin />
          </IconContext.Provider>
          <h1>Search Gas Supplier...</h1>
          <div>
            <input type="text" id="search-input" />
          </div>
        </div>
      )
    }).then(search => {
      if (search !== true) {
        return;
      }
      const search_input = document.getElementById('search-input').value.toLowerCase();
      // Validation search input
      if (search_input === '') {
        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            }
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImSad />
              </IconContext.Provider>
              <h1>No results found...</h1>
            </div>
          )
        });

        return;
      }
      const data_gs = data_gas_supplier_id;
      return search_option(search_input, data_gs);
    });
  }

  // Go to E7 - Next
  const goToE7 = (e) => {
    e.preventDefault();

    /**-- GAS VALIDATION --*/
    if (gas_only) {
      console.log('Gas supplier validation - Gas Only');
      /** --- Validation for gas supplier - Payment method desactivated --- */
      // Check if the gas payment type is desactivated / No valdiation for payment method
      if (document.getElementById('payment_type_gas') === null || undefined) {
        // console.log('gas payment method desactivated');

        // Supplier validation
        if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
          // Show error message
          update_error_gas_supplier(true);

          // Check gas meter type
          if (document.getElementById("meter_type_gas").value === "") {
            update_error_gas_meter_type(true);
          } else {
            update_error_gas_meter_type(false);
          }

          return;
        } else {
          // Hidde error message
          update_error_gas_supplier(false);
        }

        // Meter type validation
        if (document.getElementById("meter_type_gas").value === "") {
          // Show error message
          update_error_gas_meter_type(true);

          // Check gas supplier
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            update_error_gas_supplier(true);
          } else {
            update_error_gas_supplier(false);
          }

          return;
        } else {
          update_error_gas_meter_type(false);
        }

      } else {
        /** --- Validation for gas supplier - Payment method active --- */
        // console.log('gas payment method activated');

        // Supplier validation
        if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
          // Show error message
          update_error_gas_supplier(true);

          // Check gas meter type
          if (document.getElementById("meter_type_gas").value === "") {
            update_error_gas_meter_type(true);
          } else {
            update_error_gas_meter_type(false);
          }

          // Check gas payment type
          if (document.getElementById('payment_type_gas').value === "") {
            update_error_gas_payment(true);
          } else {
            update_error_gas_payment(false);
          }

          return;

        } else {
          // Hidde error message
          update_error_gas_supplier(false);
        }

        // Meter type validation
        if (document.getElementById("meter_type_gas").value === "") {
          // Show error message
          update_error_gas_meter_type(true);

          // Check gas supplier
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            update_error_gas_supplier(true);
          } else {
            update_error_gas_supplier(false);
          }

          // Check gas payment type
          if (document.getElementById('payment_type_gas').value === "") {
            update_error_gas_payment(true);
          } else {
            update_error_gas_payment(false);
          }

          return;
        } else {
          update_error_gas_meter_type(false);
        }

        // gas Payment type validation
        if (document.getElementById('payment_type_gas').value === "") {
          // Show error message
          update_error_gas_payment(true);

          // Check gas supplier
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            update_error_gas_supplier(true);
          } else {
            update_error_gas_supplier(false);
          }

          // Check gas meter type
          if (document.getElementById("meter_type_gas").value === "") {
            update_error_gas_meter_type(true);
          } else {
            update_error_gas_meter_type(false);
          }

          return;
        } else {
          update_error_gas_payment(false);
        }
      }

      // Update Customer information state - gas
      updateCustomerInformation({
        ...customerInformation,
        customerAddres,
        supplierInformation,
        useGas,
        fuel,
        electricityPaymentType,
        gasPaymentType
      });

      // Sweet alert - Elecetricity
      const supplier_gs_details = gasInformation.dataGas.company_name;
      const meter_type_gs_details = document.getElementById('meter_type_gas');
      const mpan_gs_details = gasInformation.dataGas.mprn;

      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          },
          confirm: "Confirm"
        },
        content: (
          <div className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <ImProfile />
            </IconContext.Provider>

            <h1>Customer Details</h1>
            <div>
              <p><span>Gas supplier:</span> {supplier_gs_details}</p>
              <p><span>Meter Type:</span> {meter_type_gs_details.options[meter_type_gs_details.selectedIndex].text}</p>
              <p><span>MPRN:</span> {mpan_gs_details === '' ? 'Not Found' : mpan_gs_details}</p>
            </div>
          </div>
        )
      }).then(response => {
        if (response !== true) {
          console.log('Go back');
          return;
        } else {
          console.log('Update here');
          const company_name = gasInformation.dataGas.company_name;
          const meter_mechanism_code = gasInformation.dataGas.meter_mechanism_code;
          const current_supplier_id = gasInformation.dataGas.current_supplier_id;
          // Update Electricity Information
          updateElectricityInformation({
            ...electricityInformation,
            MPANDetails: {
              mpan_core: '',
              meter_type: '',
              supplier_mpid: '',
              company_name: ''
            }
          });
          // Update Supplier Information
          updateSupplierInformation({
            ...supplierInformation,
            gas_supplier: {
              current_supplier_id,
              meter_mechanism_code,
              mprn,
              company_name
            },
            electricity_supplier: {
              mpan_core: '',
              meter_type: '',
              supplier_mpid: '',
              company_name: ''
            }
          });
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            customerAddres,
            supplierInformation: {
              gas_supplier: {
                current_supplier_id,
                meter_mechanism_code,
                mprn,
                company_name
              },
              electricity_supplier: {
                mpan_core: '',
                meter_type: '',
                supplier_mpid: '',
                company_name: ''
              }
            },
            useGas,
            fuel,
            electricityPaymentType,
            gasPaymentType
          });

          // // Update fuel state, searched_by_mprn added to check if we should update the electricityInfomariton state in the E7 component
          // updateFuel({
          //   ...fuel,
          //   searched_by_mprn: true
          // });

          // Hidde Form supply
          updateShowFormSupply(false);
          // Show FormE7
          updateShowE7(true);
          // Update progress bar
          updateProgressBar({
            ...progressBar,
            step: 5
          });
        }
      });
      return;
    }

    /**-- ELECTRICITY VALIDATION --*/
    if (elec_only) {
      console.log('elec_only validation');
      // Check if the electricity payment type is desactivated
      if (document.getElementById('payment_type_electricity') === null || undefined) {
        // console.log('Electricity payment method desactivated');

        // Supplier validation
        if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
          // Show error message
          update_error_electricity_supplier(true);

          // Check electricity meter type
          if (document.getElementById("meter_type_electricity").value === "") {
            update_error_electricity_meter_type(true);
          } else {
            update_error_electricity_meter_type(false);
          }

          return;
        } else {
          // Hidde error message
          update_error_electricity_supplier(false);
        }

        // Meter type validation
        if (document.getElementById("meter_type_electricity").value === "") {
          // Show error message
          update_error_electricity_meter_type(true);

          // Check electricity supplier
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            update_error_electricity_supplier(true);
          } else {
            update_error_electricity_supplier(false);
          }

          return;
        } else {
          update_error_electricity_meter_type(false);
        }

      } else {
        /** --- Validation for electricity supplier - Payment method active --- */
        // console.log('Electricity payment method activated');

        // Supplier validation
        if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
          // Show error message
          update_error_electricity_supplier(true);

          // Check electricity meter type
          if (document.getElementById("meter_type_electricity").value === "") {
            update_error_electricity_meter_type(true);
          } else {
            update_error_electricity_meter_type(false);
          }

          // Check electricity payment type
          if (document.getElementById('payment_type_electricity').value === "") {
            update_error_electricity_payment(true);
          } else {
            update_error_electricity_payment(false);
          }

          return;

        } else {
          // Hidde error message
          update_error_electricity_supplier(false);
        }

        // Meter type validation
        if (document.getElementById("meter_type_electricity").value === "") {
          // Show error message
          update_error_electricity_meter_type(true);

          // Check electricity supplier
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            update_error_electricity_supplier(true);
          } else {
            update_error_electricity_supplier(false);
          }

          // Check electricity payment type
          if (document.getElementById('payment_type_electricity').value === "") {
            update_error_electricity_payment(true);
          } else {
            update_error_electricity_payment(false);
          }

          return;
        } else {
          update_error_electricity_meter_type(false);
        }

        // Electricity Payment type validation
        if (document.getElementById('payment_type_electricity').value === "") {
          // Show error message
          update_error_electricity_payment(true);

          // Check electricity supplier
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            update_error_electricity_supplier(true);
          } else {
            update_error_electricity_supplier(false);
          }

          // Check electricity meter type
          if (document.getElementById("meter_type_electricity").value === "") {
            update_error_electricity_meter_type(true);
          } else {
            update_error_electricity_meter_type(false);
          }

          return;
        } else {
          update_error_electricity_payment(false);
        }
      }

      // Update Customer information state - Electricity
      updateCustomerInformation({
        ...customerInformation,
        customerAddres,
        supplierInformation,
        useGas,
        fuel,
        electricityPaymentType,
        gasPaymentType
      });

      // Sweet alert - Elecetricity
      const supplier_es_details = electricityInformation.MPANDetails.company_name;
      const meter_type_es_details = document.getElementById('meter_type_electricity');
      const mpan_es_details = electricityInformation.MPANDetails.mpan_core;

      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          },
          confirm: "Confirm"
        },
        content: (
          <div data-cy="swal-elec-only" className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <ImProfile />
            </IconContext.Provider>

            <h1>Customer Details</h1>
            <div>
              <p><span>Electricity supplier:</span> {supplier_es_details}</p>
              <p><span>Meter Type:</span> {meter_type_es_details.options[meter_type_es_details.selectedIndex].text}</p>
              <p><span>MPAN:</span> {mpan_es_details === '' ? 'Not Found' : mpan_es_details}</p>
            </div>
          </div>
        )
      }).then(response => {
        if (response !== true) {
          console.log('Go back');
          return;
        } else {
          console.log('Update here');
          const company_name = electricityInformation.MPANDetails.company_name;
          const meter_type = electricityInformation.MPANDetails.meter_type;
          const mpan_core = electricityInformation.MPANDetails.mpan_core;
          const supplier_mpid = electricityInformation.MPANDetails.supplier_mpid;
          // Update Supplier Information
          updateSupplierInformation({
            ...supplierInformation,
            gas_supplier: {
              current_supplier_id: '',
              meter_mechanism_code: '',
              mprn: '',
              company_name: ''
            },
            electricity_supplier: {
              mpan_core,
              meter_type,
              supplier_mpid,
              company_name
            }
          });
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            customerAddres,
            supplierInformation: {
              gas_supplier: {
                current_supplier_id: '',
                meter_mechanism_code: '',
                mprn: '',
                company_name: ''
              },
              electricity_supplier: {
                mpan_core,
                meter_type,
                supplier_mpid,
                company_name
              }
            },
            useGas,
            fuel,
            electricityPaymentType,
            gasPaymentType
          });

          // // Update fuel state, searched_by_mprn added to check if we should update the electricityInfomariton state in the E7 component
          // updateFuel({
          //   ...fuel,
          //   searched_by_mprn: false
          // });

          // Hidde Form supply
          updateShowFormSupply(false);
          // Show FormE7
          updateShowE7(true);
          // Update progress bar
          updateProgressBar({
            ...progressBar,
            step: 5
          });
        }
      });
      return;
    }

    /**-- Dual tariff Validation  --*/
    if (dual_active) {
      if (same_supplier) {
        console.log('Same suppliers');
        // Check if the electricity payment type is desactivated
        if (document.getElementById('payment_type_electricity') === null || undefined) {
          // console.log('Electricity payment method desactivated');

          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            return;
          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

        } else {
          /** --- Validation for electricity supplier - Payment method active --- */
          // console.log('Electricity payment method activated');

          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            return;

          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

          // Electricity Payment type validation
          if (document.getElementById('payment_type_electricity').value === "") {
            // Show error message
            update_error_electricity_payment(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            return;
          } else {
            update_error_electricity_payment(false);
          }
        }

        // Update Customer information state - Electricity
        updateCustomerInformation({
          ...customerInformation,
          customerAddres,
          supplierInformation,
          useGas,
          fuel,
          electricityPaymentType,
          gasPaymentType
        });

        // Sweet alert - Elecetricity
        const supplier_es_details = electricityInformation.MPANDetails.company_name;
        const meter_type_es_details = document.getElementById('meter_type_electricity');
        const mpan_es_details = electricityInformation.MPANDetails.mpan_core;

        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            },
            confirm: "Confirm"
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImProfile />
              </IconContext.Provider>

              <h1>Customer Details</h1>
              <div>
                <p><span>Supplier:</span> {supplier_es_details}</p>
                <p><span>Meter Type:</span> {meter_type_es_details.options[meter_type_es_details.selectedIndex].text}</p>
                <p><span>MPAN:</span> {mpan_es_details === '' ? 'Not Found' : mpan_es_details}</p>
              </div>
            </div>
          )
        }).then(response => {
          if (response !== true) {
            console.log('Go back');
            return;
          } else {
            console.log('Update here');
            const company_name = electricityInformation.MPANDetails.company_name;
            const meter_type = electricityInformation.MPANDetails.meter_type;
            const mpan_core = electricityInformation.MPANDetails.mpan_core;
            const supplier_mpid = electricityInformation.MPANDetails.supplier_mpid;
            // Update Gas Information
            updateGasInformation({
              ...gasInformation,
              dataGas: {
                current_supplier_id: supplier_mpid,
                meter_mechanism_code: meter_type,
                mprn: '',
                company_name
              }
            });
            // Update Supplier Information
            updateSupplierInformation({
              ...supplierInformation,
              gas_supplier: {
                current_supplier_id: supplier_mpid,
                meter_mechanism_code: meter_type,
                mprn: '',
                company_name
              },
              electricity_supplier: {
                mpan_core,
                meter_type,
                supplier_mpid,
                company_name
              }
            });
            // Update Customer Information
            updateCustomerInformation({
              ...customerInformation,
              customerAddres,
              supplierInformation: {
                gas_supplier: {
                  current_supplier_id: supplier_mpid,
                  meter_mechanism_code: meter_type,
                  mprn: '',
                  company_name
                },
                electricity_supplier: {
                  mpan_core,
                  meter_type,
                  supplier_mpid,
                  company_name
                }
              },
              useGas,
              fuel,
              electricityPaymentType,
              gasPaymentType
            });

            // // Update fuel state, searched_by_mprn added to check if we should update the electricityInfomariton state in the E7 component
            // updateFuel({
            //   ...fuel,
            //   searched_by_mprn: false
            // });

            // Hidde Form supply
            updateShowFormSupply(false);
            // Show FormE7
            updateShowE7(true);
            // Update progress bar
            updateProgressBar({
              ...progressBar,
              step: 5
            });
          }
        });
        return;
      } else {
        console.log('Dual Different suppliers');
        /** --- Validation for electricity supplier - Payment method desactivated --- */
        // Check if the Electricity and Gas Payment type are desactivated / No valdiation for payment method
        if (((document.getElementById('payment_type_electricity') === null) || (document.getElementById('payment_type_electricity') === undefined)) && ((document.getElementById('payment_type_gas') === null) || (document.getElementById('payment_type_gas') === undefined))) {

          // console.log('Electricity and Gas payment type are desactivated');

          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select"
            ) {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select"
            ) {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select"
            ) {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

          /** --- Validation for gas supplier --- */
          // Supplier validation
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            // Show error message
            update_error_gas_supplier(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_gas_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_gas").value === "") {
            // Show error message
            update_error_gas_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            return;
          } else {
            update_error_gas_meter_type(false);
          }
        }

        // Check if Electricity payment type is activated and Gas payment type is desactivated
        if (((document.getElementById('payment_type_electricity') !== null) || (document.getElementById('payment_type_electricity') !== undefined)) && ((document.getElementById('payment_type_gas') === null) || (document.getElementById('payment_type_gas') === undefined))) {

          // console.log('Electricity payment type is activated / Gas payment type is desactivated');

          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select"
            ) {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

          // Electricity Payment type validation
          if (document.getElementById('payment_type_electricity').value === "") {
            // Show error message
            update_error_electricity_payment(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_electricity_payment(false);
          }

          /** --- Validation for gas supplier --- */
          // Supplier validation
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            // Show error message
            update_error_gas_supplier(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_gas_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_gas").value === "") {
            // Show error message
            update_error_gas_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            return;
          } else {
            update_error_gas_meter_type(false);
          }
        }

        // Check if Gas payment type is activated and Electricity payment type is desactivated
        if (((document.getElementById('payment_type_gas') !== null) || (document.getElementById('payment_type_gas') !== undefined)) && ((document.getElementById('payment_type_electricity') === null) || (document.getElementById('payment_type_electricity') === undefined))) {

          // console.log('Gas payment type is activated / Electricity payment type is desactivated');

          /** --- Validation for Electricity information --- */
          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check Gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select"
            ) {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check Gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

          /** --- Validation for gas information --- */
          // Supplier validation
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            // Show error message
            update_error_gas_supplier(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_gas_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_gas").value === "") {
            // Show error message
            update_error_gas_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_gas_meter_type(false);
          }

          // Gas Payment type validation
          if (document.getElementById('payment_type_gas').value === "") {
            // Show error message
            update_error_gas_payment(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_gas_payment(false);
          }
        }

        // Chech if Electricity and Gas payment type are activated
        if (((document.getElementById('payment_type_electricity') !== null) || (document.getElementById('payment_type_electricity') !== undefined)) && ((document.getElementById('payment_type_gas') !== null) || (document.getElementById('payment_type_gas') !== undefined))) {
          // console.log('Electricity and Gas payment type are activated');

          /** --- Validation for Electricity information --- */
          // Supplier validation
          if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
            // Show error message
            update_error_electricity_supplier(true);

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            // Hidde error message
            update_error_electricity_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_electricity").value === "") {
            // Show error message
            update_error_electricity_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select"
            ) {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_electricity_meter_type(false);
          }

          // Electricity Payment type validation
          if (document.getElementById('payment_type_electricity').value === "") {
            // Show error message
            update_error_electricity_payment(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_gas_payment(false);
          }

          /** --- Validation for gas information --- */
          // Supplier validation
          if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
            // Show error message
            update_error_gas_supplier(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_gas_supplier(false);
          }

          // Meter type validation
          if (document.getElementById("meter_type_gas").value === "") {
            // Show error message
            update_error_gas_meter_type(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas payment type
            if (document.getElementById('payment_type_gas').value === "") {
              update_error_gas_payment(true);
            } else {
              update_error_gas_payment(false);
            }

            return;
          } else {
            update_error_gas_meter_type(false);
          }

          // Gas Payment type validation
          if (document.getElementById('payment_type_gas').value === "") {
            // Show error message
            update_error_gas_payment(true);

            // Check electricity supplier
            if (document.getElementById("selected").value === "" || document.getElementById("selected").value === "Select") {
              update_error_electricity_supplier(true);
            } else {
              update_error_electricity_supplier(false);
            }

            // Check electricity meter type
            if (document.getElementById("meter_type_electricity").value === "") {
              update_error_electricity_meter_type(true);
            } else {
              update_error_electricity_meter_type(false);
            }

            // Check electricity payment type
            if (document.getElementById('payment_type_electricity').value === "") {
              update_error_electricity_payment(true);
            } else {
              update_error_electricity_payment(false);
            }

            // Check gas supplier
            if (document.getElementById("gas_selected").value === "" || document.getElementById("gas_selected").value === "Select") {
              update_error_gas_supplier(true);
            } else {
              update_error_gas_supplier(false);
            }

            // Check gas meter type
            if (document.getElementById("meter_type_gas").value === "") {
              update_error_gas_meter_type(true);
            } else {
              update_error_gas_meter_type(false);
            }

            return;
          } else {
            update_error_gas_payment(false);
          }
        }

        // Update state - Electricity and Gas 
        updateCustomerInformation({
          ...customerInformation,
          customerAddres,
          supplierInformation,
          useGas,
          fuel,
          electricityPaymentType,
          gasPaymentType
        });

        /** -- Sweet alert - Electricity and Gas -- */
        // Electricity
        const supplier_es_details = electricityInformation.MPANDetails.company_name;
        const meter_type_es_details = document.getElementById('meter_type_electricity');
        const mpan_es_details = electricityInformation.MPANDetails.mpan_core;
        // Gas
        const supplier_gs_details = gasInformation.dataGas.company_name;
        const meter_type_gs_details = document.getElementById('meter_type_gas');
        const mprn_gs_details = gasInformation.dataGas.mprn;

        swal({
          closeOnClickOutside: false,
          buttons: {
            cancel: {
              text: "Go back",
              value: false,
              visible: true
            },
            confirm: "Confirm"
          },
          content: (
            <div className="swal-text-custom">
              <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                <ImProfile />
              </IconContext.Provider>

              <h1>Customer Details</h1>
              {/* Electricity */}
              <div className="swal-custom-container">
                <h2>Electricity Supplier</h2>
                <p><span>Electricity supplier:</span> {supplier_es_details}</p>
                <p><span>Meter Type:</span> {meter_type_es_details.options[meter_type_es_details.selectedIndex].text}</p>
                <p><span>MPAN:</span> {mpan_es_details === '' ? 'Not Found' : mpan_es_details}</p>
              </div>
              {/* Gas */}
              <div className="swal-custom-container">
                <h2>Gas Supplier</h2>
                <p><span>Gas supplier:</span> {supplier_gs_details}</p>
                <p><span>Meter Type:</span> {meter_type_gs_details.options[meter_type_gs_details.selectedIndex].text}</p>
                <p><span>MPRN:</span> {mprn_gs_details === '' ? 'Not Found' : mprn_gs_details}</p>
              </div>
            </div>
          )
        }).then(response => {
          // console.log(response);
          if (response !== true) {
            return;
          } else {
            // Hidde Form supply
            updateShowFormSupply(false);
            // Show FormE7
            updateShowE7(true);
          }
        });
      }
      return;
    }
  };

  // Go back to MPRN/MPAN - Back
  const goToFormMpanMprn = (e) => {
    e.preventDefault();
    // Update and clean the states
    updateSupplier({
      ...supplier,
      electricity_supplier: {
        supplier_id: '',
        meter_type: '',
        mpan_core: '',
        company_name: ''
      },
      gas_supplier: {
        current_supplier_id: '',
        meter_mechanism_code: '',
        mprn: '',
        company_name: ''
      }
    });

    updateSupplierInformation({
      ...supplierInformation,
      electricity_supplier: {
        mpan_core: '',
        meter_type: '',
        supplier_mpid: '',
        company_name: ''
      },

      gas_supplier: {
        current_supplier_id: '',
        meter_mechanism_code: '',
        mprn: '',
        company_name: ''
      }
    });

    updateElectricityInformation({
      ...electricityInformation,
      MPANDetails: {
        mpan_core: '',
        meter_type: '',
        supplier_mpid: '',
        company_name: ''
      }
    });

    updateGasInformation({
      ...gasInformation,
      dataGas: {
        current_supplier_id: '',
        meter_mechanism_code: '',
        mprn: '',
        company_name: ''
      }
    });

    // Show Form MPAN/MPRN component
    updateShowFormMpanMprn(true);
    // Hidde Form Supply component
    updateShowFormSupply(false);
    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 3
    });
  };

  const es_name = data_electricity_supplier_name[supplier_mpid];
  const gs_name = data_gas_supplier_name[current_supplier_id];

  // Dual fuel conditional
  useEffect(() => {
    if (dual_fuel) {
      if (same_supplier) {
        // Electricity
        const supplier_mpid_dual = electricityInformation.MPANDetails.supplier_mpid;
        // Gas
        const current_supplier_id_dual = gasInformation.dataGas.current_supplier_id;

        if ((supplier_mpid_dual !== '') && (current_supplier_id_dual === '')) {
          console.log('Electricity comes with data');
          const current_supplier_id = electricityInformation.MPANDetails.supplier_mpid;
          const meter_mechanism_code = electricityInformation.MPANDetails.meter_type;
          const company_name = data_electricity_supplier_name[supplier_mpid];
          // Update gas information state with the same values as Electricity due is dual
          updateGasInformation({
            ...gasInformation,
            dataGas: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });

          updateSupplier({
            ...supplier,
            gas_supplier: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });

          updateSupplierInformation({
            ...supplierInformation,
            gas_supplier: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });
        }

        if ((current_supplier_id_dual !== '') && (supplier_mpid_dual === '')) {
          console.log('Gas comes with data');
          const meter_type = gasInformation.dataGas.meter_mechanism_code;
          const supplier_mpid = gasInformation.dataGas.current_supplier_id;
          const company_name = data_gas_supplier_name[current_supplier_id];
          // Update Electricity information state with the same values as Gas due is dual
          updateElectricityInformation({
            ...electricityInformation.MPANDetails.delete,
            MPANDetails: {
              mpan_core: '',
              meter_type,
              supplier_mpid,
              company_name
            }
          });

          updateSupplier({
            ...supplier,
            electricity_supplier: {
              supplier_id,
              meter_type,
              mpan_core: '',
              company_name
            }
          });

          updateSupplierInformation({
            ...supplierInformation,
            electricity_supplier: {
              mpan_core: '',
              meter_type,
              supplier_mpid,
              company_name
            }
          });
        }

        if ((supplier_mpid_dual === '') && (current_supplier_id_dual === '')) {
          console.log('Both are empty');
          const current_supplier_id = electricityInformation.MPANDetails.supplier_mpid;
          const meter_mechanism_code = electricityInformation.MPANDetails.meter_type;
          const company_name = data_electricity_supplier_name[supplier_mpid];
          // Update gas information state with the same values as Electricity 
          updateGasInformation({
            ...gasInformation,
            dataGas: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });

          updateSupplier({
            ...supplier,
            gas_supplier: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });

          updateSupplierInformation({
            ...supplierInformation,
            gas_supplier: {
              current_supplier_id,
              meter_mechanism_code,
              mprn: '',
              company_name
            }
          });
        }

        // Selectors
        const cb_es_1 = document.getElementById('cb_es-1');
        const cb_es_2 = document.getElementById('cb_es-2');
        const cb_es_3 = document.getElementById('cb_es-3');
        const cb_es_4 = document.getElementById('cb_es-4');
        const cb_es_5 = document.getElementById('cb_es-5');
        const cb_es_6 = document.getElementById('cb_es-6');

        //British Gas Selected
        if ((supplier_id === "BGAS") || (supplier_id === "BIZZ") || (supplier_id === "ECOA") || (supplier_id === "ENRD") || (supplier_id === "OGAS")) {
          // Activate British Gas Checkbox and border
          cb_es_1.checked = true;
          cb_es_1.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_1.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_2.checked = false;
          cb_es_3.checked = false;
          cb_es_4.checked = false;
          cb_es_5.checked = false;
          cb_es_6.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_2.parentElement.style.border = null;
          cb_es_3.parentElement.style.border = null;
          cb_es_4.parentElement.style.border = null;
          cb_es_5.parentElement.style.border = null;
          cb_es_6.parentElement.style.border = null;
          // Check Icon
          cb_es_2.parentElement.children[1].style.opacity = null;
          cb_es_3.parentElement.children[1].style.opacity = null;
          cb_es_4.parentElement.children[1].style.opacity = null;
          cb_es_5.parentElement.children[1].style.opacity = null;
          cb_es_6.parentElement.children[1].style.opacity = null;
        }

        // EDF Selected
        if ((supplier_id === "LOND") || (supplier_id === "SEEB") || (supplier_id === "SWEB")) {
          // Activate EDF Checkbox and border
          cb_es_2.checked = true;
          cb_es_2.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_2.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_1.checked = false;
          cb_es_3.checked = false;
          cb_es_4.checked = false;
          cb_es_5.checked = false;
          cb_es_6.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_1.parentElement.style.border = null;
          cb_es_3.parentElement.style.border = null;
          cb_es_4.parentElement.style.border = null;
          cb_es_5.parentElement.style.border = null;
          cb_es_6.parentElement.style.border = null;
          // Check icon
          cb_es_1.parentElement.children[1].style.opacity = null;
          cb_es_3.parentElement.children[1].style.opacity = null;
          cb_es_4.parentElement.children[1].style.opacity = null;
          cb_es_5.parentElement.children[1].style.opacity = null;
          cb_es_6.parentElement.children[1].style.opacity = null;
        }

        // EON Selected
        if ((supplier_id === "PGEN") || (supplier_id === "EELC") || (supplier_id === "EENG") || (supplier_id === "EMEB") || (supplier_id === "NORW")) {
          // Activate EON Checkbox and border
          cb_es_3.checked = true;
          cb_es_3.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_3.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_1.checked = false;
          cb_es_2.checked = false;
          cb_es_4.checked = false;
          cb_es_5.checked = false;
          cb_es_6.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_1.parentElement.style.border = null;
          cb_es_2.parentElement.style.border = null;
          cb_es_4.parentElement.style.border = null;
          cb_es_5.parentElement.style.border = null;
          cb_es_6.parentElement.style.border = null;
          // Check icon
          cb_es_1.parentElement.children[1].style.opacity = null;
          cb_es_2.parentElement.children[1].style.opacity = null;
          cb_es_4.parentElement.children[1].style.opacity = null;
          cb_es_5.parentElement.children[1].style.opacity = null;
          cb_es_6.parentElement.children[1].style.opacity = null;
        }

        // SSE Selected
        if ((supplier_id === "HYDE") || (supplier_id === "IMPO") || (supplier_id === "SOUT") || (supplier_id === "SWAE")) {
          // Activate SSE Checkbox and border
          cb_es_4.checked = true;
          cb_es_4.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_4.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_1.checked = false;
          cb_es_2.checked = false;
          cb_es_3.checked = false;
          cb_es_5.checked = false;
          cb_es_6.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_1.parentElement.style.border = null;
          cb_es_2.parentElement.style.border = null;
          cb_es_3.parentElement.style.border = null;
          cb_es_5.parentElement.style.border = null;
          cb_es_6.parentElement.style.border = null;
          // Check icon
          cb_es_1.parentElement.children[1].style.opacity = null;
          cb_es_2.parentElement.children[1].style.opacity = null;
          cb_es_3.parentElement.children[1].style.opacity = null;
          cb_es_5.parentElement.children[1].style.opacity = null;
          cb_es_6.parentElement.children[1].style.opacity = null;
        }

        // Scottish power selected
        if ((supplier_id === "MANW") || (supplier_id === "SPOW")) {
          // Activate Scottish power Checkbox and border
          cb_es_5.checked = true;
          cb_es_5.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_5.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_1.checked = false;
          cb_es_2.checked = false;
          cb_es_3.checked = false;
          cb_es_4.checked = false;
          cb_es_6.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_1.parentElement.style.border = null;
          cb_es_2.parentElement.style.border = null;
          cb_es_3.parentElement.style.border = null;
          cb_es_4.parentElement.style.border = null;
          cb_es_6.parentElement.style.border = null;
          // Check icon
          cb_es_1.parentElement.children[1].style.opacity = null;
          cb_es_2.parentElement.children[1].style.opacity = null;
          cb_es_3.parentElement.children[1].style.opacity = null;
          cb_es_4.parentElement.children[1].style.opacity = null;
          cb_es_6.parentElement.children[1].style.opacity = null;
        }

        // Npower Selected
        if ((supplier_id === "INDE") || (supplier_id === "MIDE") || (supplier_id === "NATP") || (supplier_id === "NEEB") || (supplier_id === "PSUK") || (supplier_id === "YELG")) {
          // Activate Npower Checkbox and border
          cb_es_6.checked = true;
          cb_es_6.parentElement.style.border = "0.2rem solid var(--tertiary_background)";
          cb_es_6.parentElement.children[1].style.opacity = "1";

          // Desactivate the rest of checkboxes
          cb_es_1.checked = false;
          cb_es_2.checked = false;
          cb_es_3.checked = false;
          cb_es_4.checked = false;
          cb_es_5.checked = false;

          // Desactivate the border in checkbox NOT selected
          cb_es_1.parentElement.style.border = null;
          cb_es_2.parentElement.style.border = null;
          cb_es_3.parentElement.style.border = null;
          cb_es_4.parentElement.style.border = null;
          cb_es_5.parentElement.style.border = null;
          // Check icon
          cb_es_1.parentElement.children[1].style.opacity = null;
          cb_es_2.parentElement.children[1].style.opacity = null;
          cb_es_3.parentElement.children[1].style.opacity = null;
          cb_es_4.parentElement.children[1].style.opacity = null;
          cb_es_5.parentElement.children[1].style.opacity = null;
        }
      }
    }
  }, [es_name]);

  // Adding initial customer data to firebase (Coming from MPAN/MPRN)
  useEffect(() => {

    (async () => {
      const { fuel_description } = customerInformation;

      // Company name ES
      let company_name_es = data_electricity_supplier_name;

      // Company name GS
      let company_name_gs = data_gas_supplier_name;

      // Suppplier id ES
      let supplier_id_es = electricityInformation.MPANDetails.supplier_mpid;

      // Suppplier id GS
      let supplier_id_gs = gasInformation.dataGas.current_supplier_id;

      // Firebase
      await db.collection("customers").doc(uid).set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        step: 3,
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
          company_name: supplier_id_es ? company_name_es[supplier_id_es] ? company_name_es[supplier_id_es] : '' : ''
        },
        dataGas: {
          current_supplier_id: gasInformation.dataGas.current_supplier_id ? gasInformation.dataGas.current_supplier_id : '',
          meter_mechanism_code: gasInformation.dataGas.meter_mechanism_code ? gasInformation.dataGas.meter_mechanism_code : '',
          mprn: gasInformation.dataGas.mprn ? gasInformation.dataGas.mprn : '',
          company_name: supplier_id_gs ? company_name_gs[supplier_id_gs] ? company_name_gs[supplier_id_gs] : '' : ''
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
        // supplierInformation_fb
        supplierInformation: {
          electricity_supplier: {
            mpan_core: Object.keys(supplierInformation).length > 0 ? supplierInformation.electricity_supplier.mpan_core ? supplierInformation.electricity_supplier.mpan_core : '' : '',
            meter_type: Object.keys(supplierInformation).length > 0 ? supplierInformation.electricity_supplier.meter_type ? supplierInformation.electricity_supplier.meter_type : '' : '',
            supplier_mpid: Object.keys(supplierInformation).length > 0 ? supplierInformation.electricity_supplier.supplier_mpid ? supplierInformation.electricity_supplier.supplier_mpid : '' : '',
            company_name: Object.keys(supplierInformation).length > 0 ? supplier_id_es ? company_name_es[supplier_id_es] ? company_name_es[supplier_id_es] : '' : '' : ''
          },

          gas_supplier: {
            current_supplier_id: Object.keys(supplierInformation).length > 0 ? supplierInformation.gas_supplier.current_supplier_id ? supplierInformation.gas_supplier.current_supplier_id : '' : '',
            meter_mechanism_code: Object.keys(supplierInformation).length > 0 ? supplierInformation.gas_supplier.meter_mechanism_code ? supplierInformation.gas_supplier.meter_mechanism_code : '' : '',
            mprn: Object.keys(supplierInformation).length > 0 ? supplierInformation.gas_supplier.mprn ? supplierInformation.gas_supplier.mprn : '' : '',
            company_name: Object.keys(supplierInformation).length > 0 ? supplier_id_gs ? company_name_gs[supplier_id_gs] ? company_name_gs[supplier_id_gs] : '' : '' : ''
          }
        }
      });
    })()

  }, [FormSupply]);

  return (
    <>
      {/* Dual tariff */}
      {dual_active ?
        same_supplier ?
          (
            <>
              <section className="form-supply-section">
                <div className="form-supply-container">
                  <div className="form-supply-content">
                    <div className="form-supply">
                      {/* Electricity */}
                      <div className="form-supply-cb-container" onChange={(e) => handleCheckboxES(e)}>
                        <div>
                          <h1>Who is your gas &amp; electricity supplier?</h1>
                          {es_name ? (<p>According to the national database, the customer's supplier for both gas &amp; electricity is <span>{es_name}</span>. If this is correct, please procede. If not, change the supplier manuallu below.</p>) : (<p>No records found, please select manually</p>)}
                        </div>
                        <div className="cb-row">   {/* Row one  */}
                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-1" onClick={(e) => selectOnlyThisES(e)} value="BGAS" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-1">
                              <img style={{ padding: ".6rem" }} src={BGAS_logo} />
                            </label>
                          </div>

                          <div data-cy="dualsame-edf" className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-2" onClick={(e) => selectOnlyThisES(e)} value="LOND" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-2">
                              <img src={EDF_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-3" onClick={(e) => selectOnlyThisES(e)} value="EMEB" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-3">
                              <img src={EON_logo} />
                            </label>
                          </div>
                        </div>

                        <div className="cb-row"> {/* Row two */}
                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-4" onClick={(e) => selectOnlyThisES(e)} value="HYDE" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-4">
                              <img src={SSE_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-5" onClick={(e) => selectOnlyThisES(e)} value="SPOW" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-5">
                              <img src={Scottish_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-6" onClick={(e) => selectOnlyThisES(e)} value="INDE" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-6">
                              <img style={{ paddingTop: '.2rem' }} src={Npower_logo} />
                            </label>
                          </div>
                        </div>
                      </div>

                      <h2>...or choose from the full list</h2>

                      {editES ? (
                        <div className="form-electricity-content">
                          <div className="supply-information-input">
                            <input
                              // name=""
                              value={
                                supplier_mpid === ""
                                  ? "Select"
                                  : data_electricity_supplier_name[supplier_mpid]
                              }
                              type="text"
                              disabled={editES}
                              id="selected"
                              onPointerDown={() => setFocusAnimationSupplier(!focusAnimationSupplier)}
                            />
                            <FaRegEdit className={focusAnimationSupplier ? 'edit-search-icon icon-custom animate__animated animate__headShake' : 'edit-search-icon icon-custom'} onClick={() => { updateEditES(!editES); setFocusAnimationSupplier(false) }} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                          </div>
                          <div className="idk-my-supplier-container">
                            <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                          </div>
                        </div>
                      ) : (
                        <div className="form-electricity-content">
                          <div className="supply-information-input">
                            <select
                              onChange={(e) => handleChangeES(e)}
                              value={supplier_id}
                              name="supplier_id"
                              disabled={editES}
                              id="selected"
                            >
                              <option value="">- Select - </option>
                              {data_electricity_supplier_id.map((data) => (
                                <option
                                  id={data.supplier_id}
                                  key={data.supplier_id}
                                  value={data.supplier_id}
                                >
                                  {data.company_name}
                                </option>
                              ))}
                            </select>
                            <FaRegEdit className="edit-search-icon icon-custom" onClick={() => updateEditES(!editES)} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                          </div>
                          <div className="idk-my-supplier-container">
                            <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                          </div>
                        </div>
                      )}

                      {/* Error */}
                      {error_electricity_supplier ? (
                        <div className="error-flex">
                          <Error message={"Please select a supplier"} />
                        </div>
                      ) : null}

                      {/* Meter Type */}
                      <div className="form-electricity-meter-content">
                        <div className="form-electricity-meter-heading">
                          <h1>Meter Type</h1>
                          <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                            <FaTachometerAlt className="form-electricity-meter-icon" />
                          </IconContext.Provider>
                        </div>
                        <div className="form-electricity-meter">
                          <select
                            className="supply-information-input"
                            disabled={editMTES}
                            onChange={(e) => handleChangeMTES(e)}
                            value={electricity_meter_supported}
                            id="meter_type_electricity"
                            data-cy="dualsame-select-mt"
                            onPointerDown={() => editMTES ? setFocusAnimationMeter(!focusAnimationMeter) : null}
                          // onPointerDown={() => setFocusAnimationMeter(!focusAnimationMeter)}
                          >
                            <option value="">- Select - </option>
                            <option value="K">Prepayment</option>
                            <option value="N">Credit</option>
                            <option value="NSS">Non-SMETS smart</option>
                            <option value="S">Smart</option>
                            <option value="S1">SMETS1</option>
                            <option value="S2">SMETS2</option>
                            <option value="NOT">Not supported</option>
                          </select>

                          <FaRegEdit data-cy="dualsame-mt-edit" className={focusAnimationMeter ? 'edit-search-icon animate__animated animate__headShake' : 'edit-search-icon'} onClick={() => updateEditMTES(!editMTES)} />
                          {/* <i data-cy="dualsame-mt-edit" className="edit-icon far fa-edit" onClick={() => updateEditMTES(!editMTES)}></i> */}
                        </div>
                      </div>

                      {/* Error */}
                      {error_electricity_meter_type ?
                        (
                          <div className="error-flex ">
                            <Error message={"Please select a meter type"} />
                          </div>
                        )
                        :
                        null
                      }

                      {/* Show Electricity payment input */}
                      {payment_electricity_input ? (
                        <div className="form-electricity-payment-content">
                          <div className="form-electricity-payment-heading">
                            <h1>Payment type</h1>
                            <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                              <FaMoneyCheckAlt className="form-electricity-payment-icon" />
                            </IconContext.Provider>
                          </div>
                          <select
                            className="supply-information-input"
                            // disabled={editMTES}
                            onChange={(e) => handleChangePTES(e)}
                            id="payment_type_electricity"
                            data-cy="dualsame-select-pt"
                          >
                            <option value="">- Select - </option>
                            {/* Prepayment */}
                            {electricity_meter_supported === "K" ? (
                              <option value="PAYG">Pay as you go</option>
                            )
                              :
                              null
                            }
                            {/* Standar */}
                            {electricity_meter_supported === "N" ?
                              (
                                <>
                                  <option value="MDD">Monthly direct debit</option>
                                  <option value="QDD">
                                    Quarterly direct debit
                                  </option>
                                  <option value="MPB">
                                    Monthly payment on receipt of bill
                                  </option>
                                  <option value="QPB">
                                    Quarterly payment on receipt of bill
                                  </option>
                                </>
                              )
                              :
                              null
                            }
                            {/* Smart */}
                            {electricity_meter_supported === "S" || electricity_meter_supported === "S1" || electricity_meter_supported.startsWith("S2") || electricity_meter_supported === "NSS" ?
                              (
                                <>
                                  <option value="PAYG">Pay as you go</option>
                                  <option value="MDD">Monthly direct debit</option>
                                  <option value="QDD">
                                    Quarterly direct debit
                                  </option>
                                  <option value="MPB">
                                    Monthly payment on receipt of bill
                                  </option>
                                  <option value="QPB">
                                    Quarterly payment on receipt of bill
                                  </option>
                                </>
                              )
                              :
                              null
                            }
                            {/* Not available */}
                            {/* {electricity_meter_supported === "NOT" ?
                            (
                              <>
                                <option value="NA">Not available</option>
                              </>
                            )
                            :
                            null
                          } */}
                          </select>
                        </div>
                      )
                        :
                        null
                      }

                      {/* Error */}
                      {error_electricity_payment ?
                        (
                          <div className="error-flex ">
                            <Error message={"Please select a payment method"} />
                          </div>
                        )
                        :
                        null
                      }
                    </div>

                    {/* Buttons */}
                    <div className="form-supply-btn-container">
                      <button className="form-supply-btn btn-back" onClick={(e) => goToFormMpanMprn(e)}>
                        <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                          <IoMdArrowDropleft className="icon-back" />
                        </IconContext.Provider>
                        Go back
                      </button>

                      <button data-cy="dualsame-continue" className="form-supply-btn btn-next" onClick={(e) => goToE7(e)}>
                        Continue

                        <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                          <IoMdArrowDropright className="icon-next" />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>

                  {showScript ?
                    (
                      <div className="helper-address">
                        <div className="script-address">
                          <FormScript step={5} />
                        </div>

                        <div className="assistant-address-custom">
                          <FormAssistant tips={4} />
                        </div>
                      </div>
                    )
                    :
                    <div style={{ width: '100%' }}>
                      <div className="assistant-address">
                        <FormAssistant tips={4} />
                      </div>
                    </div>
                  }
                </div>
              </section>
            </>
          )
          :
          (
            <>
              <section className="form-supply-section">
                <div className="form-supply-container">
                  <div className="form-supply-content">
                    <div className="form-supply">
                      {/* Electricity */}
                      <div className="form-supply-cb-container" onChange={(e) => handleCheckboxES(e)}>
                        <div>
                          <h1>Who is your electricity supplier?</h1>
                          {es_name ? (<p>According to the national database, the customer's electricity supplier  is <span>{es_name}</span>. If this is correct, please procede. If not, change the supplier manuallu below.</p>) : (<p>No records found, please select manually</p>)}
                        </div>
                        <div className="cb-row">   {/* Row one  */}
                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-1" onClick={(e) => selectOnlyThisES(e)} value="BGAS" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-1">
                              <img style={{ padding: ".6rem" }} src={BGAS_logo} />
                            </label>
                          </div>

                          <div data-cy="dualelec-edf" className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-2" onClick={(e) => selectOnlyThisES(e)} value="LOND" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-2">
                              <img src={EDF_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-3" onClick={(e) => selectOnlyThisES(e)} value="EMEB" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-3">
                              <img src={EON_logo} />
                            </label>
                          </div>
                        </div>

                        <div className="cb-row"> {/* Row two */}
                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-4" onClick={(e) => selectOnlyThisES(e)} value="HYDE" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-4">
                              <img src={SSE_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-5" onClick={(e) => selectOnlyThisES(e)} value="SPOW" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-5">
                              <img src={Scottish_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_es-6" onClick={(e) => selectOnlyThisES(e)} value="INDE" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_es-6">
                              <img style={{ paddingTop: '.2rem' }} src={Npower_logo} />
                            </label>
                          </div>
                        </div>
                      </div>

                      <h2>...or choose from the full list</h2>

                      {editES ? (
                        <div className="form-electricity-content">
                          <div className="supply-information-input">
                            <input
                              // name=""
                              value={
                                supplier_mpid === ""
                                  ? "Select"
                                  : data_electricity_supplier_name[supplier_mpid]
                              }
                              type="text"
                              disabled={editES}
                              id="selected"
                              onPointerDown={() => setFocusAnimationSupplier(!focusAnimationSupplier)}
                            />
                            <FaRegEdit className={focusAnimationSupplier ? 'edit-search-icon icon-custom animate__animated animate__headShake' : 'edit-search-icon icon-custom'} onClick={() => { updateEditES(!editES); setFocusAnimationSupplier(false) }} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                          </div>
                          <div className="idk-my-supplier-container">
                            <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                          </div>
                        </div>
                      ) : (
                        <div className="form-electricity-content">
                          <div className="supply-information-input">
                            <select
                              onChange={(e) => handleChangeES(e)}
                              value={supplier_id}
                              name="supplier_id"
                              disabled={editES}
                              id="selected"
                            >
                              <option value="">- Select - </option>
                              {data_electricity_supplier_id.map((data) => (
                                <option
                                  id={data.supplier_id}
                                  key={data.supplier_id}
                                  value={data.supplier_id}
                                >
                                  {data.company_name}
                                </option>
                              ))}
                            </select>
                            <FaRegEdit className="edit-search-icon icon-custom" onClick={() => updateEditES(!editES)} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                          </div>
                          <div className="idk-my-supplier-container">
                            <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                          </div>
                        </div>
                      )}

                      {/* Error */}
                      {error_electricity_supplier ? (
                        <div className="error-flex">
                          <Error message={"Please select a supplier"} />
                        </div>
                      ) : null}

                      {/* Meter Type */}
                      <div className="form-electricity-meter-content">
                        <div className="form-electricity-meter-heading">
                          <h1>Meter Type</h1>
                          <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                            <FaTachometerAlt className="form-electricity-meter-icon" />
                          </IconContext.Provider>
                        </div>
                        <div className="form-electricity-meter">
                          <select
                            className="supply-information-input"
                            disabled={editMTES}
                            onChange={(e) => handleChangeMTES(e)}
                            value={electricity_meter_supported}
                            id="meter_type_electricity"
                            data-cy="dualdi-select-mt-es"
                            onPointerDown={() => editMTES ? setFocusAnimationMeter(!focusAnimationMeter) : null}
                          >
                            <option value="">- Select - </option>
                            <option value="K">Prepayment</option>
                            <option value="N">Credit</option>
                            <option value="NSS">Non-SMETS smart</option>
                            <option value="S">Smart</option>
                            <option value="S1">SMETS1</option>
                            <option value="S2">SMETS2</option>
                            <option value="NOT">Not supported</option>
                          </select>

                          <FaRegEdit data-cy="dualdi-mt-edit-es" className={focusAnimationMeter ? 'edit-search-icon animate__animated animate__headShake' : 'edit-search-icon'} onClick={() => updateEditMTES(!editMTES)} />
                          {/* <i data-cy="dualdi-mt-edit-es" className="edit-icon far fa-edit" onClick={() => updateEditMTES(!editMTES)}></i> */}
                        </div>
                      </div>

                      {/* Error */}
                      {error_electricity_meter_type ?
                        (
                          <div className="error-flex ">
                            <Error message={"Please select a meter type"} />
                          </div>
                        )
                        :
                        null
                      }

                      {/* Show Electricity payment input */}
                      {payment_electricity_input ? (
                        <div className="form-electricity-payment-content">
                          <div className="form-electricity-payment-heading">
                            <h1>Payment type</h1>
                            <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                              <FaMoneyCheckAlt className="form-electricity-payment-icon" />
                            </IconContext.Provider>
                          </div>
                          <select
                            className="supply-information-input"
                            // disabled={editMTES}
                            onChange={(e) => handleChangePTES(e)}
                            id="payment_type_electricity"
                            data-cy="dualdi-select-pt-es"
                          >
                            <option value="">- Select - </option>
                            {/* Prepayment */}
                            {electricity_meter_supported === "K" ? (
                              <option value="PAYG">Pay as you go</option>
                            )
                              :
                              null
                            }
                            {/* Standar */}
                            {electricity_meter_supported === "N" ?
                              (
                                <>
                                  <option value="MDD">Monthly direct debit</option>
                                  <option value="QDD">
                                    Quarterly direct debit
                                  </option>
                                  <option value="MPB">
                                    Monthly payment on receipt of bill
                                  </option>
                                  <option value="QPB">
                                    Quarterly payment on receipt of bill
                                  </option>
                                </>
                              )
                              :
                              null
                            }
                            {/* Smart */}
                            {electricity_meter_supported === "S" || electricity_meter_supported === "S1" || electricity_meter_supported.startsWith("S2") || electricity_meter_supported === "NSS" ?
                              (
                                <>
                                  <option value="PAYG">Pay as you go</option>
                                  <option value="MDD">Monthly direct debit</option>
                                  <option value="QDD">
                                    Quarterly direct debit
                                  </option>
                                  <option value="MPB">
                                    Monthly payment on receipt of bill
                                  </option>
                                  <option value="QPB">
                                    Quarterly payment on receipt of bill
                                  </option>
                                </>
                              )
                              :
                              null
                            }
                            {/* Not available */}
                            {/* {electricity_meter_supported === "NOT" ?
                            (
                              <>
                                <option value="NA">Not available</option>
                              </>
                            )
                            :
                            null
                          } */}
                          </select>
                        </div>
                      )
                        :
                        null
                      }

                      {/* Error */}
                      {error_electricity_payment ?
                        (
                          <div className="error-flex ">
                            <Error message={"Please select a payment method"} />
                          </div>
                        )
                        :
                        null
                      }

                      <hr /> {/* Supplier divider */}

                      {/* Gas */}
                      <div className="form-supply-cb-container" onChange={(e) => handleCheckboxGS(e)}>
                        <div>
                          <h1>Who is your gas supplier?</h1>
                          {gs_name ? (<p>According to the national database, the customer's gas supplier  is <span>{gs_name}</span>. If this is correct, please procede. If not, change the supplier manuallu below.</p>) : (<p>No records found, please select manually</p>)}
                        </div>
                        <div className="cb-row">   {/* Row one  */}
                          <div data-cy="dualgas-british" className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-1" onClick={(e) => selectOnlyThisGS(e)} value="BGT" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-1">
                              <img style={{ padding: ".6rem" }} src={BGAS_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-2" onClick={(e) => selectOnlyThisGS(e)} value="LED" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-2">
                              <img src={EDF_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-3" onClick={(e) => selectOnlyThisGS(e)} value="SGL" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-3">
                              <img src={EON_logo} />
                            </label>
                          </div>
                        </div>

                        <div className="cb-row"> {/* Row two */}
                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-4" onClick={(e) => selectOnlyThisGS(e)} value="ATL" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-4">
                              <img src={SSE_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-5" onClick={(e) => selectOnlyThisGS(e)} value="SCT" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-5">
                              <img src={Scottish_logo} />
                            </label>
                          </div>

                          <div className="form-supply-cb-content">
                            <input className="form-supply-input" type="checkbox" id="cb_gs-6" onClick={(e) => selectOnlyThisGS(e)} value="NRZ" />
                            <div className="form-supply-cb-container-icon" id="cb-icon">
                              <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                                <FaCheckSquare className="cb-icon" />
                              </IconContext.Provider>
                            </div>

                            <label className="form-supply-cb-label" htmlFor="cb_gs-6">
                              <img style={{ paddingTop: '.2rem' }} src={Npower_logo} />
                            </label>
                          </div>
                        </div>
                      </div>

                      <h2>...or choose from the full list</h2>

                      {editGS ? (
                        <div className="form-gas-content">
                          <div className="supply-information-input">
                            <input
                              // name=""
                              value={
                                current_supplier_id === ""
                                  ? "Select"
                                  : data_gas_supplier_name[current_supplier_id]
                              }
                              type="text"
                              disabled={editGS}
                              id="gas_selected"
                              onPointerDown={() => setFocusAnimationSupplier(!focusAnimationSupplier)}
                            />
                            <FaRegEdit className={focusAnimationSupplier ? 'edit-search-icon icon-custom animate__animated animate__headShake' : 'edit-search-icon icon-custom'} onClick={() => { updateEditGS(!editGS); setFocusAnimationSupplier(false) }} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditGS(!editGS)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchGS(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchGS(e)} />
                          </div>
                          <button className="idk-my-supplier" onClick={(e) => handleClickGS(e)}>"I don’t know my supplier"</button>
                        </div>
                      ) : (
                        <div className="form-gas-content">
                          <div className="supply-information-input">
                            <select
                              onChange={(e) => handleChangeGS(e)}
                              value={current_supplier_id}
                              name="current_supplier_id"
                              disabled={editGS}
                              id="gas_selected"
                            >
                              <option value="">- Select - </option>
                              {data_gas_supplier_id.map((data) => (
                                <option
                                  id={data.supplier_id}
                                  key={data.supplier_id}
                                  value={data.supplier_id}
                                >
                                  {data.company_name}
                                </option>
                              ))}
                            </select>
                            <FaRegEdit className="edit-search-icon icon-custom" onClick={() => updateEditGS(!editGS)} />
                            {/* <i className="edit-icon far fa-edit" onClick={() => updateEditGS(!editGS)}></i> */}
                            {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchGS(e)}></i> */}
                            <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchGS(e)} />
                          </div>
                          <button className="idk-my-supplier" onClick={(e) => handleClickGS(e)}>"I don’t know my supplier"</button>
                        </div>
                      )}

                      {/* Error */}
                      {error_gas_supplier ? (
                        <div className="error-flex">
                          <Error message={"Please select a supplier"} />
                        </div>
                      ) : null}

                      {/* Meter type */}
                      <div className="form-gas-meter-content">
                        <div className="form-gas-meter-heading">
                          <h1>Meter Type</h1>
                          <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                            <FaTachometerAlt className="form-gas-meter-icon" />
                          </IconContext.Provider>
                        </div>
                        <div className="form-gas-meter">
                          <select
                            className="supply-information-input"
                            disabled={editMTGS}
                            onChange={(e) => handleChangeMTGS(e)}
                            value={gas_meter_supported}
                            id="meter_type_gas"
                            data-cy="dualdi-select-mt-gs"
                            onPointerDown={() => editMTGS ? setFocusAnimationMeter(!focusAnimationMeter) : null}
                          >
                            <option value="">- Select - </option>
                            <option value="PP">Prepayment</option>
                            <option value="CR">Credit</option>
                            <option value="NS">Non-SMETS smart</option>
                            <option value="S1">SMETS1</option>
                            <option value="S2">SMETS2</option>
                            <option value="NOT">Not supported</option>
                          </select>
                          <FaRegEdit data-cy="dualdi-mt-edit-gs" className={focusAnimationMeter ? 'edit-search-icon animate__animated animate__headShake' : 'edit-search-icon'} onClick={() => updateEditMTGS(!editMTGS)} />
                          {/* <i data-cy="dualdi-mt-edit-gs" className="edit-icon far fa-edit" onClick={() => updateEditMTGS(!editMTGS)}></i> */}
                        </div>
                      </div>

                      {/* Error */}
                      {error_gas_meter_type ? (
                        <div className="error-flex">
                          <Error message={"Please select a meter type"} />
                        </div>
                      ) : null}

                      {/* Show Gas payment input */}
                      {payment_gas_input ? (
                        <div className="form-gas-payment-content">
                          <div className="form-gas-payment-heading">
                            <h1>Payment Type</h1>
                            <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                              <FaMoneyCheckAlt className="form-gas-payment-icon" />
                            </IconContext.Provider>
                          </div>
                          <select
                            className="supply-information-input"
                            onChange={(e) => handleChangePTGS(e)}
                            id="payment_type_gas"
                            data-cy="dualdi-select-pt-gs"
                          >
                            <option value="">- Select - </option>
                            {/* Prepayment */}
                            {gas_meter_supported === "PP" ? (
                              <option value="PAYG">Pay as you go</option>
                            )
                              :
                              null
                            }
                            {/* Standar */}
                            {gas_meter_supported === "CR" ? (
                              <>
                                <option value="MDD">Monthly direct debit</option>
                                <option value="QDD">
                                  Quarterly direct debit
                                </option>
                                <option value="MPB">
                                  Monthly payment on receipt of bill
                                </option>
                                <option value="QPB">
                                  Quarterly payment on receipt of bill
                                </option>
                              </>
                            )
                              :
                              null
                            }
                            {/* Smart */}
                            {gas_meter_supported === "S" || gas_meter_supported === "S1" || gas_meter_supported.startsWith("S2") || gas_meter_supported === "NS" ? (
                              <>
                                <option value="PAYG">Pay as you go</option>
                                <option value="MDD">Monthly direct debit</option>
                                <option value="QDD">
                                  Quarterly direct debit
                                </option>
                                <option value="MPB">
                                  Monthly payment on receipt of bill
                                </option>
                                <option value="QPB">
                                  Quarterly payment on receipt of bill
                                </option>
                              </>
                            )
                              :
                              null
                            }
                            {/* Not available */}
                            {/* {gas_meter_supported === "NOT" ?
                                  (
                                    <>
                                      <option value="NA">Not available</option>
                                    </>
                                  )
                                  :
                                  null
                                } */}
                          </select>
                        </div>
                      )
                        :
                        null
                      }

                      {/* Error */}
                      {error_gas_payment ?
                        (
                          <div className="error-flex ">
                            <Error message={"Please select a payment method"} />
                          </div>
                        )
                        :
                        null
                      }
                    </div>


                    {/* Buttons */}
                    <div className="form-supply-btn-container">
                      <button className="form-supply-btn btn-back" onClick={(e) => goToFormMpanMprn(e)}>
                        <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                          <IoMdArrowDropleft className="icon-back" />
                        </IconContext.Provider>
                        Go back
                      </button>

                      <button data-cy="dualdi-continue" className="form-supply-btn btn-next" onClick={(e) => goToE7(e)}>
                        Continue

                        <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                          <IoMdArrowDropright className="icon-next" />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>

                  {showScript ?
                    (
                      <div className="helper-address">
                        <div className="script-address">
                          <FormScript step={5} />
                        </div>

                        <div className="assistant-address-custom">
                          <FormAssistant tips={4} />
                        </div>
                      </div>
                    )
                    :
                    <div style={{ width: '100%' }}>
                      <div className="assistant-address">
                        <FormAssistant tips={4} />
                      </div>
                    </div>
                  }
                </div>
              </section>
            </>
          )
        :
        null
      }

      {/* Elec only */}
      {elec_only ?
        (
          <>
            <section className="form-supply-section">
              <div className="form-supply-container">
                <div className="form-supply-content">
                  <div className="form-supply">
                    {/* Electricity */}
                    <div className="form-supply-cb-container" onChange={(e) => handleCheckboxES(e)}>
                      <div>
                        <h1>Who is your electricity supplier?</h1>
                        {es_name ? (<p>According to the national database, the customer's electricity supplier  is <span>{es_name}</span>. If this is correct, please procede. If not, change the supplier manuallu below.</p>) : (<p>No records found, please select manually</p>)}
                      </div>
                      <div className="cb-row">   {/* Row one  */}
                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_es-1" onClick={(e) => selectOnlyThisES(e)} value="BGAS" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-1">
                            <img style={{ padding: ".6rem" }} src={BGAS_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content" data-cy="eleconly-edf">
                          <input className="form-supply-input" type="checkbox" id="cb_es-2" onClick={(e) => selectOnlyThisES(e)} value="LOND" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-2">
                            <img src={EDF_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_es-3" onClick={(e) => selectOnlyThisES(e)} value="EMEB" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-3">
                            <img src={EON_logo} />
                          </label>
                        </div>
                      </div>

                      <div className="cb-row"> {/* Row two */}
                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_es-4" onClick={(e) => selectOnlyThisES(e)} value="HYDE" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-4">
                            <img src={SSE_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_es-5" onClick={(e) => selectOnlyThisES(e)} value="SPOW" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-5">
                            <img src={Scottish_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_es-6" onClick={(e) => selectOnlyThisES(e)} value="INDE" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_es-6">
                            <img style={{ paddingTop: '.2rem' }} src={Npower_logo} />
                          </label>
                        </div>
                      </div>
                    </div>

                    <h2>...or choose from the full list</h2>

                    {editES ? (
                      <div className="form-electricity-content">
                        <div className="supply-information-input">
                          <input
                            // name=""
                            value={
                              supplier_mpid === ""
                                ? "Select"
                                : data_electricity_supplier_name[supplier_mpid]
                                // : data_electricity_supplier_name[supplier_mpid] || data_custom_es.filter(data => data.supplier_id === supplier_id)[0].company_name  --> To use if the data comming from API's are duplicated, for the future. Need to be integrated properly with another changes - lolo
                            }
                            type="text"
                            disabled={editES}
                            id="selected"
                            onPointerDown={() => setFocusAnimationSupplier(!focusAnimationSupplier)}
                          />
                          <FaRegEdit className={focusAnimationSupplier ? 'edit-search-icon icon-custom animate__animated animate__headShake' : 'edit-search-icon icon-custom'} onClick={() => { updateEditES(!editES); setFocusAnimationSupplier(false); }} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                          {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                          <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                        </div>
                        <div className="idk-my-supplier-container">
                          <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                        </div>
                      </div>
                    ) : (
                      <div className="form-electricity-content">
                        <div className="supply-information-input">
                          <select
                            onChange={(e) => handleChangeES(e)}
                            value={supplier_id}
                            name="supplier_id"
                            disabled={editES}
                            id="selected"
                          >
                            <option value="">- Select - </option>
                            {data_custom_es.map((data) => (
                              <option
                                id={data.supplier_id}
                                key={data.supplier_id}
                                value={data.supplier_id}
                              >
                                {data.company_name}
                              </option>
                            ))}
                          </select>
                          <FaRegEdit className="edit-search-icon icon-custom" onClick={() => updateEditES(!editES)} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditES(!editES)}></i> */}
                          {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchES(e)}></i> */}
                          <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchES(e)} />
                        </div>
                        <div className="idk-my-supplier-container">
                          <button className="idk-my-supplier" onClick={(e) => handleClickES(e)}>"I don’t know my supplier"</button>
                        </div>
                      </div>
                    )}

                    {/* Error */}
                    {error_electricity_supplier ? (
                      <div className="error-flex">
                        <Error message={"Please select a supplier"} />
                      </div>
                    ) : null}

                    {/* Meter Type */}
                    <div className="form-electricity-meter-content">
                      <div className="form-electricity-meter-heading">
                        <h1>Meter Type</h1>
                        <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                          <FaTachometerAlt className="form-electricity-meter-icon" />
                        </IconContext.Provider>
                      </div>
                      <div className="form-electricity-meter">
                        <select
                          className="supply-information-input"
                          disabled={editMTES}
                          onChange={(e) => handleChangeMTES(e)}
                          value={electricity_meter_supported}
                          id="meter_type_electricity"
                          data-cy="eleconly-select-mt"
                          onPointerDown={() => editMTES ? setFocusAnimationMeter(!focusAnimationMeter) : null}
                        >
                          <option value="">- Select - </option>
                          <option value="K">Prepayment</option>
                          <option value="N">Credit</option>
                          <option value="NSS">Non-SMETS smart</option>
                          <option value="S">Smart</option>
                          <option value="S1">SMETS1</option>
                          <option value="S2">SMETS2</option>
                          <option value="NOT">Not supported</option>
                        </select>

                        <FaRegEdit className={focusAnimationMeter ? 'edit-search-icon animate__animated animate__headShake' : 'edit-search-icon'} onClick={() => updateEditMTES(!editMTES)} data-cy="eleconly-mt-edit" />
                        {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMTES(!editMTES)} data-cy="eleconly-mt-edit"></i> */}
                      </div>
                    </div>

                    {/* Error */}
                    {error_electricity_meter_type ?
                      (
                        <div className="error-flex ">
                          <Error message={"Please select a meter type"} />
                        </div>
                      )
                      :
                      null
                    }

                    {/* Show Electricity payment input */}
                    {payment_electricity_input ? (
                      <div className="form-electricity-payment-content">
                        <div className="form-electricity-payment-heading">
                          <h1>Payment type</h1>
                          <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                            <FaMoneyCheckAlt className="form-electricity-payment-icon" />
                          </IconContext.Provider>
                        </div>
                        <select
                          className="supply-information-input"
                          // disabled={editMTES}
                          onChange={(e) => handleChangePTES(e)}
                          id="payment_type_electricity"
                          data-cy="eleconly-select-pt"
                        >
                          <option value="">- Select - </option>
                          {/* Prepayment */}
                          {electricity_meter_supported === "K" ? (
                            <option value="PAYG">Pay as you go</option>
                          )
                            :
                            null
                          }
                          {/* Standar */}
                          {electricity_meter_supported === "N" ?
                            (
                              <>
                                <option value="MDD">Monthly direct debit</option>
                                <option value="QDD">
                                  Quarterly direct debit
                                </option>
                                <option value="MPB">
                                  Monthly payment on receipt of bill
                                </option>
                                <option value="QPB">
                                  Quarterly payment on receipt of bill
                                </option>
                              </>
                            )
                            :
                            null
                          }
                          {/* Smart */}
                          {electricity_meter_supported === "S" || electricity_meter_supported === "S1" || electricity_meter_supported.startsWith("S2") || electricity_meter_supported === "NSS" ?
                            (
                              <>
                                <option value="PAYG">Pay as you go</option>
                                <option value="MDD">Monthly direct debit</option>
                                <option value="QDD">
                                  Quarterly direct debit
                                </option>
                                <option value="MPB">
                                  Monthly payment on receipt of bill
                                </option>
                                <option value="QPB">
                                  Quarterly payment on receipt of bill
                                </option>
                              </>
                            )
                            :
                            null
                          }
                          {/* Not available */}
                          {/* {electricity_meter_supported === "NOT" ?
                            (
                              <>
                                <option value="NA">Not available</option>
                              </>
                            )
                            :
                            null
                          } */}
                        </select>
                        {/* <i
                          style={{ color: "transparent", cursor: "auto" }}
                          className="edit-icon far fa-edit"
                        ></i> */}
                      </div>
                    )
                      :
                      null
                    }

                    {/* Error */}
                    {error_electricity_payment ?
                      (
                        <div className="error-flex ">
                          <Error message={"Please select a payment method"} />
                        </div>
                      )
                      :
                      null
                    }
                  </div>

                  {/* Buttons */}
                  <div className="form-supply-btn-container">
                    <button className="form-supply-btn btn-back" onClick={(e) => goToFormMpanMprn(e)}>
                      <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                        <IoMdArrowDropleft className="icon-back" />
                      </IconContext.Provider>
                      Go back
                    </button>

                    <button data-cy="eleconly-continue" className="form-supply-btn btn-next" onClick={(e) => goToE7(e)}>
                      Continue

                      <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                        <IoMdArrowDropright className="icon-next" />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>

                {showScript ?
                  (
                    <div className="helper-address">
                      <div className="script-address">
                        <FormScript step={5} />
                      </div>

                      <div className="assistant-address-custom">
                        <FormAssistant tips={4} />
                      </div>
                    </div>
                  )
                  :
                  <div style={{ width: '100%' }}>
                    <div className="assistant-address">
                      <FormAssistant tips={4} />
                    </div>
                  </div>
                }
              </div>
            </section>
          </>
        )
        :
        null
      }

      {/* Gas only */}
      {gas_only ?
        (
          <>
            <section className="form-supply-section">
              <div className="form-supply-container">
                <div className="form-supply-content">
                  <div className="form-supply">
                    {/* Gas */}
                    <div className="form-supply-cb-container" onChange={(e) => handleCheckboxGS(e)}>
                      <div>
                        <h1>Who is your gas supplier?</h1>
                        {gs_name ? (<p>According to the national database, the customer's gas supplier  is <span>{gs_name}</span>. If this is correct, please procede. If not, change the supplier manuallu below.</p>) : (<p>No records found, please select manually</p>)}
                      </div>
                      <div className="cb-row">   {/* Row one  */}
                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-1" onClick={(e) => selectOnlyThisGS(e)} value="BGT" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-1">
                            <img style={{ padding: ".6rem" }} src={BGAS_logo} />
                          </label>
                        </div>

                        <div data-cy="gasonly-edf" className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-2" onClick={(e) => selectOnlyThisGS(e)} value="LED" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-2">
                            <img src={EDF_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-3" onClick={(e) => selectOnlyThisGS(e)} value="SGL" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-3">
                            <img src={EON_logo} />
                          </label>
                        </div>
                      </div>

                      <div className="cb-row"> {/* Row two */}
                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-4" onClick={(e) => selectOnlyThisGS(e)} value="ATL" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-4">
                            <img src={SSE_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-5" onClick={(e) => selectOnlyThisGS(e)} value="SCT" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-5">
                            <img src={Scottish_logo} />
                          </label>
                        </div>

                        <div className="form-supply-cb-content">
                          <input className="form-supply-input" type="checkbox" id="cb_gs-6" onClick={(e) => selectOnlyThisGS(e)} value="NRZ" />
                          <div className="form-supply-cb-container-icon" id="cb-icon">
                            <IconContext.Provider value={{ color: '#D338AE', size: '20px' }}>
                              <FaCheckSquare className="cb-icon" />
                            </IconContext.Provider>
                          </div>

                          <label className="form-supply-cb-label" htmlFor="cb_gs-6">
                            <img style={{ paddingTop: '.2rem' }} src={Npower_logo} />
                          </label>
                        </div>
                      </div>
                    </div>

                    <h2>...or choose from the full list</h2>

                    {editGS ? (
                      <div className="form-gas-content">
                        <div className="supply-information-input">
                          <input
                            // name=""
                            value={
                              current_supplier_id === ""
                                ? "Select"
                                : data_gas_supplier_name[current_supplier_id]
                            }
                            type="text"
                            disabled={editGS}
                            id="gas_selected"
                            onPointerDown={() => setFocusAnimationSupplier(!focusAnimationSupplier)}
                          />
                          <FaRegEdit className={focusAnimationSupplier ? 'edit-search-icon icon-custom animate__animated animate__headShake' : 'edit-search-icon icon-custom'} onClick={() => { updateEditGS(!editGS); setFocusAnimationSupplier(false) }} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditGS(!editGS)}></i> */}
                          {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchGS(e)}></i> */}
                          <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchGS(e)} />
                        </div>
                        <button className="idk-my-supplier" onClick={(e) => handleClickGS(e)}>"I don’t know my supplier"</button>
                      </div>
                    ) : (
                      <div className="form-gas-content">
                        <div className="supply-information-input">
                          <select
                            onChange={(e) => handleChangeGS(e)}
                            value={current_supplier_id}
                            name="current_supplier_id"
                            disabled={editGS}
                            id="gas_selected"
                          >
                            <option value="">- Select - </option>
                            {data_gas_supplier_id.map((data) => (
                              <option
                                id={data.supplier_id}
                                key={data.supplier_id}
                                value={data.supplier_id}
                              >
                                {data.company_name}
                              </option>
                            ))}
                          </select>
                          <FaRegEdit className="edit-search-icon icon-custom" onClick={() => updateEditGS(!editGS)} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditGS(!editGS)}></i> */}
                          {/* <i className="edit-icon fas fa-search" onClick={(e) => handleSearchGS(e)}></i> */}
                          <FaSearch className="edit-search-icon icon-custom" onClick={(e) => handleSearchGS(e)} />
                        </div>
                        <button className="idk-my-supplier" onClick={(e) => handleClickGS(e)}>"I don’t know my supplier"</button>
                      </div>
                    )}

                    {/* Error */}
                    {error_gas_supplier ? (
                      <div className="error-flex">
                        <Error message={"Please select a supplier"} />
                      </div>
                    ) : null}

                    {/* Meter type */}
                    <div className="form-gas-meter-content">
                      <div className="form-gas-meter-heading">
                        <h1>Meter Type</h1>
                        <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                          <FaTachometerAlt className="form-gas-meter-icon" />
                        </IconContext.Provider>
                      </div>
                      <div className="form-gas-meter">
                        <select
                          className="supply-information-input"
                          disabled={editMTGS}
                          onChange={(e) => handleChangeMTGS(e)}
                          value={gas_meter_supported}
                          id="meter_type_gas"
                          data-cy="gasonly-select-mt"
                          onPointerDown={() => editMTGS ? setFocusAnimationMeter(!focusAnimationMeter) : null}
                        >
                          <option value="">- Select - </option>
                          <option value="PP">Prepayment</option>
                          <option value="CR">Credit</option>
                          <option value="NS">Non-SMETS smart</option>
                          <option value="S1">SMETS1</option>
                          <option value="S2">SMETS2</option>
                          <option value="NOT">Not supported</option>
                        </select>
                        <FaRegEdit data-cy="gasonly-mt-edit" className={focusAnimationMeter ? 'edit-search-icon animate__animated animate__headShake' : 'edit-search-icon'} onClick={() => updateEditMTGS(!editMTGS)} />
                        {/* <i data-cy="gasonly-mt-edit" className="edit-icon far fa-edit" onClick={() => updateEditMTGS(!editMTGS)}></i> */}
                      </div>
                    </div>

                    {/* Error */}
                    {error_gas_meter_type ? (
                      <div className="error-flex">
                        <Error message={"Please select a meter type"} />
                      </div>
                    ) : null}

                    {/* Show Gas payment input */}
                    {payment_gas_input ? (
                      <div className="form-gas-payment-content">
                        <div className="form-gas-payment-heading">
                          <h1>Payment Type</h1>
                          <IconContext.Provider value={{ color: '#31145B', size: '40px' }}>
                            <FaMoneyCheckAlt className="form-gas-payment-icon" />
                          </IconContext.Provider>
                        </div>
                        <select
                          className="supply-information-input"
                          onChange={(e) => handleChangePTGS(e)}
                          id="payment_type_gas"
                          data-cy="gasonly-select-pt"
                        >
                          <option value="">- Select - </option>
                          {/* Prepayment */}
                          {gas_meter_supported === "PP" ? (
                            <option value="PAYG">Pay as you go</option>
                          )
                            :
                            null
                          }
                          {/* Standar */}
                          {gas_meter_supported === "CR" ? (
                            <>
                              <option value="MDD">Monthly direct debit</option>
                              <option value="QDD">
                                Quarterly direct debit
                              </option>
                              <option value="MPB">
                                Monthly payment on receipt of bill
                              </option>
                              <option value="QPB">
                                Quarterly payment on receipt of bill
                              </option>
                            </>
                          )
                            :
                            null
                          }
                          {/* Smart */}
                          {gas_meter_supported === "S" || gas_meter_supported === "S1" || gas_meter_supported.startsWith("S2") || gas_meter_supported === "NS" ? (
                            <>
                              <option value="PAYG">Pay as you go</option>
                              <option value="MDD">Monthly direct debit</option>
                              <option value="QDD">
                                Quarterly direct debit
                              </option>
                              <option value="MPB">
                                Monthly payment on receipt of bill
                              </option>
                              <option value="QPB">
                                Quarterly payment on receipt of bill
                              </option>
                            </>
                          )
                            :
                            null
                          }
                          {/* Not available */}
                          {/* {gas_meter_supported === "NOT" ?
                                  (
                                    <>
                                      <option value="NA">Not available</option>
                                    </>
                                  )
                                  :
                                  null
                                } */}
                        </select>
                        {/* <i
                          style={{ color: "transparent", cursor: "auto" }}
                          className="edit-icon far fa-edit"
                        ></i> */}
                      </div>
                    )
                      :
                      null
                    }

                    {/* Error */}
                    {error_gas_payment ?
                      (
                        <div className="error-flex ">
                          <Error message={"Please select a payment method"} />
                        </div>
                      )
                      :
                      null
                    }
                  </div>


                  {/* Buttons */}
                  <div className="form-supply-btn-container">
                    <button className="form-supply-btn btn-back" onClick={(e) => goToFormMpanMprn(e)}>
                      <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                        <IoMdArrowDropleft className="icon-back" />
                      </IconContext.Provider>
                      Go back
                    </button>

                    <button data-cy="gasonly-continue" className="form-supply-btn btn-next" onClick={(e) => goToE7(e)}>
                      Continue

                      <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                        <IoMdArrowDropright className="icon-next" />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>

                {showScript ?
                  (
                    <div className="helper-address">
                      <div className="script-address">
                        <FormScript step={5} />
                      </div>

                      <div className="assistant-address-custom">
                        <FormAssistant tips={4} />
                      </div>
                    </div>
                  )
                  :
                  <div style={{ width: '100%' }}>
                    <div className="assistant-address">
                      <FormAssistant tips={4} />
                    </div>
                  </div>
                }
              </div>
            </section>
          </>
        )
        :
        null
      }
    </>
  );
}

export default FormSupply;
