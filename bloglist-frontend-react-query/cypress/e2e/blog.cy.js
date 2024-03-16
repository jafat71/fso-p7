describe('Blog app', function () {
  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:8000/api/auth/login/', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
  })

  Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: 'http://localhost:8000/api/blogs',
      method: 'POST',
      body: {
        title,
        author,
        url
      },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
    cy.visit('http://localhost:5173')
  })

  Cypress.Commands.add('createBlogLiked', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:8000/api/blogs',
      method: 'POST',
      body: {
        title,
        author,
        url,
        likes
      },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
    cy.visit('http://localhost:5173')
  })

  beforeEach(function () {
    cy.request('POST', 'http://localhost:8000/api/testing/reset')
    const user = {
      name: 'josafat Matute Moncada',
      username: 'josafvt',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:8000/api/users/', user)
    cy.visit('http://localhost:5173')

  })

  it('Login form is shown', function () {
    cy.contains('LOGIN FORM')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('SUBMIT')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('josafvt');
      cy.get('#password').type('12345');
      cy.get('#login-button').click()

      cy.contains('josafat Matute Moncada (josafvt) logged in')

    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('josafvvt');
      cy.get('#password').type('123456');
      cy.get('#login-button').click()

      cy.contains('NOTIFICATION')
      cy.contains('Login Failed: AxiosError: Request failed with status code 401')


    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('josafvt');
      cy.get('#password').type('12345');
      cy.get('#login-button').click()
      cy.login({ username: "josafvt", "password": "12345" })
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: 'http://localhost:5173/' })
    })

    it('A blog can be created', function () {
      cy.get('.toggableButtonGreen').click()
      cy.get('#title').type('Test Blog 2 ');
      cy.get('#author').type('Test Author 2');
      cy.get('#url').type('http://localhost:5173/');
      cy.get(".create-button").click()
      cy.wait(6000)
      cy.contains("Test Blog 2")
      cy.contains("Test Author 2")
    })
    it('A blog can be liked', function () {
      cy.get('.expand-button').click()
      cy.get('.like-content').invoke('text').should('include', '0').and('include', 'like');
      cy.get('.like-button').click()
      cy.get('.like-content').invoke('text').should('include', '1').and('include', 'like');
    })
    it('the user who created a blog can delete it.', function () {
      cy.get('.toggableButtonGreen').click();
      cy.get('#title').type('Test Blog 3');
      cy.get('#author').type('Test Author 3');
      cy.get('#url').type('http://localhost:5173/');
      cy.get('.create-button').click();
      cy.wait(6000);
      cy.contains('Test Blog 3');
      cy.contains('Test Author 3');
      cy.contains('Test Blog 3')
        .parent()
        .find('.expand-button')
        .click();
      cy.get('.delete-button').click();
      cy.wait(2000);
      cy.contains('Test Blog 3').should('not.exist');
    })
    it('the creator can see the delete button of a blog, not anyone else.', function () {
      cy.wait(2000);
      cy.get('.toggableButtonGreen').click();
      cy.get('#title').type('Test Blog 4');
      cy.get('#author').type('Test Author 4');
      cy.get('#url').type('http://localhost:5173/');
      cy.get('.create-button').click();
      cy.wait(6000);
      cy.contains('Test Blog 4');
      cy.contains('Test Author 4');
      cy.contains('Test Blog 4')
        .parent()
        .find('.expand-button')
        .click();
      cy.get('.delete-button').should('exist');
    })
    it('blogs are ordered according to likes', function () {
      cy.createBlogLiked({ title: 'Test Blog 2', author: 'Test Author', url: 'http://localhost:5173/', likes: 7 })
      cy.createBlogLiked({ title: 'Test Blog 3', author: 'Test Author', url: 'http://localhost:5173/', likes: 10 })
      cy.reload();
      cy.get('.blogListMapped').eq(0).should('contain', 'Test Blog 3');
      cy.get('.blogListMapped').eq(1).should('contain', 'Test Blog 2');
      cy.contains('Test Blog 2')
      .parent()
      .find('.expand-button')
      .click();
      cy.get('.like-button').click()
      cy.wait(2000);
      cy.get('.like-button').click()
      cy.wait(2000);
      cy.get('.like-button').click()
      cy.wait(2000);
      cy.get('.like-button').click()
      cy.wait(2000);

      cy.reload();
      cy.get('.blogListMapped').eq(0).should('contain', 'Test Blog 2');
      cy.get('.blogListMapped').eq(1).should('contain', 'Test Blog 3');
    })
  })

})