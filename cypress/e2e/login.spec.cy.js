/// <reference types="Cypress" />
const USER_NOT_EXISTS = 9;
const USER_CONSUMER = 2000;
const USER_CONSUMER_PASS = 'gabriel';
const USER_DISPATCHER = 1000;
const USER_DISPATCHER_PASS = 'gabriel';

describe('Login Page Test Suite', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render login page', () => {
    cy.contains('ventil');
  });

  it('should have 2 label fields: Utilizador and Password', () => {
    // cy.visit('/');

    // cy.get('#gt-label').contains('Utilizador');
    cy.get('label').should('have.length', 2);
    cy.get('label').first().contains('Utilizador');
    cy.get('label').last().contains('Password');

    cy.get('button').contains('Login');
  });

  it('should show error message when login fails', () => {
    // cy.visit('/');

    cy.get('.help').should('not.exist');
    // cy.get('#gt-label').contains('Utilizador');
    cy.get('input[name="username"]').type(USER_NOT_EXISTS);
    cy.get('input[name="password"]').type('fake-secret');

    cy.get('button').click();

    cy.get('.help').should('exist');
    cy.get('.help').contains('Credênciais inválidas.');
  });

  it('should login succefully and nav to spa', () => {
    // cy.visit('/');

    cy.get('input[name="username"]').type(USER_CONSUMER);
    cy.get('input[name="password"]').type(USER_CONSUMER_PASS);

    cy.get('button').click();

    cy.get('.help').should('not.exist');

    cy.location('pathname').should('eq', '/spa/consumer');
    // cy.visit('/spa/');

    // check we got the cookie
    cy.getCookie('refreshCookie').its('value').should('not.be.empty');
  });

  it('should login succefully and nav to spa using ENTER key and not button', () => {
    // cy.visit('/');

    cy.get('input[name="username"]').type(USER_CONSUMER);
    cy.get('input[name="password"]').type(USER_CONSUMER_PASS + '{enter}');

    cy.location('pathname').should('eq', '/spa/consumer');
    cy.getCookie('refreshCookie').its('value').should('not.be.empty');
  });

  it('should login succefully and show username in navbar and logout button', () => {
    cy.get('input[name="username"]').type(USER_CONSUMER);
    cy.get('input[name="password"]').type(USER_CONSUMER_PASS + '{enter}');

    cy.location('pathname').should('eq', '/spa/consumer');

    // on normal viewport
    cy.viewport('macbook-15');
    cy.get('[data-cy="username-tag"]').contains('Gabriel Martins');
    cy.get('[data-cy="logout-btn"]').contains('Logout');

    // on smaller viewport
    cy.viewport('iphone-5');
    cy.get('.navbar-burger').click();
    cy.get('[data-cy="username-tag"]').contains('Gabriel Martins');
    cy.get('[data-cy="logout-btn"]').contains('Logout');
  });
});
