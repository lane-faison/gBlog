var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length

      $('.grid').append(
        `<div class="grid-item" id=${count}><img src = ${data[i].image}><h3 class="blog-title">${data[i].title}</h3><p class="blog-body">${data[i].body}</p></div>`
      )
    }
  })
})


// $('.grid').on('mouseover', event => {
//   $(this).addClass('dimmed')
// })
// $('.grid').on('mouseleave', event => {
//   $(this).removeClass('dimmed')
// })
