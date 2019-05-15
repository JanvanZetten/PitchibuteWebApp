
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

  it('should open the login page', () => {
    cy.visit(url);
    cy.contains('Login:');
  });

  it('should tell if passwords dont match when registering a new user', () => {
    cy.get('#registerButton').click();

    cy.contains('Passwords do not match!').should('not.exist');
    cy.get('#email').type(mockEmail);
    cy.get('#password').type(mockPass);
    cy.get('#confirmPassword').type(mockPass + '123');
    cy.get('#registerNewUserButton').click();
    cy.contains('Passwords do not match!');
  });

  // Remember to delete your random account from Firestore
  it('should register and attempt to login successfully', () => {
    cy.get('#email').clear().type(mockEmail);
    cy.get('#password').clear().type(mockPass);
    cy.get('#confirmPassword').clear().type(mockPass);
    cy.get('#registerNewUserButton').click();

    cy.contains('Passwords do not match!').should('not.exist');
  });

});
