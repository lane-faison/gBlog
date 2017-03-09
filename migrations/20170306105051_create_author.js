
exports.up = (knex, Promise) => {
  return knex.schema.createTable('author', table => {
    table.increments()
    table.string('email').unique()
    table.string('name')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('author')
}
