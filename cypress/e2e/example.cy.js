import { v4 as uuid } from "uuid";

const BASE_URL =
  "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login";

describe("Teste de criação, registro e login", () => {
  it("Teste de criação de usuário com sucesso", () => {
    createUser();
    cy.get(".ng-binding").should("contain.text", "Registration successful");
  });

  it("Teste de criação com falha", () => {
    cy.visit(BASE_URL);
    cy.get(".btn-link").click();
    cy.get("#firstName").type("first name");
    cy.get("#Text1").type("last name");
    cy.get("#username").type("username");
    cy.get(".btn-primary").should("be.disabled");
  });

  it("Teste de login com sucesso", () => {
    const user = createUser();
    login(user.username, user.password);

    cy.get("h1.ng-binding").should("contain.text", user.firstName);
  });

  it("Deletar usuário e login com falha", () => {
    const user = createUser();
    login(user.username, user.password);

    cy.get(".ng-binding > a").click();
    cy.visit(BASE_URL);
    login(user.username, user.password);
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect",
    );
  });
});

function login(username, password) {
  cy.visit(BASE_URL);
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get(".btn-primary").click();
}

function createUser() {
  const user = {
    firstName: uuid(),
    lastName: uuid(),
    username: uuid(),
    password: uuid(),
  };

  cy.visit(BASE_URL);
  cy.get(".btn-link").click();
  cy.get("#firstName").type(user.firstName);
  cy.get("#Text1").type(user.lastName);
  cy.get("#username").type(user.username);
  cy.get("#password").type(user.password);
  cy.get(".btn-primary").click();

  return user;
}
