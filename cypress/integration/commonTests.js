
import Chance from 'chance';
const chance = new Chance();

describe ('logintests', () => {

  const url = 'http://localhost:4200';

  const dropEvent = {
    dataTransfer: {
      files: [],
    },
  };

  const mockEmail = chance.email();
  const testEmail = 'cypresstesting@bmwsucks.com';
  const mockPass = 'Password123';


  it('starts at the login page and be able to enter the mock email and password', () => {
    cy.visit(url);
    cy.contains('Login:');
    cy.get('#emailInput').type(mockEmail);
    cy.get('#passwordInput').type(mockPass);
    cy.get('#googleLoginButton').contains('Login with Google');
  });

  it('should mention that the email or password is wrong when bad login info is entered', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.get('#submitButton').click();
    cy.wait(2000);
    cy.contains('Email or password is invalid');
    cy.get('#emailInput').clear();
    cy.get('#passwordInput').clear();
  });

  /*it('should login successfully and redirect to home', () => {
    cy.get('#emailInput').type(testEmail);
    cy.get('#passwordInput').type(mockPass);
    cy.get('#submitButton').click();
    cy.url().should('equal', 'http://localhost:4200/home');
  });*/

  it('should have loaded home correctly', () => {
    cy.visit('http://localhost:4200/home');
    cy.get('#itemTable');
    cy.get('#fileUploadDropzone');
    cy.get('#backButton');
    cy.get('#homeButton');
  });

  it('should properly navigate between items', () => {
    cy.get('#homeButton').click();
    cy.get('#homeButton').click();
    cy.get('#homeButton').click();
    cy.get('#homeButton').click();
	
    cy.get('.fa-address-book').click();
    cy.get('.fa-calendar-alt');
	cy.get('.fa-folder:nth(0)').click();
    cy.contains('.pdf');

    cy.get('#backButton').click();
    cy.get('.fa-folder:nth(0)');
    cy.get('.fa-calendar-alt').click();
    cy.contains('.pka');

    cy.wait(5000);
    cy.get('#homeButton').click();
    cy.get('.fa-address-book').click();
  });

});
