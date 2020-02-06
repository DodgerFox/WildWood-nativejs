"use strict";window.onload=()=>{forum.init(),menu.init(),post.init()};const forum={data(){fetch("assets/data/articles.json").then(e=>{e.json().then(e=>{this.articles=e,this.catcheDOM(),this.filter(),this.bindEvents()})})},init(){this.data(),this.helpers()},catcheDOM(){this.$input=document.querySelector('.search-input input[type="search"]'),this.$list=document.querySelector(".timeline-body"),this.$detail=document.querySelector(".article-wrap")},bindEvents(){this.inputHandler(),this.clickHandler()},inputHandler(){this.$input.addEventListener("keyup",()=>{const e=this.$input.value.toUpperCase();(0===e.length||e.length>1)&&this.filter()})},clickHandler(){this.$list.addEventListener("click",e=>{const t=e.target;"post"===t.className&&this.openArticle(t)})},helpers(){$(".timeline").mCustomScrollbar({scrollInertia:350,autoHideScrollbar:!0,mouseWheel:{scrollAmount:200}}),$(".article").mCustomScrollbar({scrollInertia:350,autoHideScrollbar:!0,mouseWheel:{scrollAmount:200}})},openArticle(e){this.$detail.innerHTML="",this.$posts.forEach(e=>{e.classList.remove("active")}),e.classList.toggle("active"),this.articles.forEach(t=>{if(t.id==e.getAttribute("data-id")){const e='<div class="article-header" style="background-image: url(\''+t.cover+'\');">\n            <div class="author">\n              <div class="author__avatar" style="background-image: url(\''+t.avatar+'\');">\n                <div class="author-cat">\n                  <div class="author-cat__item snowboard"></div>\n                </div>\n              </div>\n              <p class="author-name">Mary Jackson</p>\n            </div>\n          </div>\n          <div class="content">\n            <div class="content-wrap">\n              <div class="content-info">\n                <p class="content-info__item">'+t.date+'</p>\n                <p class="content-info__item">'+t.views+' просмотров</p>\n                <p class="content-info__item">2 комментария</p>\n              </div>\n              <div class="content-body">\n              '+t.content+"\n              </div>\n            </div>\n          </div>";this.$detail.insertAdjacentHTML("beforeEnd",e)}})},addData(e){e.id=this.articles.length+1,this.articles.push(e)},filter(){const e=this.$input.value.toUpperCase();this.filtered=this.articles.filter(t=>{return("#"===e[0]?t.tags.toUpperCase():t.title.toUpperCase()).indexOf(e)>-1}),this.filtered.length>0?this.render():(this.$list.innerHTML="",this.$list.insertAdjacentHTML("beforeEnd","<p>Нетъ</p>"))},render(){this.$list.innerHTML="",this.filtered.forEach(e=>{const t='<article class="post" data-id="'+e.id+'"> \n                <div class="post-container">\n                <p class="post-title">'+e.title+'</p>\n                <div class="category">\n                  <div class="category-item snowboard"></div>\n                  <div class="category-item ski"></div>\n                  <div class="category-item skateboard"></div>\n                </div>\',\n                <div class="info">\n                  <div class="info-wrap">\n                    <p class="info__tag">'+e.tags+'</p>\n                    <p class="info__date">'+e.date+'</p>\n                  </div>\n                  <div class="info-wrap">\n                    <a class="info__flame" href="#">\n                      <img src="assets/images/icon_flame.svg" class="mCS_img_loaded">\n                    </a>\n                    <a class="info__user" href="#" style="background-image: url(\''+e.avatar+"');\"></a>\n                  </div>\n                </div>\n                </div>\n              </article>";this.$list.insertAdjacentHTML("beforeEnd",t)}),this.$posts=document.querySelectorAll(".post")}},menu={init(){this.catcheDOM(),this.bindEvents()},catcheDOM(){this.$button=document.querySelector(".menu-user"),this.$menu=document.querySelector(".menu"),this.$panel=document.querySelector(".panel"),this.$newPost=document.querySelector(".new")},bindEvents(){this.$menu.addEventListener("click",e=>{this.clickHandler(e)})},clickHandler(e){switch(e.target.className){case"menu-add":post.changeState();break;case"menu-user":this.$panel.classList.toggle("active")}}},post={init(){this.catcheDOM(),this.bindEvents(),this.textarea()},catcheDOM(){this.new=document.querySelector(".new"),this.types=document.querySelectorAll(".new-add"),this.catsWrap=document.querySelector(".new-cats"),this.catsBtn=document.querySelector(".new-cats__add"),this.categoriesBody=document.querySelector(".new-categories")},bindEvents(){this.new.addEventListener("click",e=>{this.clickHandler()}),this.new.addEventListener("keyup",e=>{this.newTextarea(e)})},clickHandler(){const e=event.target;switch(event.target.classList[0]){case"new-cats__item":e.parentNode.removeChild(e);break;case"new-cats__add":this.newCategory();break;case"new-categories__item":this.markCategory(e);break;case"new-categories__button":this.addCategory(e);break;case"new-add":this.openTypes(e);break;case"new-publish":this.publish();break;case"new-close":this.changeState()}},openCategories(){this.catsBtn.classList.toggle("active"),this.categoriesBody.classList.toggle("active")},newCategory(){const e=document.querySelectorAll(".new-categories__item");this.cats=document.querySelectorAll(".new-cats .new-cats__item"),this.newItems=[],this.openCategories(),e.forEach(e=>{this.cats.forEach(t=>{e.getAttribute("data-cat")===t.getAttribute("data-cat")&&(this.newItems.push(t.getAttribute("data-cat")),e.classList.add("choise"))})})},markCategory(e){e.classList.toggle("choise")},addCategory(){const e=document.querySelectorAll(".new-categories__item.choise");this.newItems=e,this.catsWrap.innerHTML="",this.newItems.forEach(e=>{const t='<div class="new-cats__item" data-cat="'+e.getAttribute("data-cat")+'">'+e.innerHTML+"</div>";this.catsWrap.insertAdjacentHTML("afterBegin",t)}),this.openCategories()},textarea(){$(this.new).on("focus","textarea",(function(){const e=this.value;this.value="",this.baseScrollHeight=this.scrollHeight,this.value=e,this.coef=this.classList.contains("new-header")?43:25})).on("input","textarea",(function(){var e,t=0|this.getAttribute("data-min-rows");this.rows=t,e=Math.ceil((this.scrollHeight-this.baseScrollHeight)/this.coef),this.rows=t+e}))},openTypes(e){e.classList.toggle("active"),e.addEventListener("click",e=>{this.changeType(e)})},changeType(e){const t=e.target,s=t.parentNode.parentNode.parentNode;let a="";"image"===t.className&&(a='\n        <input type="file" class="new-loader" id="fileElem1" multiple accept="image/*">\n        <label for="fileElem1">\n          <img src="assets/images/add-image.svg" width="90px">\n        </label>\n        <div class="new-add">\n          <ul>\n            <li class="paragraph">\n              <img src="assets/images/content-p.svg">\n            </li>\n            <li class="image">\n              <img src="assets/images/content-i.svg">\n            </li>\n            </ul>\n            </div>\n            <div class="new-item__container">\n        </div>'),s.innerHTML=a,s.classList.remove("paragraph"),s.classList.add("image")},newTextarea(e){const t=e.target,s=t.parentElement;if("Enter"===e.key)if(s.nextElementSibling)s.nextElementSibling.focus();else{const e='<div class="new-item paragraph">\n            <div class="new-add">\n              <ul>\n                <li class="paragraph">\n                  <img src="assets/images/content-p.svg">\n                </li>\n                <li class="image">\n                  <img src="assets/images/content-i.svg">\n                </li>\n              </ul>\n            </div>\n            <textarea class="autoExpand" rows="1"></textarea>\n          </div>';s.insertAdjacentHTML("afterEnd",e),s.nextElementSibling.childNodes[3].focus()}else"Backspace"===e.key&&""===t.value&&(t.blur(),s.previousElementSibling.getElementsByTagName("textarea")[0].focus(),s.parentNode.removeChild(s))},changeState(){this.new.classList.toggle("hidden")},publish(){const e=document.querySelector(".new-header"),t=document.querySelectorAll(".new-cats__item"),s=document.querySelectorAll(".new-item"),a=e.value,i=[];let n="<h1>"+a+"</h1>";s.forEach(e=>{let t;t=e.classList.contains("paragraph")?"<p>"+e.querySelector("textarea").value+"</p>":'<img src ="'+e.querySelector("img").src+'" />',n+=t}),t.forEach(e=>{i.push(e.getAttribute("data-cat"))});const c={title:a,author:"John Jackson",authorId:1,avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",date:"Только что",views:"12",comments:"",cats:i,tags:"#Стори",hot:!0,open:!0,cover:"https://images.unsplash.com/photo-1577993625454-1dec02cedd4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=359&q=80",content:n};""!=a&&i!=[]&&n!=[]?(forum.addData(c),this.renderPost(c),this.changeState()):message()},renderPost(e){const t=document.querySelector(".timeline-body"),s=e.cats;let a="";s.forEach(e=>a=a+'<div class="category-item '+e+'"></div>');const i='<article class="post" data-id="'+e.id+'"> \n        <div class="post-container">\n        <p class="post-title">'+e.title+'</p>\n        <div class="category">'+a+'</div>\',\n        <div class="info">\n          <div class="info-wrap">\n            <p class="info__tag">'+e.tags+'</p>\n            <p class="info__date">'+e.date+'</p>\n          </div>\n          <div class="info-wrap">\n            <a class="info__flame" href="#">\n              <img src="assets/images/icon_flame.svg" class="mCS_img_loaded">\n            </a>\n            <a class="info__user" href="#" style="background-image: url(\''+e.avatar+"');\"></a>\n          </div>\n        </div>\n        </div>\n      </article>";t.insertAdjacentHTML("afterbegin",i)}};function message(){const e=document.querySelector(".message");e.classList.toggle("hidden"),setTimeout(()=>{e.classList.toggle("hidden")},1500)}