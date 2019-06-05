describe('Visitor can navigate the website', () => {
  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/categories',
      response: 'fixture:categories_list.json',
      status: 200
    })    
    cy.visit('http://localhost:3001');
  })

  it("by seeing a navbar with site title, article -and review actions", () => {
    let mainLabels = ["GLOCAL NEWS", "Write An Article", "Review Articles"]

    mainLabels.forEach(function (label) {
      cy.contains(label)
    })
  })

  it("by seeing login and logout information", () => {
    let loggedOutLabels = ['Sign Up', 'Log In']

    loggedOutLabels.forEach(function (label) {
      cy.contains(label)
    })
  })

  it('by seeing a second selection with categories in the navbar', () => {
    let categories = ["News", "Arts", "Books", "Business", "Food", "Opinion",
      "Politics", "Real Estate", "Science", "Sports", "Style",
      "Tech", "Travel"]

    categories.forEach(function (category) {
      cy.contains(category)
    })
  })

  it("by seeing correct selection options in dropdown", () => {
    cy.get('div[id="country"]').click().get('div[role="option"]').contains('Sweden');
    cy.get('div[id="city_header"]').click().get('div[role="option"]').contains('Stockholm')
  })
})
