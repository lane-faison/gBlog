
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {author_id: 1, blogpost_id: 1, body: 'comment1 comment1 comment1'},
        {author_id: 2, blogpost_id: 2, body: 'comment2 comment2 comment2'}
      ])
    })
}
