
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogpost').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogpost').insert([
        {author_id: 1, title: 'title1', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn1.jpg'},
        {author_id: 2, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn2.jpg'},
        {author_id: 3, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn3.jpg'},
        {author_id: 1, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn3.jpg'},
        {author_id: 2, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn2.jpg'},
        {author_id: 3, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn1.jpg'},
        {author_id: 1, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn1.jpg'},
        {author_id: 2, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn2.jpg'},
        {author_id: 3, title: 'title2', body: 'This is where the body of the blogpost will go.', image: './assets/images/mtn3.jpg'}
      ])
    })
}
