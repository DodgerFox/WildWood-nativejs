'use strict'

window.onload = () => {
  forum.init()
  menu.init()
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
    this.$input = document.querySelector('.search-input input[type="search"]');
    this.$list = document.querySelector('.timeline-body');
    this.$detail = document.querySelector('.article-wrap');
  },
  bindEvents () {
    this.inputHandler()
    this.clickHandler()
  },
  inputHandler () {
    this.$input.addEventListener('keyup', () => { 
      const searchValue = this.$input.value.toUpperCase();
      (searchValue.length === 0 || searchValue.length > 1) ? this.filter() : '';
    })
  },
  clickHandler () {
    this.$list.addEventListener('click', (event) => {
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
    this.$detail.innerHTML = '';
    this.$posts.forEach((post) => { post.classList.remove('active') })
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
        this.$detail.insertAdjacentHTML("beforeEnd", header);
      }
    })
    
  },
  filter () {
    const searchValue = this.$input.value.toUpperCase();
    this.filtered =  this.articles.filter((article) => {
      let prop = (searchValue[0] === '#') ? article.tags.toUpperCase() : article.title.toUpperCase();
      return prop.indexOf(searchValue) > -1;
    });
    if (this.filtered.length > 0) {
      this.render()
    } else {
      this.$list.innerHTML = '';
      this.$list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
  },
  render () {
    this.$list.innerHTML = '';
      
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
      
        this.$list.insertAdjacentHTML("beforeEnd", element);
      })
    
    this.$posts = document.querySelectorAll('.post');
  }
  
}


const menu = {
  init () {
    this.catcheDOM()
    this.bindEvents()
  },
  catcheDOM () {
    this.$button = document.querySelector('.menu-user');
    this.$menu = document.querySelector('.menu');
    this.$panel = document.querySelector('.panel');
    this.$newPost = document.querySelector('.new');
  },
  bindEvents () {
    this.$menu.addEventListener('click', (event) => {
      this.clickHandler(event)      
    })
  },
  clickHandler (event) {
    const element = event.target;
    
    switch (element.className) {
      case ('menu-add') :
        post.init()
        break;
      case ('menu-user') :
        this.$panel.classList.toggle('active');
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
    this.new.addEventListener('keyup', (event) => { this.newTextarea(event) })
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
      case 'new-publish':
        this.publish()
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
      this.changeType(event)
    })
    
  },
  changeType (event) {
    const typer = event.target,
          element = typer.parentNode.parentNode.parentNode,
          type = typer.className;
    let html = '';
    
    if (type === 'image'){
        html = `
        <input type="file" class="new-loader" id="fileElem`+ '1' +`" multiple accept="image/*">
        <label for="fileElem`+ '1' +`">
          <img src="assets/images/add-image.svg" width="90px">
        </label>
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
            <div class="new-item__container">
        </div>`;
    }
    element.innerHTML = html;
    element.classList.remove('paragraph')
    element.classList.add('image')
          
  },
  newTextarea (event) {
    const element = event.target;
    const container = element.parentElement;
      
      if (event.key === "Enter"){
          if (container.nextElementSibling){
            container.nextElementSibling.focus()
          }
      else{  
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
        }
      }else if (event.key === "Backspace" && element.value === ''){
        element.blur()
        container.previousElementSibling.getElementsByTagName('textarea')[0].focus()
        container.parentNode.removeChild(container)
      }
        
     
  },
  changeState () {
    this.new.classList.toggle('hidden');
  },
  publish () {
    const header = document.querySelector('.new-header'),
          cats = document.querySelectorAll('.new-cats__item'),
          blocks = document.querySelectorAll('.new-item'),
          title = header.value,
          categories = [],
          items = [];
          
          blocks.forEach( block => {
            let element
            if (block.classList.contains('paragraph')){
              element = ['p', block.querySelector('textarea').value];
            }else{
              element = ['img', block.querySelector('img').src];
            }
              items.push( element )
          });
          cats.forEach( category => {
                categories.push( category.getAttribute('data-cat') )
          });
    
    this.article = {
      "title": title,
      "author": "John Jackson",
      "authorId": 1,
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "date": "Только что",
      "views": "12",
      "comments": "",
      "cats": categories,
      "tags": "#Стори",
      "hot": true,
      "open": true,
      "cover": "https://images.unsplash.com/photo-1577993625454-1dec02cedd4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=359&q=80",  
      "content": items,
    }
    
    if (title!='' && categories!=[] && items!=[]){
      this.renderPost()
      this.changeState()
    }else{
      message();
    }
  },
  renderPost () {
    const $body = document.querySelector('.timeline-body');
    const article = this.article;
    const cats = article.cats;
    let categories = '';
    
    cats.forEach(element => categories = categories + `<div class="category-item `+ element +`"></div>`)

    const articleHtml = 
      `<article class="post" data-id="` + article.id + `"> 
        <div class="post-container">
        <p class="post-title">` + article.title + `</p>
        <div class="category">`
        + categories +
        `</div>',
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

    $body.insertAdjacentHTML("afterbegin", articleHtml);
  }
}


function message () {
  const block = document.querySelector('.message');
  block.classList.toggle('hidden')
  setTimeout(() => {
    block.classList.toggle('hidden')
  }, 1500)
}

