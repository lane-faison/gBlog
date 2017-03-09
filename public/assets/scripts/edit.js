$(document).ready( () => {

  idBlog = getUrlParameter('id')

  //GET THE BLOGPOST
  $.get(`/blogs/blogpost/${idBlog}`, data => {

    console.log(data)

    const date = data.create_at.slice(0,10)

    // $('#InputName').val(`${data.name}`)
    // $('#InputEmail').val(`${data.email}`)
    $('.editHeader').append(`<h2 class="edit-title">${data.title}</h2>`)
    $('#InputTitle').val(`${data.title}`)
    $('#InputImage').val(`${data.image}`)
    $('#InputBlog').val(`${data.body}`)
  })
})

// UPDATING THE BLOGPOST
$(document).on('click', '.add-blog-btn', (event) => {

  var updatedBlogpost = {
    title: $("#InputTitle").val(),
    body: $("#InputBlog").val(),
    image: $("#InputImage").val()
  }

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY
  if ($.trim($('#InputTitle').val()) === "" || $.trim($('#InputImage').val()) === "" || $.trim($('#InputBlog').val()) === "") {
    event.preventDefault()
    alert('Please complete all fields to update your post!')
    return false
  }
  else {
    event.preventDefault()
    $.ajax({
      url: `/blogs/blogpost/${idBlog}`,
      type: 'PUT',
      data: updatedBlogpost,
      success: function (result) {
        console.log("Post was successfully updated.")
        $('.back-blog-btn').show()
        $('.blog-response').show()
      },
      error: function (result) {
        console.log("Something isn't working")
      }
    })


    // $.put(`/blogs/blogpost/${idBlog}`, updatedBlogpost, (result) => {
    //   console.log(result)
    // })

  }
})

//PULLS ID FROM HTTP REQUEST
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
