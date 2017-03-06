
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogpost', table => {
    table.increments()
    table.integer('author_id').references('author.id')
    table.string('title')
    table.string('body')
    table.timestamp('create_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blogpost')
};
