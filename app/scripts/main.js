'use strict'


window.onload = () => {
  forum.init();
  menu.init();
  post.init();
  auth.init();
}


const forum = {
  data () {
    fetch('assets/data/articles.json').then( (response) => {
      
      response.json().then((result) => {
        this.articles = result;
        this.catcheDOM();
        this.bindEvents();
        this.filter();
        
      })
    })
  },
  init () {
    this.data();
    this.hashStatus();
    this.helpers();
  },
  catcheDOM () {
    this.$input = document.querySelector('.search-input input[type="search"]');
    this.$list = document.querySelector('.timeline-body');
    this.$article = document.querySelector('.article');
    this.$detail = document.querySelector('.article-wrap');
  },
  bindEvents () {
    this.inputHandler();
    this.clickHandler();
  },
  inputHandler () {
    this.$input.addEventListener('keyup',() => this.filter());
  },
  clickHandler () {
    this.$list.addEventListener('click', (event) => {
      const elem = event.target;
      (elem.className === 'post') ? this.findByTarget(elem) : false;
    })
    this.$article.addEventListener('click', (event) => {
      const elem = event.target;
      
      switch (elem.classList[0]) {
        case ('emoji-add') :          
          this.openEmoji(elem)
          break;
        case ('emoji-item') :          
          this.itemEmoji(elem)
          break;
      }
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
  findByTarget(post){
    let id = parseInt(post.getAttribute('data-id'));
    let articles = this.articles;
    const current = articles.find(article => article.id === id);
    this.changeHash(id);
    this.openArticle(current, post);
    
  },
  openArticle (article, target) {
    this.$detail.innerHTML = '';
    this.$posts.forEach((post) => { post.classList.remove('active') });
    target.classList.toggle('active');
    
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

          const comments = 
            `<div class="comments">
            <div class="comments-center">
              <div class="comments-header">Комментарии<span>42</span>
              </div>
              <div class="comments-new">
                <div class="comments__avatar" style="background-image: url('assets/images/face.jpg');"></div>
                <form class="comments-wrap">
                  <textarea class="comments__textarea" type="Добавить комментарий"></textarea>
                  <input class="comments__send" type="submit">
                  <div class="comments__image">
                    <input type="file" value="Добавить изображение" id="add-image">
                    <label for="add-image">Добавить изображение</label>
                  </div>
                </form>
              </div>
              <div class="comments-body">
                <div class="comments-item">
                  <div class="comments__avatar" style="background-image: url('assets/images/face.jpg');"><span class="snowboard"></span>
                  </div>
                  <div class="comments-wrap">
                    <div class="comments-up">
                      <p class="comments-item__name">Travis Rice</p>
                      <p class="comments-item__date">5 минут назад</p>
                    </div>
                    <p class="comments-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
                    <div class="comments-panel">
                      <div class="comments-ask">Ответить</div>
                      <div class="emoji">
                        <div class="emoji-item">
                          <img src="assets/images/emoji/svg/001-happy.svg" class="mCS_img_loaded">
                          <p>7</p>
                        </div>
                        <div class="emoji-add">
                          <img src="assets/images/icon_plus-g.svg" class="mCS_img_loaded">
                          <div class="emoji-pack">
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/002-laughing.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/003-crying.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/004-angry.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/005-tongue.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/006-angry-1.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/007-wink.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/008-disappointed.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/009-sad.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/010-embarrassed.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/011-surprised.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/012-sad-1.svg" class="mCS_img_loaded">
                            </div>
                            <div class="emoji-item">
                              <img src="assets/images/emoji/svg/013-kiss.svg" class="mCS_img_loaded">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        this.$detail.insertAdjacentHTML("beforeEnd", header);
        this.$detail.insertAdjacentHTML("afterEnd", comments);
    
  },
  openEmoji(elem) {
    elem.classList.toggle('active')
  },
  itemEmoji(emoji) {
    console.log(emoji);
  },
  hashStatus() {
    let hash = window.location.search;
    hash = hash.slice(1);
    const post = document.querySelector('[data-id="1"]');
    console.log(post);
    
  },
  changeHash (id) {
    try {
       history.replaceState(null,null,'/?'+ id);
    }
    catch(e) {
       location.hash = '#id_'+id;
    }
    
  },    
  addData (article){
    article.id = this.articles.length + 1;
    this.articles.push(article);
  },
  filter () {    
    const searchValue = this.$input.value.toUpperCase();
    this.filtered =  this.articles.filter((article) => {
      let prop = (searchValue[0] === '#') ? article.tags.toUpperCase() : article.title.toUpperCase();
      return prop.indexOf(searchValue) > -1;
    });
    if (this.filtered.length > 0) {
      this.render();
    } else {
      this.$list.innerHTML = '';
      this.$list.insertAdjacentHTML("beforeEnd", "<p>Нетъ</p>");
    }
  },
  render () {
    this.$list.innerHTML = '';
      
      this.filtered.forEach( ( article ) => {
        
        const element = 
              `<article class="post" data-id=" ${ article.id } "> 
                <div class="post-container">
                <p class="post-title"> ${ article.title } </p>
                <div class="category">
                  <div class="category-item snowboard"></div>
                  <div class="category-item ski"></div>
                  <div class="category-item skateboard"></div>
                </div>',
                <div class="info">
                  <div class="info-wrap">
                    <p class="info__tag"> ${ article.tags } </p>
                    <p class="info__date"> ${ article.date } </p>
                  </div>
                  <div class="info-wrap">
                    <a class="info__flame" href="#">
                      <img src="assets/images/icon_flame.svg">
                    </a>
                    <a class="info__user" href="#" style="background-image: url(' ${ article.avatar } ');"></a>
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
    this.catcheDOM();
    this.bindEvents();
  },
  catcheDOM () {
    this.$button = document.querySelector('.menu-user');
    this.$menu = document.querySelector('.menu');
    this.$panel = document.querySelector('.panel');
    this.$newPost = document.querySelector('.new');
  },
  bindEvents () {
    this.$menu.addEventListener('click', (event) => {
      this.clickHandler(event);
    })
  },
  clickHandler (event) {    
    switch (event.target.className) {
      case ('menu-add') :
        post.changeState();
        break;
      case ('menu-user') :
        this.$panel.classList.toggle('active');
        break;
      case ('menu-auth') :
        auth.changeState()        
        break;
      }
  }
}


const post = {
  init () {
    this.catcheDOM();
    this.bindEvents();
    this.textarea();
  },
  catcheDOM () {
    this.new = document.querySelector('.new');
    this.types = document.querySelectorAll('.new-add');
    this.catsWrap = document.querySelector('.new-cats');    
    this.catsBtn = document.querySelector('.new-cats__add');    
    this.categoriesBody = document.querySelector('.new-categories');
  },
  bindEvents () {
    this.new.addEventListener('click', (event) => { this.clickHandler(); })
    this.new.addEventListener('keyup', (event) => { this.newTextarea(event); })
  },
  clickHandler () {
    const element = event.target;
    
    switch (event.target.classList[0]) {
      case 'new-cats__item':
        element.parentNode.removeChild(element);
        break;
      case 'new-cats__add':
        this.newCategory();
        break;
      case 'new-categories__item':
        this.markCategory(element);
        break;
      case 'new-categories__button':
        this.addCategory(element);
        break;
      case 'new-add':
        this.openTypes(element);
        break;
      case 'new-publish':
        this.publish();
        break;
      case 'new-close':
        this.changeState();
        break;
    }
  },
  openCategories () {
    this.catsBtn.classList.toggle('active');
    this.categoriesBody.classList.toggle('active');
  },
  newCategory () {
    const categoryItems = document.querySelectorAll('.new-categories__item');
    this.cats = document.querySelectorAll('.new-cats .new-cats__item');
    this.newItems = [];
    this.openCategories();

    categoryItems.forEach(categoryItem => {
      this.cats.forEach(cat => {
        let catAttr = cat.getAttribute('data-cat');
        if (categoryItem.getAttribute('data-cat') === catAttr) {
          this.newItems.push(catAttr);
          categoryItem.classList.add('choise');
        };
      })
    })
  },
  markCategory (element) {
    element.classList.toggle('choise');
  },
  addCategory () {
    const added = document.querySelectorAll('.new-categories__item.choise');
    this.newItems = added;
    this.catsWrap.innerHTML = '';
    this.newItems.forEach((item) => {
      const type = item.getAttribute('data-cat');
      const name = item.innerHTML;
      const elem = `<div class="new-cats__item" data-cat="${type}">${name}</div>`;
      this.catsWrap.insertAdjacentHTML('afterBegin', elem);
    })
    this.openCategories();
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
    adder.classList.toggle('active');
    adder.addEventListener('click', (event) => {
      this.changeType(event);
    });
    
  },
  changeType (event) {
    const typer = event.target,
          element = typer.parentNode.parentNode.parentNode,
          type = typer.className;
    let html = '';
    
    if (type === 'image'){
        html = `
        <input type="file" class="new-loader" id="fileElem1" multiple accept="image/*">
        <label for="fileElem1">
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
    element.classList.remove('paragraph');
    element.classList.add('image');
          
  },
  newTextarea (event) {
    const element = event.target;
    const container = element.parentElement;
    switch (event.key) {
      case 'Enter' :
        newTextarea()
        break;
      case 'Backspace' :
        deleteElem()
        break;
      default :
        break;
    }

    function deleteElem (){
      if (element.value === '') {
        element.blur();
        container.previousElementSibling.getElementsByTagName('textarea')[0].focus();
        container.parentNode.removeChild(container);
      }
    }
    function newTextarea (){
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
      container.nextElementSibling.childNodes[3].focus();
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
          categories = [];
    let items = `<h1> ${title} </h1>`;
          
          blocks.forEach( block => {
            let element
            if (block.classList.contains('paragraph')){
              element = '<p>'+ block.querySelector('textarea').value + '</p>';
            }else{
              element = '<img src ="'+ block.querySelector('img').src + '" />';
            }
            items = items + element;
          });
          cats.forEach( category => {
                categories.push( category.getAttribute('data-cat') );
          });
    
    const article = {
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
      forum.addData(article);
      this.renderPost(article);
      this.changeState();
    }else{
      message();
    }
  },
  renderPost (article) {
    const $body = document.querySelector('.timeline-body');
    const cats = article.cats;
    let categories = '';
    
    cats.forEach(element => categories = categories + `<div class="category-item ${element} "></div>`);

    const articleHtml = 
      `<article class="post" data-id=" ${ article.id } "> 
        <div class="post-container">
        <p class="post-title"> ${ article.title } </p>
        <div class="category"> ${ categories }</div>',
        <div class="info">
          <div class="info-wrap">
            <p class="info__tag"> ${ article.tags } </p>
            <p class="info__date"> ${ article.date } </p>
          </div>
          <div class="info-wrap">
            <a class="info__flame" href="#">
              <img src="assets/images/icon_flame.svg" class="mCS_img_loaded">
            </a>
            <a class="info__user" href="#" style="background-image: url(' ${ article.avatar } ');"></a>
          </div>
        </div>
        </div>
      </article>`;

    $body.insertAdjacentHTML("afterbegin", articleHtml);
  }
}


function message () {
  const block = document.querySelector('.message');
  block.classList.toggle('hidden');
  setTimeout(() => {
    block.classList.toggle('hidden');
  }, 1500);
}

const auth = {
  init () {
    this.catcheDOM()
    this.bindEvents()
  },
  catcheDOM () {
    this.$body = document.querySelector('.auth');    
  },
  bindEvents () {
    this.$body.addEventListener('click', (event) => this.clickHandler(event))
  },
  clickHandler (event) {
    const element = event.target;
    
    switch (element.classList[0]) {
      case ('auth-close') :
        this.changeState();
        break;
    }
  },
  changeState () {
    this.$body.classList.toggle('open');
  }
}