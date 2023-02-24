/// <reference types="Cypress" />

describe('SPA Consumer Page Test Suite', () => {
  describe('After success login', () => {
    beforeEach(() => {
      cy.login(2000, 'gabriel');
      cy.location('pathname').should('eq', '/spa');
    });

    it('should render spa-consumer page, if loggedIn', () => {
      cy.contains('Lista de Requisições');
      cy.contains('Lista de Ventiladores').should('not.exist');
    });

    it('should should create new order', () => {
      cy.get('[data-cy="add-order-btn"]').click();
      cy.get('[data-cy="select-vent-modal"]').should('be.visible');

      cy.get('[data-cy="choose-vni"]').click();
      cy.contains('Disponíveis');
    });
  });
});
