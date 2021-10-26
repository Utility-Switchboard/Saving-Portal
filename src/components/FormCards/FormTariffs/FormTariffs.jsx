import React, { useState, useEffect, Fragment } from "react";
// Data tariff ES
import data_electricity_tariffs from '../../../utilities/data_tariffs/data_tariffs_es/data_electricity_tariffs';
// Data tariff GS
import data_gas_tariffs from '../../../utilities/data_tariffs/data_tariff_gs/data_gas_tariffs';
// Data tariff dual
import data_dual_tariffs from '../../../utilities/data_tariffs/data_tariff_dual/data_dual_tariffs';
// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from "../FormAssistant/FormAssistant";
import Error from '../../Error/Error';
// Swal
import swal from '@sweetalert/with-react';
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { ImSad } from 'react-icons/im';
import { FaRegHandPointer, FaSearch } from 'react-icons/fa';
// CSS
import "./FormTariffs.css";

const FormTariffs = ({ customerInformation, showScript, progressBar, updateShowE7, updateShowFormTariffs, updateShowOverlay, updateCustomerInformation, updateShowFormUsageKWH, updateShowFormUsageGAS, updateProgressBar }) => {
  /** STATES */
  const [select_elec_only, update_select_elec_only] = useState(false);
  const [select_gas_only, update_select_gas_only] = useState(false);
  const [select_dual_only, update_select_dual_only] = useState(false);
  // Error
  const [error, updateError] = useState(false);

  /** FUNCTIONS */

  // Variables
  const elec_data = data_electricity_tariffs.tariffs;
  const gas_data = data_gas_tariffs.tariffs;
  const dual_data = data_dual_tariffs.tariffs;

  // Function to sort the JSON by property
  const sortByProperty = (property) => {
    return function (a, b) {
      if (a[property] < b[property])
        return 1;
      else if (a[property] > b[property])
        return -1;

      return 0;
    }
  }

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
  }, [error]);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Variables
  const elec_only = customerInformation.fuel_description.elec_only;
  const gas_only = customerInformation.fuel_description.gas_only;
  const same_supplier = customerInformation.fuel_description.same_supplier;
  const dual_active = customerInformation.fuel_description.dual_active;
  // Electricity tariff information
  const elec_tariffs = data_electricity_tariffs.tariffs;
  // Gas tarriff information
  const gas_tariffs = data_gas_tariffs.tariffs;
  // Dual tariff information
  const dual_tariffs = data_dual_tariffs.tariffs;

  // Effect to hide Overlay
  useEffect(() => {
    // Update Overlay
    updateShowOverlay(false);
  }, []);

  // Supplier code for ES
  const supplier_code_es = customerInformation.supplierInformation.electricity_supplier.supplier_mpid;
  // Supplier code for ES
  const supplier_code_gs = customerInformation.supplierInformation.gas_supplier.current_supplier_id;
  // Variables
  let supplier_id_es;
  let supplier_id_gs;
  let supplier_id_dual;

  // Filter tariffs by property (supplier code)
  const filter_by_property = (data, property) => {
    const filter_by_supplier_code = data.filter(obj => {
      return obj.supplier_code === property;
    });

    return filter_by_supplier_code;
  }

  /**-- Assigning sorted data */
  // Sorted data
  let sorted_data;
  let sorted_data_elec;
  let sorted_data_gas;

  if (elec_only) {
    // Sorted data
    sorted_data = elec_data.sort(sortByProperty("unit_rate"));
  }

  if (gas_only) {
    // Sorted data
    sorted_data = gas_data.sort(sortByProperty("unit_rate"));
  }

  if (dual_active) {
    if (same_supplier) {
      // Sorted data
      sorted_data = dual_data.sort(sortByProperty("unit_rate"));
    } else {
      // Sorted data
      sorted_data = elec_data.sort(sortByProperty("unit_rate"));

      sorted_data_elec = elec_data.sort(sortByProperty("unit_rate"));
      sorted_data_gas = gas_data.sort(sortByProperty("unit_rate"));
    }
  }

  // Filter tariffs by property (svt)
  const filter_by_svt = (data, property) => {
    const filtered = data.filter(obj => {
      return obj.svt === property;
    });

    return filtered;
  }

  // Expensier tariff
  const expensierTariff = () => {
    const expensier_svt = filter_by_svt(sorted_data, true)[0];

    return (
      <div className="form-tariff-rb-content" key={expensier_svt.tariff_id} onClick={() => update_select_elec_only(false)}>
        <label className="form-tariff-rb" htmlFor={expensier_svt.tariff_id}>
          <p>Other</p>
          <input type="radio" id={expensier_svt.tariff_id} name="tariff" defaultValue={expensier_svt.tariff_name} defaultChecked />
        </label>
      </div>
    );
  }

  // Expensier tariff
  const expensier_tariff = expensierTariff();

  /** ---- */

  // Expensier tariff elec
  const expensierTariffElec = () => {
    const expensier_svt_elec = filter_by_svt(sorted_data_elec, true)[0];

    return (
      <div className="form-tariff-rb-content" key={expensier_svt_elec.tariff_id} onClick={() => update_select_elec_only(false)}>
        <label className="form-tariff-rb" htmlFor={expensier_svt_elec.tariff_id}>
          <p>Other</p>
          <input type="radio" id={expensier_svt_elec.tariff_id} name="tariff" defaultValue={expensier_svt_elec.tariff_name} defaultChecked />
        </label>
      </div>
    );
  }

  // Exprensiert tariff elec - Apply just when dual_active === true and same_supplier === false
  let expensier_tariff_elec;
  if((dual_active) && (same_supplier === false)) {
    expensier_tariff_elec = expensierTariffElec();
  }

  /** ---- */

  // Expensier tariff gas
  const expensierTariffGas = () => {
    const expensier_svt_gas = filter_by_svt(sorted_data_gas, true)[0];

    return (
      <div className="form-tariff-rb-content" key={expensier_svt_gas.tariff_id} onClick={() => update_select_elec_only(false)}>
        <label className="form-tariff-rb" htmlFor={expensier_svt_gas.tariff_id}>
          <p>Other</p>
          <input type="radio" id={expensier_svt_gas.tariff_id} name="tariff" defaultValue={expensier_svt_gas.tariff_name} defaultChecked />
        </label>
      </div>
    );
  }

  // Exprensiert tariff gas - Apply just when dual_active === true and same_supplier === false
  let expensier_tariff_gas;
  if((dual_active) && (same_supplier === false)) {
    expensier_tariff_gas = expensierTariffGas();
  }

  // Update the state when (supplier_code_es === 'IDK') or (supplier_code_gs === 'IDK')
  useEffect(() => {

    const expensier_svt = filter_by_svt(sorted_data, true)[0];

    // Elec Only
    if (supplier_code_es === 'IDK') {
      if (elec_only) {
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          tariff_description: {
            elec_tariff: expensier_svt
          }
        });
      }
    }

    // Gas Only
    if (supplier_code_gs === 'IDK') {
      if (gas_only) {
        // Update Customer Information
        updateCustomerInformation({
          ...customerInformation,
          tariff_description: {
            gas_tariff: expensier_svt
          }
        });
      }
    }

    if (dual_active) {
      if (same_supplier === false) {
        if ((supplier_code_es === 'IDK') && (supplier_code_gs != 'IDK')) {
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_elec: {
              elec_tariff: expensier_svt
            }
          });
        }

        if ((supplier_code_gs === 'IDK') && (supplier_code_es != 'IDK')) {
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_gas: {
              gas_tariff: expensier_svt
            }
          });
        }

        if ((supplier_code_gs === 'IDK') && (supplier_code_es === 'IDK')) {
          const sorted_elec = elec_data.sort(sortByProperty("unit_rate"));
          const sorted_gas = gas_data.sort(sortByProperty("unit_rate"));

          const expensier_svt_elect = filter_by_svt(sorted_elec, true)[0];
          const expensier_svt_gas = filter_by_svt(sorted_gas, true)[0];

          updateCustomerInformation({
            ...customerInformation,
            tariff_description_elec: {
              elec_tariff: expensier_svt_elect
            },
            tariff_description_gas: {
              gas_tariff: expensier_svt_gas
            }
          });
        }

        return;
      } else {
        if (supplier_code_es === 'IDK') {
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description: expensier_svt
          });
        }
      }
    }
  }, []);

  // ELEC_ONLY - Assign supplier_id_es in function to the supplier_code_es
  if (elec_only) {
    // EDF
    if ((supplier_code_es === "LOND") || (supplier_code_es === "SEEB") || (supplier_code_es === "SWEB")) {
      supplier_id_es = 'EDF';
    }

    // British Gas
    if (((supplier_code_es === "BGAS") || (supplier_code_es === "BIZZ") || (supplier_code_es === "ECOA") || (supplier_code_es === "ENRD") || (supplier_code_es === "OGAS"))) {
      supplier_id_es = 'BRG';
    }

    // EON
    if (((supplier_code_es === "PGEN") || (supplier_code_es === "EELC") || (supplier_code_es === "EENG") || (supplier_code_es === "EMEB") || (supplier_code_es === "NORW"))) {
      supplier_id_es = 'EON';
    }

    // SSE
    if (((supplier_code_es === "HYDE") || (supplier_code_es === "IMPO") || (supplier_code_es === "SOUT") || (supplier_code_es === "SWAE"))) {
      supplier_id_es = 'SSE';
    }

    // Scottish Power
    if (((supplier_code_es === "MANW") || (supplier_code_es === "SPOW"))) {
      supplier_id_es = 'SCO';
    }

    // NPOWER
    if (((supplier_code_es === "INDE") || (supplier_code_es === "MIDE") || (supplier_code_es === "NATP") || (supplier_code_es === "NEEB") || (supplier_code_es === "PSUK") || (supplier_code_es === "YELG"))) {
      supplier_id_es = 'NPO';
    }
  }

  // GAS_ONLY - Assign supplier_id in function to the supplier_code_gs
  if (gas_only) {
    // British Gas
    if ((supplier_code_gs === "BGT") || (supplier_code_gs === "BGB") || (supplier_code_gs === "BSA")) {
      supplier_id_gs = 'BRG';
    }

    // EDF
    if ((supplier_code_gs === "LED") || (supplier_code_gs === "SBR") || (supplier_code_gs === "EDS") || (supplier_code_gs === "LDE") || (supplier_code_gs === "LEI")) {
      supplier_id_gs = 'EDF';
    }

    // EON Selected
    if ((supplier_code_gs === "TUK") || (supplier_code_gs === "EAS") || (supplier_code_gs === "PWR") || (supplier_code_gs === "EMI") || (supplier_code_gs === "PWG") || (supplier_code_gs === "OWN") || (supplier_code_gs === "ATE") || (supplier_code_gs === "EST") || (supplier_code_gs === "SGL") || (supplier_code_gs === "SGY") || (supplier_code_gs === "TUU") || (supplier_code_gs === "EOD") || (supplier_code_gs === "POW")) {
      supplier_id_gs = 'EON';
    }

    // SSE Selected
    if ((supplier_code_gs === "ATL") || (supplier_code_gs === "SHH")) {
      supplier_id_gs = 'SSE';
    }

    // Scottish power selected
    if ((supplier_code_gs === "SCT")) {
      supplier_id_gs = 'SCO';
    }

    // Npower Selected
    if ((supplier_code_gs === "NGD") || (supplier_code_gs === "NPC") || (supplier_code_gs === "NDS") || (supplier_code_gs === "IND") || (supplier_code_gs === "CLT") || (supplier_code_gs === "TCG") || (supplier_code_gs === "NRZ") || (supplier_code_gs === "GUK") || (supplier_code_gs === "YGS") || (supplier_code_gs === "YKE")) {
      supplier_id_gs = 'NPO';
    }
  }

  // Dual_active - Assign supplier_id_gs in function to the supplier_code_es and supplier_code_gs
  if (dual_active) {
    if (same_supplier) {
      // EDF
      if ((supplier_code_es === "LOND") || (supplier_code_es === "SEEB") || (supplier_code_es === "SWEB")) {
        supplier_id_dual = 'EDF';
      }

      // British Gas
      if (((supplier_code_es === "BGAS") || (supplier_code_es === "BIZZ") || (supplier_code_es === "ECOA") || (supplier_code_es === "ENRD") || (supplier_code_es === "OGAS"))) {
        supplier_id_dual = 'BRG';
      }

      // EON
      if (((supplier_code_es === "PGEN") || (supplier_code_es === "EELC") || (supplier_code_es === "EENG") || (supplier_code_es === "EMEB") || (supplier_code_es === "NORW"))) {
        supplier_id_dual = 'EON';
      }

      // SSE
      if (((supplier_code_es === "HYDE") || (supplier_code_es === "IMPO") || (supplier_code_es === "SOUT") || (supplier_code_es === "SWAE"))) {
        supplier_id_dual = 'SSE';
      }

      // Scottish Power
      if (((supplier_code_es === "MANW") || (supplier_code_es === "SPOW"))) {
        supplier_id_dual = 'SCO';
      }

      // NPOWER
      if (((supplier_code_es === "INDE") || (supplier_code_es === "MIDE") || (supplier_code_es === "NATP") || (supplier_code_es === "NEEB") || (supplier_code_es === "PSUK") || (supplier_code_es === "YELG"))) {
        supplier_id_dual = 'NPO';
      }
    } else {
      /**-- ELECTRICITY --*/

      // EDF
      if ((supplier_code_es === "LOND") || (supplier_code_es === "SEEB") || (supplier_code_es === "SWEB")) {
        supplier_id_es = 'EDF';
      }

      // British Gas
      if (((supplier_code_es === "BGAS") || (supplier_code_es === "BIZZ") || (supplier_code_es === "ECOA") || (supplier_code_es === "ENRD") || (supplier_code_es === "OGAS"))) {
        supplier_id_es = 'BRG';
      }

      // EON
      if (((supplier_code_es === "PGEN") || (supplier_code_es === "EELC") || (supplier_code_es === "EENG") || (supplier_code_es === "EMEB") || (supplier_code_es === "NORW"))) {
        supplier_id_es = 'EON';
      }

      // SSE
      if (((supplier_code_es === "HYDE") || (supplier_code_es === "IMPO") || (supplier_code_es === "SOUT") || (supplier_code_es === "SWAE"))) {
        supplier_id_es = 'SSE';
      }

      // Scottish Power
      if (((supplier_code_es === "MANW") || (supplier_code_es === "SPOW"))) {
        supplier_id_es = 'SCO';
      }

      // NPOWER
      if (((supplier_code_es === "INDE") || (supplier_code_es === "MIDE") || (supplier_code_es === "NATP") || (supplier_code_es === "NEEB") || (supplier_code_es === "PSUK") || (supplier_code_es === "YELG"))) {
        supplier_id_es = 'NPO';
      }

      /**-- GAS --*/
      // British Gas
      if ((supplier_code_gs === "BGT") || (supplier_code_gs === "BGB") || (supplier_code_gs === "BSA")) {
        supplier_id_gs = 'BRG';
      }

      // EDF
      if ((supplier_code_gs === "LED") || (supplier_code_gs === "SBR") || (supplier_code_gs === "EDS") || (supplier_code_gs === "LDE") || (supplier_code_gs === "LEI")) {
        supplier_id_gs = 'EDF';
      }

      // EON Selected
      if ((supplier_code_gs === "TUK") || (supplier_code_gs === "EAS") || (supplier_code_gs === "PWR") || (supplier_code_gs === "EMI") || (supplier_code_gs === "PWG") || (supplier_code_gs === "OWN") || (supplier_code_gs === "ATE") || (supplier_code_gs === "EST") || (supplier_code_gs === "SGL") || (supplier_code_gs === "SGY") || (supplier_code_gs === "TUU") || (supplier_code_gs === "EOD") || (supplier_code_gs === "POW")) {
        supplier_id_gs = 'EON';
      }

      // SSE Selected
      if ((supplier_code_gs === "ATL") || (supplier_code_gs === "SHH")) {
        supplier_id_gs = 'SSE';
      }

      // Scottish power selected
      if ((supplier_code_gs === "SCT")) {
        supplier_id_gs = 'SCO';
      }

      // Npower Selected
      if ((supplier_code_gs === "NGD") || (supplier_code_gs === "NPC") || (supplier_code_gs === "NDS") || (supplier_code_gs === "IND") || (supplier_code_gs === "CLT") || (supplier_code_gs === "TCG") || (supplier_code_gs === "NRZ") || (supplier_code_gs === "GUK") || (supplier_code_gs === "YGS") || (supplier_code_gs === "YKE")) {
        supplier_id_gs = 'NPO';
      }
    }
  }

  // Handle change for Electricity tariff
  const handleChangeTariffES = (e) => {
    /**-- Select section --*/
    if (select_elec_only) {
      /**-- For dual_active & same_supplier === false */
      if (dual_active) {
        if (same_supplier === false) {
          // Update Error
          updateError(false);
          const selected_elec_tariff = document.getElementById('selected_elec_tariff').value;
          // Take the selected position in the array
          let name = selected_elec_tariff
          let index_select = filter_by_property(elec_tariffs, supplier_id_es).findIndex(function (item, i) {
            return item.tariff_name === name
          });

          // Fetch the data by the current position
          const tariff_description = filter_by_property(elec_tariffs, supplier_id_es)[index_select];
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_elec: {
              elec_tariff: tariff_description
            }
          });

          // IDK selection 
          const position_selected = e.target.selectedIndex;
          if ((position_selected !== undefined)) {
            // console.log(position_selected);
            let value_selected = document.getElementById('selected_elec_tariff')[position_selected].value;
            if (value_selected === 'tariff_not_listed') {
              // Update Customer Information
              updateCustomerInformation({
                ...customerInformation,
                tariff_description_elec: {
                  elec_tariff: 'tariff_not_listed'
                }
              });
            }
          }
          return;
        }
      } /**--End Dual */

      // Update Error
      updateError(false);
      const selected_elec_tariff = document.getElementById('selected_elec_tariff').value;
      // Take the selected position in the array
      let name = selected_elec_tariff
      let index_select = filter_by_property(elec_tariffs, supplier_id_es).findIndex(function (item, i) {
        return item.tariff_name === name
      });

      // Fetch the data by the current position
      const tariff_description = filter_by_property(elec_tariffs, supplier_id_es)[index_select];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });

      // IDK selection 
      const position_selected = e.target.selectedIndex;
      if ((position_selected !== undefined)) {
        // console.log(position_selected);
        let value_selected = document.getElementById('selected_elec_tariff')[position_selected].value;
        if (value_selected === 'tariff_not_listed') {
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description: 'tariff_not_listed'
          });
        }
      }

    } else {
      /**-- For dual_active & same_supplier === false */
      if (dual_active) {
        if (same_supplier === false) {
          // Update Error
          updateError(false);
          /**-- RADIO BUTTONS SECTION --*/
          // Take the selected position in the array
          let id = e.target.id
          let index_rb = filter_by_property(elec_tariffs, supplier_id_es).findIndex(function (item, i) {
            return item.tariff_id === id
          });
          // Fetch the data by the current position
          const tariff_description = filter_by_property(elec_tariffs, supplier_id_es)[index_rb];
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_elec: {
              elec_tariff: tariff_description
            }
          });
          return;
        }
      }  /**--End Dual */

      // Update Error
      updateError(false);
      /**-- RADIO BUTTONS SECTION --*/
      // Take the selected position in the array
      let id = e.target.id
      let index_rb = filter_by_property(elec_tariffs, supplier_id_es).findIndex(function (item, i) {
        return item.tariff_id === id
      });
      // Fetch the data by the current position
      const tariff_description = filter_by_property(elec_tariffs, supplier_id_es)[index_rb];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });
    }
  }

  // Handle change for Electricity tariff
  const handleChangeTariffGS = (e) => {
    /**-- Select section --*/
    if (select_gas_only) {
      /**-- For dual_active & same_supplier === false */
      if (dual_active) {
        if (same_supplier === false) {
          // Update Error
          updateError(false);
          const selected_gas_tariff = document.getElementById('selected_gas_tariff').value;
          // Take the selected position in the array
          let name = selected_gas_tariff
          let index_select = filter_by_property(gas_tariffs, supplier_id_gs).findIndex(function (item, i) {
            return item.tariff_name === name
          });

          // Fetch the data by the current position
          const tariff_description = filter_by_property(gas_tariffs, supplier_id_gs)[index_select];
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_gas: {
              gas_tariff: tariff_description
            }
          });

          // IDK selection 
          const position_selected = e.target.selectedIndex;
          if ((position_selected !== undefined)) {
            // console.log(position_selected);
            let value_selected = document.getElementById('selected_gas_tariff')[position_selected].value;
            if (value_selected === 'tariff_not_listed') {
              // Update Customer Information
              updateCustomerInformation({
                ...customerInformation,
                tariff_description_gas: {
                  gas_tariff: 'tariff_not_listed'
                }
              });
            }
          }

          return;
        }
      } /**--End Dual */

      // Update Error
      updateError(false);
      const selected_gas_tariff = document.getElementById('selected_gas_tariff').value;
      // Take the selected position in the array
      let name = selected_gas_tariff
      let index_select = filter_by_property(gas_tariffs, supplier_id_gs).findIndex(function (item, i) {
        return item.tariff_name === name
      });

      // Fetch the data by the current position
      const tariff_description = filter_by_property(gas_tariffs, supplier_id_gs)[index_select];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });

      // IDK selection 
      const position_selected = e.target.selectedIndex;
      if ((position_selected !== undefined)) {
        // console.log(position_selected);
        let value_selected = document.getElementById('selected_gas_tariff')[position_selected].value;
        if (value_selected === 'tariff_not_listed') {
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description: 'tariff_not_listed'
          });
        }
      }

    } else {
      /**-- For dual_active & same_supplier === false */
      if (dual_active) {
        if (same_supplier === false) {
          // Update Error
          updateError(false);
          /**-- RADIO BUTTONS SECTION --*/
          // Take the selected position in the array
          let id = e.target.id
          let index_rb = filter_by_property(gas_tariffs, supplier_id_gs).findIndex(function (item, i) {
            return item.tariff_id === id
          });
          // Fetch the data by the current position
          const tariff_description = filter_by_property(gas_tariffs, supplier_id_gs)[index_rb];
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description_gas: {
              gas_tariff: tariff_description
            }
          });
          return;
        }
      }

      // Update Error
      updateError(false);
      /**-- RADIO BUTTONS SECTION --*/
      // Take the selected position in the array
      let id = e.target.id
      let index_rb = filter_by_property(gas_tariffs, supplier_id_gs).findIndex(function (item, i) {
        return item.tariff_id === id
      });
      // Fetch the data by the current position
      const tariff_description = filter_by_property(gas_tariffs, supplier_id_gs)[index_rb];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });
    }
  }

  // Handle change for Electricity tariff
  const handleChangeTariffDual = (e) => {
    /**-- Select section --*/
    if (select_dual_only) {
      // Update Error
      updateError(false);
      const selected_dual_tariff = document.getElementById('selected_dual_tariff').value;
      // Take the selected position in the array
      let name = selected_dual_tariff
      let index_select = filter_by_property(dual_tariffs, supplier_id_dual).findIndex(function (item, i) {
        return item.tariff_name === name
      });

      // Fetch the data by the current position
      const tariff_description = filter_by_property(dual_tariffs, supplier_id_dual)[index_select];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });

      // IDK selection 
      const position_selected = e.target.selectedIndex;
      if ((position_selected !== undefined)) {
        // console.log(position_selected);
        let value_selected = document.getElementById('selected_dual_tariff')[position_selected].value;
        if (value_selected === 'tariff_not_listed') {
          // Update Customer Information
          updateCustomerInformation({
            ...customerInformation,
            tariff_description: 'tariff_not_listed'
          });
        }
      }
    } else {
      // Update Error
      updateError(false);
      /**-- RADIO BUTTONS SECTION --*/
      // Take the selected position in the array
      let id = e.target.id
      let index_rb = filter_by_property(dual_tariffs, supplier_id_dual).findIndex(function (item, i) {
        return item.tariff_id === id
      });
      // Fetch the data by the current position
      const tariff_description = filter_by_property(dual_tariffs, supplier_id_dual)[index_rb];
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description
      });
    }
  }

  // Send tariff
  const sendTariff = (e) => {
    e.preventDefault();
    if (dual_active) {
      if (same_supplier === false) {
        // Validation dual with different suppplier
        if ((customerInformation.hasOwnProperty('tariff_description_elec')) && (customerInformation.hasOwnProperty('tariff_description_gas'))) {
          if ((customerInformation.tariff_description_elec.elec_tariff === undefined) || (customerInformation.tariff_description_gas.gas_tariff === undefined)) {
            // Update Error
            updateError(true);
            return;
          } else {
            // Hidde tariffs
            updateShowFormTariffs(false);
            // Show Form Usage
            updateShowFormUsageKWH(true);
            // Update Progress Bar
            updateProgressBar({ ...progressBar, step: 7 });
          }
        } else {
          // Update Error
          updateError(true);
          return;
        }
      } else {
        // Validation dual with same supplier
        if (customerInformation.hasOwnProperty('tariff_description')) {
          if (customerInformation.tariff_description === undefined) {
            // Update error
            updateError(true);
            return;
          } else {
            // Hidde tariffs
            updateShowFormTariffs(false);
            // Show Form Usage
            updateShowFormUsageKWH(true);
            // Update Progress Bar
            updateProgressBar({ ...progressBar, step: 7 });
          }
          // Update Error
          updateError(false);
        } else {
          // Update error
          updateError(true);
          return;
        }
      }
      return;
    }

    // Validation, elec_only, gas_only
    if (customerInformation.hasOwnProperty('tariff_description')) {
      if (customerInformation.tariff_description === undefined) {
        // Update error
        updateError(true);
        return;
      } else {
        if (gas_only) {
          // Hidde tariffs
          updateShowFormTariffs(false);
          // Show Form Usage Gas
          updateShowFormUsageGAS(true);
          // Update Progress Bar
          updateProgressBar({ ...progressBar, step: 7 });
        } else {
          // Hidde tariffs
          updateShowFormTariffs(false);
          // Show Form Usage
          updateShowFormUsageKWH(true);
          // Update Progress Bar
          updateProgressBar({ ...progressBar, step: 7 });
        }
      }
      // Update Error
      updateError(false);
    } else {
      // Update error
      updateError(true);
      return;
    }
  }

  // Handle search ES
  const HandleSearchES = (e) => {
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
            <FaSearch />
          </IconContext.Provider>
          <h1>Search tariff...</h1>
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
      const data = data_electricity_tariffs;
      return search_option(search_input, data);
    });

    // Second step - Filter and serach
    let search_option = (search_input, data) => {
      // Access to the data
      const data_tariff = data.tariffs;
      let filter;
      // Filter by search_input 
      filter = filter_by_property(data_tariff, supplier_id_es).filter((option) => {
        let options = option.tariff_name.toLowerCase().includes(search_input);
        return (
          options
        );
      });

      // Print options from filter_es 
      let results = filter.map((data) => (
        <Fragment key={data.tariff_id + '_search_key'}>
          <input type="radio" id={data.tariff_id + '_search_filtered'} name="search_es" value={data.tariff_id} />
          <label>{data.tariff_name} - <span style={{ color: 'var(--text_dark)' }}>Tariff ID:</span> {data.tariff_id}</label><br />
        </Fragment>
      ));

      // Validation - No results found
      if (filter.length <= 0) {
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
              {results}
            </div>
          </div>
        )
      }).then(result => {
        if (result !== true) {
          return;
        }

        // Search for all the radio buttons by name
        let rb_selected = document.getElementsByName('search_es');
        // Take the value of the rb selected
        for (let i = 0; i < rb_selected.length; i++) {
          if (rb_selected[i].checked) {
            const rb_id = rb_selected[i].value; //rb_id selected

            // If does not exit as a input - Code for options
            if (document.getElementById(rb_id) === null) {
              document.getElementById(rb_id + '_option').selected = true; //Show option selected
              // Fetch data 
              let data = data_electricity_tariffs;
              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Conditional - dual_active
              if ((dual_active === true) && (same_supplier === false)) {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description_elec: {
                    elec_tariff: tariff_description[0]
                  }
                });
              } else {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description: tariff_description[0]
                });
              }

              // Hidde error
              updateError(false);

            } else { // Existing inputs (the firts four);
              // Checked selected input 
              document.getElementById(rb_id).checked = true;

              // Hidde select - options
              update_select_elec_only(false);

              // Fetch Data
              let data = data_electricity_tariffs;

              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Conditional - dual_active
              if ((dual_active === true) && (same_supplier === false)) {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description_elec: {
                    elec_tariff: tariff_description[0]
                  }
                });
              } else {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description: tariff_description[0]
                });
              }

              // Hidde error
              updateError(false);
            }
          }
        }
      });
    }
  }

  // Handle search GS
  const HandleSearchGS = (e) => {
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
            <FaSearch />
          </IconContext.Provider>
          <h1>Search tariff...</h1>
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
      const data = data_gas_tariffs;
      return search_option(search_input, data);
    });

    // Second step - Filter and serach
    let search_option = (search_input, data) => {
      // Access to the data
      const data_tariff = data.tariffs;
      let filter;
      // Filter by search_input 
      filter = filter_by_property(data_tariff, supplier_id_gs).filter((option) => {
        let options = option.tariff_name.toLowerCase().includes(search_input);
        return (
          options
        );
      });

      // Print options from filter_es 
      let results = filter.map((data) => (
        <Fragment key={data.tariff_id + '_search_key'}>
          <input type="radio" id={data.tariff_id + '_search_filtered'} name="search_es" value={data.tariff_id} />
          <label>{data.tariff_name} - <span style={{ color: 'var(--text_dark)' }}>Tariff ID:</span> {data.tariff_id}</label><br />
        </Fragment>
      ));

      // Validation - No results found
      if (filter.length <= 0) {
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
              {results}
            </div>
          </div>
        )
      }).then(result => {
        if (result !== true) {
          return;
        }

        // Search for all the radio buttons by name
        let rb_selected = document.getElementsByName('search_es');
        // Take the value of the rb selected
        for (let i = 0; i < rb_selected.length; i++) {
          if (rb_selected[i].checked) {
            const rb_id = rb_selected[i].value; //rb_id selected

            // If does not exit as a input - Code for options
            if (document.getElementById(rb_id) === null) {
              document.getElementById(rb_id + '_option').selected = true; //Show option selected
              // Fetch data 
              let data = data_gas_tariffs;
              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Conditional - dual_active
              if ((dual_active === true) && (same_supplier === false)) {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description_gas: {
                    gas_tariff: tariff_description[0]
                  }
                });
              } else {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description: tariff_description[0]
                });
              }

              // Hidde error
              updateError(false);

            } else { // Existing inputs (the firts four);
              // Checked selected input 
              document.getElementById(rb_id).checked = true;

              // Hidde select - options
              update_select_gas_only(false);

              // Fetch Data
              let data = data_gas_tariffs;

              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Conditional - dual_active
              if ((dual_active === true) && (same_supplier === false)) {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description_gas: {
                    gas_tariff: tariff_description[0]
                  }
                });
              } else {
                // Update Customer Information
                updateCustomerInformation({
                  ...customerInformation,
                  tariff_description: tariff_description[0]
                });
              }

              // Hidde error
              updateError(false);
            }
          }
        }
      });
    }
  }

  // Handle search Dual
  const HandleSearchDual = (e) => {
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
            <FaSearch />
          </IconContext.Provider>
          <h1>Search tariff...</h1>
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
      const data = data_dual_tariffs;
      return search_option(search_input, data);
    });

    // Second step - Filter and serach
    let search_option = (search_input, data) => {
      // Access to the data
      const data_tariff = data.tariffs;
      let filter;
      // Filter by search_input 
      filter = filter_by_property(data_tariff, supplier_id_dual).filter((option) => {
        let options = option.tariff_name.toLowerCase().includes(search_input);
        return (
          options
        );
      });

      // Print options from filter_es 
      let results = filter.map((data) => (
        <Fragment key={data.tariff_id + '_search_key'}>
          <input type="radio" id={data.tariff_id + '_search_filtered'} name="search_es" value={data.tariff_id} />
          <label>{data.tariff_name} - <span style={{ color: 'var(--text_dark)' }}>Tariff ID:</span> {data.tariff_id}</label><br />
        </Fragment>
      ));

      // Validation - No results found
      if (filter.length <= 0) {
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
              {results}
            </div>
          </div>
        )
      }).then(result => {
        if (result !== true) {
          return;
        }

        // Search for all the radio buttons by name
        let rb_selected = document.getElementsByName('search_es');
        // Take the value of the rb selected
        for (let i = 0; i < rb_selected.length; i++) {
          if (rb_selected[i].checked) {
            const rb_id = rb_selected[i].value; //rb_id selected

            // If does not exit as a input - Code for options
            if (document.getElementById(rb_id) === null) {
              document.getElementById(rb_id + '_option').selected = true; //Show option selected
              // Fetch data 
              let data = data_dual_tariffs;
              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Update Customer Information
              updateCustomerInformation({
                ...customerInformation,
                tariff_description: tariff_description[0]
              });

              // Hidde error
              updateError(false);

            } else { // Existing inputs (the firts four);
              // Checked selected input 
              document.getElementById(rb_id).checked = true;

              // Hidde select - options
              update_select_dual_only(false);

              // Fetch Data
              let data = data_dual_tariffs;

              // Filter by id 
              let filter;
              filter = data.tariffs.filter((option) => {
                let options = option.tariff_id.includes(rb_id);
                return (
                  options
                );
              });

              // Tariff data
              let tariff_description = filter.map((data) => (
                data
              ));

              // Update Customer Information
              updateCustomerInformation({
                ...customerInformation,
                tariff_description: tariff_description[0]
              });

              // Hidde error
              updateError(false);
            }
          }
        }
      });
    }
  }

  // Tariff is not listed - Elec
  const tariff_not_listed_elec = (e) => {
    e.preventDefault();
    const tariff_not_selected = document.getElementById('not_listed_es');
    // Conditional - dual_active
    if ((dual_active === true) && (same_supplier === false)) {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description_elec: {
          elec_tariff: 'tariff_not_listed'
        }
      });
      // Selected tariff
      tariff_not_selected.selected = true;
    } else {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description: 'tariff_not_listed'
      });
      // Selected tariff
      tariff_not_selected.selected = true;
    }

    // Hidde error
    updateError(false);
  }

  // Tariff is not listed - Gas
  const tariff_not_listed_gas = (e) => {
    e.preventDefault();
    const tariff_not_selected = document.getElementById('not_listed_gs');
    // Conditional - dual_active
    if ((dual_active === true) && (same_supplier === false)) {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description_gas: {
          gas_tariff: 'tariff_not_listed'
        }
      });
      // Selected tariff
      tariff_not_selected.selected = true;
    } else {
      // Update Customer Information
      updateCustomerInformation({
        ...customerInformation,
        tariff_description: 'tariff_not_listed'
      });
      // Selected tariff
      tariff_not_selected.selected = true;
    }

    // Hidde error
    updateError(false);
  }

  // Go back to E7
  const goBack = (e) => {
    e.preventDefault();
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 5 });
    // Delete Customer tariff
    const copy_customer_tariff = { ...customerInformation };
    delete copy_customer_tariff['tariff_description'];
    delete copy_customer_tariff['tariff_description_elec'];
    delete copy_customer_tariff['tariff_description_gas'];
    //Update Customer Information
    updateCustomerInformation({ ...copy_customer_tariff });
    // Hidde Error
    updateError(false);
    // Hidde Form Tariffs
    updateShowFormTariffs(false);
    // Show E7
    updateShowE7(true);
  }

  return (
    <>
      <section className="form-tariff-section">
        <div className="form-tariff-container">
          <div className="form-tariff-content">
            <div className="form-tariff">
              <h1>Select your tariff from the below</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text. ply dummy text o ply dummy text</p>
            </div>

            {/* Elec only */}
            {elec_only ?
              (
                <>
                  <form className="form-tariff-rb-container" onChange={(e) => handleChangeTariffES(e)}>
                    {filter_by_property(elec_tariffs, supplier_id_es).slice(0, 3).map((data) => (
                      <div className="form-tariff-rb-content" key={data.tariff_id} onClick={() => update_select_elec_only(false)}>
                        <label className="form-tariff-rb" htmlFor={data.tariff_id}>
                          <p>{data.tariff_name}</p>
                          <input type="radio" id={data.tariff_id} name="elec_tariff" value={data.tariff_name} />
                        </label>
                      </div>
                    ))}

                    {supplier_code_es === 'IDK' ?
                      expensier_tariff
                      :
                      (
                        <div className="form-tariff-rb-content" onClick={() => update_select_elec_only(true)}>
                          <label className="form-tariff-rb" htmlFor="other">
                            <p>Other</p>
                            <input type="radio" id="other" name="elec_tariff" value='' />
                          </label>
                        </div>
                      )}

                    {select_elec_only ?
                      (
                        <>
                          <div className="form-tariff-select">
                            <select id="selected_elec_tariff" className="supply-information-input" onChange={(e) => handleChangeTariffES(e)}>
                              <option value="">- Select - </option>
                              {filter_by_property(elec_tariffs, supplier_id_es).map((data) => (
                                <option value={data.tariff_name} id={data.tariff_id + '_option'} key={data.tariff_id}>{data.tariff_name}</option>
                              ))}
                              <option value="tariff_not_listed" id="not_listed_es">My tariff is not listed</option>
                            </select>
                            <i className="edit-icon fas fa-search" onClick={(e) => HandleSearchES(e)}></i>
                          </div>
                          <button className="form-tariff-not-listed" onClick={(e) => tariff_not_listed_elec(e)}>My tariff is not listed</button>
                        </>
                      )
                      :
                      null
                    }
                  </form>
                </>
              )
              :
              null
            }

            {/* Gas only */}
            {gas_only ?
              (
                <>
                  <form className="form-tariff-rb-container" onChange={(e) => handleChangeTariffGS(e)}>
                    {filter_by_property(gas_tariffs, supplier_id_gs).slice(0, 3).map((data) => (
                      <div className="form-tariff-rb-content" key={data.tariff_id} onClick={() => update_select_gas_only(false)}>
                        <label className="form-tariff-rb" htmlFor={data.tariff_id}>
                          <p>{data.tariff_name}</p>
                          <input type="radio" id={data.tariff_id} name="gas_tariff" value={data.tariff_name} />
                        </label>
                      </div>
                    ))}

                    {supplier_code_gs === 'IDK' ?
                      expensier_tariff
                      :
                      (
                        <div className="form-tariff-rb-content" onClick={() => update_select_gas_only(true)}>
                          <label className="form-tariff-rb" htmlFor="other">
                            <p>Other</p>
                            <input type="radio" id="other" name="gas_tariff" value='' />
                          </label>
                        </div>
                      )}

                    {select_gas_only ?
                      (
                        <>
                          <div className="form-tariff-select">
                            <select id="selected_gas_tariff" className="supply-information-input">
                              <option value="">- Select - </option>
                              {filter_by_property(gas_tariffs, supplier_id_gs).map((data) => (
                                <option value={data.tariff_name} id={data.tariff_id + '_option'} key={data.tariff_id}>{data.tariff_name}</option>
                              ))}
                              <option value="tariff_not_listed" id="not_listed_gs">My tariff is not listed</option>
                            </select>
                            <i className="edit-icon fas fa-search" onClick={(e) => HandleSearchGS(e)}></i>
                          </div>
                          <button className="form-tariff-not-listed" onClick={(e) => tariff_not_listed_gas(e)}>My tariff is not listed</button>
                        </>
                      )
                      :
                      null
                    }
                  </form>
                </>
              )
              :
              null
            }

            {/* Dual active */}
            {dual_active ?
              same_supplier ?
                (
                  <>
                    <form className="form-tariff-rb-container" onChange={(e) => handleChangeTariffDual(e)}>
                      {filter_by_property(dual_tariffs, supplier_id_dual).slice(0, 3).map((data) => (
                        <div className="form-tariff-rb-content" key={data.tariff_id} onClick={() => update_select_dual_only(false)}>
                          <label className="form-tariff-rb" htmlFor={data.tariff_id}>
                            <p>{data.tariff_name}</p>
                            <input type="radio" id={data.tariff_id} name="dual_tariff" value={data.tariff_name} />
                          </label>
                        </div>
                      ))}

                      {supplier_code_es === 'IDK' ?
                        expensier_tariff
                        :
                        (
                          <div className="form-tariff-rb-content" onClick={() => update_select_dual_only(true)}>
                            <label className="form-tariff-rb" htmlFor="other">
                              <p>Other</p>
                              <input type="radio" id="other" name="dual_tariff" value='' />
                            </label>
                          </div>
                        )}

                      {select_dual_only ?
                        (
                          <>
                            <div className="form-tariff-select">
                              <select id="selected_dual_tariff" className="supply-information-input">
                                <option value="">- Select - </option>
                                {filter_by_property(dual_tariffs, supplier_id_dual).map((data) => (
                                  <option value={data.tariff_name} id={data.tariff_id + '_option'} key={data.tariff_id}>{data.tariff_name}</option>
                                ))}
                                <option value="tariff_not_listed" id="not_listed_es">My tariff is not listed</option>
                              </select>
                              <i className="edit-icon fas fa-search" onClick={(e) => HandleSearchDual(e)}></i>
                            </div>
                            <button className="form-tariff-not-listed" onClick={(e) => tariff_not_listed_elec(e)}>My tariff is not listed</button>
                          </>

                        )
                        :
                        null
                      }
                    </form>
                  </>
                )
                :
                (
                  <>
                    <div className="form-tariff-rb-dual-container">
                      <form className="form-tariff-rb-container-custom" onChange={(e) => handleChangeTariffES(e)}>
                        <h1>Electricity tariff</h1>
                        {filter_by_property(elec_tariffs, supplier_id_es).slice(0, 3).map((data) => (
                          <div className="form-tariff-rb-content" key={data.tariff_id} onClick={() => update_select_elec_only(false)}>
                            <label className="form-tariff-rb" htmlFor={data.tariff_id}>
                              <p>{data.tariff_name}</p>
                              <input type="radio" id={data.tariff_id} name="elec_tariff" value={data.tariff_name} />
                            </label>
                          </div>
                        ))}

                        {supplier_code_es === 'IDK' ?
                          expensier_tariff_elec
                          :
                          (
                            <div className="form-tariff-rb-content" onClick={() => update_select_elec_only(true)}>
                              <label className="form-tariff-rb" htmlFor="other_elec">
                                <p>Other</p>
                                <input type="radio" id="other_elec" name="elec_tariff" value='' />
                              </label>
                            </div>
                          )}

                        {select_elec_only ?
                          (
                            <>
                              <div className="form-tariff-select">
                                <select id="selected_elec_tariff" className="supply-information-input">
                                  <option value="">- Select - </option>
                                  {filter_by_property(elec_tariffs, supplier_id_es).map((data) => (
                                    <option value={data.tariff_name} id={data.tariff_id + '_option'} key={data.tariff_id}>{data.tariff_name}</option>
                                  ))}
                                  <option value="tariff_not_listed" id="not_listed_es">My tariff is not listed</option>
                                </select>
                                <i className="edit-icon fas fa-search" onClick={(e) => HandleSearchES(e)}></i>
                              </div>
                              <button className="form-tariff-not-listed" onClick={(e) => tariff_not_listed_elec(e)}>My tariff is not listed</button>
                            </>
                          )
                          :
                          null
                        }
                      </form>

                      <form className="form-tariff-rb-container" onChange={(e) => handleChangeTariffGS(e)}>
                        <h1>Gas tariff</h1>
                        {filter_by_property(gas_tariffs, supplier_id_gs).slice(0, 3).map((data) => (
                          <div className="form-tariff-rb-content" key={data.tariff_id} onClick={() => update_select_gas_only(false)}>
                            <label className="form-tariff-rb" htmlFor={data.tariff_id}>
                              <p>{data.tariff_name}</p>
                              <input type="radio" id={data.tariff_id} name="gas_tariff" value={data.tariff_name} />
                            </label>
                          </div>
                        ))}

                        {supplier_code_gs === 'IDK' ?
                          expensier_tariff_gas
                          :
                          (
                            <div className="form-tariff-rb-content" onClick={() => update_select_gas_only(true)}>
                              <label className="form-tariff-rb" htmlFor="other_gas">
                                <p>Other</p>
                                <input type="radio" id="other_gas" name="gas_tariff" value='' />
                              </label>
                            </div>
                          )}

                        {select_gas_only ?
                          (
                            <>
                              <div className="form-tariff-select">
                                <select id="selected_gas_tariff" className="supply-information-input">
                                  <option value="">- Select - </option>
                                  {filter_by_property(gas_tariffs, supplier_id_gs).map((data) => (
                                    <option value={data.tariff_name} id={data.tariff_id + '_option'} key={data.tariff_id}>{data.tariff_name}</option>
                                  ))}
                                  <option value="tariff_not_listed" id="not_listed_gs">My tariff is not listed</option>
                                </select>
                                <i className="edit-icon fas fa-search" onClick={(e) => HandleSearchGS(e)}></i>
                              </div>
                              <button className="form-tariff-not-listed" onClick={(e) => tariff_not_listed_gas(e)}>My tariff is not listed</button>
                            </>
                          )
                          :
                          null
                        }
                      </form>
                    </div>
                  </>
                )
              :
              null
            }

            {error ?
              (
                <div className="error-center">
                  <Error message="Please select a tariff" />
                </div>
              )
              :
              null
            }

            {/* Buttons */}
            <div className="form-tariff-btn-container">
              <button className="form-tariff-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button className="form-tariff-btn btn-next" onClick={(e) => sendTariff(e)}>
                Continue
                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-tariff">
                <div className="script-tariff">
                  <FormScript />
                </div>

                <div className="assistant-tariff-custom">
                  <FormAssistant tips="Hello world" />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-tariff">
                <FormAssistant tips="Hello world" />
              </div>
            </div>
          }

        </div>
      </section>
    </>
  );
};

export default FormTariffs;
