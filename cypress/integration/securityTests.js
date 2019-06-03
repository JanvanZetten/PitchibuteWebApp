
import Chance from 'chance';
const chance = new Chance();

describe ('SecurityTests', () => {
  const dropEvent = {
    dataTransfer: {
      files: [],
    },
  };

  const url = 'http://localhost:4200';
  const mockEmail = chance.email();
  const mockPass = 'Password123';

  beforeEach(function () {
    cy.visit(url);
	cy.get('body').then((body) => { 
		if (body.find('#logout').length > 0) { 
			cy.get('#logout').click();
			cy.wait(250);
			cy.visit(url + '/welcome');
		} 
	});
  });

  it('should open the login page', () => {
    cy.visit(url);
    cy.contains('Login:');
  });

  it('should register a brute force attack and make it impossible to login if too many attempts are made', () => {
    cy.get('[data-cy=email]').clear().type(mockEmail);
    cy.get('[data-cy=password]').clear().type(mockPass);
    cy.wait(500);
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy=submit]').click();
      cy.wait(250);
    }
    cy.wait(1000);
    cy.contains('Email or password is invalid');
    cy.get('[data-cy=submit]').should('disabled');
    cy.get('[data-cy=captcha]');
  });

});
