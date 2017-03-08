var idBlog

$(document).ready(function () {

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

  idBlog = getUrlParameter('id')


  //GET ALL THE BLOGPOSTS
  $.get(`/blogs/blogpost/${idBlog}`, data => {

    $('main').append(`<h1 class="blogIDview">${idBlog}</h1>`)

  })
})
