/// <reference types="cypress" />

describe('<HomePage /> - NO API RESPONSE - NO E7', () => {

    // Testing APP - "Without API responses" Electricity Only - KWH form
    it('<HomePage /> - Testing APP - "Without API responses" Electricity Only - KWH form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select one');

        // Select Elec only
        cy.get('[data-cy=elec-only]').click();

        // Click continue elec only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue elec only selected
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=eleconly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=eleconly-mt-edit]').click();

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a payment method');

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-pt]').select('QDD');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();
    });

    // Testing APP - "Without API responses" Electricity Only - GBP form
    it('<HomePage /> - Testing APP - "Without API responses" Electricity Only - GBP form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select one');

        // Select Elec only
        cy.get('[data-cy=elec-only]').click();

        // Click continue elec only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue elec only selected
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=eleconly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=eleconly-mt-edit]').click();

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select a payment method');

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-pt]').select('QDD');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage on KWH input
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
        .should('exist')
        .invoke('text')
        .should('equal', 'Please introduce a valid usage');

        // Introducing GBP_es
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();
    });

    // Testing APP - "Without API responses" Electricity Only - Property size form
    it('<HomePage /> - Testing APP - "Without API responses" Electricity Only - Property size form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Elec only
        cy.get('[data-cy=elec-only]').click();

        // Click continue elec only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue elec only selected
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=eleconly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=eleconly-mt-edit]').click();

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input meter type "K"
        cy.get('[data-cy=eleconly-select-pt]').select('QDD');

        // Click continue elec only supply information
        cy.get('[data-cy=eleconly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage on KWH input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Gas Only - KWH form
    it('<HomePage /> - Testing APP - "Without API responses" Gas Only - Gas form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=gas-only]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=gasonly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=gasonly-mt-edit]').click()

        // Click select input meter type "CR"
        cy.get('[data-cy=gasonly-select-mt]').select('CR');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=gasonly-select-pt]').select('MDD');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();
    });

    // Testing APP - "Without API responses" Gas Only - GBP_gs form
    it('<HomePage /> - Testing APP - "Without API responses" Gas Only - GBP_gs form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=gas-only]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=gasonly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=gasonly-mt-edit]').click()

        // Click select input meter type "CR"
        cy.get('[data-cy=gasonly-select-mt]').select('CR');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=gasonly-select-pt]').select('MDD');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();
    });

    // Testing APP - "Without API responses" Gas Only - Property size form
    it('<HomePage /> - Testing APP - "Without API responses" Gas Only - Property size form', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=gas-only]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=gasonly-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=gasonly-mt-edit]').click()

        // Click select input meter type "CR"
        cy.get('[data-cy=gasonly-select-mt]').select('CR');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=gasonly-select-pt]').select('MDD');

        // Click continue elec only supply information
        cy.get('[data-cy=gasonly-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-idk]').click()

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - KWH and Gas
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - KWH and Gas', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH gas
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - KWH and GBP_gs
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - KWH and GBP_gs', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - KWH and Property size
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - KWH and Property size', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and GAS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH gas
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and GBP_GS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and GBP_GS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and AVG
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - GBP_ES and AVG', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - AVG and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - AVG and GAS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - AVG and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - AVG and GBP_gs', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (same supplier) - AVG and AVG  
    it('<HomePage /> - Testing APP - "Without API responses" Dual (same supplier) - AVG and AVG', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue gas only selected
        cy.get('[data-cy=dual-yes]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue gas only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualsame-edf]').click();

        // Error if meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter type');

        // Click edit button meter type
        cy.get('[data-cy=dualsame-mt-edit]').click()

        // Click select input meter type "N"
        cy.get('[data-cy=dualsame-select-mt]').select('N');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Error if payment type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment method');

        // Click select input payment type "MDD"
        cy.get('[data-cy=dualsame-select-pt]').select('MPB');

        // Click continue elec only supply information
        cy.get('[data-cy=dualsame-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

            // Click I don't know form
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - KWH and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - KWH and GAS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH gas
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - KWH and GBP_gs
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - KWH and GBP_gs', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - KWH and AVG
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - KWH and AVG', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=kwh-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - GBP_es and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - GBP_es and GAS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH gas
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - GBP_es and GBP_GS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - GBP_es and GBP_GS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - GBP_es and AVG
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - GBP_es and AVG', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpes-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - AVG and GAS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - AVG and GAS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing KWH
        cy.get('[data-cy=gas-input]').type('2900');

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - AVG and GBP_GS
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - AVG and GBP_GS', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Introducing amount GBP gas
        cy.get('[data-cy=gbpgs-input]').type('50');

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });

    // Testing APP - "Without API responses" Dual (different supplier) - AVG and AVG
    it('<HomePage /> - Testing APP - "Without API responses" Dual (different supplier) - AVG and AVG', () => {
        cy.visit('/home')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Error if value is no introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please, enter a valid postcode')

        // Introducing postcode
        cy.get('[data-cy=postcode-input]').type('AB344YH')

        // Click find postcode
        cy.get('[data-cy=postcode-btn]').click();

        // Click continue addres without select 
        cy.get('[data-cy=addr-noselected]').click();

        // Error if address is not introduced
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please enter an address');

        // Click My address isn't listed
        cy.get('[data-cy=addr-empty]').click();

        // Introducing postcode
        cy.get('[data-cy=door-input]').type('11');
        cy.get('[data-cy=addr1-input]').type('Cypress Court');
        cy.get('[data-cy=city-input]').type('Sutton');

        // Click continue
        cy.get('[data-cy=addrtyped-continue]').click();

        // Click continue fuel type without select one
        cy.get('[data-cy=ft-continue]').click();

        // Error if fuel type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Select Gas only
        cy.get('[data-cy=dual]').click();

        // Click continue gas only selected
        cy.get('[data-cy=ft-continue]').click();

        // Error if option to compare is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select one');

        // Click continue dual selected
        cy.get('[data-cy=dual-no]').click();

        // Click continue dual selected
        cy.get('[data-cy=ft-continue]').click();

        // Click continue mprn
        cy.get('[data-cy=mpanmprn-continue]').click();

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a supplierPlease select a meter typePlease select a supplierPlease select a meter type');

        // Click EDF supplier
        cy.get('[data-cy=dualelec-edf]').click();

        // Click british gas supplier
        cy.get('[data-cy=dualgas-british]').click();

        // Error if supplier and meter type is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a meter typePlease select a meter type');

        // Click edit button meter type es
        cy.get('[data-cy=dualdi-mt-edit-es]').click();

        // Select meter type es
        cy.get('[data-cy=dualdi-select-mt-es]').select('N');

        // Click edit button meter type gs
        cy.get('[data-cy=dualdi-mt-edit-gs]').click();

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-mt-gs]').select('CR');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Error if payment method is not selected
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select a payment methodPlease select a payment method');

        // Select meter type es
        cy.get('[data-cy=dualdi-select-pt-es]').select('QPB');

        // Select meter type gs
        cy.get('[data-cy=dualdi-select-pt-gs]').select('QDD');

        // Click continue dual different
        cy.get('[data-cy=dualdi-continue]').click();

        // Click confirm button
        cy.contains('button', 'Confirm').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Error if no selection on E7 options
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please select above');

        // Click "No" E7
        cy.get('[data-cy=e7-no]').click();

        // Click continue E7 form
        cy.get('[data-cy=e7-continue]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button KWH form
        cy.get('[data-cy=kwh-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=kwh-continue]').click();

        // Click continue GBP form
        cy.get('[data-cy=gbpes-continue]').click();

        // Error if no introduce usage on GBP_es input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpes-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpes-continue]').click();

        // Click continue GAS form
        cy.get('[data-cy=gas-continue]').click();

        // Error if no introduce usage
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know button
        cy.get('[data-cy=gas-idk]').click();

        // Click continue KWH form
        cy.get('[data-cy=gas-continue]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Click I don't know form
        cy.get('[data-cy=gbpgs-idk]').click();

        // Click continue GBP_gs form
        cy.get('[data-cy=gbpgs-continue]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();

        // Error if no introduce usage on AVG input
        cy.get('[data-cy=error]')
            .should('exist')
            .invoke('text')
            .should('equal', 'Please introduce a valid usage');

        // Check second option AVG form
        cy.get('[data-cy=avg-check2]').click();

        // Click continue AVG form
        cy.get('[data-cy=avg-continue]').click();
    });
});