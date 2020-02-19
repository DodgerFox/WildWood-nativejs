"use strict";window.onload=()=>{forum.init(),menu.init(),post.init(),auth.init()};const forum={data(){fetch("assets/data/articles.json").then(e=>{e.json().then(e=>{this.articles=e,this.catcheDOM(),this.bindEvents(),this.filter()})})},init(){this.data(),this.hashStatus(),this.helpers()},catcheDOM(){this.$input=document.querySelector('.search-input input[type="search"]'),this.$list=document.querySelector(".timeline-body"),this.$article=document.querySelector(".article"),this.$detail=document.querySelector(".article-wrap")},bindEvents(){this.inputHandler(),this.clickHandler()},inputHandler(){this.$input.addEventListener("keyup",()=>this.filter())},clickHandler(){this.$list.addEventListener("click",e=>{const s=e.target;"post"===s.className&&this.findByTarget(s)}),this.$article.addEventListener("click",e=>{const s=e.target;switch(s.classList[0]){case"emoji-add":this.openEmoji(s);break;case"emoji-item":this.itemEmoji(s)}})},helpers(){$(".timeline").mCustomScrollbar({scrollInertia:350,autoHideScrollbar:!0,mouseWheel:{scrollAmount:200}}),$(".article").mCustomScrollbar({scrollInertia:350,autoHideScrollbar:!0,mouseWheel:{scrollAmount:200}})},findByTarget(e){let s=parseInt(e.getAttribute("data-id"));const t=this.articles.find(e=>e.id===s);this.changeHash(s),this.openArticle(t,e)},openArticle(e,s){this.$detail.innerHTML="",this.$posts.forEach(e=>{e.classList.remove("active")}),s.classList.toggle("active");const t='<div class="article-header" style="background-image: url(\''+e.cover+'\');">\n            <div class="author">\n              <div class="author__avatar" style="background-image: url(\''+e.avatar+'\');">\n                <div class="author-cat">\n                  <div class="author-cat__item snowboard"></div>\n                </div>\n              </div>\n              <p class="author-name">Mary Jackson</p>\n            </div>\n          </div>\n          <div class="content">\n            <div class="content-wrap">\n              <div class="content-info">\n                <p class="content-info__item">'+e.date+'</p>\n                <p class="content-info__item">'+e.views+' просмотров</p>\n                <p class="content-info__item">2 комментария</p>\n              </div>\n              <div class="content-body">\n              '+e.content+"\n              </div>\n            </div>\n          </div>";this.$detail.insertAdjacentHTML("beforeEnd",t),this.$detail.insertAdjacentHTML("afterEnd",'<div class="comments">\n            <div class="comments-center">\n              <div class="comments-header">Комментарии<span>42</span>\n              </div>\n              <div class="comments-new">\n                <div class="comments__avatar" style="background-image: url(\'assets/images/face.jpg\');"></div>\n                <form class="comments-wrap">\n                  <textarea class="comments__textarea" type="Добавить комментарий"></textarea>\n                  <input class="comments__send" type="submit">\n                  <div class="comments__image">\n                    <input type="file" value="Добавить изображение" id="add-image">\n                    <label for="add-image">Добавить изображение</label>\n                  </div>\n                </form>\n              </div>\n              <div class="comments-body">\n                <div class="comments-item">\n                  <div class="comments__avatar" style="background-image: url(\'assets/images/face.jpg\');"><span class="snowboard"></span>\n                  </div>\n                  <div class="comments-wrap">\n                    <div class="comments-up">\n                      <p class="comments-item__name">Travis Rice</p>\n                      <p class="comments-item__date">5 минут назад</p>\n                    </div>\n                    <p class="comments-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>\n                    <div class="comments-panel">\n                      <div class="comments-ask">Ответить</div>\n                      <div class="emoji">\n                        <div class="emoji-item">\n                          <img src="assets/images/emoji/svg/001-happy.svg" class="mCS_img_loaded">\n                          <p>7</p>\n                        </div>\n                        <div class="emoji-add">\n                          <img src="assets/images/icon_plus-g.svg" class="mCS_img_loaded">\n                          <div class="emoji-pack">\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/002-laughing.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/003-crying.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/004-angry.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/005-tongue.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/006-angry-1.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/007-wink.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/008-disappointed.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/009-sad.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/010-embarrassed.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/011-surprised.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/012-sad-1.svg" class="mCS_img_loaded">\n                            </div>\n                            <div class="emoji-item">\n                              <img src="assets/images/emoji/svg/013-kiss.svg" class="mCS_img_loaded">\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>')},openEmoji(e){e.classList.toggle("active")},itemEmoji(e){console.log(e)},hashStatus(){let e=window.location.search;e=e.slice(1);const s=document.querySelector('[data-id="1"]');console.log(s)},changeHash(e){try{history.replaceState(null,null,"/?"+e)}catch(s){location.hash="#id_"+e}},addData(e){e.id=this.articles.length+1,this.articles.push(e)},filter(){const e=this.$input.value.toUpperCase();this.filtered=this.articles.filter(s=>{return("#"===e[0]?s.tags.toUpperCase():s.title.toUpperCase()).indexOf(e)>-1}),this.filtered.length>0?this.render():(this.$list.innerHTML="",this.$list.insertAdjacentHTML("beforeEnd","<p>Нетъ</p>"))},render(){this.$list.innerHTML="",this.filtered.forEach(e=>{const s=`<article class="post" data-id=" ${e.id} "> \n                <div class="post-container">\n                <p class="post-title"> ${e.title} </p>\n                <div class="category">\n                  <div class="category-item snowboard"></div>\n                  <div class="category-item ski"></div>\n                  <div class="category-item skateboard"></div>\n                </div>',\n                <div class="info">\n                  <div class="info-wrap">\n                    <p class="info__tag"> ${e.tags} </p>\n                    <p class="info__date"> ${e.date} </p>\n                  </div>\n                  <div class="info-wrap">\n                    <a class="info__flame" href="#">\n                      <img src="assets/images/icon_flame.svg">\n                    </a>\n                    <a class="info__user" href="#" style="background-image: url(' ${e.avatar} ');"></a>\n                  </div>\n                </div>\n                </div>\n              </article>`;this.$list.insertAdjacentHTML("beforeEnd",s)}),this.$posts=document.querySelectorAll(".post")}},menu={init(){this.catcheDOM(),this.bindEvents()},catcheDOM(){this.$button=document.querySelector(".menu-user"),this.$menu=document.querySelector(".menu"),this.$panel=document.querySelector(".panel"),this.$newPost=document.querySelector(".new")},bindEvents(){this.$menu.addEventListener("click",e=>{this.clickHandler(e)})},clickHandler(e){switch(e.target.className){case"menu-add":post.changeState();break;case"menu-user":this.$panel.classList.toggle("active");break;case"menu-auth":auth.changeState()}}},post={init(){this.catcheDOM(),this.bindEvents(),this.textarea()},catcheDOM(){this.new=document.querySelector(".new"),this.types=document.querySelectorAll(".new-add"),this.catsWrap=document.querySelector(".new-cats"),this.catsBtn=document.querySelector(".new-cats__add"),this.categoriesBody=document.querySelector(".new-categories")},bindEvents(){this.new.addEventListener("click",e=>{this.clickHandler()}),this.new.addEventListener("keyup",e=>{this.newTextarea(e)})},clickHandler(){const e=event.target;switch(event.target.classList[0]){case"new-cats__item":e.parentNode.removeChild(e);break;case"new-cats__add":this.newCategory();break;case"new-categories__item":this.markCategory(e);break;case"new-categories__button":this.addCategory(e);break;case"new-add":this.openTypes(e);break;case"new-publish":this.publish();break;case"new-close":this.changeState()}},openCategories(){this.catsBtn.classList.toggle("active"),this.categoriesBody.classList.toggle("active")},newCategory(){const e=document.querySelectorAll(".new-categories__item");this.cats=document.querySelectorAll(".new-cats .new-cats__item"),this.newItems=[],this.openCategories(),e.forEach(e=>{this.cats.forEach(s=>{let t=s.getAttribute("data-cat");e.getAttribute("data-cat")===t&&(this.newItems.push(t),e.classList.add("choise"))})})},markCategory(e){e.classList.toggle("choise")},addCategory(){const e=document.querySelectorAll(".new-categories__item.choise");this.newItems=e,this.catsWrap.innerHTML="",this.newItems.forEach(e=>{const s=`<div class="new-cats__item" data-cat="${e.getAttribute("data-cat")}">${e.innerHTML}</div>`;this.catsWrap.insertAdjacentHTML("afterBegin",s)}),this.openCategories()},textarea(){$(this.new).on("focus","textarea",(function(){const e=this.value;this.value="",this.baseScrollHeight=this.scrollHeight,this.value=e,this.coef=this.classList.contains("new-header")?43:25})).on("input","textarea",(function(){var e,s=0|this.getAttribute("data-min-rows");this.rows=s,e=Math.ceil((this.scrollHeight-this.baseScrollHeight)/this.coef),this.rows=s+e}))},openTypes(e){e.classList.toggle("active"),e.addEventListener("click",e=>{this.changeType(e)})},changeType(e){const s=e.target,t=s.parentNode.parentNode.parentNode;let i="";"image"===s.className&&(i='\n        <input type="file" class="new-loader" id="fileElem1" multiple accept="image/*">\n        <label for="fileElem1">\n          <img src="assets/images/add-image.svg" width="90px">\n        </label>\n        <div class="new-add">\n          <ul>\n            <li class="paragraph">\n              <img src="assets/images/content-p.svg">\n            </li>\n            <li class="image">\n              <img src="assets/images/content-i.svg">\n            </li>\n            </ul>\n            </div>\n            <div class="new-item__container">\n        </div>'),t.innerHTML=i,t.classList.remove("paragraph"),t.classList.add("image")},newTextarea(e){const s=e.target,t=s.parentElement;switch(e.key){case"Enter":t.insertAdjacentHTML("afterEnd",'<div class="new-item paragraph">\n        <div class="new-add">\n          <ul>\n            <li class="paragraph">\n              <img src="assets/images/content-p.svg">\n            </li>\n            <li class="image">\n              <img src="assets/images/content-i.svg">\n            </li>\n          </ul>\n        </div>\n        <textarea class="autoExpand" rows="1"></textarea>\n      </div>'),t.nextElementSibling.childNodes[3].focus();break;case"Backspace":""===s.value&&(s.blur(),t.previousElementSibling.getElementsByTagName("textarea")[0].focus(),t.parentNode.removeChild(t))}},changeState(){this.new.classList.toggle("hidden")},publish(){const e=document.querySelector(".new-header"),s=document.querySelectorAll(".new-cats__item"),t=document.querySelectorAll(".new-item"),i=e.value,a=[];let n=`<h1> ${i} </h1>`;t.forEach(e=>{let s;s=e.classList.contains("paragraph")?"<p>"+e.querySelector("textarea").value+"</p>":'<img src ="'+e.querySelector("img").src+'" />',n+=s}),s.forEach(e=>{a.push(e.getAttribute("data-cat"))});const c={title:i,author:"John Jackson",authorId:1,avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",date:"Только что",views:"12",comments:"",cats:a,tags:"#Стори",hot:!0,open:!0,cover:"https://images.unsplash.com/photo-1577993625454-1dec02cedd4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=359&q=80",content:n};""!=i&&a!=[]&&n!=[]?(forum.addData(c),this.renderPost(c),this.changeState()):message()},renderPost(e){const s=document.querySelector(".timeline-body"),t=e.cats;let i="";t.forEach(e=>i+=`<div class="category-item ${e} "></div>`);const a=`<article class="post" data-id=" ${e.id} "> \n        <div class="post-container">\n        <p class="post-title"> ${e.title} </p>\n        <div class="category"> ${i}</div>',\n        <div class="info">\n          <div class="info-wrap">\n            <p class="info__tag"> ${e.tags} </p>\n            <p class="info__date"> ${e.date} </p>\n          </div>\n          <div class="info-wrap">\n            <a class="info__flame" href="#">\n              <img src="assets/images/icon_flame.svg" class="mCS_img_loaded">\n            </a>\n            <a class="info__user" href="#" style="background-image: url(' ${e.avatar} ');"></a>\n          </div>\n        </div>\n        </div>\n      </article>`;s.insertAdjacentHTML("afterbegin",a)}};function message(){const e=document.querySelector(".message");e.classList.toggle("hidden"),setTimeout(()=>{e.classList.toggle("hidden")},1500)}const auth={init(){this.catcheDOM(),this.bindEvents()},catcheDOM(){this.$body=document.querySelector(".auth")},bindEvents(){this.$body.addEventListener("click",e=>this.clickHandler(e))},clickHandler(e){switch(e.target.classList[0]){case"auth-close":this.changeState()}},changeState(){this.$body.classList.toggle("open")}};