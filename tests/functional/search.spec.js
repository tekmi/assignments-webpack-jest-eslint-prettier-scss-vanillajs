describe("Flight Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays no results if searching flight is too short", () => {
    cy.get('[data-ft-element="flights-search-input"]').type("ab");
    cy.get('[data-ft-element="flights-search-results"]').should("be.not.visible");
  });

  it("displays not found message if none flights matched", () => {
    cy.get('[data-ft-element="flights-search-input"]').type("abc");
    cy.get('[data-ft-element="flights-search-results"]').should("be.visible");
    cy.get('[data-ft-element="flights-search-results-notfound"]').should($el => {
      const text = $el.text();
      expect(text).to.match(/'abc'/i);
    });
  });

  it("displays found flights if at least one flight matched", () => {
    cy.get('[data-ft-element="flights-search-input"]').type("FrAnCiScO");
    cy.get('[data-ft-element="flights-search-results"]').should("be.visible");
    cy.get('[data-ft-element="flights-search-results-found"]').should($el => {
      expect($el.length).to.be.at.least(1);
    });
  });

  it("displays some flights first and then no results, if user cleared the search input", () => {
    cy.get('[data-ft-element="flights-search-input"]').as('searchInput');
    cy.get('@searchInput').type("SAN");

    cy.get('[data-ft-element="flights-search-results"]').should("be.visible");
    cy.get('[data-ft-element="flights-search-results-found"]').should($el => {
      expect($el.length).to.be.at.least(1);
    });

    cy.get('@searchInput').clear();
    cy.get('[data-ft-element="flights-search-results"]').should("be.not.visible");
  });
});
