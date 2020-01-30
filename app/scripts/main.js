'use strict'

window.onload = () => {
  forum.init()
  panel.init()
  post.init()
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
    this.clickHandler();
  }
  
}


const panel = {
  init () {
    this.catcheDOM()
    this.bindEvents()
    this.newPost.classList.toggle('hidden');
  },
  catcheDOM () {
    this.button = document.querySelector('.menu-user');
    this.panel = document.querySelector('.panel');
    this.buttonNew = document.querySelector('.menu-add');
    this.buttonClose = document.querySelector('.new-close');
    this.newPost = document.querySelector('.new');
  },
  bindEvents () {
    this.button.addEventListener('click', () => {
      this.panel.classList.toggle('active');
    })
    this.buttonNew.addEventListener('click', () => {      
      this.newPost.classList.toggle('hidden');
    })
    this.buttonClose.addEventListener('click', () => {      
      this.newPost.classList.toggle('hidden');
    })
  }
}


const post = {
  init () {
    this.catcheDOM()
    this.bindEvents()
    this.textarea()
    this.newTextarea()
  },
  catcheDOM () {
    this.body = document.querySelector('.new');
    this.types = document.querySelectorAll('.new-add');
    this.cats = document.querySelectorAll('.new-cats .new-cats__item');
    this.catsWrap = document.querySelector('.new-cats');    
    this.catsBtn = document.querySelector('.new-cats__add');    
    this.categoriesBody = document.querySelector('.new-categories');
    
  },
  bindEvents () {
    this.types.forEach((adder) => adder.addEventListener('click', () => this.openTypes(adder)))
    this.cats.forEach((cat) => cat.addEventListener('click', () => cat.remove() ));
    this.catsBtn.addEventListener('click', () => this.categories())
  },
  categories () {
    const button = document.querySelector('.new-categories__button');
    const categoryItems = document.querySelectorAll('.new-categories__item');
    this.cats = document.querySelectorAll('.new-cats .new-cats__item');
    let newItems = [];
    this.catsBtn.classList.toggle('active')
    this.categoriesBody.classList.toggle('active')

    categoryItems.forEach(categoryItem => {

      this.cats.forEach(cat => {
        if (categoryItem.classList.contains(cat.getAttribute('data-cat'))) {
          newItems.push(cat.getAttribute('data-cat'))
          categoryItem.classList.add('choise')
        };
      })

      categoryItem.addEventListener('click', () => {
        if (categoryItem.classList.contains('choise')){
          const index = newItems.indexOf(categoryItem.getAttribute('data-cat'));
          function removeInArray(arr, ...args){
            var set = new Set(args); 
            return arr.filter((v, k) => !set.has(k));
          }
          newItems = removeInArray(newItems, index);
          console.log('yes');
          
          
        }else{
          newItems.push(categoryItem.getAttribute('data-cat'))
          console.log('no');
          
        }
        categoryItem.classList.toggle('choise')
      })
    })

    button.addEventListener('click', () => {
      console.log(newItems);
      newItems.forEach((item) => {
        this.catsWrap.innerHTML = '';
        const elem = '<div class="new-cats__item '+ item +'" data-cat="'+ item +'">'+ item +'</div>';
        this.catsWrap.insertAdjacentHTML('afterBegin', elem)
        
      })
      this.catsBtn.classList.toggle('active')
      this.categoriesBody.classList.toggle('active')
    })
  },
  textarea () {
    $(this.body)
    .on('focus', 'textarea', function(){
      const savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
      this.coef = (this.classList.contains('new-header')) ? 43 : 24;
        
    })
    .on('input', 'textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;        
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / this.coef);
        this.rows = minRows + rows;
    });
    
  },
  openTypes (adder) {
    const path = adder.parentNode;
    const types = adder.childNodes[1].childNodes;
    types.forEach( type => type.addEventListener('click', (newType) => this.changeType(path, adder, newType)) )
    adder.classList.toggle('active')
    
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
     
  }
}