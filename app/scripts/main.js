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
        this.filter();
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
    this.inputHandler()
    this.clickHandler()
  },
  inputHandler () {
    this.input.addEventListener('keyup', () => { 
      const searchValue = this.input.value.toUpperCase();
      (searchValue.length === 0 || searchValue.length > 1) ? this.filter() : console.log('none');
    })
  },
  clickHandler () {
    this.posts.forEach((post) => {
      post.addEventListener('click', () => { this.openArticle(post) }) 
    })
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
  filter () {
    const searchValue = this.input.value.toUpperCase();
    this.filtered =  this.articles.filter((article) => {
      let prop = (searchValue[0] === '#') ? article.tags.toUpperCase() : article.title.toUpperCase();
      return prop.indexOf(searchValue) > -1;
    });
    if (this.filtered.length > 0) {
      this.render()
    } else {
      this.list.innerHTML = '';
      this.list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
  },
  render () {
    this.list.innerHTML = '';
      
      this.filtered.forEach( ( article ) => {
        
        const element = 
              `<article class="post" data-id="` + article.id + `"> 
                <div class="post-container">
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
                </div>
              </article>`;
      
        this.list.insertAdjacentHTML("beforeEnd", element);
      })
    
    this.posts = document.querySelectorAll('.post');
    this.clickHandler();
  }
  
}


const panel = () => {
  const button = document.querySelector('.menu-user'),
  panel = document.querySelector('.panel');
  button.addEventListener('click', () => {
    panel.classList.toggle('active');
  })
}
