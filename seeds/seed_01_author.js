
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('author').del()
    .then( () => {
      // Inserts seed entries
      return knex('author').insert([
        {email: 'bob@me.com', name: 'name1'},
        {email: 'mat@me.com', name: 'name2'},
        {email: 'tom@me.com', name: 'name3'},
        {email: 'kim@me.com', name: 'name4'},
        {email: 'jon@me.com', name: 'name5'},
        {email: 'wes@me.com', name: 'name6'}
      ])
    })
}
