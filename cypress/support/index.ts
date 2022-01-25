// Import commands.js using ES2015 syntax:
import "./commands";
import "./globalFunctions";

Cypress.Cookies.debug(true);

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            getByCyTag(value: string): Chainable<JQuery<HTMLElement>>;
            /**
             * Custom command to ensure that user can use right side button to toggle the visibility of entering password.
             * @param {string} **cyTag** -  `data-cy` attribute of password element to test
             * @example cy.checkPasswordElementVisibility('greeting')
             */
            checkPasswordElementVisibility(cyTag: string): void;
        }
    }
}
