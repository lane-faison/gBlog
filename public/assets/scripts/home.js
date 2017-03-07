var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length

      $('.blog-space').append(
        `<div class="blog-square col-sm-6 col-md-4"><div class="thumbnail" id="dammit"><img class="blog-image" src="${data[i].image}"><h3 class="blog-title">${data[i].title}</h3></div></div>`
      )
      $(document).on('mouseover','#dammit', function () {
        $('#dammit').append(`<p class="blog-body">${data[i].body}</p>`)
      })
    }
  })
})
