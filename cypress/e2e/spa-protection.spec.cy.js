/// <reference types="Cypress" />

describe('SPA Page Protection Test Suite', () => {
  describe('Before user login', () => {
    it('should not allow manuall navigation to spa, using directly typed url', () => {
      cy.clock();

      cy.visit('/spa');

      cy.contains('404');
      cy.contains('Not Found');

      cy.tick(3000);
      // should redirect to login after a few seconds
      cy.contains('Login');
    });

    it('should not allow manuall navigation to spa, using directly typed url', () => {
      cy.clock();

      cy.visit('/spa/consumer');

      cy.contains('404');
      cy.contains('Not Found');

      cy.tick(3000);
      // should redirect to login after a few seconds
      cy.contains('Login');
    });
  });
});
