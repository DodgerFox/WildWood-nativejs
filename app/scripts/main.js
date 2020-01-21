'use strict'

window.onload = () => {
  forum.init()
  panel()
}


const forum = {
  data: function () {
    fetch('assets/data/articles.json').then( (response) => {
      
      response.json().then((result) => {
        this.articles = result;
        this.catcheDOM();
        this.render();
        this.bindEvents();
        
      })
    })
  },
  init: function () {
    this.data();
    this.helpers();
  },
  catcheDOM: function () {
    this.input = document.querySelector('.search-input input[type="search"]');
    this.list = document.querySelector('.timeline-body');
    this.detail = document.querySelector('.article-wrap');
  },
  bindEvents: function () {
    this.input.addEventListener('keyup', () => { this.render() })
    this.posts.forEach((post) => {
      
      post.addEventListener('click', () => {
        this.openArticle(post)
      })
    })
  },
  helpers: function () {
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
  },
  openArticle: function (post) {
    this.detail.innerHTML = '';
    this.articles.forEach((article, id) => {
      if (article.id == post.getAttribute('data-id')){
        const header = 
          `<div class="article-header" style="background-image: url('` + article.cover + `');">
            <div class="author">
              <div class="author__avatar" style="background-image: url('` + article.avatar + `');">
                <div class="author-cat">
                  <div class="author-cat__item snowboard"></div>
                </div>
              </div>
              <p class="author-name">Mary Jackson</p>
            </div>
          </div>
          <div class="content">
            <div class="content-wrap">
              <div class="content-info">
                <p class="content-info__item">` + article.date + `</p>
                <p class="content-info__item">` + article.views + ` просмотров</p>
                <p class="content-info__item">2 комментария</p>
              </div>
              <div class="content-body">
              ` + article.content + `
              </div>
            </div>
          </div>`;
        this.detail.insertAdjacentHTML("beforeEnd", header);
      }
    })
    
  },
  render: function () {
    const articlesList =  this.articles.filter((article) => {
      const value = this.input.value || '';
      return article.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    
    this.list.innerHTML = '';
    
    if (articlesList.length > 0) {
      
      articlesList.forEach( ( article ) => {
        
        const elem = `<article class="post" data-id="` + article.id + `"> <p class="post-title">` + article.title + `</p>`,
        cats = '<div class="category"><div class="category-item snowboard"></div><div class="category-item ski"></div><div class="category-item skateboard"></div></div>',
        info = `<div class="info"><div class="info-wrap"><p class="info__tag">` + article.tags + `</p><p class="info__date">` + article.date + `</p></div><div class="info-wrap"><a class="info__flame" href="#"><img src="assets/images/icon_flame.svg" class="mCS_img_loaded"></a><a class="info__user" href="#" style="background-image: url('` + article.avatar + `');"></a></div></div></article>`,
        allElems = elem + cats + info;
        
        this.list.insertAdjacentHTML("beforeEnd", allElems);
      })
    }else{
      this.list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
    this.posts = document.querySelectorAll('.post');
  },
  
}


const panel = () => {
  const button = document.querySelector('.menu-user'),
  panel = document.querySelector('.panel');
  button.addEventListener('click', () => {
    panel.classList.toggle('active');
  })
}

// let articles;

// fetch('assets/data/articles.json').then( (response) => {
  
  //   response.json().then((result) => {
    //     articles = result;
    //     timeline(articles)
    //   })

// })



// let timeline = () => {
//   const input = document.querySelector('.search-input input[type="search"]'),
//         posts = articles,
//         list = document.querySelector('.timeline-body');
  
//   let renderList = () => {
//     const articlesList =  posts.filter(function(article) {
//       const value = input.value || '';      
//       return article.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
//     });
    
//     list.innerHTML = '';
 
//     if (articlesList.length > 0) {
      
//       articlesList.forEach( ( article ) => {

//         const elem = `<article class="post"> <p class="post-title">` + article.title + `</p>`,
//               cats = '<div class="category"><div class="category-item snowboard"></div><div class="category-item ski"></div><div class="category-item skateboard"></div></div>',
//               info = `<div class="info"><div class="info-wrap"><p class="info__tag">` + article.tags + `</p><p class="info__date">` + article.date + `</p></div><div class="info-wrap"><a class="info__flame" href="#"><img src="assets/images/icon_flame.svg" class="mCS_img_loaded"></a><a class="info__user" href="#" style="background-image: url('` + article.avatar + `');"></a></div></div></article>`,
//               allElems = elem + cats + info;
              
//         list.insertAdjacentHTML("beforeEnd", allElems);
//       })
//     }else{
//       list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
//     }
//   }

//   renderList()

//   input.addEventListener('keyup', () => { renderList() })
  
// }