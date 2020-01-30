'use strict'

window.onload = () => {
  forum.init()
  menu.init()
  // post.init()
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
      (searchValue.length === 0 || searchValue.length > 1) ? this.filter() : '';
    })
  },
  clickHandler () {
    this.list.addEventListener('click', (event) => {
      const post = event.target;
      (post.className === 'post') ? this.openArticle(post) : '';
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
    this.posts.forEach((post) => { post.classList.remove('active') })
    post.classList.toggle('active');
    this.articles.forEach((article) => {
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
  }
  
}


const menu = {
  init () {
    this.catcheDOM()
    this.bindEvents()
  },
  catcheDOM () {
    this.button = document.querySelector('.menu-user');
    this.menu = document.querySelector('.menu');
    this.panel = document.querySelector('.panel');
    this.newPost = document.querySelector('.new');
  },
  bindEvents () {
    this.menu.addEventListener('click', (event) => {
      this.clickHandler(event)      
    })
  },
  clickHandler (event) {
    const element = event.target;
    console.log(element);
    
    switch (element.className) {
      case ('menu-add') :
        post.init()
        break;
      case ('menu-user') :
        this.panel.classList.toggle('active');
        break;
      }
  }
}


const post = {
  init () {
    this.catcheDOM()
    this.changeState()
    this.bindEvents()
    this.textarea()
    this.newTextarea()
  },
  catcheDOM () {
    this.new = document.querySelector('.new');
    this.types = document.querySelectorAll('.new-add');
    this.catsWrap = document.querySelector('.new-cats');    
    this.catsBtn = document.querySelector('.new-cats__add');    
    this.categoriesBody = document.querySelector('.new-categories');
  },
  bindEvents () {
    this.new.addEventListener('click', (event) => { this.clickHandler() })
  },
  clickHandler () {
    const element = event.target;
    
    switch (event.target.classList[0]) {
      case 'new-cats__item':
        element.parentNode.removeChild(element)
        break;
      case 'new-cats__add':
        this.newCategory()
        break;
      case 'new-categories__item':
        this.markCategory(element)
        break;
      case 'new-categories__button':
        this.addCategory(element)
        break;
      case 'new-add':
        this.openTypes(element)
        break;
      case 'new-close':
        this.changeState()
        break;
    }
  },
  openCategories () {
    this.catsBtn.classList.toggle('active')
    this.categoriesBody.classList.toggle('active')
  },
  newCategory () {
    const categoryItems = document.querySelectorAll('.new-categories__item');
    this.cats = document.querySelectorAll('.new-cats .new-cats__item');
    this.newItems = [];
    this.openCategories()

    categoryItems.forEach(categoryItem => {

      this.cats.forEach(cat => {
        if (categoryItem.getAttribute('data-cat') === cat.getAttribute('data-cat')) {
          this.newItems.push(cat.getAttribute('data-cat'))
          categoryItem.classList.add('choise')
        };
      })
    })
  },
  markCategory (element) {
    element.classList.toggle('choise')
  },
  addCategory () {
    const added = document.querySelectorAll('.new-categories__item.choise');
    this.newItems = added;
    this.catsWrap.innerHTML = '';
    this.newItems.forEach((item) => {
      const type = item.getAttribute('data-cat');
      const name = item.innerHTML;
      const elem = '<div class="new-cats__item" data-cat="'+ type +'">'+ name +'</div>';
      this.catsWrap.insertAdjacentHTML('afterBegin', elem)
    })
    this.openCategories()
  },
  textarea () {
    $(this.new)
    .on('focus', 'textarea', function(){
      const savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
      this.coef = (this.classList.contains('new-header')) ? 43 : 25;
        
    })
    .on('input', 'textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;        
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / this.coef);
        this.rows = minRows + rows;
    });
    
  },
  openTypes (adder) {
    adder.classList.toggle('active')
    adder.addEventListener('click', (event) => {
      console.log(event.target.classList[0]);
      message()
    })
    
  },
  changeType (path, adder, newType) {  
      
    path.classList.remove('paragraph')
  },
  newTextarea () {
    const items = document.querySelectorAll('textarea.autoExpand');
    console.log(items);
    items.forEach((elem) => {
      const container = elem.parentElement;
      elem.addEventListener('keyup', (key) => {
        if (key.code === "Enter"){
          if (container.nextElementSibling.classList.contains('paragraph')){
            elem.blur()
            container.nextElementSibling.focus()
            console.log('focus');
            
          }else{
          
          const newTxt = `<div class="new-item paragraph">
            <div class="new-add">
              <ul>
                <li class="paragraph">
                  <img src="assets/images/content-p.svg">
                </li>
                <li class="image">
                  <img src="assets/images/content-i.svg">
                </li>
              </ul>
            </div>
            <textarea class="autoExpand" rows="1"></textarea>
          </div>`;
          container.insertAdjacentHTML('afterEnd', newTxt);
          container.nextElementSibling.childNodes[3].focus()
          console.log('new')
        }
      }
        
      })
    })
     
  },
  changeState () {
    this.new.classList.toggle('hidden');
  }
}


function message () {
  const block = document.querySelector('.message');
  block.classList.toggle('hidden')
  setTimeout(() => {
    block.classList.toggle('hidden')
  }, 1500)
}