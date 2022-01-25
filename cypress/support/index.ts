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
        }
    }
}
