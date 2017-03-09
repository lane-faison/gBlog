
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then( () => {
      // Inserts seed entries
      return knex('comment').insert([
        {author_id: 1, blogpost_id: 1, author_name: 'jimmy', body: 'comment1 comment1 comment1'},
        {author_id: 2, blogpost_id: 2, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 3, blogpost_id: 2, author_name: 'tom', body: 'comment2 comment2 comment2'},
        {author_id: 3, blogpost_id: 2, author_name: 'tom', body: 'comment2 comment2 comment2'},
        {author_id: 4, blogpost_id: 2, author_name: 'kim', body: 'comment2 comment2 comment2'},
        {author_id: 5, blogpost_id: 2, author_name: 'jon', body: 'comment2 comment2 comment2'},
        {author_id: 2, blogpost_id: 2, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 3, blogpost_id: 3, author_name: 'tom', body: 'comment2 comment2 comment2'},
        {author_id: 2, blogpost_id: 4, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 5, blogpost_id: 4, author_name: 'jon', body: 'comment2 comment2 comment2'},
        {author_id: 2, blogpost_id: 6, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 6, blogpost_id: 6, author_name: 'wes', body: 'comment2 comment2 comment2'},
        {author_id: 2, blogpost_id: 6, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 1, blogpost_id: 9, author_name: 'jimmy', body: 'comment2 comment2 comment2'},
        {author_id: 2, blogpost_id: 9, author_name: 'matt', body: 'comment2 comment2 comment2'},
        {author_id: 1, blogpost_id: 9, author_name: 'jimmy', body: 'comment2 comment2 comment2'}
      ])
    })
}
