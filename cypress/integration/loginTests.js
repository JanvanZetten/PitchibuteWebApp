
import Chance from 'chance';
const chance = new Chance();

describe ('LoginTests', () => {
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

  it('starts at the login page and be able to enter the mock email and password', () => {
    cy.contains('Login:');
    cy.get('[data-cy=email]').type(mockEmail);
    cy.get('[data-cy=password]').type(mockPass);
  });

  it('should return bad credentials when no login info is entered', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
    cy.contains('Email or password is invalid');
  });

  it('should return bad credentials when bad user info is entered', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.get('[data-cy=email]').type(mockEmail);
    cy.get('[data-cy=password]').type(mockPass);
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
    cy.contains('Email or password is invalid');
  });

  it('should return bad credentials when bad password info is entered', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.get('[data-cy=email]').type(Cypress.env("user"));
    cy.get('[data-cy=password]').type('WhatTheHeck123');
    cy.wait(500);
    cy.get('[data-cy=submit]').click();
    cy.contains('Email or password is invalid');
  });

  it('should be possible to press enter to login', () => {
    cy.contains('Email or password is invalid').should('not.exist');
    cy.wait(500);
    cy.get('[data-cy=password]').type('qwerty{enter}');
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

  it('should login successfully and redirect to home', () => {
    cy.get('[data-cy=email]').type(Cypress.env("user"));
    cy.get('[data-cy=password]').type(mockPass);
    cy.get('[data-cy=submit]').click();
    cy.url().should('be', 'http://localhost:4200/home');
  });

  // Not used due to flooding the database
  /*
  it('should register and attempt to login successfully', () => {
    cy.get('[data-cy=register').click();
    cy.get('#email').clear().type(mockEmail);
    cy.get('#password').clear().type(mockPass);
    cy.get('#confirmPassword').clear().type(mockPass);
    cy.get('#registerNewUserButton').click();

    cy.contains('Passwords do not match!').should('not.exist');
  });
  */

});
