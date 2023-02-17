describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3002');

    cy.get('.input').type(3428);
    // expect(true).to.equal(true);
  });
});
