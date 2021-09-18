describe('Test blog page', () => {
	beforeEach(() => {
		// Access the blog page
		cy.visit('/')
	})

	it('Checks blog title', () => {
		cy.get('title').should('contain', 'Blog of Miguel Vasquez')
	})

	it('Checks blog header', () => {
		cy.get('h1').should('contain', 'Miguel Vasquez')
	})

	it('Linkedin if Linkedin link is correct', () => {
		cy.get('a#linkedin').should('have.attr', 'href', 'https://www.linkedin.com/in/mvz')
	})

	it('Linkedin if Github link is correct', () => {
		cy.get('a#github').should('have.attr', 'href', 'https://github.com/mijumoto')
	})

	it('Visual test blog page', () => {
		cy.compareSnapshot('home')
	})
})