import React, { useState, useEffect } from "react";
// Styles
import "./FormAddress.css";
// Firebase
import { db } from "../../../firebase/firebase";
import firebase from "firebase/app";
// Swal
import swal from '@sweetalert/with-react';
// Icons
import { IconContext } from "react-icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';

// Hooks
import useAddress from "../../../hooks/useAddress/useAddress";

// Components
import FormScript from '../FormScript/FormScript';
import Error from '../../Error/Error';
import FormAssistant from "../FormAssistant/FormAssistant";

function FormAddress({ postcodeValue, gasInformation, electricityInformation, progressBar, showScript, customerStep, updateCustomerAddress, updateGasInformation, updateElectricityInformation, updateShowFormPostCode, updateShowFormAddres, updateShowOverlay, updateProgressBar, updateShowFomrFuelType }) {
  /** STATES */
  // Customer Address JSON
  const [dataAddress, updateDataAddress] = useState({
    doornumber: '',
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
    mpan: '',
    mprn: ''
  });

  // Customer Address List
  const [addressList, updateAddressList] = useState([]);

  // Hook useAddress
  const [address, SelectAddress, updateAddress] = useAddress(
    "", //Label
    "", //Initial State
    addressList //Array(response)
  );

  // Show Address type section
  const [showTypeAddress, updateShowTypeAddres] = useState(true);

  // Error State
  const [error, updateError] = useState(false);

  // Create customer in firebase
  const [createCustomer, updateCreateCustomer] = useState(false);

  // Button focus animation
  const [focusAnimation, setFocusAnimation] = useState(false);

  /** FUNCTIONS */

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

  // useEffect to fetch the data from API
  useEffect(() => {

    // const address_api = process.env.REACT_APP_ADDRESS_API;

    // Fetching Data
    const fetchAPI = async () => {
      // const url = `https://ws.postcoder.com/pcw/${address_api}/address/uk/${postcodeValue.replace(/ /g, '').toLowerCase()}`;
      const key = process.env.REACT_APP_ADDRESS_API;
      const url = `https://api.getAddress.io/find/${postcodeValue.replace(/ /g, '').toLowerCase()}?api-key=${key}&expand=true`;
      const response_postcode = await fetch(url, {
        method: 'GET'
      }).then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          swal({
            button: "Ok",
            icon: "info",
            content: (
              <div className="swal-text-custom">
                <h1>Address not found</h1>
                <p>
                  Please enter the address manually
                </p>
              </div>
            )
          });
          return;
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        console.error(`Catch an error fetching to postcoder ${error}`);
        swal({
          button: "Ok",
          icon: "info",
          content: (
            <div className="swal-text-custom">
              <h1>Address not found</h1>
              <p>
                Please enter the address manually
              </p>
            </div>
          )
        });
        return;
      });

      if (response_postcode !== undefined) {

        const data = response_postcode.addresses;

        // Adding an ID
        data.forEach((item, i) => {
          item.id = i + 1;
        });

        if (addressList === []) {
          return;
        } else {
          updateAddressList(data);
        }
      } else {
        return;
      }
    }
    // Execute Fetch API
    fetchAPI();
  }, []);

  // Address Data
  if (address !== '') {
    // Selected Value
    const selectedValue = addressList[address - 1];

    // Separated Values
    var doornumberValue = selectedValue.formatted_address[0].replace(/[^0-9.]/g, '');
    var addressline1Value = selectedValue.formatted_address.toString().replace(/,*,/g,',').replace(/,/g, ", ");
    var addressline2Value = '';
    var cityValue = selectedValue.town_or_city;
    var mpanValue = '';
    var mprnValue = '';

    if (doornumberValue === undefined || doornumberValue === '') {
      doornumberValue = "N/A";
    } else {
      doornumberValue = selectedValue.formatted_address[0].replace(/[^0-9.]/g, '');
    }

    if (addressline1Value === undefined || addressline1Value === '') {
      addressline1Value = "N/A";
    } else {
      addressline1Value = selectedValue.formatted_address.toString().replace(/,*,/g,',').replace(/,/g, ", ");
    }

    if (addressline2Value === undefined || addressline2Value === '') {
      addressline2Value = "N/A";
    } else {
      addressline2Value = "";
    }

    if (cityValue === undefined || cityValue === '') {
      cityValue = "N/A";
    } else {
      cityValue = selectedValue.town_or_city;
    }

    if (mpanValue === undefined || mpanValue === '') {
      mpanValue = '';
    } else {
      mpanValue = '';
    }

    if (mprnValue === undefined || mprnValue === '') {
      mprnValue = '';
    } else {
      mprnValue = '';
    }
  }

  const doornumber = doornumberValue;
  const addressline1 = addressline1Value;
  const addressline2 = addressline2Value;
  const city = cityValue;
  const postcode = postcodeValue;
  const mpan = mpanValue;
  const mprn = mprnValue;

  // useEffect to add the data to the state
  useEffect(() => {
    updateDataAddress({
      ...dataAddress,
      doornumber: doornumber,
      addressline1: addressline1,
      addressline2: addressline2,
      city: city,
      postcode: postcode,
      mpan: mpan,
      mprn: mprn
    });

    updateError(false);
  }, [address]);

  // Function that runs every time the user writes to the input
  const handleChange = (e) => {
    updateDataAddress({
      ...dataAddress,
      [e.target.name]: e.target.value.replace(/[^\w\s]/gi, '').trim(),
      mpan: '',
      mprn: ''
    });
  };

  const handleChangeTypeAddress = () => {
    const door_typed = document.getElementById("door-number").value;
    const addres_line1_typed = document.getElementById("line1").value;
    const city_typed = document.getElementById("city").value;

    // Validation for Typeaddress
    if ((door_typed !== '') && (addres_line1_typed !== '') && (city_typed !== '')) {
      // Hidde message
      updateError(false);
    }
  }

  // Send Add address to CustomerData 
  const sendAddress = async (dataAddress) => {

    const door_typed = document.getElementById("door-number").value;
    const addres_line1_typed = document.getElementById("line1").value;
    const city_typed = document.getElementById("city").value;

    // Validation for type address section
    if (((door_typed === '') || (door_typed === undefined)) || ((addres_line1_typed === '') || (addres_line1_typed === undefined)) || ((city_typed === '') || (city_typed === undefined))) {
      updateError(true);
      return;
    } else {
      updateError(false);
    }

    // Show Overlay
    updateShowOverlay(true);

    // Values to validate
    const doornumberValidate = dataAddress.doornumber.replace(/[^\w\s]/gi, '').trim();
    const addressValidate = dataAddress.addressline1.replace(/[^\w\s]/gi, '').trim();
    const cityValidate = dataAddress.city.replace(/[^\w\s]/gi, '').trim();

    if (doornumberValidate === '' || doornumberValidate === undefined || addressValidate === '' || addressValidate === undefined || cityValidate === '' || cityValidate === undefined) {
      // Validation failed
      updateError(true);
    } else {
      /** -- ECOES API -- */

      // ecoes_api
      const ecoes_api = process.env.REACT_APP_ECOES_API;

      // Body parameters
      const postcodeParameters = {
        "Authentication": {
          "Key": ecoes_api
        },
        "ParameterSets": [{
          "Parameters": [
            {
              "Key": "Postcode",
              "Value": postcodeValue.replace(/[^\w\s]/gi, '').trim()
            },
            {
              "Key": "BuildingNumber",
              "Value": doornumberValidate
            }
          ]
        }]
      }

      // Response ECOES MPAN
      const responseECOESMPAN = await fetch('https://cors-anywhere.herokuapp.com/https://www.ecoes.co.uk/WebServices/Trial/ECOESAPI.svc/RESTful/JSON/SearchUtilityAddress', {
        method: 'POST',
        body: JSON.stringify(postcodeParameters),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          return console.error('An error ocurred fetching to ECOES SearchUtilityAddress');
        }
      }).then(function (response) {
        // Error response
        const error_response = response.Results[0].Errors.length;

        // Check values and return 
        if (error_response >= 1) {
          const NA = 'NA';
          return NA;
        } else {
          // Successful response
          const successful_response = response.Results[0].UtilityAddressMatches[0].AddressDetails[0].Value;
          return successful_response;
        }
      }).catch(function (error) {

        return console.error(`Catch an error fetching to ECOES SearchUtilityAddress ${error}`);
      });

      // MPAN value
      let mpan_core = '';

      if (responseECOESMPAN !== "NA" && responseECOESMPAN !== undefined) {
        mpan_core = responseECOESMPAN.replace(/[^\w\s]/gi, '').trim();
      } else {
        mpan_core = '';
      }

      //If we get a MPAN value call ECOES Details - Conditional
      if (mpan_core !== '') {
        /**-- Response ECOES DETAILS by MPAN--  */
        // Body parameters
        const detailsParameters = {
          "Authentication": {
            "Key": ecoes_api
          },
          "ParameterSets": [{
            "Parameters": [{
              "Key": "MPAN",
              "Value": mpan_core
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
                mpan_core,
                meter_serial_number,
                meter_type,
                supplier_mpid
              }

              // Update the state
              updateElectricityInformation({ ...electricityInformation, MPANDetails });
            }
          } else {
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
        });
      } else {
        // Electricity Infomartion values
        const MPANDetails = {
          mpan_core: '',
          meter_serial_number: '',
          meter_type: '',
          supplier_mpid: ''
        }
        // Update the state
        updateElectricityInformation({ ...electricityInformation, MPANDetails });
      }

      /**--Postcode structure */

      // Postcode unformatted
      let postcode_unformatted = postcode;
      // Postcode without spaces
      let postcode_unformatted_no_space = postcode_unformatted.replace(/ /g, '');
      // Postcode formated
      let postcode_formated = '';

      // For a postcode structure AN-NAA
      if (postcode_unformatted_no_space.length === 5) {
        // First two chars 
        let first_two = postcode_unformatted_no_space.slice(0, 2);
        // Last three chars
        let last_three = postcode_unformatted_no_space.slice(2, 5);
        // Formated Postcode
        postcode_formated = first_two + ' ' + last_three;
      }

      // For a postcode structure ANN-NAA, AAN-NAA, ANA-NAA
      if (postcode_unformatted_no_space.length === 6) {
        // First three chars 
        let first_three = postcode_unformatted_no_space.slice(0, 3);
        // Last three chars
        let last_three = postcode_unformatted_no_space.slice(3, 6);
        // Formated Postcode
        postcode_formated = first_three + ' ' + last_three;
      }

      // For a postcode structure AANN-NAA, AANA-NAA
      if (postcode_unformatted_no_space.length === 7) {
        // First three chars 
        let first_four = postcode_unformatted_no_space.slice(0, 4);
        // Last three chars
        let last_three = postcode_unformatted_no_space.slice(4, 7);
        // Formated Postcode
        postcode_formated = first_four + ' ' + last_three;
      }

      /** -- XOSERVE API -- */

      // xoserve_api
      const xoserve_api = process.env.REACT_APP_XOSERVE_API;

      const responseXOSERVE = await fetch(`https://cors-anywhere.herokuapp.com/https://xoserve.apimanagement.hana.ondemand.com:443/v1/switchdataTBB.svc?postcode='${postcode_formated}'&house_no='${doornumberValidate}'`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': xoserve_api
        },
      }).then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          const mprn_core = '';
          updateGasInformation({
            ...gasInformation,
            dataGas: {
              mprn: '',
              meter_mechanism_code: '',
              current_supplier_id: '',
              gas_transport_id: ''
            }
          });

          console.error('An error ocurred fetching to Xoserve switchdataTBB');

          return mprn_core;

        }
      }).then(function (response) {
        // If exist information about the property 
        const success = response.hasOwnProperty('mprn');

        if (success === true) {
          const dataGas = response.mprn[0];
          const mprn_core = response.mprn[0].mprn;
          updateGasInformation({ ...gasInformation, dataGas });
          return mprn_core;
        } else {
          const mprn_core = '';
          updateGasInformation({
            ...gasInformation,
            dataGas: {
              mprn: mprn_core,
              meter_mechanism_code: '',
              current_supplier_id: '',
              gas_transport_id: ''
            }
          });
          return mprn_core;
        }
      }).catch(function (error) {

        return console.error(`Catch an error fetching to Xoserve switchdataTBB: ${error}`);
      });

      // MPRN value
      let mprn_core = responseXOSERVE;

      if (mprn_core === undefined) {
        mprn_core = '';
        updateGasInformation({
          ...gasInformation,
          dataGas: {
            mprn: '',
            meter_mechanism_code: '',
            current_supplier_id: '',
            gas_transport_id: ''
          }
        });
      }

      const postcode_formatted = dataAddress.postcode.replace(/\s/g, '').trim().toLowerCase();
      const doornumber_formatted = dataAddress.doornumber.replace(/\s/g, '').trim().toLowerCase();

      const uid = `${postcode_formatted}-${doornumber_formatted}`;

      // Document ref
      let docRef = await db.collection("customers").doc(uid);

      // // Fetching customer data
      // const getCustomerData = async () => docRef.get().then((doc) => {
      //   // If customer exist
      //   if (doc.exists) {
      //     return doc.data();
      //   }
      //   return;
      // });

      // Fetching customer data
      const getCustomerData = async () => docRef.get().then((doc) => {
        // If customer exist
        if (doc.exists) {
          return doc.data();
        }
        return;
      }).catch((error) => {
        console.log(error)
        console.log('Fetching customer data failed');
        return;
      });

      // Execute getCustomerData
      let customer = await getCustomerData();

      // Validate if customer exists
      if (customer) {

        // customerData
        const customerData = customer;

        // Customer Information
        const { customerAddres, MPANDetails, dataGas } = customerData;

        // Customer Address
        const { doornumber, addressline1, addressline2, city, postcode } = customerAddres;

        // MPANDetails
        const { meter_type } = MPANDetails;

        // dataGas
        const { meter_mechanism_code } = dataGas;

        // Electricity company name
        const company_name_es = MPANDetails.company_name;
        // MPAN
        const mpan_fetched = MPANDetails.mpan_core;

        // Gas company name
        const company_name_gs = dataGas.company_name;
        // MPRN
        const mprn_fetched = dataGas.mprn;

        // Customer Information - Sweet alert
        swal({
          className: 'swal-modal_custom',
          buttons: {
            cancel: "Cancel",
            confirm: "Use this information"
          },
          content: (
            <>
              <div className="form-address-details-info-container">
                <div className="form-address-details-info">

                  <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
                    <ImProfile />
                  </IconContext.Provider>

                  <h3 style={{ marginBottom: '0' }}>Data found for this customer</h3>

                  <div className="form-address-details-container">
                    {/* Customer Address */}
                    <div className="form-address-single-details">
                      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
                        <p>Address:<span>{`${addressline1.toUpperCase()}${addressline2 === "N/A" ? '' : `, ${addressline2.toUpperCase()}`} `}</span></p>
                        <p>Flat number:<span>{doornumber.toUpperCase()}</span></p>
                        <p>City:<span>{city.toUpperCase()}</span></p>
                        <p>Postcode:<span>{postcode.toUpperCase()}</span></p>
                      </div>
                    </div>

                    {/* -------- ELECTRICITY INFORMATION -------- */}

                    {/* Title - Elictricity Information */}
                    {(!!company_name_es) || (!!meter_type) || (!!mpan_fetched) ?
                      (<h3>Electricity Information</h3>)
                      :
                      null}

                    {/* Address - Elictricity Information */}
                    {!!company_name_es ?
                      (
                        <div className="form-address-single-details">
                          <p>Supplier: <span>{company_name_es}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                    {/* Meter Type - Elictricity Information */}
                    {!!meter_type ?
                      (
                        <div className="form-address-single-details">
                          <p>Meter Type: <span>{meter_type}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                    {/* Meter Type - Elictricity Information */}
                    {!!mpan_fetched ?
                      (
                        <div className="form-address-single-details">
                          <p>MPAN: <span>{mpan_fetched}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                    {/* -------- GAS INFORMATION -------- */}

                    {/* Title - Gas Information */}
                    {(!!company_name_gs) || (!!meter_mechanism_code) || (!!mprn_fetched) ?
                      (<h3>Gas Information</h3>)
                      :
                      null}

                    {/* Address - Gas Information */}
                    {!!company_name_gs ?
                      (
                        <div className="form-address-single-details">
                          <p>Supplier: <span>{company_name_gs}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                    {/* Meter Type - Gas Information */}
                    {!!meter_mechanism_code ?
                      (
                        <div className="form-address-single-details">
                          <p>Meter Type: <span>{meter_mechanism_code}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                    {/* Meter Type - Gas Information */}
                    {!!mprn_fetched ?
                      (
                        <div className="form-address-single-details">
                          <p>MPAN: <span>{mprn_fetched}</span></p>
                        </div>
                      )
                      :
                      null
                    }

                  </div>
                </div>
              </div>
            </>
          )
        }).then((result) => {

          if (result !== true) {

            // postcode_formatted
            const postcode_formatted = dataAddress.postcode.replace(/\s/g, '').trim().toLowerCase();
            // doornumber_formatted
            const doornumber_formatted = dataAddress.doornumber.replace(/\s/g, '').trim().toLowerCase();
            // uid
            const uid = `${postcode_formatted}-${doornumber_formatted}`;

            // Update firebase customer
            db.collection("customers").doc(uid).set({
              created: firebase.firestore.FieldValue.serverTimestamp(),
              step: 1,
              customerAddres: {
                doornumber: dataAddress.doornumber ? dataAddress.doornumber : '',
                addressline1: dataAddress.addressline1 ? dataAddress.addressline1 : '',
                addressline2: dataAddress.addressline2 ? dataAddress.addressline2 : '',
                city: dataAddress.city ? dataAddress.city : '',
                postcode: dataAddress.postcode ? dataAddress.postcode : '',
                mpan: mpan_core ? mpan_core : '',
                mprn: mprn_core ? mprn_core : ''
              },
              MPANDetails: {
                mpan_core: '',
                meter_serial_number: '',
                meter_type: '',
                supplier_mpid: '',
                company_name: ''
              },
              dataGas: {
                mprn: '',
                meter_mechanism_code: '',
                current_supplier_id: '',
                gas_transport_id: '',
                company_name: ''
              }
            });

            // Validation successful
            updateError(false);
            // Update data
            updateCustomerAddress({
              ...dataAddress,
              mpan: mpan_core,
              mprn: mprn_core
            });
            // Update progress bar
            updateProgressBar({ ...progressBar, step: 2 });
            // Hidde Form Address
            updateShowFormAddres(false);
            // Show Form Fuel type
            updateShowFomrFuelType(true);
            // Hidde Overlay
            updateShowOverlay(false);
            console.log('Data was sent successfully - From cancel alert');
            console.log('Update customers in firebse if it is necessary');

            return;
          }

          console.log('Data was sent successfully - Using DB');
          return customerStep(customerData);

        }).catch((error) => {

          // Update firebase customer
          db.collection("customers").doc(uid).set({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            step: 1,
            customerAddres: {
              doornumber: dataAddress.doornumber ? dataAddress.doornumber : '',
              addressline1: dataAddress.addressline1 ? dataAddress.addressline1 : '',
              addressline2: dataAddress.addressline2 ? dataAddress.addressline2 : '',
              city: dataAddress.city ? dataAddress.city : '',
              postcode: dataAddress.postcode ? dataAddress.postcode : '',
              mpan: mpan_core ? mpan_core : '',
              mprn: mprn_core ? mprn_core : ''
            },
            MPANDetails: {
              mpan_core: '',
              meter_serial_number: '',
              meter_type: '',
              supplier_mpid: '',
              company_name: ''
            },
            dataGas: {
              mprn: '',
              meter_mechanism_code: '',
              current_supplier_id: '',
              gas_transport_id: '',
              company_name: ''
            }
          });

          console.log(error);

          // Validation successful
          updateError(false);
          // Update data
          updateCustomerAddress({
            ...dataAddress,
            mpan: mpan_core,
            mprn: mprn_core
          });
          // Update progress bar
          updateProgressBar({ ...progressBar, step: 2 });
          // Hidde Form Address
          updateShowFormAddres(false);
          // Show Form Fuel type
          updateShowFomrFuelType(true);
          // Hidde Overlay
          updateShowOverlay(false);
          console.log('Data was sent successfully - From error');
          console.log('Update customers in firebse if it is necessary');
          return;
        });

        // End process
        return;
      }

      // Create customer in firebase
      updateCreateCustomer(true);

      // Validation successful
      updateError(false);
      // Update data
      updateCustomerAddress({
        ...dataAddress,
        mpan: mpan_core,
        mprn: mprn_core
      });
      // Update progress bar
      updateProgressBar({ ...progressBar, step: 2 });
      // Hidde Form Address
      updateShowFormAddres(false);
      // Show Form Fuel type
      updateShowFomrFuelType(true);
      // Hidde Overlay
      updateShowOverlay(false);
      console.log('Data was sent successfully - No user found');
      console.log('Create a new customer in firebase');

      // End process
      return;
    }
  }

  /** --  Listener to create a customer in firebase -- */
  useEffect(() => {
    (async () => {
      // createCustomer
      if (createCustomer) {
        // postcode_formatted
        const postcode_formatted = dataAddress.postcode.replace(/\s/g, '').trim().toLowerCase();
        // doornumber_formatted
        const doornumber_formatted = dataAddress.doornumber.replace(/\s/g, '').trim().toLowerCase();
        // uid
        const uid = `${postcode_formatted}-${doornumber_formatted}`;

        // Firebase
        await db.collection("customers").doc(uid).set({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          step: 1,
          customerAddres: {
            doornumber: dataAddress.doornumber ? dataAddress.doornumber : '',
            addressline1: dataAddress.addressline1 ? dataAddress.addressline1 : '',
            addressline2: dataAddress.addressline2 ? dataAddress.addressline2 : '',
            city: dataAddress.city ? dataAddress.city : '',
            postcode: dataAddress.postcode ? dataAddress.postcode : '',
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
    })();

  }, [createCustomer]);

  // Go back to postcode
  const goToPostcode = (e) => {
    e.preventDefault();
    // Hidde Form Address
    updateShowFormAddres(false);
    // Show Postcode
    updateShowFormPostCode(true);
    // Update progress bar
    updateProgressBar({ ...progressBar, step: 0 });
  };

  // Address is not listed
  const type_address = (e) => {
    e.preventDefault();
    // Update data address 
    updateDataAddress({
      ...dataAddress,
      doornumber: '',
      addressline1: '',
      addressline2: '',
      city: '',
      // postcode: '',
      mpan: '',
      mprn: ''
    });
    // Cleaning states
    updateElectricityInformation({});
    updateGasInformation({});
    updateAddress('');
    updateShowTypeAddres(false);
    updateError(false);

    // Reset form
    let reset_doornumber = document.getElementById('door-number');
    let reset_line1 = document.getElementById('line1');
    let reset_line2 = document.getElementById('line2');
    let reset_city = document.getElementById('city');
    if ((reset_doornumber !== null) && (reset_line1 !== null) && (reset_line2 !== null) && (reset_city !== null)) {
      reset_doornumber.value = '';
      reset_line1.value = '';
      reset_line2.value = '';
      reset_city.value = '';
    }
  }

  // HandleChangeSelect
  const handleChangeSelect = (e) => {
    e.preventDefault();
    // Update states
    updateShowTypeAddres(true);
    updateDataAddress({
      ...dataAddress,
      doornumber: '',
      addressline1: '',
      addressline2: '',
      city: '',
      // postcode: '',
      mpan: '',
      mprn: ''
    });
  }

  return (
    <>
      {showTypeAddress ?
        address === "" ? (
          <section className="form-address-section">
            <div className="form-address-container">
              <div className="form-address-content">
                <div className="form-address">
                  <h1>Select your addres from the below</h1>
                  <p>Having the correct address is key to ensuring we select the correct MPAN / MRPN for the customer's address. Id the customer's address is not present in the list below, we must enter it manually and request the customers MPAN / MPRN to enable successful switch.</p>
                </div>

                {/* Address */}
                <div>
                  <SelectAddress />
                </div>

                <div className='form-address-manually-btn'>
                  <button data-cy="addr-empty" onClick={(e) => type_address(e)}>My address isn't listed</button>
                </div>

                {/* Error */}
                {error === true ? <Error message={'Please enter an address'} /> : null}

                {/* Buttons */}
                <div className="form-address-btn-container">
                  <button className="form-address-btn btn-back" onClick={goToPostcode}>
                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                      <IoMdArrowDropleft className="icon-back" />
                    </IconContext.Provider>
                    Go back
                  </button>

                  <button data-cy="addr-noselected" className="form-address-btn btn-next" onClick={() => address === '' ? updateError(true) : null}>
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
                      <FormScript step={2} />
                    </div>

                    <div className="assistant-address-custom">
                      <FormAssistant tips={1} />
                    </div>
                  </div>
                )
                :
                <div style={{ width: '100%' }}>
                  <div className="assistant-address">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              }

            </div>
          </section>
        ) : (
          <section className="form-address-section">
            <div className="form-address-container">
              <div className="form-address-content">
                <div className="form-address">
                  <h1>Select your addres from the below</h1>
                  <p>Having the correct address is key to ensuring we select the correct MPAN / MRPN for the customer's address. Id the customer's address is not present in the list below, we must enter it manually and request the customers MPAN / MPRN to enable successful switch.</p>
                </div>

                {/* Address */}
                <div>
                  <SelectAddress />
                </div>

                <div className="form-address-manually-btn">
                  <button onClick={(e) => type_address(e)} className={focusAnimation ? 'animate__animated animate__headShake' : ''}>My address isn't listed</button>
                </div>

                {/* Inputs */}
                <form className="form-address-input-container">
                  <div className="form-address-input-content">
                    <h2>Address Information</h2>

                    {/* Error */}
                    {error === true ? <Error message={'Please enter an address'} /> : null}

                    <div className="form-address-input">
                      <label>Door number</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="door-number"
                          name="doornumber"
                          type="text"
                          value={dataAddress.doornumber || ''}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-address-input" style={{position: 'relative'}}>
                      <label>Address Line 1</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="line1"
                          name="addressline1"
                          type="text"
                          value={dataAddress.addressline1 || ''}
                          disabled={true}
                        />
                      </div>
                      <div className="form-address-tooltip">{dataAddress.addressline1}</div>
                    </div>

                    <div className="form-address-input">
                      <label>Address line 2 (optional)</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="line2"
                          name="addressline2"
                          type="text"
                          value={dataAddress.addressline2 || ''}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-address-input">
                      <label>City</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={dataAddress.city || ''}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="form-address-input">
                      <label>Postcode</label>
                      <div onClick={() => setFocusAnimation(!focusAnimation)}>
                        <input
                          id="postcode"
                          name="postcode"
                          type="text"
                          value={dataAddress.postcode || ''}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </form>

                {/* Buttons */}
                <div className="form-address-btn-container">
                  <button className="form-address-btn btn-back" onClick={goToPostcode}>
                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                      <IoMdArrowDropleft className="icon-back" />
                    </IconContext.Provider>
                    Go back
                  </button>

                  <button className="form-address-btn btn-next" onClick={(e) => e.preventDefault(sendAddress(dataAddress))}>
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
                      <FormScript step={2} />
                    </div>

                    <div className="assistant-address-custom">
                      <FormAssistant tips={1} />
                    </div>
                  </div>
                )
                :
                <div style={{ width: '100%' }}>
                  <div className="assistant-address">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              }

            </div>
          </section>
        )
        :
        (
          <section className="form-address-section">
            <div className="form-address-container">
              <div className="form-address-content">
                <div className="form-address">
                  <h1>Select your addres from the below</h1>
                  <p>Having the correct address is key to ensuring we select the correct MPAN / MRPN for the customer's address. Id the customer's address is not present in the list below, we must enter it manually and request the customers MPAN / MPRN to enable successful switch.</p>
                </div>

                {/* Address */}
                <div onChange={(e) => handleChangeSelect(e)}>
                  <SelectAddress />
                </div>

                <div className='form-address-manually-btn'>
                  <button onClick={(e) => type_address(e)}>My address isn't listed</button>
                </div>

                {/* Inputs */}
                <form className="form-address-input-container" onChange={() => handleChangeTypeAddress()}>
                  <div className="form-address-input-content">
                    <h2>Type address manually</h2>

                    {/* Error */}
                    {error === true ? <Error message={'Please enter an address'} /> : null}

                    <div className="form-address-input">
                      <label>Door number</label>
                      <input
                        id="door-number"
                        type="text"
                        value={dataAddress.doornumber || ''}
                        onChange={(e) => handleChange(e)}
                        name="doornumber"
                        data-cy="door-input"
                      />
                    </div>

                    <div className="form-address-input" style={{position: 'relative'}}>
                      <label>Address Line 1</label>
                      <input
                        id="line1"
                        type="text"
                        value={dataAddress.addressline1 || ''}
                        onChange={(e) => handleChange(e)}
                        name="addressline1"
                        data-cy="addr1-input"
                      />
                    </div>

                    <div className="form-address-input">
                      <label>Address line 2 (optional)</label>
                      <input
                        id="line2"
                        type="text"
                        value={dataAddress.addressline2 || ''}
                        onChange={(e) => handleChange(e)}
                        name="addressline2"
                        data-cy="addr2-input"
                      />
                    </div>

                    <div className="form-address-input">
                      <label>City</label>
                      <input
                        id="city"
                        type="text"
                        value={dataAddress.city || ''}
                        onChange={(e) => handleChange(e)}
                        name="city"
                        data-cy="city-input"
                      />
                    </div>

                    <div className="form-address-input">
                      <label>Postcode</label>
                      <input
                        id="postcode"
                        type="text"
                        value={postcodeValue}
                        onChange={(e) => handleChange(e)}
                        name="postcode"
                        disabled
                      />
                    </div>

                  </div>
                </form>

                {/* Buttons */}
                <div className="form-address-btn-container">
                  <button className="form-address-btn btn-back" onClick={goToPostcode}>
                    <IconContext.Provider value={{ color: '#D338AE', size: '35px' }}>
                      <IoMdArrowDropleft className="icon-back" />
                    </IconContext.Provider>
                    Go back
                  </button>

                  <button data-cy="addrtyped-continue" className="form-address-btn btn-next" onClick={(e) => e.preventDefault(sendAddress(dataAddress))}>
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
                      <FormScript step={2} />
                    </div>

                    <div className="assistant-address-custom">
                      <FormAssistant tips={1} />
                    </div>
                  </div>
                )
                :
                <div style={{ width: '100%' }}>
                  <div className="assistant-address">
                    <FormAssistant tips={1} />
                  </div>
                </div>
              }

            </div>
          </section>
        )}
    </>
  );
}

export default FormAddress;
