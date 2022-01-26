import "cypress-file-upload";

Cypress.Commands.add("getByCyTag", (value) => {
    return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("checkPasswordElementVisibility", (cyTag) => {
    cy.getByCyTag(cyTag).type("essa");

    cy.getByCyTag(cyTag).should("have.attr", "type", "password");
    cy.getByCyTag(`${cyTag}-toggle-visibility`).click();
    cy.getByCyTag(cyTag).should("have.attr", "type", "text");
    cy.getByCyTag(`${cyTag}-toggle-visibility`).click();
    cy.getByCyTag(cyTag).should("have.attr", "type", "password");
});

export {};
