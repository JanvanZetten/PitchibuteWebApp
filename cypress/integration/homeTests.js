
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
	cy.get('#logout').click();
      cy.wait(250);
    cy.visit(url + '/welcome');
    cy.get('[data-cy=email]').type(Cypress.env('user'));
    cy.get('[data-cy=password]').type(mockPass);
    cy.get('[data-cy=submit]').click();
    cy.url().should('be', 'http://localhost:4200/home');
  });

  it('should have loaded home correctly', () => {
    cy.get('table[id="itemTable"]');
    cy.get('#fileUploadDropzone');
    cy.get('#backButton');
    cy.get('#homeButton');
  });

  it('should properly navigate between items', () => {
      cy.wait(250);
    cy.get('.fa-address-book:nth(1)');
    cy.get('.fa-address-book:nth(1)').click();
    cy.get('.fa-folder:nth(1)');
    cy.get('.fa-folder:nth(1)').click();
    cy.get('.fa-file');
    cy.get('#backButton').click();
    cy.get('.fa-folder:nth(1)');
    cy.get('#backButton').click();
    cy.get('.fa-address-book:nth(1)');
  });

});
