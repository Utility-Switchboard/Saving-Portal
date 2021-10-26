/// <reference types="cypress" />

describe('<LoginPage />', () => {
    it('<Login /> -Verify Login screen', () => {
        cy.visit('/');

        // Test sign in text header
        cy.get('[data-cy=signin-header]')
            .invoke('text')
            .should('equal', 'Sign In with Google')

        // Test submit sig in btn existing and value
        cy.get('[data-cy=btn-login]')
            .should('exist')
            .should('have.value', 'Sign In');
    });
});