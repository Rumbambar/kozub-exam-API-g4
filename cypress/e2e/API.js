///<reference types="cypress" />


it('1', () => {
  cy.log('Get all posts. Verify HTTP response status code and content type')

  cy.request('GET', '/posts').then(response => {
    expect(response.status).to.be.equal(200);
    expect(response.headers['content-type']).to.be.contains('application/json');
  })
})



it('2', () => {
  cy.log('Get only first 10 posts. Verify HTTP response status code. Verify that only first posts are returned.')

  cy.request('GET', '/posts').then(response => {
    let allPosts = [];
    allPosts = response.body;
    let allPostsTop10 = allPosts.slice(0, 10);

    cy.request('GET', '/posts?_limit=10').then(response10 => {
      let top10Posts = response10.body;
      expect(response10.status).to.be.equal(200);
      expect(JSON.stringify(top10Posts)).to.be.equal(JSON.stringify(allPostsTop10));
    })
  })
})

it('3', () => {
  cy.log('Get posts with id = 55 and id = 60. Verify HTTP response status code. Verify id values of returned records.')

  cy.request('GET', '/posts?id=55&id=60').then(response => {
    expect(response.status).to.be.equal(200);


  })
})


it('4', () => {
  cy.log('Create a post. Verify HTTP response status code.');

  cy.request({
    method: 'POST',
    url: '/664/posts',
    body: {
      "userId": 10,
      "id": 201,
      "title": "Hello",
      "completed": false
    },
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.equal(401);

  })
})

it('5', () => {
  cy.log('Create post with adding access token in header. Verify HTTP response status code. Verify post is created.')

  var seconds = new Date().getTime();

  cy.request({
    method: 'POST',
    url: '/register',
    body: {
      "email": "olivier" + seconds + "@mail.com",
      "password": "bestPassw0rd"
    }

  }).then(response => {
    const accessToken = response.body.accessToken;
    debugger
    cy.request({
      method: 'POST',
      url: '/664/posts',
      headers: {
        'Authorization': "Bearer " + accessToken,
      }

    }).then(response => {
      expect(response.status).to.be.equal(201);
    })
  })
})


it('7', () => {
  cy.log('Update non-existing entity. Verify HTTP response status code.');

  cy.request({
    method: 'PUT',
    url: '/posts/999',
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.equal(404);

  })
})

it('9', () => {
  cy.log('Delete non-existing post entity. Verify HTTP response status code.');

  cy.request({
    method: 'DELETE',
    url: '/posts/1000',
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.equal(404);

  })
})

