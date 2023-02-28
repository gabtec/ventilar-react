/// <reference types="Cypress" />

const USER_CONSUMER = 2000;
const USER_CONSUMER_PASS = 'gabriel';

describe('SPA Consumer Page Test Suite', () => {
  describe('After success login', () => {
    beforeEach(() => {
      cy.login(USER_CONSUMER, USER_CONSUMER_PASS);
      cy.location('pathname').should('eq', '/spa/consumer');
    });

    describe('Home Page - List Active Orders', () => {
      it('should render spa-consumer page, if loggedIn', () => {
        cy.contains('Lista de Requisições');
        cy.contains('Lista de Ventiladores').should('not.exist');
      });
    });

    describe('Create New Order', () => {
      it('should open select ventilator category modal, after click "+Adicionar"', () => {
        cy.get('[data-cy="add-order-btn"]').click();
        cy.get('[data-cy="select-vent-modal"]').should('be.visible');
      });

      it('should go back to consumer home page, after click "<Voltar" on select ventilator category modal', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="close-select-cat"]').click();
        cy.location('pathname').should('eq', '/spa/consumer');
      });

      it('should list all available ventilators count, by park, after click "+Adiconar" and select one ventilator category', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();
        cy.location('pathname').should('eq', '/spa/ventilators/available/vni');
        cy.contains('Disponíveis');
      });

      it('should go back to consumer home page, after click "<Voltar" on "Lista de Ventiladores Disponíveis" page', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();

        cy.get('[data-cy="close-available-vents"]').click();

        cy.location('pathname').should('eq', '/spa/consumer');
      });

      it('should open new Order form, after click "Requisitar" on "Lista de Ventiladores Disponíveis" page', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();

        cy.get('[data-cy="request-available-vent"]').first().click();

        cy.location('pathname').should('eq', '/spa/orders/create/vni');
      });

      it('should close new Order form, after click "Cancelar" and go back to consumer home page', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();

        cy.get('[data-cy="request-available-vent"]').first().click();

        cy.get('[data-cy="close-order-form"]').click();

        cy.location('pathname').should('eq', '/spa/consumer');
      });

      it('should throw error if trying to create a new Order, with empty form', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();

        cy.get('[data-cy="request-available-vent"]').first().click();

        cy.get('[data-cy="save-order-form"]').click();

        cy.get('[data-cy="error-feedback"]').contains(
          'Deve introduzir o nome do paciente.'
        );

        cy.location('pathname').should('eq', '/spa/orders/create/vni');
      });

      it('should create a new Order', () => {
        cy.get('[data-cy="add-order-btn"]').click();

        cy.get('[data-cy="choose-vni"]').click();

        cy.get('[data-cy="request-available-vent"]').first().click();

        // fill form
        cy.get('#patient-name').type('John Paine');
        cy.get('#patient-bed').clear().type(2);
        cy.get('form').submit();

        cy.location('pathname').should('eq', '/spa/consumer');

        // cy.contains('John Paine');
        // cy.contains('cama[2]');
        // cy.contains('PENDING');
        // cy.contains('Editar');
        // cy.contains('Devolver').should('have.attr', 'disabled');
      });
    });
  });
});
