var idBlog

$(document).ready(function () {

  idBlog = getUrlParameter('id')

  //GET ALL THE BLOGPOSTS
  $.get(`/blogs/blogpost/${idBlog}`, data => {

    console.log(data)

    const date = data.create_at.slice(0,10)

    $('main').append(`<div class="jumbotron">
    <div class="container">
    <img class="jumbotron-img" src=${data.image}>
    <h2>${data.title}</h2>
    <h4>Written by ${data.name}</h4>
    <h5>Posted: ${date}</h5>
    <p>${data.body}</p>
    <div class="blogview-btns"><p><a class="btn btn-primary btn-blogview btn-edit btn-lg" href="#" role="button">Edit Post</a>
    </p><p><a class="btn btn-primary btn-blogview btn-delete btn-lg" href="#" role="button">Delete Post</a></p>
    </div>
    <section class="comment-section">
    <p>comments</p>
    </section></div></div>`)

  })
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
