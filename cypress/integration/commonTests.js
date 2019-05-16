
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
  const mockPass = 'Password123';

  beforeEach(function () {
    cy.visit(url);
  });

  it('starts at the login page and be able to enter the mock email and password', () => {
    cy.contains('Login:');
    cy.get('[data-cy=email]').type(mockEmail);
    cy.get('[data-cy=password]').type(mockPass);
  });

  it('should mention that the email or password is wrong when bad login info is entered', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.get('[data-cy=submit]').click();
    cy.wait(2000);
    cy.contains('Email or password is invalid');
    cy.get('[data-cy=email]').type(mockEmail);
    cy.contains('Email or password is invalid');
    cy.get('[data-cy=email]').clear();
    cy.get('[data-cy=password]').type(mockPass);
    cy.contains('Email or password is invalid');
  });

  it('should be possible to press enter to login', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.type('qwerty{enter}');
    cy.contains('Email or password is invalid');
  });

  it('should tell if passwords dont match when registering a new user', () => {
    cy.get('[data-cy=register').click();
    cy.contains('Passwords do not match!').should('not.exist');
    cy.get('[data-cy=regemail').type(mockEmail);
    cy.get('[data-cy=regpass').type(mockPass);
    cy.get('[data-cy=regconfirm').type(mockPass + '123');
    cy.get('[data-cy=regregister').click();
    cy.contains('Passwords do not match!');
  });

  // Remember to delete your random account from Firestore
  it('should register and attempt to login successfully', () => {
    cy.get('[data-cy=register').click();
    cy.get('#email').clear().type(mockEmail);
    cy.get('#password').clear().type(mockPass);
    cy.get('#confirmPassword').clear().type(mockPass);
    cy.get('#registerNewUserButton').click();

    cy.contains('Passwords do not match!').should('not.exist');
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
