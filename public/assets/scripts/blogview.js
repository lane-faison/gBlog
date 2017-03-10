var idBlog

$(document).ready( () => {

  idBlog = getUrlParameter('id')

  //GET THE BLOGPOST
  $.get(`/blogs/blogpost/${idBlog}`, data => {

    const date = data.create_at.slice(0,10)

    $('.blogSpot').append(`<div class="jumbotron">
    <div class="container">
    <div class="imageContainer"><img class="hanger" src="./assets/images/wire-hang.png"><img class="jumbotron-img" src=${data.image}></div>
    <h2 class="post-title">${data.title}</h2>
    <h4 class="post-author">Written by <span id="author-name">${data.name}</span></h4>
    <h5 class="post-date">Posted: ${date}</h5>
    <p class="post-body">${data.body}</p>
    <div class="blogview-btns"><p><a class="btn btn-primary btn-blogview btn-edit btn-lg" href="edit.html?id=${data.id}" role="button"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></a>
    </p><p><a id=${data.id} class="btn btn-post-delete btn-primary btn-blogview btn-delete btn-lg" href="home.html" role="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></a></p>
    </div>
    <section class="comment-section">
    <p>Comments</p>
    </section></div></div>`)

    // GET THE BLOGPOST'S COMMENTS
    $.get(`/blogs/post/${data.id}/comment`, commentData => {

      console.log(commentData)

      for (var i = 0; i < commentData.length; i++) {
        const date = commentData[i].create_at.slice(0,10)
        $('.comment-section').append(
          `<div class="eachComment"><div class="name-time-comment-div"><h4>${commentData[i].author_name}</h4>
          <h5>Posted: ${date}</h5>
          <p>${commentData[i].body}</p></div>
          <div class="comment-btns-div"><p><a id="${commentData[i].id}" class="btn comment-btn btn-comment-edit btn-primary btn-edit btn-lg" href="#" role="button">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true">
          </a></p><p><a id="${commentData[i].id}" class="btn comment-btn btn-comment-delete btn-primary btn-delete btn-lg" href="#" role="button">
          <span class="glyphicon glyphicon-trash" aria-hidden="true">
          </a></p></div></div>`)

      }
      // APPEND COMMENT BUTTON
      $('.comment-section').append(`<p><a class="btn btn-primary btn-comment btn-lg" href="#" role="button"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span>Comment</a></p>`)
    })
  })
  .catch(result => {
    $('.deleteSection').show()
  })
})

//REVEALING NEW COMMENT SECTION
$(document).on('click','.btn-comment', (event) => {
  event.preventDefault()
  $('.commentSpot').fadeIn()
  $('.editCommentSpot').fadeOut()
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

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY
  if ($.trim($('#CommentName').val()) === "" || $.trim($('#CommentEmail').val()) === "" || $.trim($('#CommentComment').val()) === "") {
    event.preventDefault()
    alert('Please complete the entire comment form.')
    return false
  }
  else {
    event.preventDefault()
    $.post('/blogs/comment', newComment, (result) => {
      $(".commentSpot").fadeOut("slow")
      location.reload()
    })
  }
})

//REVEALING EDIT COMMENT SECTION
$(document).on('click','.btn-comment-edit', (event) => {
  event.preventDefault()
  var commentValue = $(event.currentTarget).attr('id')

  $.get(`blogs/comment/${commentValue}`, (result) => {
    $('#EditComment').val(result.body)
  })

  $('.commentSpot').fadeOut('slow')
  $('.editCommentSpot').fadeIn('slow')
  $("html, body").animate({ scrollTop: $(document).height() }, 3000)

  // UPDATING A COMMENT
  $(document).on('click', '.edit-comment-submit', (event) => {
    event.preventDefault()

    // Only allowing body to be updated
    var updatedComment = {
      body: $("#EditComment").val()
    }

    // CHECK FOR BLANK ENTRY AND PREVENT SUBMIT IF BLANK
    if ($.trim($('#EditComment').val()) === "") {
      event.preventDefault()
      alert('You must enter something in the comment box!')
      return false
    }
    else {
      event.preventDefault()

      var commentId = $('.btn-comment-edit').attr('id')

      $.ajax({
        url: `/blogs/comment/${commentValue}`,
        type: 'PUT',
        data: updatedComment,
        success: function (result) {
          console.log("Comment was successfully updated.")
          $(".editCommentSpot").fadeOut('slow')
          location.reload()
        },
        error: function (result) {
          console.log("Something isn't working")
        }
      })
    }
  })
})


// DELETING A COMMENT
$(document).on('click', '.btn-comment-delete', (event) => {
  event.preventDefault()

  var commentId = $(event.currentTarget).attr('id')

  $.ajax({
    url: `/blogs/comment/${commentId}`,
    type: 'DELETE',
    success: function (result) {
      console.log('Comment successfully deleted')
      location.reload()
    },
    error: function (result) {
      console.log('Something went wrong when trying to delete')
    }
  })
})

// DELETING THE ENTIRE POST
$(document).on('click', '.btn-post-delete', (event) => {
  event.preventDefault()
  var postId = $(event.currentTarget).attr('id')

  // Confirm whether use wants to delete the blogpost
  var confirmation = confirm('Are you sure you want to delete the entire post?')
  if (confirmation === true) {
    $.ajax({
      url: `/blogs/blogpost/${postId}`,
      type: 'DELETE',
      success: function (result) {
        console.log('Post successfully deleted')
        location.reload()
      },
      error: function (result) {
        console.log('Something went wrong when trying to delete this post')
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
