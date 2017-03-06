
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', table => {
    table.increments()
    table.integer('author_id').references('author.id')
    table.integer('blogpost_id').references('blogpost.id')
    table.string('body')
    table.timestamp('create_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment')
};
