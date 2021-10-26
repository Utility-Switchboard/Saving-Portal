import React, { useState } from "react";
import swal from '@sweetalert/with-react';
import { IconContext } from "react-icons";
import { ImSad } from 'react-icons/im';
import "./FormMpanMprn.css";

// Components
import Error from '../../Error/Error';

function FormMpanMprn({ customerAddres, electricityInformation, gasInformation, useGas, updateCustomerAddress, updateElectricityInformation, updateGasInformation, updateShowFormMpanMprn, updateShowFormSupply, updateShowUseGas, updateShowFuel, updateShowOverlay }) {
  /* STATES */
  // Edit
  const [editMPAN, updateEditMPAN] = useState(true);
  const [editMPRN, updateEditMPRN] = useState(true);

  // Error MPAN
  const [error_mpan, updateError_mpan] = useState(false);

  // Error MPRN
  const [error_mprn, updateError_mprn] = useState(false);

  /* FUNCTIONS */

  const mpan = customerAddres.mpan;
  const mprn = customerAddres.mprn;
  const gas_apply = useGas.gas_apply;

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

    // Fetch ECOES API
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
          "Key": "52NT-4QZ8-WD65-N7TV"
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
              supplier_mpid: '',
              // distributor_mpid: ''
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
              supplier_mpid,
              // distributor_mpid
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
            supplier_mpid: '',
            // distributor_mpid: ''
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

    // Fetch XOSERVE API
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
          'APIKey': 'mnOf4C5KMUdD0MfDw8EaPwNZ5oHXqIBL'
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

    // Hidde MPAN/MPRN
    updateShowFormMpanMprn(false);
    // Show Overlay
    updateShowOverlay(false);
    // Show Form Supply
    updateShowFormSupply(true);
  }

  // Go back to Select Address
  const goToUseGas_fuel = (e) => {
    e.preventDefault();
    // Hidde errors
    updateError_mpan(false);
    updateError_mprn(false);
    // Hidde MPAN/MPRN form
    updateShowFormMpanMprn(false);
    if (gas_apply === true) {
      // Show Fuel
      updateShowFuel(true);
    } else {
      // Show UseGas
      updateShowUseGas(true);
    }
  }

  return (
    <>
      <div className="form-mpanmprn-container">
        <div className="form-mpanmprn-content">
          {gas_apply ? (<h1>MPAN / MPRN</h1>) : (<h1>MPAN</h1>)}

          <form className="form-mpanmprn">


            {gas_apply ?
              (
                <>
                  <div className="pb-1">
                    <p>MPAN Number - <input id="form-mpan" type="text" name="mpan" placeholder={mpan === '' ? 'Introduce MPAN' : ''} value={mpan} onChange={(e) => handleChange(e)} disabled={editMPAN} /> <i className="edit-icon far fa-edit" onClick={() => updateEditMPAN(!editMPAN)}></i></p>
                  </div>

                  {error_mpan ? (
                    <>
                      <Error message={'Please, enter a valid MPAN number.'} />
                      <br />
                    </>
                  ) : null}

                  <div className="pb-2">
                    <p>MPRN Number - <input type="text" name="mprn" placeholder={mprn === '' ? 'Introduce MPRN' : ''} value={mprn} onChange={(e) => handleChange(e)} disabled={editMPRN} /> <i className="edit-icon far fa-edit" onClick={() => updateEditMPRN(!editMPRN)}></i></p>
                  </div>

                  {error_mprn ? (
                    <>
                      <Error message={'Please, enter a valid MPRN number.'} />
                      <br />
                    </>
                  ) : null}
                </>

              )
              :
              (
                <>
                  <div className="pb-2">
                    <p>MPAN Number - <input id="form-mpan" type="text" name="mpan" placeholder={mpan === '' ? 'Introduce MPAN' : ''} value={mpan} onChange={(e) => handleChange(e)} disabled={editMPAN} /> <i className="edit-icon far fa-edit" onClick={() => updateEditMPAN(!editMPAN)}></i></p>
                  </div>

                  {error_mpan ? (
                    <>
                      <Error message={'Please, enter a valid MPAN number.'} />
                      <br />
                    </>
                  ) : null}

                </>
              )
            }

            <div className="form-mpanmprn-btn-container">
              <button className="form-mpanmprn-btn" onClick={(e) => goToUseGas_fuel(e)}>
                &#8592; Go back
              </button>

              <button className="form-mpanmprn-btn" onClick={(e) => goToSupplyInformation(e)}>
                Next &#8594;
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormMpanMprn;
