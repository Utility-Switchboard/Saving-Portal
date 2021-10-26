import React, { useState } from "react";
// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FormPostCode from "./components/FormCards/FormPostCode/FormPostCode";
import FormAddress from './components/FormCards/FormAddress/FormAddress';
import FormFuelType from './components/FormCards/FormFuelType/FormFuelType';
import FormMpanMprn from './components/FormCards/FormMPN-MPRN/FormMpanMprn';
import FormSupply from './components/FormCards/FormSupply/FormSupply';
import FormE7 from './components/FormCards/FormE7/FormE7';
import FormTariffs from './components/FormCards/FormTariffs/FormTariffs';
import FormUsageKWH from './components/FormCards/FormsUsage/FormUsageKWH/FormUsageKWH';
import FormUsageGAS from './components/FormCards/FormsUsage/FormUsageGAS/FormUsageGAS';
import FormUsageGBP_es from './components/FormCards/FormsUsage/FormUsageGBP_es/FormUsageGBP_es';
import FormUsageGBP_gs from './components/FormCards/FormsUsage/FormUsageGBP_gs/FormUsageGBP_gs';
import FormUsageAVG from './components/FormCards/FormsUsage/FormUsageAVG/FormUsageAVG';
import FormCompare from './components/FormCards/FormCompare/FormCompare';
import Overlay from "./components/Overlay/Overlay";

import Home from '../src/pages/HomePage/Home';
 
function App() {
  // /* -- STATES -- */
  // // Progress bar 
  // const [progressBar, updateProgressBar] = useState({ step: 0 });

  // // Script
  // const [showScript, updateShowScript] = useState(true);

  // // Customer Postcode State
  // const [customerPostCode, updateCustomerPostCode] = useState({
  //   postcode: ""
  // });

  // // Customer Address
  // const [customerAddres, updateCustomerAddress] = useState({});

  // // Use gas 
  // const [useGas, updateUseGas] = useState({});

  // // Fuel
  // const [fuel, updateFuel] = useState({});

  // // Customer Electricity Information
  // const [electricityInformation, updateElectricityInformation] = useState({});

  // // Customer Gas Information
  // const [gasInformation, updateGasInformation] = useState({});

  // // Customer supplier information
  // const [supplierInformation, updateSupplierInformation] = useState({});

  // // Customer Information
  // const [customerInformation, updateCustomerInformation] = useState({});

  // // Customer Electricity Payment Type
  // const [electricityPaymentType, updateElectricityPaymentType] = useState({});

  // // Customer Gas Payment Type
  // const [gasPaymentType, updateGasPaymentType] = useState({});

  // // Customer Economy 7
  // const [economy7, updateEconomy7] = useState({});

  // /** -- VIEWS states -- */

  // // Show Overlay
  // const [showOverlay, updateShowOverlay] = useState(false);

  // // Show Form PostCode
  // const [showFormPostCode, updateShowFormPostCode] = useState(true);

  // // Show Form Address
  // const [showFormAddres, updateShowFormAddres] = useState(false);

  // // Show form Fuel type
  // const [showFormFuelType, updateShowFomrFuelType] = useState(false);

  // // Show Form MPAN/MPRN 
  // const [showFormMpanMprn, updateShowFormMpanMprn] = useState(false);

  // // Show Form Supply 
  // const [showFormSupply, updateShowFormSupply] = useState(false);

  // // Show Form E7
  // const [showE7, updateShowE7] = useState(false);

  // // Show Form Tariffs
  // const [showFormTariffs, updateShowFormTariffs] = useState(false);

  // // Show Form Usage KWH
  // const [showFormUsageKWH, updateShowFormUsageKWH] = useState(false);

  // // Show Form Usage GAS
  // const [showFormUsageGAS, updateShowFormUsageGAS] = useState(false);

  // // Show Form Usage GBP_es
  // const [showFormUsageGBP_es, updateShowFormUsageGBP_es] = useState(false);

  // // Show Form Usage GBP_gs
  // const [showFormUsageGBP_gs, updateShowFormUsageGBP_gs] = useState(false);

  // // Show Form Usage AVG
  // const [showFormUsageAVG, updateShowFormUsageAVG] = useState(false);

  // // AVG for elec
  // const [avgElec, updateAvgElec] = useState(false);

  // // AVG for gas
  // const [avgGas, updateAvgGas] = useState(false);

  // // Show Form Compare
  // const [showFormCompare, updateShowFormCompare] = useState(false);

  // /* -- FUNCTIONS -- */

  // // Add postcode to customer 
  // const addPostCodeData = (postcode) => {
  //   const postCodeData = postcode;
  //   updateCustomerPostCode({
  //     postcode: postCodeData.toUpperCase()
  //   });
  // };

  // // console.log(avgElec);
  // // console.log(avgGas);

  // // States control
  // // console.log('De aqui para abajo');
  // // console.log(customerAddres);
  // // console.log(useGas);
  // // console.log(fuel);
  // // console.log(electricityInformation);
  // // console.log(gasInformation);
  // // console.log(supplierInformation);
  // // console.log(customerInformation);
  // // console.log(electricityPaymentType);
  // // console.log(gasPaymentType);
  // // console.log(economy7);

  // // console.log(electricityInformation);
  // // console.log(gasInformation);
  // // console.log(supplierInformation);
  // // console.log(customerInformation);
  // // console.log(electricityPaymentType);
  // // console.log(customerAddres);
  // // console.log(economy7);
  // // console.log(useGas);
  // // console.log(fuel);

  return (
    <Home/>
    // <>
    //   {/* Overlay Component */}
    //   {showOverlay ? <Overlay text={'Loading data, please wait...'} spinner={true} /> : null}

    //   {/* Navbar */}
    //   <Navbar
    //     progressBar={progressBar}
    //   />
    //   <>
    //     {/* Postcode form*/}
    //     {showFormPostCode ?
    //       (
    //         <FormPostCode
    //           addPostCodeData={addPostCodeData}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateShowFormPostCode={updateShowFormPostCode}
    //           updateShowFormAddres={updateShowFormAddres}
    //           updateProgressBar={updateProgressBar}
    //           updateShowScript={updateShowScript}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }

    //     {/* Address form*/}
    //     {showFormAddres ?
    //       (
    //         <FormAddress
    //           postcodeValue={customerPostCode.postcode}
    //           gasInformation={gasInformation}
    //           electricityInformation={electricityInformation}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerAddress={updateCustomerAddress}
    //           updateGasInformation={updateGasInformation}
    //           updateElectricityInformation={updateElectricityInformation}
    //           updateShowFormPostCode={updateShowFormPostCode}
    //           updateShowFormAddres={updateShowFormAddres}
    //           updateShowOverlay={updateShowOverlay}
    //           updateProgressBar={updateProgressBar}
    //           updateShowScript={updateShowScript}
    //           updateShowFomrFuelType={updateShowFomrFuelType}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }

    //     {/* Fuel type */}
    //     {showFormFuelType ?
    //       (
    //         <FormFuelType
    //           customerInformation={customerInformation}
    //           showScript={showScript}
    //           fuel={fuel}
    //           useGas={useGas}
    //           electricityInformation={electricityInformation}
    //           gasInformation={gasInformation}
    //           supplierInformation={supplierInformation}
    //           customerAddres={customerAddres}
    //           progressBar={progressBar}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateFuel={updateFuel}
    //           updateUseGas={updateUseGas}
    //           updateElectricityInformation={updateElectricityInformation}
    //           updateGasInformation={updateGasInformation}
    //           updateSupplierInformation={updateSupplierInformation}
    //           updateCustomerAddress={updateCustomerAddress}
    //           updateShowFomrFuelType={updateShowFomrFuelType}
    //           updateShowFormMpanMprn={updateShowFormMpanMprn}
    //           updateShowFormAddres={updateShowFormAddres}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       null
    //     }

    //     {/* MPAN/MPRN form*/}
    //     {showFormMpanMprn ?
    //       (
    //         <FormMpanMprn
    //           customerAddres={customerAddres}
    //           electricityInformation={electricityInformation}
    //           gasInformation={gasInformation}
    //           customerInformation={customerInformation}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerAddress={updateCustomerAddress}
    //           updateElectricityInformation={updateElectricityInformation}
    //           updateGasInformation={updateGasInformation}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateProgressBar={updateProgressBar}
    //           updateShowFormMpanMprn={updateShowFormMpanMprn}
    //           updateShowFormSupply={updateShowFormSupply}
    //           updateShowFomrFuelType={updateShowFomrFuelType}
    //           updateShowOverlay={updateShowOverlay}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }
    //     {/* Supplier Information form*/}
    //     {showFormSupply ?
    //       (
    //         <FormSupply
    //           customerAddres={customerAddres}
    //           electricityInformation={electricityInformation}
    //           gasInformation={gasInformation}
    //           supplierInformation={supplierInformation}
    //           useGas={useGas}
    //           fuel={fuel}
    //           customerInformation={customerInformation}
    //           electricityPaymentType={electricityPaymentType}
    //           gasPaymentType={gasPaymentType}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerAddress={updateCustomerAddress}
    //           updateShowFormMpanMprn={updateShowFormMpanMprn}
    //           updateShowFormSupply={updateShowFormSupply}
    //           updateShowE7={updateShowE7}
    //           updateSupplierInformation={updateSupplierInformation}
    //           updateElectricityInformation={updateElectricityInformation}
    //           updateGasInformation={updateGasInformation}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateElectricityPaymentType={updateElectricityPaymentType}
    //           updateGasPaymentType={updateGasPaymentType}
    //           updateFuel={updateFuel}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }
    //     {/* Economy 7 form */}
    //     {showE7 ?
    //       (
    //         <FormE7
    //           economy7={economy7}
    //           customerInformation={customerInformation}
    //           electricityPaymentType={electricityPaymentType}
    //           gasPaymentType={gasPaymentType}
    //           electricityInformation={electricityInformation}
    //           gasInformation={gasInformation}
    //           supplierInformation={supplierInformation}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateEconomy7={updateEconomy7}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormSupply={updateShowFormSupply}
    //           updateShowE7={updateShowE7}
    //           updateShowFormTariffs={updateShowFormTariffs}
    //           updateElectricityPaymentType={updateElectricityPaymentType}
    //           updateGasPaymentType={updateGasPaymentType}
    //           updateProgressBar={updateProgressBar}
    //           updateShowOverlay={updateShowOverlay}
    //           updateSupplierInformation={updateSupplierInformation}
    //           updateGasInformation={updateGasInformation}
    //           updateElectricityInformation={updateElectricityInformation}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }
    //     {/* Form Tariffs */}
    //     {showFormTariffs ?
    //       (
    //         <FormTariffs
    //           customerInformation={customerInformation}
    //           showScript={showScript}
    //           progressBar={progressBar}
    //           updateShowE7={updateShowE7}
    //           updateShowFormTariffs={updateShowFormTariffs}
    //           updateShowOverlay={updateShowOverlay}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateElectricityPaymentType={updateElectricityPaymentType}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       (
    //         null
    //       )
    //     }
    //     {/* Form Usage */}
    //     {showFormUsageKWH ?
    //       (
    //         <FormUsageKWH
    //           customerInformation={customerInformation}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateAvgElec={updateAvgElec}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateShowFormTariffs={updateShowFormTariffs}
    //           updateProgressBar={updateProgressBar}
    //           updateShowOverlay={updateShowOverlay}
    //           updateShowE7={updateShowE7}
    //         />
    //       )
    //       :
    //       null
    //     }
    //     {/* Form Usage */}
    //     {showFormUsageGAS ?
    //       (
    //         <FormUsageGAS
    //           customerInformation={customerInformation}
    //           progressBar={progressBar}
    //           avgElec={avgElec}
    //           showScript={showScript}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //           updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormUsageAVG={updateShowFormUsageAVG}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateShowFormTariffs={updateShowFormTariffs}
    //           updateAvgGas={updateAvgGas}
    //           updateAvgElec={updateAvgElec}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       null
    //     }
    //     {/* Form Usage GBP */}
    //     {showFormUsageGBP_es ?
    //       (
    //         <FormUsageGBP_es
    //           customerInformation={customerInformation}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormUsageAVG={updateShowFormUsageAVG}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateAvgElec={updateAvgElec}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       null
    //     }
    //     {/* Form Usage GBP */}
    //     {showFormUsageGBP_gs ?
    //       (
    //         <FormUsageGBP_gs
    //           customerInformation={customerInformation}
    //           avgElec={avgElec}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
    //           updateShowFormUsageAVG={updateShowFormUsageAVG}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateAvgGas={updateAvgGas}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       null
    //     }
    //     {/* Form Usage AVG*/}
    //     {showFormUsageAVG ?
    //       (
    //         <FormUsageAVG
    //           customerInformation={customerInformation}
    //           avgElec={avgElec}
    //           avgGas={avgGas}
    //           progressBar={progressBar}
    //           showScript={showScript}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowFormUsageAVG={updateShowFormUsageAVG}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateProgressBar={updateProgressBar}
    //         />
    //       )
    //       :
    //       null
    //     }
    //     {/* Form Compare*/}
    //     {showFormCompare ?
    //       (
    //         <FormCompare
    //           customerInformation={customerInformation}
    //           showScript={showScript}
    //           updateCustomerInformation={updateCustomerInformation}
    //           updateShowOverlay={updateShowOverlay}
    //           updateShowFormCompare={updateShowFormCompare}
    //           updateShowFormUsageKWH={updateShowFormUsageKWH}
    //           updateShowFormUsageGBP_es={updateShowFormUsageGBP_es}
    //           updateShowFormUsageAVG={updateShowFormUsageAVG}
    //           updateShowFormUsageGAS={updateShowFormUsageGAS}
    //           updateShowFormUsageGBP_gs={updateShowFormUsageGBP_gs}
    //         />
    //       )
    //       :
    //       null
    //     }
    //   </>
    //   {/* Footer */}
    //   <Footer />
    // </>
  );
}

export default App;
