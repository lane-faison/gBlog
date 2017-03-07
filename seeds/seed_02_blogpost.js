
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogpost').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogpost').insert([
        {author_id: 1, title: 'title1', body: 'something1 something1 something1'},
        {author_id: 2, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 3, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 1, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 2, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 3, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 1, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 2, title: 'title2', body: 'something2 something2 something2'},
        {author_id: 3, title: 'title2', body: 'something2 something2 something2'}
      ])
    })
}
