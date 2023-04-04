describe('My First Test', () => {
  it('Does not do much!', () => {
   cy.visit('http://localhost:3000')
   cy.url().should('include', '/dashboard/overview')
   cy.get('button[id="DeploymentsButton"]').click()
  })
})