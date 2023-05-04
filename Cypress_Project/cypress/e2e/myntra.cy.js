describe('Myntra', () => {
    before(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
      cy.viewport(1920,1080)
      cy.visit('https://www.myntra.com/',
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br"
        }
      },
      {continueAfter: 5000})
    })
  
    it('should search for product', () => {
      
      // Enter the product code
      cy.get('input[placeholder="Search for products, brands and more"]').type('shirt')
  
      // Click on Search button
      cy.get('a[class="desktop-submit"]').click({force:true})

      //Select first product on Product listing page
      cy.get('li[class="product-base"]').eq(0).find('a').invoke('removeAttr', 'target').click({force:true})
          
      //Select a size of the product
      cy.get('div[class="size-buttons-tipAndBtnContainer"]').eq(0).trigger("click")
      cy.wait(1000)
  
      // Click on Add to Cart button
      cy.get('span[class="myntraweb-sprite pdp-whiteBag sprites-whiteBag pdp-flex pdp-center"]').click({force:true})
  
      //Click on Go to Bag
      cy.get('a[class="pdp-goToCart pdp-add-to-bag pdp-button pdp-flex pdp-center "]').click({force:true})

      //Click on Place Order
      cy.get('button[class="css-etguer"]').click({force:true})

      cy.url().should('include', '/checkout/cart')
    })
    })
 