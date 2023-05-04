describe('Amazon Product', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.viewport(1920, 1080)
    cy.visit('https://www.amazon.in/',
    {
      headers: {
        "Accept-Encoding": "gzip, deflate, br"
      }
    })
  })

  it('should verify buy now button is present', () => {
    cy.get('#twotabsearchtextbox')
      .type('laptop')
    cy.get('#nav-search-submit-button').click()

    cy.get('[data-component-type="s-search-result"]')
      .first()
      .find('h2 > a')
      .then(($link) => {
        const href = $link.prop('href')
        cy.visit(href)
        cy.window().then((win) => {
          cy.stub(win, 'open').as('windowOpen')
        })
        cy.get('span[id="submit.buy-now-announce"]', { timeout: 60000 }).should('be.visible')
      })
  })
})
