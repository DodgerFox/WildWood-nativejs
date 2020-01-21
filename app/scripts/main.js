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
        
      })
    })
  },
  init: function () {
    this.data();
    this.helpers();
    setTimeout(() => {
      this.catcheDOM();
      this.bindEvents();
      this.render();
    }, 500)
  },
  catcheDOM: function () {
    this.input = document.querySelector('.search-input input[type="search"]');
    this.list = document.querySelector('.timeline-body');
    
  },
  bindEvents: function () {
    this.input.addEventListener('keyup', () => { this.render() })
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
  render: function () {
    const articlesList =  this.articles.filter((article) => {
      const value = this.input.value || '';
      return article.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    
    this.list.innerHTML = '';
    
    if (articlesList.length > 0) {
      
      articlesList.forEach( ( article ) => {
        
        const elem = `<article class="post"> <p class="post-title">` + article.title + `</p>`,
        cats = '<div class="category"><div class="category-item snowboard"></div><div class="category-item ski"></div><div class="category-item skateboard"></div></div>',
        info = `<div class="info"><div class="info-wrap"><p class="info__tag">` + article.tags + `</p><p class="info__date">` + article.date + `</p></div><div class="info-wrap"><a class="info__flame" href="#"><img src="assets/images/icon_flame.svg" class="mCS_img_loaded"></a><a class="info__user" href="#" style="background-image: url('` + article.avatar + `');"></a></div></div></article>`,
        allElems = elem + cats + info;
        
        this.list.insertAdjacentHTML("beforeEnd", allElems);
      })
    }else{
      this.list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
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