import React, { useState, useEffect } from "react";
// Styles
import "./FormCompare.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Data
import data_electricity_tariffs from '../../../utilities/data_tariffs/data_tariffs_es/data_electricity_tariffs';
import data_gas_tariffs from '../../../utilities/data_tariffs/data_tariff_gs/data_gas_tariffs';
import data_dual_tariffs from '../../../utilities/data_tariffs/data_tariff_dual/data_dual_tariffs';
// Swal
import swal from '@sweetalert/with-react';
// Phone Number Validation
import { parsePhoneNumber } from 'libphonenumber-js';
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from "../FormAssistant/FormAssistant";
import Error from '../../Error/Error';
import ReviewStars from '../../ReviewStars/ReviewStars';

function FormCompare({ customerInformation, user, electricityInformation, gasInformation, avgElec, avgGas, showScript, progressBar, updateCustomerInformation, updateShowOverlay, updateShowFormCompare, updateShowFormUsageKWH, updateShowFormUsageGBP_es, updateShowFormUsageAVG, updateShowFormUsageGAS, updateShowFormUsageGBP_gs, updateShowFormDetails, updateShowFormDebt, updateProgressBar }) {
  /** STATES */
  // Content Loaded state
  const [contentLoaded, updateContentLoaded] = useState(false);
  const [content, updateContent] = useState({});
  const [array_to, update_array_to] = useState(3);
  const [bestMatch, setBestMatch] = useState({});
  const [usage_expended, update_usage_expended] = useState({});
  const [usage_expended_elec, update_usage_expended_elec] = useState({});
  const [usage_expended_gas, update_usage_expended_gas] = useState({});

  // Error State
  const [error, updateError] = useState(false);

  /** FUNCTIONS */

  /**---- */
  // Function to create a new array without the same supplier
  // Sorted data
  // const sorted_data = sorted_data_desc.filter(function (obj) {
  //   return obj.supplier_code !== 'EDF';
  // });
  /**---- */

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Error smooth scroll
  useEffect(() => {
    if (error) {
      const scroll_to = () => {
        var element = document.querySelector("#error");
        // smooth scroll to element and align it at the bottom
        element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
      }

      scroll_to()
    }
  }, [error]);

  // Data
  const elec_data = data_electricity_tariffs.tariffs;
  const gas_data = data_gas_tariffs.tariffs;
  const dual_data = data_dual_tariffs.tariffs;

  /** Variables */
  // same_supplier
  const same_supplier = customerInformation.fuel_description.same_supplier;
  // dual_active
  const dual_active = customerInformation.fuel_description.dual_active;
  // gas_only
  const gas_only = customerInformation.fuel_description.gas_only;
  // elec_only
  const elec_only = customerInformation.fuel_description.elec_only;
  // postcode_formatted
  const postcode_formatted = customerInformation.customerAddres.postcode.replace(/\s/g, '').trim().toLowerCase();
  // doornumber_formatted
  const doornumber_formatted = customerInformation.customerAddres.doornumber.replace(/\s/g, '').trim().toLowerCase();
  // uid
  const uid = `${postcode_formatted}-${doornumber_formatted}`;

  // Show more button
  let up_to = 0;
  const load_more = (e) => {
    e.preventDefault();
    if (up_to === up_to) {
      up_to = array_to + 3;
      return update_array_to(up_to);
    }
  }

  // Execute Overlay
  useEffect(() => {
    // Show Overlay
    updateShowOverlay(true);
  }, [FormCompare]);

  // Function to sort the JSON by property
  const sortByProperty = (property) => {
    return function (a, b) {
      if (a[property] > b[property])
        return 1;
      else if (a[property] < b[property])
        return -1;

      return 0;
    }
  }

  // Information for elec_only
  useEffect(() => {
    // Elec_only
    if (elec_only) {
      // console.log('elec_only');
      if (customerInformation.hasOwnProperty('usage_kwh_description')) {
        // Usage introduced
        const usage_kwh_expended = customerInformation.usage_kwh_description.usage_kwh_expended;
        // Period introduced
        const usage_kwh_period = customerInformation.usage_kwh_description.usage_kwh_period;

        let usage_by_period = 0;
        if (usage_kwh_period === 'annu') {
          usage_by_period = (parseFloat(usage_kwh_expended) * 1);
        } else {
          usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
        }

        // console.log(customerInformation.tariff_description);
        // console.log(usage_by_period);

        // Unit rate of tariff selected
        const tariff_unit_rate = customerInformation.tariff_description.unit_rate;
        // Usage by period
        // const usage = ((usage_by_period * tariff_unit_rate) / 100);
        const usage = (usage_by_period * ((tariff_unit_rate) / 100));

        // Sorted data desc
        const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost

        /**------ */
        // Sorted data
        // const sorted_data = sorted_data_desc.filter(function (obj) {
        //   return obj.supplier_code !== 'EDF';
        // });
        /**------ */

        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);
      }

      if (customerInformation.hasOwnProperty('usage_gbp_description_es')) {
        // Usage introduced
        const usage_gbp_expended = customerInformation.usage_gbp_description_es.usage_gbp_expended;
        // Period introduced
        const usage_gbp_period = customerInformation.usage_gbp_description_es.usage_gbp_period;
        let usage_by_period = 0;
        if (usage_gbp_period === 'annu') {
          usage_by_period = (parseFloat(usage_gbp_expended) * 1);
        } else {
          usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
        }

        // Sorted data
        const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage_by_period
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);
      }

      if (customerInformation.hasOwnProperty('usage_property_size_es')) {
        // Usage introduced
        const usage_size_expended = customerInformation.usage_property_size_es.usage_size_expended;
        
        // Unit rate of tariff selected
        const tariff_unit_rate = customerInformation.tariff_description.unit_rate;
        // Usage by period
        const usage = ((usage_size_expended * tariff_unit_rate) / 100);

        console.log(usage_size_expended);
        console.log(tariff_unit_rate);
        console.log(usage / 12)

        // Sorted data
        const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);
      }
    }
  }, [elec_only]);

  // Information for gas_only
  useEffect(() => {
    // Gas_only
    if (gas_only) {
      // console.log('gas_only');
      if (customerInformation.hasOwnProperty('usage_gas_description')) {
        // Usage introduced
        const usage_kwh_expended = customerInformation.usage_gas_description.usage_kwh_expended;
        // Period introduced
        const usage_kwh_period = customerInformation.usage_gas_description.usage_kwh_period;
        // Usage by period
        let usage_by_period = 0;
        if (usage_kwh_period === 'annu') {
          usage_by_period = (parseFloat(usage_kwh_expended) * 1);
        } else {
          usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
        }
        // Unit rate of tariff selected
        const tariff_unit_rate = customerInformation.tariff_description.unit_rate;
        // Usage by period
        const usage = ((usage_by_period * tariff_unit_rate) / 100);

        // Sorted data
        const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);

      }

      if (customerInformation.hasOwnProperty('usage_gbp_description_gs')) {
        // Usage introduced
        const usage_gbp_expended = customerInformation.usage_gbp_description_gs.usage_gbp_expended;
        // Period introduced
        const usage_gbp_period = customerInformation.usage_gbp_description_gs.usage_gbp_period;
        let usage_by_period = 0;
        if (usage_gbp_period === 'annu') {
          usage_by_period = (parseFloat(usage_gbp_expended) * 1);
        } else {
          usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
        }
        // Sorted data
        const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage_by_period
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);
      }

      if (customerInformation.hasOwnProperty('usage_property_size_gs')) {
        // Usage introduced
        const usage_size_expended = parseFloat(customerInformation.usage_property_size_gs.usage_size_expended);

        // Usage introduced for gas
        let usage_size_expended_gas;

        // 1 bedroom
        if (usage_size_expended === 1800) {
          // Unit rate of tariff selected gas
          usage_size_expended_gas = 8000;
        }

        // 2 to 3 bedrooms
        if (usage_size_expended === 2900) {
          // Unit rate of tariff selected gas
          usage_size_expended_gas = 12000;
        }

        // 4+ bedrooms
        if (usage_size_expended === 4300) {
          // Unit rate of tariff selected gas
          usage_size_expended_gas = 17000;
        }

        // Unit rate of tariff selected
        const tariff_unit_rate = customerInformation.tariff_description.unit_rate;
        // Usage by period
        const usage = ((usage_size_expended_gas * tariff_unit_rate) / 100);

        // Sorted data
        const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
        // Add content
        updateContent({
          ...content,
          sorted_data
        });

        // Update state
        update_usage_expended({
          ...usage_expended,
          usage: usage
        });

        // Show content;
        updateContentLoaded(true);
        // Hidde Overlay
        updateShowOverlay(false);
      }
    }
  }, [gas_only]);

  // Information for dual_active
  useEffect(() => {
    // Dual active
    if (dual_active) {

      // Sorted data
      const sorted_data = dual_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost

      // Add content
      updateContent({
        ...content,
        sorted_data
      });

      if (same_supplier) {
        // Sorted data
        // console.log('Same supplier === true');

        /**- KWH SECTION -*/
        // KWH - ELEC
        if (customerInformation.hasOwnProperty('usage_kwh_description')) {
          // Usage introduced
          const usage_kwh_expended = customerInformation.usage_kwh_description.usage_kwh_expended;
          // Period introduced
          const usage_kwh_period = customerInformation.usage_kwh_description.usage_kwh_period;
          let usage_by_period = 0;
          if (usage_kwh_period === 'annu') {
            usage_by_period = (parseFloat(usage_kwh_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
          }

          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description.unit_rate_elec;
          // console.log(tariff_unit_rate);
          // Usage by period
          const usage_elec = ((usage_by_period * tariff_unit_rate) / 100);

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage_elec
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // KWH - GAS
        if (customerInformation.hasOwnProperty('usage_gas_description')) {
          // Usage introduced
          const usage_kwh_expended = customerInformation.usage_gas_description.usage_kwh_expended;
          // Period introduced
          const usage_kwh_period = customerInformation.usage_gas_description.usage_kwh_period;
          let usage_by_period = 0;
          if (usage_kwh_period === 'annu') {
            usage_by_period = (parseFloat(usage_kwh_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
          }

          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description.unit_rate_gas;
          // console.log(tariff_unit_rate);
          // Usage by period
          const usage_gas = ((usage_by_period * tariff_unit_rate) / 100);

          // console.log(usage_gas);

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage_gas
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        /**- GBP SECTION */
        // GBP - ELEC
        if (customerInformation.hasOwnProperty('usage_gbp_description_es')) {
          // Usage introduced
          const usage_gbp_expended = customerInformation.usage_gbp_description_es.usage_gbp_expended;
          // Period introduced
          const usage_gbp_period = customerInformation.usage_gbp_description_es.usage_gbp_period;
          let usage_by_period = 0;
          if (usage_gbp_period === 'annu') {
            usage_by_period = (parseFloat(usage_gbp_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
          }

          // // Sorted data
          // const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage_by_period
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // GBP - GAS
        if (customerInformation.hasOwnProperty('usage_gbp_description_gs')) {
          // Usage introduced
          const usage_gbp_expended = customerInformation.usage_gbp_description_gs.usage_gbp_expended;
          // Period introduced
          const usage_gbp_period = customerInformation.usage_gbp_description_gs.usage_gbp_period;
          let usage_by_period = 0;
          if (usage_gbp_period === 'annu') {
            usage_by_period = (parseFloat(usage_gbp_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
          }
          // // Sorted data
          // const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage_by_period
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        /**- PROPERTY SIZE SECTION -*/
        // PROPERTY SIZE - ELEC
        if (customerInformation.hasOwnProperty('usage_property_size_es')) {

          // Usage introduced
          const usage_size_expended = customerInformation.usage_property_size_es.usage_size_expended;
          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description.unit_rate_elec;
          // Usage by period
          const usage = ((usage_size_expended * tariff_unit_rate) / 100);
          // // Sorted data
          // const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // PROPERTY SIZE - GAS
        if (customerInformation.hasOwnProperty('usage_property_size_gs')) {
          // Usage introduceds
          const usage_size_expended = parseFloat(customerInformation.usage_property_size_gs.usage_size_expended);
          // Usage introduced for gas
          let usage_size_expended_gas;

          // 1 bedroom
          if (usage_size_expended === 1800) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 8000;
          }

          // 2 to 3 bedrooms
          if (usage_size_expended === 2900) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 12000;
          }

          // 4+ bedrooms
          if (usage_size_expended === 4300) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 17000;
          }

          // console.log(usage_size_expended_gas);

          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description.unit_rate_gas;
          // Usage by period
          const usage = ((usage_size_expended_gas * tariff_unit_rate) / 100);

          // // Sorted data
          // const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // PROPERTY_SIZE_DUAL
        if (customerInformation.hasOwnProperty('usage_property_size_dual')) {
          // Usage introduced for elec
          const usage_size_expended_elec = parseFloat(customerInformation.usage_property_size_dual.usage_size_expended);
          // Usage introduced for gas
          let usage_size_expended_gas;

          // 1 bedroom
          if (usage_size_expended_elec === 1800) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 8000;
          }

          // 2 to 3 bedrooms
          if (usage_size_expended_elec === 2900) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 12000;
          }

          // 4+ bedrooms
          if (usage_size_expended_elec === 4300) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 17000;
          }

          // Unit rate of tariff selected elec
          const tariff_unit_rate_elec = customerInformation.tariff_description.unit_rate_elec;
          // Unit rate of tariff selected gas
          const tariff_unit_rate_gas = customerInformation.tariff_description.unit_rate_gas;

          // Usage by period
          const usage_elec = ((usage_size_expended_elec * tariff_unit_rate_elec) / 100);
          const usage_gas = ((usage_size_expended_gas * tariff_unit_rate_gas) / 100);

          const usage = usage_elec + usage_gas;

          // // Sorted data
          // const sorted_data = dual_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended({
            ...usage_expended,
            usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

      } else {
        // console.log('Same supplier === false');
        /**- KWH SECTION -*/
        // KWH - ELEC
        if (customerInformation.hasOwnProperty('usage_kwh_description')) {
          // Usage introduced
          const usage_kwh_expended = customerInformation.usage_kwh_description.usage_kwh_expended;
          // Period introduced
          const usage_kwh_period = customerInformation.usage_kwh_description.usage_kwh_period;
          let usage_by_period = 0;
          if (usage_kwh_period === 'annu') {
            usage_by_period = (parseFloat(usage_kwh_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
          }

          // Unit rate of tariff selected
          const tariff_unit_rate_elec = customerInformation.tariff_description_elec.elec_tariff.unit_rate;
          // Usage by period
          const usage_elec = ((usage_by_period * tariff_unit_rate_elec) / 100);

          // console.log(usage_elec);

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage_elec
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // KWH - GAS
        if (customerInformation.hasOwnProperty('usage_gas_description')) {
          // Usage introduced
          const usage_kwh_expended = customerInformation.usage_gas_description.usage_kwh_expended;
          // Period introduced
          const usage_kwh_period = customerInformation.usage_gas_description.usage_kwh_period;
          let usage_by_period = 0;
          if (usage_kwh_period === 'annu') {
            usage_by_period = (parseFloat(usage_kwh_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_kwh_expended) * 12));
          }

          // Unit rate of tariff selected
          const tariff_unit_rate_gas = customerInformation.tariff_description_gas.gas_tariff.unit_rate;
          // Usage by period
          const usage_gas = ((usage_by_period * tariff_unit_rate_gas) / 100);

          // console.log(usage_gas);

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage_gas
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        /**- GBP SECTION */
        // GBP - ELEC
        if (customerInformation.hasOwnProperty('usage_gbp_description_es')) {
          // Usage introduced
          const usage_gbp_expended = customerInformation.usage_gbp_description_es.usage_gbp_expended;
          // Period introduced
          const usage_gbp_period = customerInformation.usage_gbp_description_es.usage_gbp_period;
          let usage_by_period = 0;
          if (usage_gbp_period === 'annu') {
            usage_by_period = (parseFloat(usage_gbp_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
          }

          // // Sorted data
          // const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage_by_period
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // GBP - GAS
        if (customerInformation.hasOwnProperty('usage_gbp_description_gs')) {
          // Usage introduced
          const usage_gbp_expended = customerInformation.usage_gbp_description_gs.usage_gbp_expended;
          // Period introduced
          const usage_gbp_period = customerInformation.usage_gbp_description_gs.usage_gbp_period;
          let usage_by_period = 0;
          if (usage_gbp_period === 'annu') {
            usage_by_period = (parseFloat(usage_gbp_expended) * 1);
          } else {
            usage_by_period = Math.round((parseFloat(usage_gbp_expended) * 12));
          }
          // // Sorted data
          // const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage_by_period
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        /**- PROPERTY SIZE SECTION -*/
        // PROPERTY SIZE - ELEC
        if (customerInformation.hasOwnProperty('usage_property_size_es')) {
          // Usage introduced
          const usage_size_expended = customerInformation.usage_property_size_es.usage_size_expended;

          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description_elec.elec_tariff.unit_rate;
          // Usage by period
          const usage = ((usage_size_expended * tariff_unit_rate) / 100);

          // // Sorted data
          // const sorted_data = elec_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_elec({
            ...usage_expended_elec,
            usage: usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // PROPERTY SIZE - GAS
        if (customerInformation.hasOwnProperty('usage_property_size_gs')) {
          // Usage introduceds
          const usage_size_expended = parseFloat(customerInformation.usage_property_size_gs.usage_size_expended);
          // Usage introduced for gas
          let usage_size_expended_gas;

          // 1 bedroom
          if (usage_size_expended === 1800) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 8000;
          }

          // 2 to 3 bedrooms
          if (usage_size_expended === 2900) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 12000;
          }

          // 4+ bedrooms
          if (usage_size_expended === 4300) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 17000;
          }

          // console.log(usage_size_expended_gas);

          // Unit rate of tariff selected
          const tariff_unit_rate = customerInformation.tariff_description_gas.gas_tariff.unit_rate;
          // Usage by period
          const usage = ((usage_size_expended_gas * tariff_unit_rate) / 100);

          // // Sorted data
          // const sorted_data = gas_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended_gas({
            ...usage_expended_gas,
            usage: usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }

        // PROPERTY_SIZE_DUAL
        if (customerInformation.hasOwnProperty('usage_property_size_dual')) {
          // Usage introduced for elec
          const usage_size_expended_elec = parseFloat(customerInformation.usage_property_size_dual.usage_size_expended);
          // Usage introduced for gas
          let usage_size_expended_gas;

          // 1 bedroom
          if (usage_size_expended_elec === 1800) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 8000;
          }

          // 2 to 3 bedrooms
          if (usage_size_expended_elec === 2900) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 12000;
          }

          // 4+ bedrooms
          if (usage_size_expended_elec === 4300) {
            // Unit rate of tariff selected gas
            usage_size_expended_gas = 17000;
          }

          // Unit rate of tariff selected elec
          const tariff_unit_rate_elec = customerInformation.tariff_description_elec.elec_tariff.unit_rate;
          // Unit rate of tariff selected gas
          const tariff_unit_rate_gas = customerInformation.tariff_description_gas.gas_tariff.unit_rate;

          // Usage by period
          const usage_elec = ((usage_size_expended_elec * tariff_unit_rate_elec) / 100);
          const usage_gas = ((usage_size_expended_gas * tariff_unit_rate_gas) / 100);

          const usage = usage_elec + usage_gas;

          // // Sorted data
          // const sorted_data = dual_data.sort(sortByProperty("monthly_cost")); // Sort according to monthly cost
          // // Add content
          // updateContent({
          //   ...content,
          //   sorted_data
          // });

          // Update state
          update_usage_expended({
            ...usage_expended,
            usage
          });

          // Show content;
          updateContentLoaded(true);
          // Hidde Overlay
          updateShowOverlay(false);
        }
      }
    }
  }, [dual_active]);

  // Sorted data
  let sorted_data = content.sorted_data;

  // usage
  let usage = usage_expended.usage;

  // const usage_gas
  const usage_gas = usage_expended_gas.usage;

  // const usage_elec
  const usage_elec = usage_expended_elec.usage;

  if ((dual_active)) {
    if (customerInformation.hasOwnProperty('usage_property_size_dual')) {
      usage = usage_expended.usage;
    } else {
      usage = (usage_elec + usage_gas);
    }
  }

  // console.log(usage);
  // console.log(usage_elec);
  // console.log(usage_gas);

  // Tariff info button - function to show modal
  const tariff_info = (e, data) => {
    e.preventDefault();

    swal({
      className: 'swal-modal_custom',
      content: (
        <>
          <div className="form-compare-details-info-container">
            <div className="form-compare-details-info">
              <div className="form-compare-details-info-img">
                <img src={data.supplier_img} alt="" />
              </div>

              <h3>Tariff details</h3>

              <div className="form-compare-details-container">
                <div className="form-compare-single-details">
                  <p>Supplier: <span>{data.supplier_name}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Plan name: <span>{data.tariff_name}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <ReviewStars stars={data.review_rating} customClass={true} />
                </div>

                <div className="form-compare-single-details">
                  <p>Early exit fee: <span>£{data.exit_fees}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Estimated annual cost: <span>£{data.annual_cost}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Monthly direct debit: <span>£{data.monthly_cost}</span></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    });
  };

  // choosePlan button
  const choosePlan = async (e, data) => {
    e.preventDefault();

    // Update Error
    updateError(false);

    // ID of card selected
    const card_id = e.target.id;
    // Selected card
    const card_content = document.getElementById(card_id);

    // Add class active
    card_content.classList.add('active-card');

    // Add and remove class
    let active_class = document.querySelectorAll(".active-card");
    [].forEach.call(active_class, function (el) {
      el.classList.remove("active-card");
    });

    if (card_id === sorted_data[0].tariff_id) {
      card_content.className = "form-compare-card-content active-card bestMatch-card";
    } else {
      card_content.className = "form-compare-card-content active-card";
    }

    // SWAL
    await swal({
      className: 'swal-modal_address',
      buttons: {
        cancel: "Go back",
        confirm: "Choose plan"
      },
      content: (
        <>
          <div className="form-compare-details-info-container">
            <div className="form-compare-details-info">
              <div className="form-compare-details-info-img">
                <img src={data.supplier_img} alt="Energy provider" />
              </div>
              <div className="form-compare-card-estimated-container">
                <div className="form-compare-card-estimated">
                  <p>Estimated cost</p>
                  <p className="form-compare-card-estimated-amount"><span>£</span>{(usage - data.annual_cost).toFixed(2)}</p>
                  <p>(£{((usage - data.annual_cost) / 12).toFixed(2)} pm)</p>
                </div>
              </div>

              {/* <div className="form-compare-card-btn-signup-container">
                <button className="form-compare-card-btn-custom btn-signup" onClick={(data) => console.log(data)}>Choose plan</button>
              </div> */}

              <h3>Tariff details</h3>

              <div className="form-compare-details-container">
                <div className="form-compare-single-details">
                  <p>Supplier: <span>{data.supplier_name}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Plan name: <span>{data.tariff_name}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <ReviewStars stars={data.review_rating} customClass={true} />
                </div>

                <div className="form-compare-single-details">
                  <p>Early exit fee: <span>£{data.exit_fees}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Estimated annual cost: <span>£{data.annual_cost}</span></p>
                </div>

                <div className="form-compare-single-details">
                  <p>Monthly direct debit: <span>£{data.monthly_cost}</span></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }).then(async (result) => {

      if (result !== true) {
        // Hide Overlay
        updateShowOverlay(false);
        return;
      };

      //Show Overlay
      updateShowOverlay(true);

      // Supplier selected
      const supplier_selected = content.sorted_data.find(element => element.tariff_id == card_id);

      // Switching details
      const switching_details = {
        supplier_selected
      }

      // Updating best match content
      const { tariff_name, supplier_name } = supplier_selected;

      setBestMatch({
        ...bestMatch,
        tariff_name,
        supplier_name
      });

      // Email agent
      const agentEmail = { "email": user.email };

      // Endpoint
      const url = 'https://zohocontactcreatefunction.azurewebsites.net/api/HttpTrigger1?method=verifyContact';
      // Fetch customer data
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(agentEmail),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        if (response.status !== 200) {
          return Promise.reject(response.json());
        }

        return response.json();
      }).then((response) => {
        // console.log(response);
        // Update Customer informatin
        updateCustomerInformation({
          ...customerInformation,
          agent: { email: user.email },
          customerDetails: {
            first_name: response.first_name ? response.first_name : '',
            last_name: response.last_name ? response.last_name : '',
            email: response.email ? response.email : '',
            phone: response.phone ? parsePhoneNumber(response.phone, 'GB').number : ''
          },
          switching_details
        });

        // Hide Overlay
        updateShowOverlay(false);
        // Update Error
        updateError(false);
        // Hide Form Compare
        updateShowFormCompare(false);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 8 });
        // Show Details
        updateShowFormDetails(true);

        return response;

      }).catch((error) => {
        // Error
        console.error(`Catch an error fetching to postcoder ${error}`);
        // Update Customer informatin
        updateCustomerInformation({
          ...customerInformation,
          agent: { email: user.email },
          customerDetails: {
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
          },
          switching_details
        });

        // Hide Overlay
        updateShowOverlay(false);
        // Update Error
        updateError(false);
        // Hide Form Compare
        updateShowFormCompare(false);
        // Update Progress Bar
        updateProgressBar({ ...progressBar, step: 8 });
        // Show Details
        updateShowFormDetails(true);
      });
    });
  };

  // cardSelected
  const cardSelected = (e, id) => {
    e.preventDefault();

    // Update Error
    updateError(false);

    /**-- Adding active state to the card selected --*/
    // ID of card selected
    const card_id = id;
    // Selected card
    const card_content = document.getElementById(card_id);

    // Add class active
    card_content.classList.add('active-card');

    // Add and remove class
    let active_class = document.querySelectorAll(".active-card");
    [].forEach.call(active_class, function (el) {
      el.classList.remove("active-card");
    });

    if (card_id === sorted_data[0].tariff_id) {
      card_content.className = "form-compare-card-content active-card bestMatch-card";
    } else {
      card_content.className = "form-compare-card-content active-card";
    }

    // Supplier selected
    const supplier_selected = content.sorted_data.find(element => element.tariff_id == card_id);

    // Switching details
    const switching_details = {
      supplier_selected
    }

    // Update customer information
    updateCustomerInformation({
      ...customerInformation,
      switching_details
    });

    // Updating best match content
    const { tariff_name, supplier_name } = supplier_selected;

    setBestMatch({
      ...bestMatch,
      tariff_name,
      supplier_name
    });
  };

  // Adding initial customer data to firebase (Coming from Supply cc)
  useEffect(() => {
    /**-- Firebase --*/
    (async () => {
      const { customerAddres, useGas, fuel, fuel_description, supplierInformation, electricityPaymentType, gasPaymentType, economy7, tariff_description, tariff_description_elec, tariff_description_gas, usage_property_size_dual, usage_property_size_es, usage_property_size_gs, usage_gas_description, usage_gbp_description_gs, usage_kwh_description, usage_gbp_description_es, debt } = customerInformation;

      // elec_only || gas_only
      if (elec_only || gas_only) {
        db.collection("customers").doc(uid).set({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          step: 7,
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
          economy7: {
            economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
            economy7_split: economy7.economy7_split ? economy7.economy7_split : false
          },
          tariff_description,
          // AVG
          usage_property_size_dual: {
            usage_size_entered: !!usage_property_size_dual ? usage_property_size_dual.usage_size_entered : false,
            usage_size_expended: !!usage_property_size_dual ? usage_property_size_dual.usage_size_expended : false
          },
          usage_property_size_es: {
            usage_size_entered: !!usage_property_size_es ? usage_property_size_es.usage_size_entered : false,
            usage_size_expended: !!usage_property_size_es ? usage_property_size_es.usage_size_expended : false,
          },
          usage_property_size_gs: {
            usage_size_entered: !!usage_property_size_gs ? usage_property_size_gs.usage_size_entered : false,
            usage_size_expended: !!usage_property_size_gs ? usage_property_size_gs.usage_size_expended : false
          },
          // GAS
          usage_gas_description: {
            usage_kwh_entered: !!usage_gas_description ? usage_gas_description.usage_kwh_entered : false,
            usage_kwh_expended: !!usage_gas_description ? usage_gas_description.usage_kwh_expended : false,
            usage_kwh_period: !!usage_gas_description ? usage_gas_description.usage_kwh_period : false
          },
          usage_gbp_description_gs: {
            usage_gbp_entered: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_entered : false,
            usage_gbp_expended: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_expended : false,
            usage_gbp_period: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_period : false
          },
          // Elec
          usage_kwh_description: {
            usage_kwh_entered: !!usage_kwh_description ? usage_kwh_description.usage_kwh_entered : false,
            usage_kwh_expended: !!usage_kwh_description ? usage_kwh_description.usage_kwh_expended : false,
            usage_kwh_period: !!usage_kwh_description ? usage_kwh_description.usage_kwh_period : false
          },
          usage_gbp_description_es: {
            usage_gbp_entered: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_entered : false,
            usage_gbp_expended: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_expended : false,
            usage_gbp_period: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_period : false
          },
          // AVG ELEC
          avgElec: avgElec,
          // AVG Gas
          avgGas: avgGas,
          debt
        });
      }

      // dual_active
      if (dual_active) {
        // same_supplier
        if (same_supplier) {
          db.collection("customers").doc(uid).set({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            step: 7,
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
            economy7: {
              economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
              economy7_split: economy7.economy7_split ? economy7.economy7_split : false
            },
            tariff_description,
            // AVG
            usage_property_size_dual: {
              usage_size_entered: !!usage_property_size_dual ? usage_property_size_dual.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_dual ? usage_property_size_dual.usage_size_expended : false
            },
            usage_property_size_es: {
              usage_size_entered: !!usage_property_size_es ? usage_property_size_es.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_es ? usage_property_size_es.usage_size_expended : false,
            },
            usage_property_size_gs: {
              usage_size_entered: !!usage_property_size_gs ? usage_property_size_gs.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_gs ? usage_property_size_gs.usage_size_expended : false
            },
            // GAS
            usage_gas_description: {
              usage_kwh_entered: !!usage_gas_description ? usage_gas_description.usage_kwh_entered : false,
              usage_kwh_expended: !!usage_gas_description ? usage_gas_description.usage_kwh_expended : false,
              usage_kwh_period: !!usage_gas_description ? usage_gas_description.usage_kwh_period : false
            },
            usage_gbp_description_gs: {
              usage_gbp_entered: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_entered : false,
              usage_gbp_expended: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_expended : false,
              usage_gbp_period: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_period : false
            },
            // Elec
            usage_kwh_description: {
              usage_kwh_entered: !!usage_kwh_description ? usage_kwh_description.usage_kwh_entered : false,
              usage_kwh_expended: !!usage_kwh_description ? usage_kwh_description.usage_kwh_expended : false,
              usage_kwh_period: !!usage_kwh_description ? usage_kwh_description.usage_kwh_period : false
            },
            usage_gbp_description_es: {
              usage_gbp_entered: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_entered : false,
              usage_gbp_expended: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_expended : false,
              usage_gbp_period: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_period : false
            },
            // AVG ELEC
            avgElec: avgElec,
            // AVG Gas
            avgGas: avgGas
          });
        } else {
          db.collection("customers").doc(uid).set({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            step: 7,
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
            economy7: {
              economy7_apply: economy7.economy7_apply ? economy7.economy7_apply : false,
              economy7_split: economy7.economy7_split ? economy7.economy7_split : false
            },
            tariff_description_elec,
            tariff_description_gas,
            // AVG
            usage_property_size_dual: {
              usage_size_entered: !!usage_property_size_dual ? usage_property_size_dual.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_dual ? usage_property_size_dual.usage_size_expended : false
            },
            usage_property_size_es: {
              usage_size_entered: !!usage_property_size_es ? usage_property_size_es.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_es ? usage_property_size_es.usage_size_expended : false,
            },
            usage_property_size_gs: {
              usage_size_entered: !!usage_property_size_gs ? usage_property_size_gs.usage_size_entered : false,
              usage_size_expended: !!usage_property_size_gs ? usage_property_size_gs.usage_size_expended : false
            },
            // GAS
            usage_gas_description: {
              usage_kwh_entered: !!usage_gas_description ? usage_gas_description.usage_kwh_entered : false,
              usage_kwh_expended: !!usage_gas_description ? usage_gas_description.usage_kwh_expended : false,
              usage_kwh_period: !!usage_gas_description ? usage_gas_description.usage_kwh_period : false
            },
            usage_gbp_description_gs: {
              usage_gbp_entered: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_entered : false,
              usage_gbp_expended: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_expended : false,
              usage_gbp_period: !!usage_gbp_description_gs ? usage_gbp_description_gs.usage_gbp_period : false
            },
            // Elec
            usage_kwh_description: {
              usage_kwh_entered: !!usage_kwh_description ? usage_kwh_description.usage_kwh_entered : false,
              usage_kwh_expended: !!usage_kwh_description ? usage_kwh_description.usage_kwh_expended : false,
              usage_kwh_period: !!usage_kwh_description ? usage_kwh_description.usage_kwh_period : false
            },
            usage_gbp_description_es: {
              usage_gbp_entered: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_entered : false,
              usage_gbp_expended: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_expended : false,
              usage_gbp_period: !!usage_gbp_description_es ? usage_gbp_description_es.usage_gbp_period : false
            },
            // AVG ELEC
            avgElec: avgElec,
            // AVG Gas
            avgGas: avgGas
          });
        }
      }
    })();

  }, [FormCompare]);

  // goToCustomerDetails
  const goToCustomerDetails = async (e) => {
    e.preventDefault();

    if (!!customerInformation.hasOwnProperty('switching_details') === false) {
      // Update Error
      updateError(true);
      return;
    }

    //Show Overlay
    updateShowOverlay(true);

    // Email agent
    const agentEmail = { "email": user.email };

    // Endpoint
    const url = 'https://zohocontactcreatefunction.azurewebsites.net/api/HttpTrigger1?method=verifyContact';
    // Fetch customer data
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(agentEmail),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).then((response) => {
      // console.log(response);
      // Update Customer informatin
      updateCustomerInformation({
        ...customerInformation,
        agent: { email: user.email },
        customerDetails: {
          first_name: response.first_name ? response.first_name : '',
          last_name: response.last_name ? response.last_name : '',
          email: response.email ? response.email : '',
          phone: response.phone ? parsePhoneNumber(response.phone, 'GB').number : ''
        }
      });

      return response;
    }).catch((error) => {
      // Error
      console.error(`Catch an error fetching to postcoder ${error}`);
      // Update Customer informatin
      updateCustomerInformation({
        ...customerInformation,
        agent: { email: user.email },
        customerDetails: {
          first_name: '',
          last_name: '',
          email: '',
          phone: ''
        }
      });
    });

    // Hide Overlay
    updateShowOverlay(false);
    // Update Error
    updateError(false);
    // Hide Form Compare
    updateShowFormCompare(false);
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 9 });
    // Show Details
    updateShowFormDetails(true);
  }

  // Go Back
  const goBack = (e) => {
    e.preventDefault();

    // Update Error
    updateError(false);
    // Hide Form Compare
    updateShowFormCompare(false);
    // Delete Customer Usage
    const copy_customer_usage = { ...customerInformation };
    delete copy_customer_usage['debt'];
    delete copy_customer_usage['switching_details'];
    delete copy_customer_usage['customerDetails'];
    // Update customer information
    updateCustomerInformation({ ...copy_customer_usage });
    // Show Form Debt
    updateShowFormDebt(true)
    // Update Progress Bar
    updateProgressBar({ ...progressBar, step: 7 });
  }

  // Filterby
  const filterBy = (e) => {
    let target = e.target.value;

    // Hide error
    updateError(false);

    if (target === 'monthly_cost') {
      updateContent({
        ...content,
        sorted_data: sorted_data.sort(sortByProperty("monthly_cost"))
      });
    };

    if (target === 'exit_fees') {
      updateContent({
        ...content,
        sorted_data: sorted_data.sort(sortByProperty("exit_fees"))
      });
    };

    if (target === 'review_rating') {
      updateContent({
        ...content,
        sorted_data: sorted_data.sort(sortByProperty("review_rating")).reverse()
      });
    };

    if (target === 'supplier_code') {
      updateContent({
        ...content,
        sorted_data: sorted_data.sort(sortByProperty("supplier_code"))
      });
    };

    // Delete Customer Usage
    const copy_customer_usage = { ...customerInformation };
    delete copy_customer_usage['switching_details'];
    // Update customer information
    updateCustomerInformation({ ...copy_customer_usage });

    let activeCard_el = document.getElementsByClassName('active-card');
    if (activeCard_el.length > 0) {
      let activeCard_id = activeCard_el[0].id;
      let activeCard = document.getElementById(activeCard_id);
      activeCard.classList.remove('active-card');
    }

  }

  // Use Effect to select the best tariff (Monthly cost) in the first render
  useEffect(() => {
    if (content.hasOwnProperty('sorted_data')) {
      // Select best match
      let bestMatch = content.sorted_data[0];
      // Best match id
      let bestMatch_id = bestMatch.tariff_id;
      // Add active card to best match
      document.getElementById(bestMatch_id).classList.add('bestMatch-card');
      // Box deal Best Match
      let bestMatchBox = document.getElementById(`best_match${bestMatch_id}`);
      let select = document.getElementById('filterPlan');
      var selectedText = select.options[select.selectedIndex].text;
      // Adding text
      bestMatchBox.innerText = `Best match - By ${selectedText.toLowerCase()}`;
      bestMatchBox.style.padding = '.5rem 1rem'

      const { tariff_name, supplier_name } = bestMatch;

      setBestMatch({
        ...bestMatch,
        tariff_name,
        supplier_name
      });
    }
  }, [content]);

  return (
    <>
      <form>
        {contentLoaded ?
          (
            <section className="form-compare-section">
              <div className="form-compare-container">
                <div className="form-compare-content">
                  <div className="form-compare">
                    <h1>Results</h1>
                    <p>Thank you for answering my questions, I can see that if you switch to the <strong>{bestMatch.tariff_name}</strong> with <strong>{bestMatch.supplier_name}</strong> you will save <strong>*INSERT SAVINGS*</strong> per year! So it will be only <strong>£{bestMatch.monthly_cost}</strong> per month. This tariff also comes with <strong>*INSERT TARIFF BENEFIT*</strong>.</p>
                  </div>

                  <div className="filterBy-container">
                    <label htmlFor="filterPlan">Filter By</label>

                    <select name="plan" id="filterPlan" defaultValue="monthly_cost" onChange={(e) => filterBy(e)}>
                      <option value="">―</option>
                      <option value="saving">Savings</option>
                      <option value="renewal">Renewal</option>
                      <option value="monthly_cost">Monthly cost</option>
                      <option value="exit_fees">Exit fees</option>
                      <option value="review_rating">Reviews</option>
                      <option value="supplier_code">Supplier</option>
                    </select>
                  </div>

                  {sorted_data.slice(0, array_to).map((data) => (
                    <div key={data.tariff_id}>
                      <div className="sticky"><p id={`best_match${data.tariff_id}`}></p></div>
                      <div className="form-compare-card-container">
                        <div className="form-compare-card-content" id={data.tariff_id} onClick={(e) => cardSelected(e, data.tariff_id)}>
                          <div className="form-compare-card-column">
                            <div className="form-compare-card-row">
                              <div className="form-compare-card-supplier">
                                <div className="form-compare-card-image">
                                  <img src={data.supplier_img} />
                                </div>

                                <div className="form-compare-card-info">
                                  <h2>{data.tariff_name}</h2>
                                  <ReviewStars stars={data.review_rating} />
                                </div>
                              </div>
                            </div>

                            <hr className="hr-custom" />

                            <div className="form-compare-card-row">
                              <div className="form-compare-card-fees">
                                <p>Exit fees</p>
                                <p><span>£{data.exit_fees}</span></p>
                              </div>

                              <div className="form-compare-card-fixed">
                                <p>Fixed period</p>
                                <p><span>{data.fixed_period} months</span></p>
                              </div>

                              <div className="form-compare-card-cost">
                                <p>Monthly cost</p>
                                <p><span>£{data.monthly_cost}</span></p>
                              </div>
                            </div>
                          </div>

                          <div className="form-compare-card-column">
                            <div className="form-compare-card-row">
                              <div className="form-compare-card-btn-container">
                                <button className="form-compare-card-btn btn-signup" type="submit" id={data.tariff_id} onClick={(e) => choosePlan(e, data)}>Choose plan</button>
                                <button type="button" className="form-compare-card-btn btn-tariff" onClick={(e) => { tariff_info(e, data) }}>Tariff info</button>
                                <div className="form-compare-card-btn-info">
                                  {console.log('Hello')}
                                  {/* <p><span>Savings</span> - £{(usage - data.annual_cost).toFixed(2)} now</p> */}
                                  <p><span>Savings</span> £{!Math.sign((usage - data.annual_cost).toFixed(2)) ? (usage - data.annual_cost).toFixed(2) : Math.abs((usage - data.annual_cost).toFixed(2))} now</p>
                                  <p>or {'£231'} at renewal</p> {/** Renewal here - data.renewal */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="form-compare-loadmore-btn-container">
                    <button className="form-compare-loadmore-btn" onClick={(e) => load_more(e)}>Show more results</button>
                  </div>

                  {/* Error */}
                  {error === true ? <Error message={'Please selected a tariff to sign up'} /> : null}

                  {/* Buttons */}
                  <div className="form-compare-btn-container">
                    <button className="form-compare-btn btn-back" onClick={(e) => goBack(e)}>
                      <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                        <IoMdArrowDropleft className="icon-back" />
                      </IconContext.Provider>
                      Go back
                    </button>

                    <button className="form-compare-btn btn-next" onClick={(e) => goToCustomerDetails(e)}>
                      Continue

                      <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                        <IoMdArrowDropright className="icon-next" />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>

                {showScript ?
                  (
                    <div className="helper-compare">
                      <div className="script-compare">
                        <FormScript step={9} />
                      </div>

                      <div className="assistant-compare-custom">
                        <FormAssistant tips={9} />
                      </div>
                    </div>
                  )
                  :
                  <div style={{ width: '100%' }}>
                    <div className="assistant-compare">
                      <FormAssistant tips={9} />
                    </div>
                  </div>
                }
              </div>
            </section>
          )
          :
          null
        }
      </form>
    </>
  );
}

export default FormCompare;
