
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', table => {
    table.increments()
    table.string('email').unique()
    table.string('name')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author')
}
