import CypressEnvFile from "../envFileTypes";

declare global {
    function env(): CypressEnvFile;
}

globalThis.env = () => {
    return Cypress.env() as CypressEnvFile;
};
