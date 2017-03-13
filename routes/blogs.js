const express = require('express')
const router = express.Router()
const knex = require('../db/knex')

function Author() { return knex('author') }
function Blogpost() { return knex('blogpost') }
function BlogComment() { return knex('comment') }

//******************** CREATE ************************//
// CREATE BLOGPOST
router.post('/blogpost/', (req, res) => {

  var userID;

  knex('author').where('email', req.body.email).select('id')
  .then( result => {
    userID = result[0].id
    // Create blog
    return Blogpost().insert({
      author_id: userID,
      title: req.body.title,
      body: req.body.body,
      image: req.body.image
    },['author_id', 'title', 'body', 'image'])
    .then( result => {
      res.json(result)
    })
  })
  .catch( result => {
    console.log(`UserID not found, new userID is ${userID}`)
    // Create new author
    knex('author').insert({email: req.body.email, name: req.body.name}, 'id')
    // Create blog
    .then( result => {
      return Blogpost().insert({
        author_id: result[0],
        title: req.body.title,
        body: req.body.body,
        image: req.body.image
      },['author_id', 'title', 'body', 'image'])
      .then( result => {
        res.json(result)
      })
    })
  })
})

// CREATE COMMENT
router.post('/comment/', (req, res) => {

  var userID;

  knex('author').where('email', req.body.email).select('id')
  .then( result => {
    console.log("userID found!")
    userID = result[0].id
    //Create comment
    return BlogComment().insert({
      author_id: userID,
      blogpost_id: req.body.blogpost_id,
      author_name: req.body.name,
      body: req.body.body
    },['author_id', 'blogpost_id', 'body'])
    .then( result => {
      res.json(result)
    })
  })
  .catch( result => {
    console.log(`UserID not found, new userID is ${userID}`)
    //Create new author
    knex('author').insert({email: req.body.email, name: req.body.name}, 'id')
    //Create comment
    .then( result => {
      return BlogComment().insert({
        author_id: result[0],
        author_name: req.body.name,
        blogpost_id: req.body.blogpost_id,
        body: req.body.body
      },['author_id', 'blogpost_id', 'body'])
      .then( result => {
        res.json(result)
      })
    })
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

// READ BLOGPOSTS
router.get('/blogpost', (req, res) => {
  knex('blogpost').orderBy('blogpost.id','desc')
  .join('author', 'blogpost.author_id','=','author.id')
  .select('blogpost.*','author.name')
  .then( result => {
    res.json(result)
  })
})

// READ SPECIFIC BLOGPOST
router.get('/blogpost/:id', (req, res) => {
  knex('blogpost')
  .join('author', 'blogpost.author_id','=','author.id')
  .select('blogpost.*','author.name')
  .where('blogpost.id', req.params.id).first()
  .then( result => {
    if (!result) {
      throw new Error('No post found!')
    }
    res.json(result)
  })
  .catch( result => {
    res.status(404)
    res.json('Blogpost not found')
  })
})

// READ POST COMMENTS
router.get('/post/:id/comment/', (req, res) => {
  knex('comment').orderBy('comment.id','asc')
  .innerJoin('blogpost','comment.blogpost_id','blogpost.id')
  .innerJoin('author','blogpost.author_id','author.id')
  .select('comment.author_name','comment.author_id','comment.blogpost_id','comment.create_at','comment.body','comment.id')
  .where('blogpost_id', req.params.id)
  .then( result => {
    console.log(result)
    res.json(result)
  })
  .catch( result => {
    res.status(404)
  })
})

// READ SPECIFIC COMMENT
router.get('/comment/:id', (req, res) => {
  BlogComment().where('id', req.params.id).first()
  .then( result => {
    console.log(result)
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
    // author_id: req.body.author_id,
    title: req.body.title,
    body: req.body.body,
    image: req.body.image
  }, ['title','body','image'])
  .then( result => {
    res.json(result)
  })
})

// UPDATE COMMENT
router.put('/comment/:id', (req, res) => {
  BlogComment().where('id', req.params.id).update({
    body: req.body.body
  }, ['body'])
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
