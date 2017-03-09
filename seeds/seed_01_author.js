
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('author').del()
    .then( () => {
      // Inserts seed entries
      return knex('author').insert([
        {email: 'bob@me.com', name: 'jimmy'},
        {email: 'mat@me.com', name: 'matt'},
        {email: 'tom@me.com', name: 'tom'},
        {email: 'kim@me.com', name: 'kim'},
        {email: 'jon@me.com', name: 'jon'},
        {email: 'wes@me.com', name: 'wes'}
      ])
    })
}
