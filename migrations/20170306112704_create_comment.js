
exports.up = (knex, Promise) => {
  return knex.schema.createTable('comment', table => {
    table.increments()
    table.integer('author_id').references('author.id').onDelete('cascade')
    table.integer('blogpost_id').references('blogpost.id').onDelete('cascade')
    table.string('author_name').references('author.name').onDelete('cascade')
    table.text('body')
    table.timestamp('create_at').defaultTo(knex.fn.now())
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('comment')
};
