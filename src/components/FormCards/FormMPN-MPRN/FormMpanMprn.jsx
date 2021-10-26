import React, { useState, useEffect } from "react";
import "./FormMpanMprn.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Images
import Search from '../../../assets/img/search.png';
// Swal
import swal from '@sweetalert/with-react';
// Icons
import { IconContext } from "react-icons";
import { ImSad } from 'react-icons/im';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { FaRegEdit } from "react-icons/fa";

// Components
import FormScript from '../FormScript/FormScript';
import FormAssistant from '../FormAssistant/FormAssistant';
import Error from '../../Error/Error';

function FormMpanMprn({ customerAddres, electricityInformation, gasInformation, customerInformation, useGas, fuel, progressBar, showScript, updateCustomerAddress, updateElectricityInformation, updateGasInformation, updateCustomerInformation, updateProgressBar, updateShowFormMpanMprn, updateShowFormSupply, updateShowFomrFuelType, updateShowOverlay }) {
  /* STATES */
  // Edit
  const [editMPAN, updateEditMPAN] = useState(true);
  const [editMPRN, updateEditMPRN] = useState(true);
  // Search by MPAN
  const [searchByMPAN, updateSearchByMPAN] = useState(false);
  // Search by MPRN
  const [serachByMPRN, updateSearchByMPRN] = useState(false);
  // Error MPAN
  const [error_mpan, updateError_mpan] = useState(false);
  // Error MPRN
  const [error_mprn, updateError_mprn] = useState(false);
  // Button focus animation - MPAN
  const [focusAnimationMpan, setFocusAnimationMpan] = useState(false);
  // Button focus animation - MPRN
  const [focusAnimationMprn, setFocusAnimationMprn] = useState(false);

  /* FUNCTIONS */
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Variables
  const mpan = customerAddres.mpan;
  const mprn = customerAddres.mprn;
  const supplier_mpid = electricityInformation.MPANDetails.supplier_mpid;
  const current_supplier_id = gasInformation.dataGas.current_supplier_id;
  const dual_active = customerInformation.fuel_description.dual_active;
  const gas_only = customerInformation.fuel_description.gas_only;
  const elec_only = customerInformation.fuel_description.elec_only;
  const same_supplier = customerInformation.fuel_description.same_supplier;
  const postcode_formatted = customerAddres.postcode.replace(/\s/g, '').trim().toLowerCase();
  const doornumber_formatted = customerAddres.doornumber.replace(/\s/g, '').trim().toLowerCase();
  const uid = `${postcode_formatted}-${doornumber_formatted}`;

  // Function to check if the first request to the ECOES API comes with data
  useEffect(() => {
    if (supplier_mpid !== '') {
      updateSearchByMPAN(false);
    } else {
      updateSearchByMPAN(true);
    }
  }, []);

  // Function to check if the first request to the XOSERVE API comes with data
  useEffect(() => {
    if (current_supplier_id !== '') {
      updateSearchByMPRN(false);
    } else {
      updateSearchByMPRN(true);
    }
  }, []);

  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    // Update valus for MPAN and MPRN
    updateCustomerAddress({
      ...customerAddres,
      [e.target.name]: e.target.value.replace(/[^\w\s]/gi, '').trim(),
    });
  };

  // Go to Supply Information
  const goToSupplyInformation = async (e) => {
    e.preventDefault();

    // Show Overlay
    updateShowOverlay(true);

    /**-- Swal alert-- */
    const swal_es = () => {
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
            <h1>No results found for electricity supplier...</h1>
          </div>
        )
      });
    }

    const swal_gs = () => {
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
            <h1>No results found for gas supplier...</h1>
          </div>
        )
      });
    }

    const swal_es_gs = () => {
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
    }

    let dispatch_swal_es;
    let dispatch_swal_gs;

    // Conditional Swal ES
    const swal_checker_es = (swal_es_dispatch) => {
      dispatch_swal_es = swal_es_dispatch;
      return swal_es_dispatch;
    }

    // Conditional Swal GS
    const swal_checker_gs = (swal_gs_dispatch) => {
      dispatch_swal_gs = swal_gs_dispatch;
      return swal_gs_dispatch
    }

    // ecoes_api
    const ecoes_api = process.env.REACT_APP_ECOES_API;
    // xoserve_api
    const xoserve_api = process.env.REACT_APP_XOSERVE_API;

    // Fetch ECOES API
    if (searchByMPAN) {
      if (mpan !== '') {
        // MPAN Validation - MinLength = 13 digits
        if (mpan.length < 13) {
          if ((mpan.length < 13) && ((mprn.length < 10))) {
            // Show error MPAN
            updateError_mpan(true);
            // Show error MPRN
            updateError_mprn(true);

            if (mprn.length === 0) {
              // Hidde error MPRN
              updateError_mprn(false);
            }
          } else {
            // Show error MPAN
            updateError_mpan(true);
          }

          // Hidde Overlay
          updateShowOverlay(false);
          return;
        }

        /**-- Response ECOES DETAILS by MPAN--  */
        // Body parameters
        const detailsParameters = {
          "Authentication": {
            "Key": ecoes_api
          },
          "ParameterSets": [{
            "Parameters": [{
              "Key": "MPAN",
              "Value": mpan
            }]
          }]
        }

        const responseECOESDetails = await fetch('https://cors-anywhere.herokuapp.com/https://www.ecoes.co.uk/WebServices/Trial/ECOESAPI.svc/RESTful/JSON/GetTechnicalDetailsByMpan', {
          method: 'POST',
          body: JSON.stringify(detailsParameters),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(function (response) {
          if (response.status === 200) {
            return response.json();
          } else {
            return console.error('An error ocurred fetching to GetTechnicalDetailsByMpan');
          }
        }).then(function (response) {
          if (response !== undefined) {
            // Error response
            const error_response = response.Results[0].Errors.length;
            // Check values and return 
            if (error_response >= 1) {
              // Electricity Infomartion values
              const MPANDetails = {
                mpan_core: '',
                meter_serial_number: '',
                meter_type: '',
                supplier_mpid: ''
              }

              // Update the state
              updateElectricityInformation({ ...electricityInformation, MPANDetails });
            } else {
              // Extract the values from the response
              const meter_serial_number = response.Results[0].UtilityMatches[0].Meters[0].MeterDetails[1].Value;
              const meter_type = response.Results[0].UtilityMatches[0].Meters[0].MeterDetails[2].Value;
              const supplier_mpid = response.Results[0].UtilityMatches[0].UtilityDetails[11].Value;
              // Assign values
              const MPANDetails = {
                mpan_core: mpan,
                meter_serial_number,
                meter_type,
                supplier_mpid
              }
              // Update the state
              updateElectricityInformation({ ...electricityInformation, MPANDetails });
            }
          } else {
            // Show alert
            swal_checker_es(true);

            // Electricity Infomartion values
            const MPANDetails = {
              mpan_core: '',
              meter_serial_number: '',
              meter_type: '',
              supplier_mpid: ''
            }
            // Update the state
            return updateElectricityInformation({ ...electricityInformation, MPANDetails });
          }
        }).catch(error => {
          console.error(error);
          // Show alert
          swal_checker_es(true);
        });
      }
    }

    // Fetch XOSERVE API
    if (serachByMPRN) {
      if (mprn !== '') {
        // MPRN Validation - MinLength = 10 digits
        if (mprn.length < 10) {
          if ((mprn.length < 10) && ((mpan.length < 13))) {
            // Show error MPRN
            updateError_mprn(true);
            // Show error MPAN
            updateError_mpan(true);

            if (mpan.length === 0) {
              // Hidde error MPAN
              updateError_mpan(false);
            }
          } else {
            // Show error MPRN
            updateError_mprn(true);
          }

          // Hidde Overlay
          updateShowOverlay(false);
          return;
        }

        /** -- XOSERVE API -- */
        const responseXOSERVE = await fetch(`https://cors-anywhere.herokuapp.com/https://xoserve.apimanagement.hana.ondemand.com:443/v1/switchdataTBB.svc?&mprn='${mprn}'`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'APIKey': xoserve_api
          },
        }).then(function (response) {
          if (response.status === 200) {
            return response.json();
          } else {
            updateGasInformation({
              ...gasInformation,
              dataGas: {
                mprn: '',
                meter_mechanism_code: '',
                current_supplier_id: '',
                gas_transport_id: ''
              }
            });
            return console.error('An error ocurred fetching to Xoserve switchdataTBB');
          }
        }).then(function (response) {
          // console.log(response);
          // If exist information about the property 
          const success = response.hasOwnProperty('mprn');

          if (success === true) {
            const dataGas = response.mprn[0];
            const mprn_core = response.mprn[0].mprn;
            updateGasInformation({ ...gasInformation, dataGas });
            return mprn_core;
          } else {
            // Show alert
            swal_checker_gs(true);
            return updateGasInformation({
              ...gasInformation,
              dataGas: {
                mprn: '',
                meter_mechanism_code: '',
                current_supplier_id: '',
                gas_transport_id: ''
              }
            });
          }
        }).catch(function (error) {
          // Show alert
          swal_checker_gs(true);
          return console.error('Catch an error fetching to Xoserve switchdataTBB:' + ' ' + error);
        });
      }
    }

    if ((dispatch_swal_es && dispatch_swal_gs) === true) {
      swal_es_gs();
    } else {
      if (dispatch_swal_es === true) {
        swal_es();
      }

      if (dispatch_swal_gs === true) {
        swal_gs();
      }
    }
    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 4
    });
    // Hidde MPAN/MPRN
    updateShowFormMpanMprn(false);
    // Show Overlay
    updateShowOverlay(false);
    // Show Form Supply
    updateShowFormSupply(true);
  }

  const goBack = (e) => {
    e.preventDefault();

    // Update progress bar
    updateProgressBar({
      ...progressBar,
      step: 2
    });
    // Update state
    const copy_customerInformation = { ...customerInformation };
    delete copy_customerInformation['fuel_description'];
    updateCustomerInformation({
      ...copy_customerInformation
    });
    // Hidde error 
    updateError_mpan(false);
    updateError_mprn(false);
    // Hidde MPAN/MPRN
    updateShowFormMpanMprn(false);
    // Show Fuetl Type
    updateShowFomrFuelType(true);

    /**-- Firebase --*/

    // Update customer information in firebase
    db.collection("customers").doc(uid).set({
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
      }
    });
  }

  return (
    <>
      <section className="form-mpanmprn-section">
        <div className="form-mpanmprn-container">
          <div className="form-mpanmprn-content">
            <div className="form-mpanmprn">
              <div>
                <h1>We need your {elec_only ? 'MPAN' : null} {gas_only ? 'MPRN' : null} {dual_active ? same_supplier ? "MPAN" : 'MPAN & MPRN' : null}</h1>

                {/* Elec only */}
                {elec_only ?
                  (
                    <>
                      <p>Meter Point Administration Number (MPAN)</p>
                      <div className="form-mpanmprn-input-container">
                        <input type="text" className="form-mpanmprn-input" name="mpan" placeholder={mpan === '' ? 'Introduce MPAN' : ''} value={mpan} onChange={(e) => handleChange(e)} disabled={editMPAN} onPointerDown={() => editMPAN ? setFocusAnimationMpan(!focusAnimationMpan) : null} />
                        <FaRegEdit className={focusAnimationMpan ? 'edit-search-icon animate__animated animate__headShake': 'edit-search-icon'} onClick={() => updateEditMPAN(!editMPAN)} />
                        {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMPAN(!editMPAN)}></i> */}
                      </div>

                      {error_mpan ? (
                        <Error message={'Please, enter a valid MPAN number.'} />
                      ) : null}
                    </>
                  )
                  :
                  null
                }

                {/* Gas only */}
                {gas_only ?
                  (
                    <>
                      <p>Meter Point Reference Number (MPRN)</p>
                      <div className="form-mpanmprn-input-container">
                        <input type="text" className="form-mpanmprn-input" name="mprn" placeholder={mprn === '' ? 'Introduce MPRN' : ''} value={mprn} onChange={(e) => handleChange(e)} disabled={editMPRN} onPointerDown={() => editMPRN ? setFocusAnimationMprn(!focusAnimationMprn) : null} />
                        <FaRegEdit className={focusAnimationMprn ? 'edit-search-icon animate__animated animate__headShake': 'edit-search-icon'} onClick={() => updateEditMPRN(!editMPRN)} />
                        {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMPRN(!editMPRN)}></i> */}
                      </div>

                      {error_mprn ? (
                        <Error message={'Please, enter a valid MPRN number.'} />
                      ) : null}
                    </>
                  )
                  :
                  null
                }

                {/* Dual tariff */}
                {dual_active ?
                  // Same supplier
                  same_supplier ?
                    (
                      <>
                        <p>Meter Point Administration Number (MPAN)</p>
                        <div className="form-mpanmprn-input-container">
                          <input type="text" className="form-mpanmprn-input" name="mpan" placeholder={mpan === '' ? 'Introduce MPAN' : ''} value={mpan} onChange={(e) => handleChange(e)} disabled={editMPAN} onPointerDown={() => editMPAN ? setFocusAnimationMpan(!focusAnimationMpan) : null} />
                          <FaRegEdit className={focusAnimationMpan ? 'edit-search-icon animate__animated animate__headShake': 'edit-search-icon'} onClick={() => updateEditMPAN(!editMPAN)} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMPAN(!editMPAN)}></i> */}
                        </div>

                        {error_mpan ? (
                          <Error message={'Please, enter a valid MPAN number.'} />
                        ) : null}
                      </>
                    )
                    :
                    // Different suppliers
                    (
                      <>
                        <p>Meter Point Administration Number (MPAN)</p>
                        <div className="form-mpanmprn-input-container">
                          <input type="text" className="form-mpanmprn-input" name="mpan" placeholder={mpan === '' ? 'Introduce MPAN' : ''} value={mpan} onChange={(e) => handleChange(e)} disabled={editMPAN} onPointerDown={() => editMPAN ? setFocusAnimationMpan(!focusAnimationMpan) : null} />
                          <FaRegEdit className={focusAnimationMpan ? 'edit-search-icon animate__animated animate__headShake': 'edit-search-icon'} onClick={() => updateEditMPAN(!editMPAN)} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMPAN(!editMPAN)}></i> */}
                        </div>

                        {error_mpan ? (
                          <Error message={'Please, enter a valid MPAN number.'} />
                        ) : null}

                        <p>Meter Point Reference Number (MPRN)</p>
                        <div className="form-mpanmprn-input-container">
                          <input type="text" className="form-mpanmprn-input" name="mprn" placeholder={mprn === '' ? 'Introduce MPRN' : ''} value={mprn} onChange={(e) => handleChange(e)} disabled={editMPRN} onPointerDown={() => editMPRN ? setFocusAnimationMprn(!focusAnimationMprn) : null} />
                          <FaRegEdit className={focusAnimationMprn ? 'edit-search-icon animate__animated animate__headShake': 'edit-search-icon'} onClick={() => updateEditMPRN(!editMPRN)} />
                          {/* <i className="edit-icon far fa-edit" onClick={() => updateEditMPRN(!editMPRN)}></i> */}
                        </div>

                        {error_mprn ? (
                          <Error message={'Please, enter a valid MPRN number.'} />
                        ) : null}
                      </>
                    )
                  :
                  null
                }

              </div>
              {/* Image */}
              <div className="form-mpanmprn-img">
                <img src={Search} alt="" width="80" />
              </div>
            </div>

            {/* Buttons */}
            <div className="form-mpanmprn-btn-container">
              <button className="form-mpanmprn-btn btn-back" onClick={(e) => goBack(e)}>
                <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                  <IoMdArrowDropleft className="icon-back" />
                </IconContext.Provider>
                Go back
              </button>

              <button data-cy="mpanmprn-continue" className="form-mpanmprn-btn btn-next" onClick={(e) => goToSupplyInformation(e)}>
                Continue
                <IconContext.Provider value={{ color: '#FFF', size: '35px' }}>
                  <IoMdArrowDropright className="icon-next" />
                </IconContext.Provider>
              </button>
            </div>
          </div>

          {showScript ?
            (
              <div className="helper-mpanmprn">
                <div className="script-mpanmprn">
                  <FormScript step={4} />
                </div>

                <div className="assistant-mpanmprn-custom">
                  <FormAssistant tips={3} />
                </div>
              </div>
            )
            :
            <div style={{ width: '100%' }}>
              <div className="assistant-mpanmprn">
                <FormAssistant tips={3} />
              </div>
            </div>
          }

        </div>
      </section>
    </>
  );
}

export default FormMpanMprn;
