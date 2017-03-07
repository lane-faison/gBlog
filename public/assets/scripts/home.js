var count = 0

$(document).ready(function () {
  //GET ALL THE AUTHORS
  $.get('blogs/author', data => {
    newId = data.length
    console.log('Number of authors in database: ' + newId)
  })

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++

      var bodySlice = data[i].body.slice(0,200) + '...'

      $('.blog-space').append(
        `<div class="blog-square col-sm-6 col-md-4"><div class="thumbnail" id="blog-section"><img class="blog-image" src="${data[i].image}"><h3 class="blog-title">${data[i].title}</h3><p class="blog-body">${bodySlice}</p><p class="blog-name">Written by ${data[i].name}</p></div></div>`
      )
    }
  })
})

$(document).on('mouseover','#blog-section', function () {
  $(this).find('.blog-body').show()
  $(this).find('.blog-name').show()
  $(this).find('.blog-title').hide()
})

$(document).on('mouseleave','#blog-section', function () {
  $(this).find('.blog-body').hide()
  $(this).find('.blog-name').hide()
  $(this).find('.blog-title').show()
})

// CREATING A NEW BLOG
$(document).on('click', '.add-blog-btn', function (event) {
  event.preventDefault()

  var newBlogpost = {
    email: $('#InputEmail').val(),
    name: $('#InputName').val(),
    title: $("#InputTitle").val(),
    body: $("#InputBlog").val(),
    image: $("#InputImage").val()
  }

  $.post('/blogs/blogpost', newBlogpost, function (result) {
    console.log(result)
  })
})



// Name: $("#InputName").val(),
// Email: $("#InputEmail").val(),
// $.ajax({
//   url: '/movies',
//   type: 'POST',
//   data: newMovie,
//   success: function (results) {
//     $('.results').append('<p>' + $('#movieTitle').val() + ' successfully added!</p>')
//     $('.results').fadeOut(5000)
//   }
// })

// // First, check if email address already exists in author table
// $.get('/blogs/blogpost', data => {
//   for (var i = 0; i < data.length; i++) {
//     if ($("#InputEmail".val() === data[i].email)
//   }
// })
