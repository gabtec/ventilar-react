/// <reference types="Cypress" />

describe('SPA Page Protection Test Suite', () => {
  describe('Before user login', () => {
    it('should not allow manuall navigation to spa, using directly typed url', () => {
      cy.visit('/spa');
      // should redirect to login
      cy.contains('Login');
    });
  });
});
