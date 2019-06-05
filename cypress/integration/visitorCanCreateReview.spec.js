describe('Visitor can', () => {
  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles_with_published.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/articles/1/reviews',
      response: 'fixture:create_review_success.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login.json',
      headers: {
        "uid": "boa@mail.com"
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles/1',
      response: 'fixture:one_unpublished_article.json',
      status: 200
    })
    
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('boa@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.wait(3000)
    cy.get('#review_articles').click()
    cy.get("#1").click()
  })

  it('see unpublished article when clicked on', () => {
    

    let article = ["#title_1", "#ingress_1", "#body_1", "#photo_1", "#written_1", "#date_1"]

    article.forEach(element => {
      cy.get(element)
    })
  })

  it('write an review for article successfully', () => {
    cy.get('#score_select').click()
    cy.get('.visible > .selected > .text').click()
    cy.get('#comment').type('Great article!')
    cy.get('#create_review').click()
    cy.contains('Thank you! Your review has been succesfully saved!')
  })

  it('get an error message if all fields are not filled in', () => {
    cy.get('#comment').type('Great article!')
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/articles/1/reviews',
      response: 'fixture:create_review_no_success.json',
      status: 422
    })
    cy.get('#create_review').click()
    cy.contains('Your review could not be created because of following error(s):')
    cy.contains("Score can't be blank")
  })
})