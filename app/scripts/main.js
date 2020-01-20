'use strict'

window.onload = () => {
  $(".timeline").mCustomScrollbar({
    scrollInertia: 350,
    autoHideScrollbar: true,
    mouseWheel:{ scrollAmount: 200 }
  });
  $(".article").mCustomScrollbar({
    scrollInertia: 350,
    autoHideScrollbar: true,
    mouseWheel:{ scrollAmount: 200 }
  });

  panel()
}

let articles;

fetch('assets/data/articles.json').then( (response) => {
  
  response.json().then((result) => {
    articles = result;
    search(articles)
    // init(articles)
  })

})





let panel = () => {
  const button = document.querySelector('.menu-user'),
  panel = document.querySelector('.panel');
  button.addEventListener('click', () => {
    panel.classList.toggle('active');
  })
}

let search = () => {
  const input = document.querySelector('.search-input input[type="search"]'),
        posts = articles,
        list = document.querySelector('.timeline-body');


  input.addEventListener('keyup', () => {
    
   renderList()
    
  })
  
  let renderList = () => {
    const marvelHeroes =  posts.filter(function(hero) {
      const value = input.value || '';      
      return hero.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    
    list.innerHTML = '';
 
    if (marvelHeroes.length > 0) {
      
      marvelHeroes.forEach( ( article ) => {

        const elem = `<article class="post"> <p class="post-title">` + article.title + `</p>`,
              cats = '<div class="category"><div class="category-item snowboard"></div><div class="category-item ski"></div><div class="category-item skateboard"></div></div>',
              info = `<div class="info"><div class="info-wrap"><p class="info__tag">` + article.tags + `</p><p class="info__date">` + article.date + `</p></div><div class="info-wrap"><a class="info__flame" href="#"><img src="assets/images/icon_flame.svg" class="mCS_img_loaded"></a><a class="info__user" href="#" style="background-image: url('` + article.avatar + `');"></a></div></div></article>`,
              allElems = elem + cats + info;
              
        list.insertAdjacentHTML("beforeEnd", allElems);
      })
    }else{
      list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
  }

  renderList()
  // console.log(posts);
  
}