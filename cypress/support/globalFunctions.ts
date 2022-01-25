import CypressEnvFile from "../envFileTypes";
import { Field } from "../envFileTypes";

declare global {
    function env(): CypressEnvFile;
    function testLengthOfAllProperitesInList(props: {
        list: Record<any, Field>; //
        /**
         * Function that will be executed to ensure that properties are valid
         */
        assertion: (state: boolean) => void;
    }): void;
}

globalThis.env = () => {
    return Cypress.env() as CypressEnvFile;
};

globalThis.testLengthOfAllProperitesInList = (props) => {
    const { assertion, list } = props;
    const keys = Object.keys(props.list);

    for (const key of keys) {
        it(`When ${key} is invalid`, () => {
            keys.filter((target) => target != key).forEach((target) => {
                cy.getByCyTag(target).type(list[target].valid).blur();
            });

            cy.getByCyTag(key).type(list[key].invalid).blur();
            assertion(true);
            cy.getByCyTag(key).clear().type(list[key].valid).blur();
            assertion(false);
        });
    }
};
