// var count = 0

$(document).ready( () => {
  //GET ALL THE AUTHORS
  $.get('blogs/author', data => {
    authorTotal = data.length
    console.log('Number of authors in database: ' + authorTotal)
    console.log(data)
  })

  //GET ALL THE BLOGPOSTS
  $.get('/blogs/blogpost', data => {
    for (var i = 0; i < data.length; i++) {

      // count++
      console.log(data[i])
      var bodySlice = data[i].body.slice(0,200) + '...'

      $('.blog-space').append(
        `<a href="blogpost.html?id=${data[i].id}"><div class="blog-square col-sm-6 col-md-4"><div class="thumbnail" id="blog-section"><img class="blog-image" src="${data[i].image}"><h3 class="blog-title">${data[i].title}</h3><p class="blog-body">${bodySlice}</p><p class="blog-name">Written by ${data[i].name}</p></div></div></a>`
      )
    }
  })
})

$(document).on('mouseover','#blog-section', function() {
  $(this).find('.blog-title').fadeOut('slow')
  $(this).find('.blog-body').fadeIn('slow')
  $(this).find('.blog-name').fadeIn('slow')
})

$(document).on('mouseleave','#blog-section', function() {
  $(this).find('.blog-body').fadeOut('slow')
  $(this).find('.blog-name').fadeOut('slow')
  $(this).find('.blog-title').fadeIn('slow')
})

// CREATING A NEW BLOG
$(document).on('click', '.add-blog-btn', (event) => {

  var newBlogpost = {
    email: $('#InputEmail').val(),
    name: $('#InputName').val(),
    title: $("#InputTitle").val(),
    body: $("#InputBlog").val(),
    image: $("#InputImage").val()
  }

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY
  if ($.trim($('#InputName').val()) === "" || $.trim($('#InputEmail').val()) === "" || $.trim($('#InputTitle').val()) === "" || $.trim($('#InputImage').val()) === "" || $.trim($('#InputBlog').val()) === "") {
    event.preventDefault()
    alert('Please complete the entire blog form.')
    return false
  }
  else {
    event.preventDefault()
    $.post('/blogs/blogpost', newBlogpost, (result) => {
      console.log(result)
    })

    $('.back-blog-btn').show()
    $('.blog-response').show()
  }
})
