var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length
      var bodySlice = data[i].body.slice(0,100) + '...'

      $('.blog-space').append(
        `<div class="blog-square col-sm-6 col-md-4"><div class="thumbnail" id="blog-section"><img class="blog-image" src="${data[i].image}"><h3 class="blog-title">${data[i].title}</h3><p class="blog-body">${bodySlice}</p></div></div>`
      )
    }
  })
})

$(document).on('mouseover','#blog-section', function () {
  $(this).find('.blog-body').show()
  $(this).find('.blog-title').hide()
})

$(document).on('mouseleave','#blog-section', function () {
  $(this).find('.blog-body').hide()
  $(this).find('.blog-title').show()
})
