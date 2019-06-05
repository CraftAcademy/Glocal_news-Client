describe('Visitor can view articles filtered by category', () => {
  beforeEach(function (){
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
  })

  it('by seeing a correct page headline', () => {
    cy.get('#politics').click()
    cy.get('#headline').contains('Politics')
    cy.get('#arts').click()
    cy.get('#headline').contains('Arts')
  })

  it('by seeing correct filtered articles', () => {

    let politics = [
      ["#36", "#title_36", "#ingress_36", "#photo_36"],
      ["#37", "#title_37", "#ingress_37", "#photo_37"],
    ]

    let arts = [
      ["#38", "#title_38", "#ingress_38", "#photo_38"],
    ]

    cy.get('#politics').click()
    cy.get('#38').should('not.exist')
    politics.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })

    cy.get('#arts').click()
    cy.get('#36').should('not.exist')
    cy.get('#37').should('not.exist')
    arts.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })
  
  it('by seeing all articles under News tab', () => {

    let news = [
      ["#36", "#title_36", "#ingress_36", "#photo_36"],
      ["#37", "#title_37", "#ingress_37", "#photo_37"],
      ["#38", "#title_38", "#ingress_38", "#photo_38"],
    ]

    cy.get('#news').click()
    news.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })
    
  it('by being redirected to News tab when clicking on GLOCAL NEWS in header', () => {

    let news = [
      ["#36", "#title_36", "#ingress_36", "#photo_36"],
      ["#37", "#title_37", "#ingress_37", "#photo_37"],
      ["#38", "#title_38", "#ingress_38", "#photo_38"],
    ]
    
    cy.get('#header').within(() => {
      cy.get('#news').click()
    })
    cy.get('#header_category').within(() => {
      cy.get('#news').should('have.class', 'red active item')
    })
    news.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })

})
