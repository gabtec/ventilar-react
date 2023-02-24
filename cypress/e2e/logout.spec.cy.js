/// <reference types="Cypress" />

describe('Logout Action Test Suite', () => {
  it('should render login page, after logout', () => {
    cy.login(1000, 'gabriel');

    // cy.get('.button').contains('Logout').click();
    cy.get('.navbar-burger').click();
    cy.get('.button').contains('Logout').click();

    cy.location('pathname').should('eq', '/');
  });
});
