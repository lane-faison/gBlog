var knex = require('../db/knex')
function Blogs() {
  return knex('posts')
}

// CREATE
router.post('/', (req, res) => {
  Blogs().insert({
    author: req.body.author,
    title: req.body.title,
    body: req.body.body
  }, 'id')
  .then( result => {
    res.json(result)
  })
})

// READ
router.get('/', (req, res) => {
  Blogs().select()
  .then( result => {
    res.json(result)
  })
})

router.get('/:id', (req, res) => {
  Blogs().where('id', req.params.id).first()
  .then( result => {
    res.json(result)
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Blogs().where('id', req.params.id).update({
    body: req.body.body
  })
  .then( result => {
    res.json(result)
  })
})

// DELETE
router.delete('/:id', (req, res) => {
  Blogs().where('id', req.params.id).del()
  .then( result => {
    res.json(result)
  })
})
