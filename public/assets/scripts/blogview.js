var idBlog

$(document).ready( () => {

  idBlog = getUrlParameter('id')

  //GET THE BLOGPOST
  $.get(`/blogs/blogpost/${idBlog}`, data => {

    console.log(data)

    const date = data.create_at.slice(0,10)

    $('.blogSpot').append(`<div class="jumbotron">
    <div class="container">
    <img class="jumbotron-img" src=${data.image}>
    <h2>${data.title}</h2>
    <h4>Written by ${data.name}</h4>
    <h5>Posted: ${date}</h5>
    <p>${data.body}</p>
    <div class="blogview-btns"><p><a class="btn btn-primary btn-blogview btn-edit btn-lg" href="edit.html?id=${data.id}" role="button">Edit Post</a>
    </p><p><a class="btn btn-primary btn-blogview btn-delete btn-lg" href="#" role="button">Delete Post</a></p>
    </div>
    <section class="comment-section">
    <p>comments</p>
    </section></div></div>`)

    $.get(`/blogs/comment/${data.id}`, commentData => {
      console.log(commentData)
      for (var i = 0; i < commentData.length; i++) {
        $('.comment-section').append(
          `<div class="eachComment"><h4>${commentData[i].author_name}</h4>
          <h5>Posted: ${commentData[i].create_at}</h5>
          <p>${commentData[i].body}</p></div>`)

      }
      // COMMENT BUTTON
      $('.comment-section').append(`<p><a class="btn btn-primary btn-comment btn-lg" href="#" role="button">Comment</a></p>`)
    })
  })
})

//REVEALING COMMENT SECTION
$(document).on('click','.btn-comment', (event) => {
  event.preventDefault()
  $('.commentSpot').show()
})

// CREATING A NEW COMMENT
$(document).on('click','.add-comment-btn', function () {

  // idBlog = getUrlParameter('id')

  var newComment = {
    email: $('#CommentEmail').val(),
    name: $('#CommentName').val(),
    body: $("#CommentComment").val(),
    blogpost_id: idBlog
  }

  console.log('new comment below')
  console.log(newComment)

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY
  if ($.trim($('#CommentName').val()) === "" || $.trim($('#CommentEmail').val()) === "" || $.trim($('#CommentComment').val()) === "") {
    event.preventDefault()
    alert('Please complete the entire comment form.')
    return false
  }
  else {
    event.preventDefault()
    $.post('/blogs/comment', newComment, (result) => {
      console.log(result)
      $('.commentSpot').hide()
    })
  }
})






function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1))
  const sURLVariables = sPageURL.split('&')
  let returner

  sURLVariables.forEach((paraName) => {
    const sParameterName = paraName.split('=')
    if (sParameterName[0] === sParam) {
      returner = sParameterName[1] === undefined ? true : sParameterName[1]
    }
  })
  return returner
}
