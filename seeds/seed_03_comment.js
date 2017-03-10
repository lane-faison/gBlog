
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then( () => {
      // Inserts seed entries
      return knex('comment').insert([
        {author_id: 1, blogpost_id: 1, author_name: 'Robert Hart', body: 'Really interesting read. Thanks for sharing, Robert!'},
        {author_id: 2, blogpost_id: 2, author_name: 'Matthew Moore', body: 'I could not agree with you more on this.'},
        {author_id: 3, blogpost_id: 2, author_name: 'Tom Jones', body: 'I still think Vail is better though...'},
        {author_id: 3, blogpost_id: 2, author_name: 'Tom Jones', body: 'My family loves BC!'},
        {author_id: 4, blogpost_id: 2, author_name: 'Kim Stewart', body: 'Best ski instructors in the valley'},
        {author_id: 5, blogpost_id: 2, author_name: 'Jon Smith', body: 'Worth the extra 20 minutes to go there over Vail'},
        {author_id: 2, blogpost_id: 5, author_name: 'Matthew Moore', body: 'Going here for spring break!'},
        {author_id: 3, blogpost_id: 3, author_name: 'Tom Jones', body: 'Copper/Winter Park pass is the way to go'},
        {author_id: 2, blogpost_id: 4, author_name: 'Matthew Moore', body: 'More like Breckfridge tho, lol'},
        {author_id: 5, blogpost_id: 4, author_name: 'Jon Smith', body: 'I love Peak 6'},
        {author_id: 2, blogpost_id: 6, author_name: 'Matthew Moore', body: 'Gonna have to disagree with you on this one...'},
        {author_id: 6, blogpost_id: 7, author_name: 'Wes Westin', body: 'This post makes me want to ditch work and go skiing right now!'},
        {author_id: 2, blogpost_id: 6, author_name: 'Matthew Moore', body: 'Also a great resort for snowboarders'},
        {author_id: 1, blogpost_id: 9, author_name: 'Robert Hart', body: 'Favorite mountain by far'},
        {author_id: 2, blogpost_id: 9, author_name: 'Matthew Moore', body: 'I agree with Matthew'},
        {author_id: 1, blogpost_id: 9, author_name: 'Robert Hart', body: 'Haha thanks!'}
      ])
    })
}
