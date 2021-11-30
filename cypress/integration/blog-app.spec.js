const base = 'http://127.0.0.1:3000/api'

Cypress.Commands.add('createBlog' , ({title,author,url}) => {
  cy.request({
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/blogs',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})

describe('Loginin testausta ', function() {
  beforeEach(function() {
    cy.request('POST', base+'/testing/reset')

    cy.request('POST', 'http://127.0.0.1:3000/api/users', {
      name: 'Åberi',
      username: 'Ville',
      password: 'salasana'
    })
  })

  it('front page can be opened', function() {
    cy.visit('http://127.0.0.1:3000')
    cy.contains('logged in')
  })

  it('login unsuccesfull', function() {

    cy.visit('http://127.0.0.1:3000')

    cy.get('input:first').type('Valle')
    cy.get('input:last').type('salasana')
    cy.get('#login-button').click()
    cy.contains('nobody logged in')
  })

  describe('Blogin luonnin testausta ', function() {
    beforeEach(function() {
      cy.visit('http://127.0.0.1:3000')

      cy.get('input:first').type('Ville')
      cy.get('input:last').type('salasana')
      cy.get('#login-button').click()
    })

    it('login succesfull', function() {
      cy.contains('Åberi logged in')
    })


    describe('Blogin luontia ', function() {
      beforeEach(function() {
        cy.contains('create').click()
        cy.get('#text').type('This is text')
        cy.get('#author').type('Ville')
        cy.get('#url').type('www.wili.fi')
        cy.contains('save').click()
      })

      it('login and blog creation', function() {
        cy.contains('This is text')
      })

      it('can like', function() {
        cy.contains('Show').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('sorttaus, pieni alussa', function() {
        cy.createBlog({ title: 'kakkonen', author:'Ville', url:'kakkosurli'})
        cy.createBlog({ title: 'kolmonen', author:'Ville', url:'kolmosurli'})
        cy.visit('http://127.0.0.1:3000')

        cy.contains('Show').click()
        cy.contains('like').click()
        cy.contains('like').click()

        cy.visit('http://127.0.0.1:3000')
        cy.contains('Show').click()
        cy.contains('0')
      })

    })
})


} )