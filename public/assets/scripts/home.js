var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length

      $('.grid').append(
        '<div class="grid-item"><img src="./assets/images/mtn1.jpg">' +
        '<p class="blog-title">' + data[i].title + '</p>' +
        '<p class="blog-body">' + data[i].body + '</p>' +
        '</div>'
      )
    }
  })
})
