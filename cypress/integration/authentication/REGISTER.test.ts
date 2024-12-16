import LocalStorageUserData from "@/@types/LocalStorageUserData";
import { Gender } from "@prisma/client";

describe("Register Page", () => {
    before(() => {
        cy.visit(env().urls.register);
        cy.task("deleteRegisteredUser", env().data.email.valid);
    });
    after(() => {
        cy.task("deleteRegisteredUser", env().data.email.valid);
    });

    const testWhetherButtonIsDisabled = (disabled: boolean) => {
        if (disabled) cy.getByCyTag("step-nav-go-further").should("have.attr", "disabled", "disabled");
        else cy.getByCyTag("step-nav-go-further").should("not.have.attr", "disabled");
    };

    const fillPersonalDataWithRightData = () => {
        cy.getByCyTag("name").clear().type(env().data.name.valid);
        cy.getByCyTag("surname").clear().type(env().data.surname.valid);
        cy.get(`[data-cy="born"] input`).clear().type(env().data.born.valid);
        cy.getByCyTag("country")
            .click()
            .then(() => cy.getByCyTag("country-Pakistan").click());
    };

    const fillCredentialsWithRightData = () => {
        cy.getByCyTag("email").clear().type(env().data.email.valid);
        cy.getByCyTag("password").clear().type(env().data.password.valid);
        cy.getByCyTag("repeat-password").clear().type(env().data.password.valid);
    };
    describe("Redirections", () => {
        beforeEach(() => {
            cy.visit(env().urls.register);
        });
        after(() => {
            cy.visit(env().urls.register);
        });
        it("Main Page button should work", () => {
            cy.get('button[data-cy="redirect-main-page"]').click();
            cy.location("pathname").should("equal", "/");
        });
        it("Login button should work", () => {
            cy.get('button[data-cy="redirect-login"]').click();
            cy.location("pathname").should("equal", env().urls.login);
        });
    });
    describe("STEP 1- Personal Information", () => {
        const pickTheCountry = () => {
            return cy
                .getByCyTag("country")
                .click()
                .then(() => cy.getByCyTag("country-Pakistan").click());
        };
        beforeEach(() => {
            cy.getByCyTag("name").clear();
            cy.getByCyTag("surname").clear();
            cy.getByCyTag("country").clear();
            cy.get(`[data-cy="born"] input`).clear();
        });
        it("User should be able to sacrifice their live for Pakistani!", () => {
            cy.log("Select element should work 🚀");
            pickTheCountry().then(() => {
                cy.getByCyTag("country").should("have.attr", "value", "Pakistan");
            });
        });

        describe("Continue button should remain blocked", () => {
            it("When everything is blank", () => {
                testWhetherButtonIsDisabled(true);
            });
            it("When name is invalid", () => {
                cy.getByCyTag("name").type(env().data.name.invalid);
                cy.getByCyTag("surname").type(env().data.surname.valid);
                cy.get(`[data-cy="born"] input`).type(env().data.born.valid);
                pickTheCountry();
                testWhetherButtonIsDisabled(true);

                cy.getByCyTag("name").clear().type(env().data.name.valid);
                testWhetherButtonIsDisabled(false);
            });
            it("When surname is invalid", () => {
                cy.getByCyTag("name").type(env().data.name.valid);
                cy.getByCyTag("surname").type(env().data.surname.invalid);
                cy.get(`[data-cy="born"] input`).type(env().data.born.valid);
                pickTheCountry();
                testWhetherButtonIsDisabled(true);

                cy.getByCyTag("surname").clear().type(env().data.name.valid);
                testWhetherButtonIsDisabled(false);
            });
            it("When country is not selected", () => {
                cy.getByCyTag("surname").type(env().data.surname.valid);
                cy.getByCyTag("name").type(env().data.name.valid);
                cy.get(`[data-cy="born"] input`).type(env().data.born.valid);
                testWhetherButtonIsDisabled(true);

                pickTheCountry();
                testWhetherButtonIsDisabled(false);
            });
            it("When born is invalid", () => {
                cy.getByCyTag("surname").type(env().data.surname.valid);
                cy.getByCyTag("name").type(env().data.name.valid);
                cy.get(`[data-cy="born"] input`).type(env().data.born.invalid);
                pickTheCountry();
                testWhetherButtonIsDisabled(true);

                cy.get(`[data-cy="born"] input`).type(env().data.born.valid);
                testWhetherButtonIsDisabled(false);
            });

            it("Ensure that women and other genders are able to create an account", () => {
                const selectGender = (gender: Gender) => {
                    cy.getByCyTag("gender")
                        .click()
                        .then(() => {
                            cy.getByCyTag(`gender-${gender}`).click();
                            cy.get(`[data-cy="gender"] input`).should("have.attr", "value", gender);
                        });
                    //
                };
                cy.getByCyTag("surname").type(env().data.surname.valid);
                cy.getByCyTag("name").type(env().data.name.valid);
                cy.get(`[data-cy="born"] input`).type(env().data.born.valid);
                pickTheCountry();
                selectGender("FEMALE");
                testWhetherButtonIsDisabled(false);
                selectGender("OTHER");
                testWhetherButtonIsDisabled(false);
                testWhetherButtonIsDisabled(false);
                selectGender("MALE");
            });
        });
    });

    describe("STEP 2- Credentials", () => {
        before(() => {
            fillPersonalDataWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
        });
        beforeEach(() => {
            cy.getByCyTag("email").clear();
            cy.getByCyTag("password").clear();
            cy.getByCyTag("repeat-password").clear();
        });
        it("User should be able to return to STEP 1- Personal Information and vice versa", () => {
            cy.getByCyTag("step-nav-go-back")
                .click()
                .then(() => {
                    cy.getByCyTag("register-step").should("have.text", "User Data");
                    cy.getByCyTag("step-nav-go-further")
                        .click()
                        .then(() => {
                            cy.getByCyTag("register-step").should("have.text", "Credentials");
                            cy.getByCyTag;
                        });
                });
        });
        it("User should be able to change visibility of password", () => {
            cy.checkPasswordElementVisibility("password");
        });
        it("User should be able to change visibility of password's repetition", () => {
            cy.checkPasswordElementVisibility("password");
        });
        it("User should be notified when email address is not available", () => {
            cy.getByCyTag("email").type(env().credentials.admin.email);
            cy.getByCyTag("email-error").should("have.text", "Email address is not available");
            cy.getByCyTag("email").clear().type("cypress_is_fking_awasome6@gmail.com").blur();
            cy.getByCyTag("email-error").should("not.exist");
        });
        it("User should be able to go futher when all credentials would be valid", () => {
            fillCredentialsWithRightData();
            testWhetherButtonIsDisabled(false);
        });
        //

        describe("Continue button should remain blocked", () => {
            testLengthOfAllProperitesInList({
                list: {
                    email: env().data.email,
                    password: env().data.password,
                    "repeat-password": env().data.password,
                },
                assertion: (state: boolean) => testWhetherButtonIsDisabled(state),
            });
        });
    });

    describe("STEP 3- Avatar", () => {
        before(() => {
            cy.reload();
            fillPersonalDataWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
            fillCredentialsWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
        });
        it("User should be able to return to STEP 2- Credentials and vice versa", () => {
            cy.getByCyTag("step-nav-go-back")
                .click()
                .then(() => {
                    cy.getByCyTag("register-step").should("have.text", "Credentials");
                    cy.getByCyTag("step-nav-go-further")
                        .click()
                        .then(() => {
                            cy.getByCyTag("register-step").should("have.text", "Avatar");
                        });
                });
        });
        it("User should be able to skip this part", () => {
            testWhetherButtonIsDisabled(false);
        });
        it("User should be able to attach a proper avatar", () => {
            cy.getByCyTag("avatar-preview").should("not.exist");
            cy.getByCyTag("avatar").attachFile("example.jpg");
            cy.getByCyTag("avatar-preview").should("exist");
            testWhetherButtonIsDisabled(false);
        });
        it("While trying to attach avatar with invalid extension snackbar should be fired", () => {
            cy.getByCyTag("avatar").attachFile("example.json");
            cy.getByCyTag("avatar-preview").should("not.exist");
            testWhetherButtonIsDisabled(false);
            cy.get("[data-cy='snackbar']").should("have.attr", "data-cy-severity", "error");
            cy.get("[data-cy='snackbar-close']").click();
        });
    });
    describe("STEP 4- Confirmation", () => {
        before(() => {
            cy.reload();
            fillPersonalDataWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
            fillCredentialsWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
            cy.getByCyTag("step-nav-go-further").click();
        });

        it("User should be able to return to STEP 3- Avatar", () => {
            cy.getByCyTag("step-nav-go-back")
                .click()
                .then(() => {
                    cy.getByCyTag("register-step").should("have.text", "Avatar");
                    cy.getByCyTag("step-nav-go-further")
                        .click()
                        .then(() => {
                            cy.getByCyTag("register-step").should("have.text", "One more step");
                        });
                });
        });
        it("Continue button should be initially blocked", () => {
            testWhetherButtonIsDisabled(true);
        });

        it("After acceptation captacha button should turn into clickable", () => {
            testWhetherButtonIsDisabled(true);
            cy.wait(500).then(() => {
                cy.get("iframe[src*=recaptcha]")
                    .its("0.contentDocument")
                    .should((d) => d.getElementById("recaptcha-token").click())
                    .then(() => {
                        testWhetherButtonIsDisabled(false);
                    });
            });
        });
    });
    describe("STEP 5- API Request and creating an account", () => {
        before(() => {
            cy.reload();
            fillPersonalDataWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
            fillCredentialsWithRightData();
            cy.getByCyTag("step-nav-go-further").click();
            cy.getByCyTag("avatar").attachFile("example.jpg");
            cy.getByCyTag("step-nav-go-further").click();
            cy.get("iframe[src*=recaptcha]")
                .its("0.contentDocument")
                .should((d) => d.getElementById("recaptcha-token").click());
            cy.getByCyTag("step-nav-go-further").click();
            cy.wait(100);
        });

        beforeEach(() => {
            Cypress.Cookies.preserveOnce("accessToken");
            cy.reload();
        });

        it("Access token should be recived as a cookie", () => {
            cy.getCookie("accessToken").should("have.property", "value");
        });

        it("An account should be created", () => {
            cy.location("pathname").should("equal", "/");
        });

        it("User data should be stored in local storage", () => {
            cy.window().then(() => {
                cy.get("[data-cy='logout']")
                    .should("exist")
                    .then(() => {
                        cy.wait(100).then(() => {
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
});
