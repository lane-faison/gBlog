var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length

      $('.blog-space').append(
        `<div class="col-sm-6 col-md-4"><div class="thumbnail" id=${count}><img src="${data[i].image}"></div></div>`

        // <h3 class="blog-title">${data[i].title}</h3><p class="blog-body">${data[i].body}</p></div>
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
