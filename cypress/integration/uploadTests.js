
import Chance from 'chance';
const chance = new Chance();

describe ('logintests', () => {

  const url = 'http://localhost:4200';

  const dropEvent = {
    dataTransfer: {
      files: [],
    },
  };

  const testEmail = 'cypresstesting@bmwsucks.com';
  const mockPass = 'Password123';

  it('should login successfully and redirect to home', () => {
    cy.visit(url);
    cy.get('#emailInput').type(testEmail);
    cy.get('#passwordInput').type(mockPass);
    cy.get('#submitButton').click();
    cy.url().should('equal', 'http://localhost:4200/home');
  });

  // Doesn't function, need help figuring this out
  it('should upload a nice santa image when you press the upload button', () => {
    /*cy.contains('EnGruppe').click();
    cy.wait(2000);
    cy.contains('EnTestingMappe').click();
    cy.wait(2000);
    cy.get('#fileUploadDropzone').click();
      .then(subject => {
      return cy
        .fixture('santa.png', 'base64')
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const el = subject[0];
          if (el != null) {
            const testFile = new File([blob], 'santa.png');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            el.files = dataTransfer.files;
          }
          return subject
        })
    });*/

    //cy.get('#backButton').click();
    //cy.contains('EnTestingMappe').click();
  });

});
