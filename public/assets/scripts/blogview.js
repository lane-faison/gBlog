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
    <div class="blogview-btns"><p><a class="btn btn-primary btn-blogview btn-edit btn-lg" href="edit.html?id=${data.id}" role="button"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></a>
    </p><p><a class="btn btn-primary btn-blogview btn-delete btn-lg" href="#" role="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></a></p>
    </div>
    <section class="comment-section">
    <p>comments</p>
    </section></div></div>`)

    // GET THE BLOGPOST'S COMMENTS
    $.get(`/blogs/comment/${data.id}`, commentData => {
      console.log(commentData)

      for (var i = 0; i < commentData.length; i++) {
        const date = commentData[i].create_at.slice(0,10)
        $('.comment-section').append(
          `<div class="eachComment"><h4>${commentData[i].author_name}</h4>
          <h5>Posted: ${date}</h5>
          <p>${commentData[i].body}</p>
          <p><a id="${commentData[i].id}" class="btn btn-comment-edit btn-primary btn-blogview btn-edit btn-lg" href="#" role="button">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true">
          </a></p></div>`)

      }
      // APPEND COMMENT BUTTON
      $('.comment-section').append(`<p><a class="btn btn-primary btn-comment btn-lg" href="#" role="button">Comment</a></p>`)
    })
  })
})

//REVEALING COMMENT SECTION
$(document).on('click','.btn-comment', (event) => {
  event.preventDefault()
  $('.commentSpot').show()
  $("html, body").animate({ scrollTop: $(document).height() }, 3000);

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
      // $('.commentSpot').hide()
      $(".commentSpot").fadeOut( "slow", function() {
        // Animation complete.
      })
      location.reload()
    })
  }
})

//REVEALING EDIT COMMENT SECTION
$(document).on('click','.btn-comment-edit', (event) => {
  event.preventDefault()
  $('.editCommentSpot').show()
  $("html, body").animate({ scrollTop: $(document).height() }, 3000);
})

// UPDATING A COMMENT
$(document).on('click', '.edit-comment-submit', (event) => {

  event.preventDefault()

  // Only allowing body to be updated
  var updatedComment = {
    body: $("#EditComment").val()
  }

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY
  if ($.trim($('#EditComment').val()) === "") {
    event.preventDefault()
    alert('You must enter something in the comment box!')
    return false
  }
  else {
    event.preventDefault()

    var commentId = $('.btn-comment-edit').attr('id')

    console.log(commentId)
    console.log(updatedComment);

    $.ajax({
      url: `/blogs/comment/${commentId}`,
      type: 'PUT',
      data: updatedComment,
      success: function (result) {
        console.log("Comment was successfully updated.")
        $(".editCommentSpot").fadeOut( "slow", function() {
          //animation complete
        })
        location.reload()
      },
      error: function (result) {
        console.log("Something isn't working")
      }
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
