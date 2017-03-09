
exports.up = (knex, Promise) => {
  return knex.schema.createTable('blogpost', table => {
    table.increments()
    table.integer('author_id').references('author.id').notNullable().onDelete('cascade')
    table.string('title')
    table.text('body')
    table.string('image')
    table.timestamp('create_at').defaultTo(knex.fn.now())
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('blogpost')
};
