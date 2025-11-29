describe('Basic Tests', () => {
    it('should load the homepage', () => {
        cy.visit('/');
        cy.get('body').should('be.visible');
    });
});
