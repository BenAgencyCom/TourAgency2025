Cypress.Commands.add("getByCyTag", (value) => {
    return cy.get(`[data-cy=${value}]`);
});

export {};
