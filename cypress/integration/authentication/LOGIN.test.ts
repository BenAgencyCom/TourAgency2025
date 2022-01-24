import LocalStorageUserData from "@/@types/LocalStorageUserData";

describe("Login page", () => {
    const passwordInputSelector = `input[data-cy='password']`;
    const emailInputSelector = `input[data-cy='email']`;
    const continueButtonSelector = `button[data-cy='continue']`;

    const _clear = () => {
        cy.get(passwordInputSelector).clear();
        cy.get(emailInputSelector).clear();
    };

    before(() => {
        cy.visit(env().urls.login).location("pathname").should("include", "/login");
        _clear();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("accessToken");
    });

    it("Password field should be able to change visibility", () => {
        cy.get(passwordInputSelector).should("have.attr", "type", "password");
        cy.get("button[data-cy='password-toggle-visibility']").click();
        cy.get(passwordInputSelector).should("have.attr", "type", "text");
        cy.get("button[data-cy='password-toggle-visibility']").click();
        cy.get(passwordInputSelector).should("have.attr", "type", "password");
    });

    describe("Redirects should work", () => {
        beforeEach(() => {
            cy.visit(env().urls.login);
        });
        after(() => {
            cy.visit(env().urls.login);
        });

        it("Main Page button should work", () => {
            cy.get('button[data-cy="redirect-main-page"]').click();
            cy.location("pathname").should("equal", "/");
        });
        it("Don't have an account button should work", () => {
            cy.get('button[data-cy="redirect-register"]').click();
            cy.location("pathname").should("equal", env().urls.register);
        });
    });

    describe("Continue button should remain disabled as long as credentials are invalid", () => {
        const testWhetherButtonIsDisabled = (disabled: boolean) => {
            if (disabled) cy.get(continueButtonSelector).should("have.attr", "disabled", "disabled");
            else cy.get(continueButtonSelector).should("not.have.attr", "disabled");
        };

        beforeEach(_clear);

        it("Disabled while both fields are blank", () => {
            testWhetherButtonIsDisabled(true);
        });

        it("Disabled while email is invalid and password is blank", () => {
            cy.get(emailInputSelector).type(env().data.email.invalid);
            testWhetherButtonIsDisabled(true);
        });
        it("Disabled while email is invalid and password is blank", () => {
            cy.get(emailInputSelector).type(env().data.email.invalid);
            testWhetherButtonIsDisabled(true);
        });

        it("Disabled while email is valid but password is blank", () => {
            cy.get(emailInputSelector).type(env().data.email.valid);
            testWhetherButtonIsDisabled(true);
        });

        it("Disabled while email is valid but password is invalid", () => {
            cy.get(emailInputSelector).type(env().data.email.valid);
            cy.get(passwordInputSelector).type(env().data.password.invalid);
            testWhetherButtonIsDisabled(true);
        });

        it("Disabled while email is blank and password is valid", () => {
            cy.get(passwordInputSelector).type(env().data.password.valid);
            testWhetherButtonIsDisabled(true);
        });

        it("Disabled while email is invalid and password is valid", () => {
            cy.get(emailInputSelector).type(env().data.email.invalid);
            cy.get(passwordInputSelector).type(env().data.password.valid);
            testWhetherButtonIsDisabled(true);
        });

        it("NOT disabled while both credentials are valid", () => {
            cy.get(emailInputSelector).type(env().data.email.valid);
            cy.get(passwordInputSelector).type(env().data.password.valid);
            testWhetherButtonIsDisabled(false);
        });
    });
    it("Should display a communique while trying to login via unexisting credentials", () => {
        _clear();
        cy.get(emailInputSelector).type(env().data.email.valid);
        cy.get(passwordInputSelector).type(`${env().data.password.valid}1`); // Invalid
        cy.get(continueButtonSelector).click();
        cy.get("[data-cy='credentials-do-not-match']");
    });
    it("User should be able to login via proper set of credentials and then logout", () => {
        _clear();
        cy.get(emailInputSelector).type(env().credentials.user.email);
        cy.get(passwordInputSelector).type(`${env().credentials.user.password}`);
        cy.get(continueButtonSelector).click();

        cy.get("[data-cy='logout']").click();
        cy.get("[data-cy='logout']").should("not.exist");
        cy.get("[data-cy='snackbar-close']").click();
    });

    describe("After succesful login", () => {
        before(() => {
            cy.request("POST", "/api/auth/login", {
                email: env().credentials.user.email,
                password: env().credentials.user.password,
            })
                .getCookie("accessToken")
                .should("have.property", "value")
                .reload();
        });
        after(() => {
            cy.get("[data-cy='logout']").click();
        });

        it("User data should be stored in local storage", () => {
            cy.window().then(() => {
                cy.get("[data-cy='logout']").should(() => {
                    const rawLocalStorage = localStorage.getItem("userData");
                    expect(rawLocalStorage).not.equal(null);

                    const userData = JSON.parse(rawLocalStorage as string) as LocalStorageUserData;
                    ["name", "surname", "gender", "country"].forEach((prop) => {
                        expect(userData).ownProperty(prop);
                    });
                });
            });
        });

        it("Access token should be recived as a cookie", () => {
            cy.getCookie("accessToken").should("have.property", "value");
        });

        it("User shouldn't be able to visit login page agin", () => {
            cy.visit("/login");
        });

        it("Local storage data should remain after reload", () => {
            cy.reload()
                .window()
                .then(() => {
                    cy.get("[data-cy='logout']").should(() => {
                        const rawLocalStorage = localStorage.getItem("userData");
                        expect(rawLocalStorage).not.equal(null);

                        const userData = JSON.parse(rawLocalStorage as string) as LocalStorageUserData;
                        ["name", "surname", "gender", "country"].forEach((prop) => {
                            expect(userData).ownProperty(prop);
                        });
                    });
                });
        });
    });
});
