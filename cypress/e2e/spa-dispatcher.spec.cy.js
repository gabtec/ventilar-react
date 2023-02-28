/// <reference types="Cypress" />

const USER_DISPATCHER = 3428;
const USER_DISPATCHER_PASS = 'gabriel';

describe('SPA Dispatcher Page Test Suite', () => {
  describe('After success login', () => {
    before(() => {
      cy.login(USER_DISPATCHER, USER_DISPATCHER_PASS);
      cy.location('pathname').should('eq', '/spa/dispatcher');
    });

    describe('UC1 - No orders AND No ventilators', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('Nenhuma requisição efectuada.');
        cy.contains('Nenhum ventilador neste serviço.');
      });
    });

    describe('UC2 - No orders AND One ventilator', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('Nenhuma requisição efectuada.');
        cy.contains('Oxylog 3000');
      });
    });

    describe('UC3 - One orders AND One ventilator', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('John Paine');
        cy.contains('Oxylog 3000');
      });
    });

    describe('UC4 - One orders AND No ventilator', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('John Paine');
        cy.contains('Nenhum ventilador neste serviço.');
      });
    });

    describe('UC5 - One order "PENDING" -- dispatch request', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.visit('/spa/dispatcher');
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('John Paine');
        cy.contains('PENDING');
        cy.contains('Oxylog 3000');
      });

      it('should present 3 buttons in order item: Editar, Responder and Receber (this last one disabled)', () => {
        cy.get('[data-cy="dispatch-btn-edit-order"]').should('exist');
        cy.get('[data-cy="dispatch-btn-respond-order"]').should('exist');
        cy.get('[data-cy="dispatch-btn-receive-order"]').should(
          'have.attr',
          'disabled'
        );
      });

      it('should present a list of availables ventilators to loan', () => {
        cy.get('[data-cy="dispatch-btn-respond-order"]').click();
        cy.contains('Empréstimo de ventilador');

        // two available
        cy.contains('Oxylog 3000');
        cy.contains('Philips Trilogy');

        // test cancel
        cy.get('[data-cy="dispatch-modal-btn-cancel"]').click();

        cy.contains('Empréstimo de ventilador').should('not.be.visible');

        // test save
        cy.get('[data-cy="dispatch-btn-respond-order"]').click();
        cy.get('[type="radio"].radio').first().check();
        cy.get('[data-cy="dispatch-modal-btn-save"]').click();
      });
    });

    describe('UC6 - One order "DELIVERED" -- confirm delivery', () => {
      it('should render spa-dispatcher page, if loggedIn', () => {
        cy.visit('/spa/dispatcher');
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores');

        cy.contains('John Paine');
        cy.contains('PENDING');
        cy.contains('Oxylog 3000');
      });

      it('should present 3 buttons in order item: Editar, Responder and Receber (this last one disabled)', () => {
        cy.get('[data-cy="dispatch-btn-edit-order"]').should('exist');
        cy.get('[data-cy="dispatch-btn-respond-order"]').should(
          'have.attr',
          'disabled'
        );
        cy.get('[data-cy="dispatch-btn-receive-order"]').should('exist');
      });

      it.only('should allow to set a order as received', () => {
        cy.get('[data-cy="dispatch-btn-receive-order"]').click();
        cy.contains('Recepção de ventilador');

        // test cancel
        cy.get('[data-cy="dispatch-modal-receive-vent-cancel"]').click();

        cy.contains('Empréstimo de ventilador').should('not.be.visible');

        // test save
        cy.get('[data-cy="dispatch-btn-receive-order"]').click();
        cy.get('[data-cy="dispatch-modal-receive-vent-save"]').click();
      });
    });
  });
});
