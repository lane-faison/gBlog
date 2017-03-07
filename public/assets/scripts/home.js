var count = 0
var newId = 0

$(document).ready(function () {

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      count++
      newId = data.length

      $('.blogs').append(
        '<div id=' + count + '>' +
        '<p>' + data[i].author_id + '</p>'+
        '<p>' + data[i].title + '</p>'+
        '<p>' + data[i].body + '</p>'+
        '<p>' + data[i].create_at + '</p>'+
        '</div>'
      )
    }
  })
})
