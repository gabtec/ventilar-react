/// <reference types="Cypress" />

describe('SPA Dispatcher Page Test Suite', () => {
  describe('After success login', () => {
    before(() => {
      cy.login(1000, 'gabriel');
      cy.location('pathname').should('eq', '/spa');
    });

    it('should render spa-dispatcher page, if loggedIn', () => {
      cy.contains('Lista de Requisições');
      cy.contains('Lista de Ventiladores');
    });
  });
});
