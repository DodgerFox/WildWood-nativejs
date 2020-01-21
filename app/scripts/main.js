'use strict'

window.onload = () => {
  forum.init()
  panel()
}


const forum = {
  data () {
    fetch('assets/data/articles.json').then( (response) => {
      
      response.json().then((result) => {
        this.articles = result;
        this.catcheDOM();
        this.render();
        this.bindEvents();
        
      })
    })
  },
  init () {
    this.data();
    this.helpers();
  },
  catcheDOM () {
    this.input = document.querySelector('.search-input input[type="search"]');
    this.list = document.querySelector('.timeline-body');
    this.detail = document.querySelector('.article-wrap');
  },
  bindEvents () {
    this.input.addEventListener('keyup', () => { this.render() })
    this.posts.forEach((post) => {post.addEventListener('click', () => { this.openArticle(post) }) })
  },
  helpers () {
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
  openArticle (post) {
    this.detail.innerHTML = '';
    this.posts.forEach((post) => {post.classList.remove('active');})
    post.classList.toggle('active');
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
  render () {
    const articlesList =  this.articles.filter((article) => {
      return article.title.toUpperCase().indexOf(this.input.value.toUpperCase()) > -1;
    });
    
    this.list.innerHTML = '';
    
    if (articlesList.length > 0) {
      
      articlesList.forEach( ( article ) => {
        
        const element = 
              `<article class="post" data-id="` + article.id + `"> 
                <p class="post-title">` + article.title + `</p>
                <div class="category">
                  <div class="category-item snowboard"></div>
                  <div class="category-item ski"></div>
                  <div class="category-item skateboard"></div>
                </div>',
                <div class="info">
                  <div class="info-wrap">
                    <p class="info__tag">` + article.tags + `</p>
                    <p class="info__date">` + article.date + `</p>
                  </div>
                  <div class="info-wrap">
                    <a class="info__flame" href="#">
                      <img src="assets/images/icon_flame.svg" class="mCS_img_loaded">
                    </a>
                    <a class="info__user" href="#" style="background-image: url('` + article.avatar + `');"></a>
                  </div>
                </div>
              </article>`;
        
        this.list.insertAdjacentHTML("beforeEnd", element);
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
