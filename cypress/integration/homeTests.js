
describe ('HomeTests', () => {
  const dropEvent = {
    dataTransfer: {
      files: [],
    },
  };

  const url = 'http://localhost:4200';
  const mockPass = 'Password123';

  beforeEach(function () {
    cy.visit(url);
    cy.get('[data-cy=email]').type(Cypress.env('user'));
    cy.get('[data-cy=password]').type(mockPass);
    cy.get('[data-cy=submit]').click();
    cy.url().should('be', 'http://localhost:4200/home');
  });

  it('should have loaded home correctly', () => {
    cy.get('[data-cy=mainTable]');
    cy.get('[data-cy=uploadDropzone]');
    cy.get('[data-cy=back]');
    cy.get('[data-cy=home]');
  });

  it('should properly navigate between items', () => {
    cy.wait(5000);
    cy.get('[data-cy=home]').click();
    cy.get('[data-cy=home]').click();
    cy.get('[data-cy=home]').click();
    cy.get('[data-cy=home]').click();

    cy.get('.fa-address-book').click();
    cy.get('.fa-calendar-alt');
    cy.get('.fa-folder:nth(0)').click();
    cy.contains('.pdf');

    cy.get('[data-cy=back]').click();
    cy.get('.fa-folder:nth(0)');
    cy.get('.fa-calendar-alt').click();
    cy.contains('.pka');

    cy.get('[data-cy=home]').click();
    cy.get('.fa-address-book').click();
  });

});
