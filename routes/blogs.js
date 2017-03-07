const express = require('express')
const router = express.Router()
const knex = require('../db/knex')

function Author() { return knex('author') }
function Blogpost() { return knex('blogpost') }
function BlogComment() { return knex('comment') }

//******************** CREATE ************************//
// CREATE AUTHOR
router.post('/author/', (req, res) => {
  Author().insert({
    email: req.body.email,
    name: req.body.name
  },['id', 'email', 'name'])
  .then( result => {
    res.json(result)
  })
})

// CREATE BLOGPOST
router.post('/blogpost/', (req, res) => {
  Blogpost().insert({
    author_id: req.body.author_id,
    title: req.body.title,
    body: req.body.body,
    image: req.body.image
  },['author_id', 'title', 'body'])
  .then( result => {
    res.json(result)
  })
})

// CREATE COMMENT
router.post('/comment/', (req, res) => {
  BlogComment().insert({
    author_id: req.body.author_id,
    blogpost_id: req.body.blogpost_id,
    body: req.params.body
  }, ['author_id', 'blogpost_id', 'body'])
  .then( result => {
    res.json(result)
  })
})

//******************** READ ************************//
// READ AUTHORS
router.get('/author', (req, res) => {
  Author().select()
  .then( result => {
    res.json(result)
  })
})

// READ SPECIFIC AUTHOR
router.get('/author/:id', (req, res) => {
  Author().where('id', req.params.id).first()
  .then( result => {
    res.json(result)
  })
})

// READ BLOGPOSTS
router.get('/blogpost', (req, res) => {
  // Blogpost().select()
  knex('blogpost')
  .join('author', 'blogpost.author_id','=','author.id')
  .select('blogpost.*','author.name')
  .then( result => {
    console.log(result)
    res.json(result)
  })
})

// READ SPECIFIC BLOGPOST
router.get('/blogpost/:id', (req, res) => {
  Blogpost().where('id', req.params.id).first()
  .then( result => {
    res.json(result)
  })
})

// READ COMMENTS
router.get('/comment', (req, res) => {
  BlogComment().select()
  .then( result => {
    res.json(result)
  })
})

// READ SPECIFIC COMMENT
router.get('/comment/:id', (req, res) => {
  BlogComment().where('id', req.params.id).first()
  .then( result => {
    res.json(result)
  })
})

//******************** UPDATE ************************//
// UPDATE AUTHOR
router.put('/author/:id', (req, res) => {
  Author().where('id', req.params.id).update({
    email: req.body.email,
    name: req.body.name
  }, ['id','email','name'])
  .then( result => {
    res.json(result)
  })
})

// UPDATE BLOGPOST
router.put('/blogpost/:id', (req, res) => {
  Blogpost().where('id', req.params.id).update({
    author_id: req.body.author_id,
    title: req.params.title,
    body: req.params.body,
    image: req.params.image
  }, ['author_id','title','body'])
  .then( result => {
    res.json(result)
  })
})

// UPDATE COMMENT
router.put('/comment/:id', (req, res) => {
  BlogComment().where('id', req.params.id).update({
    author_id: req.params.body.author_id,
    blogpost_id: req.params.body.blogpost_id,
    body: req.params.body
  }, ['author_id', 'blogpost_id', 'body'])
  .then( result => {
    res.json(result)
  })
})

//******************** DELETE ************************//
// DELETE AUTHOR
router.delete('/author/:id', (req, res) => {
  Author().where('id', req.params.id).del()
  .then( result => {
    res.json(result)
  })
})

// DELETE BLOGPOST
router.delete('/blogpost/:id', (req, res) => {
  Blogpost().where('id', req.params.id).del()
  .then( result => {
    res.json(result)
  })
})

// DELETE COMMENT
router.delete('/comment/:id', (req, res) => {
  BlogComment().where('id', req.params.id).del()
  .then( result => {
    res.json(result)
  })
})


module.exports = router
