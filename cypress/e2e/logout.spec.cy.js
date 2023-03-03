/// <reference types="Cypress" />

const USER_DISPATCHER = 1000;
const USER_DISPATCHER_PASS = 'secret';
const USER_DISPATCHER_NAME = 'Gil Dispatcher';

describe('Logout Action Test Suite', () => {
  it('should logout successfully in small screens, and render login page after logout', () => {
    cy.login(USER_DISPATCHER, USER_DISPATCHER_PASS);

    cy.viewport('macbook-15');
    cy.get('.button').contains('Logout').click();

    cy.location('pathname').should('eq', '/');
  });

  it('should logout successfully in big screens, and render login page after logout', () => {
    cy.login(USER_DISPATCHER, USER_DISPATCHER_PASS);

    cy.viewport('iphone-5');
    cy.get('.navbar-burger').click();
    cy.get('.button').contains('Logout').click();

    cy.location('pathname').should('eq', '/');
  });
});
