
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

  it('should register a brute force attack and make it impossible to login if too many attempts are made', () => {
    cy.get('#emailInput').clear().type(mockEmail);
    cy.get('#passwordInput').clear().type(mockPass);
    for (let i = 0; i < 20; i++) {
      cy.get('#submitButton').click();
    }
    cy.wait(50)
    cy.contains('Email or password is invalid').should('not.exist');
  });

});
