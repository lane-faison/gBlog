
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('author').del()
    .then( () => {
      // Inserts seed entries
      return knex('author').insert([
        {email: 'bob@me.com', name: 'Robert Hart'},
        {email: 'mat@me.com', name: 'Matthew Moore'},
        {email: 'tom@me.com', name: 'Tom Jones'},
        {email: 'kim@me.com', name: 'Kim Stewart'},
        {email: 'jon@me.com', name: 'Jon Smith'},
        {email: 'wes@me.com', name: 'Wes Westin'}
      ])
    })
}
