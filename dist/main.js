!function(s){var a={};function e(r){if(a[r])return a[r].exports;var t=a[r]={i:r,l:!1,exports:{}};return s[r].call(t.exports,t,t.exports,e),t.l=!0,t.exports}e.m=s,e.c=a,e.d=function(s,a,r){e.o(s,a)||Object.defineProperty(s,a,{enumerable:!0,get:r})},e.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},e.t=function(s,a){if(1&a&&(s=e(s)),8&a)return s;if(4&a&&"object"==typeof s&&s&&s.__esModule)return s;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:s}),2&a&&"string"!=typeof s)for(var t in s)e.d(r,t,function(a){return s[a]}.bind(null,t));return r},e.n=function(s){var a=s&&s.__esModule?function(){return s.default}:function(){return s};return e.d(a,"a",a),a},e.o=function(s,a){return Object.prototype.hasOwnProperty.call(s,a)},e.p="",e(e.s=0)}([function(s,a,e){"use strict";e.r(a);class r{constructor({word:s,translation:a,imageSrc:e,audioSrc:r,sectionTitle:t,className:c}){this.word=s,this.translation=a,this.imageSrc=e,this.audioSrc=r,this.sectionTitle=t,this.className=c}createSectionTitle(){const s=document.createElement("div");return s.classList.add("section-title"),s.classList.add(this.className),s.innerHTML=this.sectionTitle,s}createImgBlock(s){const a=document.createElement("div");return a.className=s,a.setAttribute("style",`background-image: url(${this.imageSrc});`),a}createSoundBlock(s){const a=document.createElement("audio");a.className=s;const e=document.createElement("source");return e.setAttribute("src",this.audioSrc),e.setAttribute("type","audio/mpeg"),a.append(e),a}generateSectionCard(){const s=document.createElement("div");return s.classList.add("card"),s.classList.add("section-card"),s.classList.add(this.className),s.append(this.createImgBlock("section-image")),s.append(this.createSectionTitle()),s}generateTrainPlayCard(){const s=document.createElement("div");s.classList.add("card"),s.classList.add("train-card"),s.append(this.createImgBlock("card-image")),s.append(this.createSoundBlock("card-sound"));const a=document.createElement("div");a.className="card-word",a.innerHTML=this.word;const e=document.createElement("div");e.className="card-icon";const r=document.createElement("object");r.className="icon-rotate",r.setAttribute("type","image/svg+xml"),r.setAttribute("data","./src/assets/images/rotate.svg");const t=document.createElement("div");return t.className="card-description",e.append(r),t.append(a),t.append(e),s.append(t),s}}class t{constructor(s){this.className=s}generateCards(s){const a=document.createElement("div");a.className=this.className;for(let e=0;e<s.length;e++)a.append(new r(s[e]).generateSectionCard());return console.log(a),a}generateTrainPlayCards(s){const a=document.createElement("div");a.className=this.className,console.log(s);for(let e=0;e<s.length;e++)a.append(new r(s[e]).generateTrainPlayCard());return console.log(a),a}}var c=[{sectionTitle:"Action (set A)",className:"actionA",imageSrc:"./src/assets/images/cardsMainPage/dance.jpg"},{sectionTitle:"Action (set B)",className:"actionB",imageSrc:"./src/assets/images/cardsMainPage/swim.jpg"},{sectionTitle:"Animal (set A)",className:"animalA",imageSrc:"./src/assets/images/cardsMainPage/cat.jpg"},{sectionTitle:"Animal (set B)",className:"animalB",imageSrc:"./src/assets/images/cardsMainPage/bird.jpg"},{sectionTitle:"Clothes",className:"clothes",imageSrc:"./src/assets/images/cardsMainPage/blouse.jpg"},{sectionTitle:"Emotions",className:"emotion",imageSrc:"./src/assets/images/cardsMainPage/smile.jpg"}];var o=[{word:"cry",translation:"плакать",imageSrc:"./src/assets/images/cardsActionA/cry.jpg",audioSrc:"./src/assets/sounds/cardsActionA/cry.mp3"},{word:"dance",translation:"танцевать",imageSrc:"./src/assets/images/cardsActionA/dance.jpg",audioSrc:"./src/assets/sounds/cardsActionA/dance.mp3"},{word:"dive",translation:"нырять",imageSrc:"./src/assets/images/cardsActionA/dive.jpg",audioSrc:"./src/assets/sounds/cardsActionA/dive.mp3"},{word:"draw",translation:"рисовать",imageSrc:"./src/assets/images/cardsActionA/draw.jpg",audioSrc:"./src/assets/sounds/cardsActionA/draw.mp3"},{word:"fish",translation:"ловить рыбу",imageSrc:"./src/assets/images/cardsActionA/fish.jpg",audioSrc:"./src/assets/sounds/cardsActionA/fish.mp3"},{word:"fly",translation:"летать",imageSrc:"./src/assets/images/cardsActionA/fly.jpg",audioSrc:"./src/assets/sounds/cardsActionA/fly.mp3"},{word:"hug",translation:"обнимать",imageSrc:"./src/assets/images/cardsActionA/hug.jpg",audioSrc:"./src/assets/sounds/cardsActionA/hug.mp3"},{word:"jump",translation:"прыгать",imageSrc:"./src/assets/images/cardsActionA/jump.jpg",audioSrc:"./src/assets/sounds/cardsActionA/jump.mp3"}];var i=[{word:"open",translation:"открывать",imageSrc:"./src/assets/images/cardsActionB/open.jpg",audioSrc:"./src/assets/sounds/cardsActionB/open.mp3"},{word:"play",translation:"играть",imageSrc:"./src/assets/images/cardsActionB/play.jpg",audioSrc:"./src/assets/sounds/cardsActionB/play.mp3"},{word:"point",translation:"указывать",imageSrc:"./src/assets/images/cardsActionB/point.jpg",audioSrc:"./src/assets/sounds/cardsActionB/point.mp3"},{word:"ride",translation:"ездить",imageSrc:"./src/assets/images/cardsActionB/ride.jpg",audioSrc:"./src/assets/sounds/cardsActionB/ride.mp3"},{word:"run",translation:"бегать",imageSrc:"./src/assets/images/cardsActionB/run.jpg",audioSrc:"./src/assets/sounds/cardsActionB/run.mp3"},{word:"sing",translation:"петь",imageSrc:"./src/assets/images/cardsActionB/sing.jpg",audioSrc:"./src/assets/sounds/cardsActionB/sing.mp3"},{word:"skip",translation:"пропускать, прыгать",imageSrc:"./src/assets/images/cardsActionB/skip.jpg",audioSrc:"./src/assets/sounds/cardsActionB/skip.mp3"},{word:"swim",translation:"плавать",imageSrc:"./src/assets/images/cardsActionB/swim.jpg",audioSrc:"./src/assets/sounds/cardsActionB/swim.mp3"}];var n=[{word:"cat",translation:"кошка",imageSrc:"./src/assets/images/cardsAnimalA/cat.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/cat.mp3"},{word:"chick",translation:"цыпленок",imageSrc:"./src/assets/images/cardsAnimalA/chick.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/chick.mp3"},{word:"chicken",translation:"курица",imageSrc:"./src/assets/images/cardsAnimalA/chicken.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/chicken.mp3"},{word:"dog",translation:"собака",imageSrc:"./src/assets/images/cardsAnimalA/dog.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/dog.mp3"},{word:"horse",translation:"лошадь",imageSrc:"./src/assets/images/cardsAnimalA/horse.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/horse.mp3"},{word:"pig",translation:"свинья",imageSrc:"./src/assets/images/cardsAnimalA/pig.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/pig.mp3"},{word:"rabbit",translation:"кролик",imageSrc:"./src/assets/images/cardsAnimalA/rabbit.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/rabbit.mp3"},{word:"sheep",translation:"овца",imageSrc:"./src/assets/images/cardsAnimalA/sheep.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/sheep.mp3"}];var d=[{word:"bird",translation:"птица",imageSrc:"./src/assets/images/cardsAnimalB/bird.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/bird.mp3"},{word:"fish",translation:"рыба",imageSrc:"./src/assets/images/cardsAnimalB/fish.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/fish.mp3"},{word:"frog",translation:"лягушка",imageSrc:"./src/assets/images/cardsAnimalB/frog.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/frog.mp3"},{word:"giraffe",translation:"жираф",imageSrc:"./src/assets/images/cardsAnimalB/giraffe.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/giraffe.mp3"},{word:"lion",translation:"лев",imageSrc:"./src/assets/images/cardsAnimalB/lion.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/lion.mp3"},{word:"mouse",translation:"мышь",imageSrc:"./src/assets/images/cardsAnimalB/mouse.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/mouse.mp3"},{word:"turtle",translation:"черепаха",imageSrc:"./src/assets/images/cardsAnimalB/turtle.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/turtle.mp3"},{word:"dolphin",translation:"дельфин",imageSrc:"./src/assets/images/cardsAnimalB/dolphin.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/dolphin.mp3"}];var l=[{word:"skirt",translation:"юбка",imageSrc:"./src/assets/images/cardsClothes/skirt.jpg",audioSrc:"./src/assets/sounds/cardsClothes/skirt.mp3"},{word:"pants",translation:"брюки",imageSrc:"./src/assets/images/cardsClothes/pants.jpg",audioSrc:"./src/assets/sounds/cardsClothes/pants.mp3"},{word:"blouse",translation:"блузка",imageSrc:"./src/assets/images/cardsClothes/blouse.jpg",audioSrc:"./src/assets/sounds/cardsClothes/blouse.mp3"},{word:"dress",translation:"платье",imageSrc:"./src/assets/images/cardsClothes/dress.jpg",audioSrc:"./src/assets/sounds/cardsClothes/dress.mp3"},{word:"boot",translation:"ботинок",imageSrc:"./src/assets/images/cardsClothes/boot.jpg",audioSrc:"./src/assets/sounds/cardsClothes/boot.mp3"},{word:"shirt",translation:"рубашка",imageSrc:"./src/assets/images/cardsClothes/shirt.jpg",audioSrc:"./src/assets/sounds/cardsClothes/shirt.mp3"},{word:"coat",translation:"пальто",imageSrc:"./src/assets/images/cardsClothes/coat.jpg",audioSrc:"./src/assets/sounds/cardsClothes/coat.mp3"},{word:"shoe",translation:"туфли",imageSrc:"./src/assets/images/cardsClothes/shoe.jpg",audioSrc:"./src/assets/sounds/cardsClothes/shoe.mp3"}];var m=[{word:"sad",translation:"грустный",imageSrc:"./src/assets/images/cardsEmotions/sad.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/sad.mp3"},{word:"angry",translation:"сердитый",imageSrc:"./src/assets/images/cardsEmotions/angry.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/angry.mp3"},{word:"happy",translation:"счастливый",imageSrc:"./src/assets/images/cardsEmotions/happy.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/happy.mp3"},{word:"tired",translation:"уставший",imageSrc:"./src/assets/images/cardsEmotions/tired.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/tired.mp3"},{word:"surprised",translation:"удивлённый",imageSrc:"./src/assets/images/cardsEmotions/surprised.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/surprised.mp3"},{word:"scared",translation:"испуганный",imageSrc:"./src/assets/images/cardsEmotions/scared.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/scared.mp3"},{word:"smile",translation:"улыбка",imageSrc:"./src/assets/images/cardsEmotions/smile.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/smile.mp3"},{word:"laugh",translation:"смех",imageSrc:"./src/assets/images/cardsEmotions/laugh.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/laugh.mp3"}];function g(){console.log("just change train cards");const s=document.querySelector(".cards-wrapper").firstElementChild;let a=document.querySelectorAll(".card-description"),e=[];switch(localStorage.getItem("mode")){case"train":s.classList.replace("play-cards","train-cards"),e=document.querySelectorAll(".train-cards > *"),e.forEach(s=>s.classList.replace("play-card","train-card")),a.forEach(s=>s.classList.remove("hidden"));break;case"play":s.classList.replace("train-cards","play-cards"),e=document.querySelectorAll(".play-cards > *"),e.forEach(s=>s.classList.replace("train-card","play-card")),a.forEach(s=>s.classList.add("hidden"))}}function u(s,a,e){console.log("render cards, mode = "+s+" page = "+a+" categoryTitle = "+e);const r=document.querySelector(".cards-wrapper");if("main"===a){const a=new t("section-cards").generateCards(c);r.innerHTML="",r.append(a),document.querySelectorAll(".section-cards > *").forEach(a=>a.classList.add(s))}else if("category"===a){r.innerHTML="";let s,a=[];switch("train"===localStorage.getItem("mode")?s="train-cards":"play"===localStorage.getItem("mode")&&(s="play-cards"),e){case"action (set a)":a=new t(s).generateTrainPlayCards(o);break;case"action (set b)":a=new t(s).generateTrainPlayCards(i);break;case"animal (set a)":a=new t(s).generateTrainPlayCards(n);break;case"animal (set b)":a=new t(s).generateTrainPlayCards(d);break;case"clothes":a=new t(s).generateTrainPlayCards(l);break;case"emotions":a=new t(s).generateTrainPlayCards(m)}r.append(a),g()}}function p(){document.querySelector(".modeSwitch").addEventListener("mouseup",s=>{switch(localStorage.getItem("mode")){case"train":localStorage.setItem("mode","play");break;case"play":localStorage.setItem("mode","train")}console.log("localStorage.getItem(mode)"+localStorage.getItem("mode")),"main"===localStorage.getItem("page")?function(){console.log("just change section cards");let s=document.querySelectorAll(".section-cards > *");switch(s.forEach(s=>s.classList.add(localStorage.getItem("mode"))),localStorage.getItem("mode")){case"train":s.forEach(s=>s.classList.replace("play","train"));break;case"play":s.forEach(s=>s.classList.replace("train","play"))}}():"category"===localStorage.getItem("page")&&g()})}localStorage.setItem("mode","train"),localStorage.setItem("page","main"),window.onload=function(){u(localStorage.getItem("mode"),localStorage.getItem("page")),document.querySelector(".hamburger").addEventListener("click",s=>{document.querySelector(".hamburger-container").classList.remove("hidden");let a=document.querySelector(".hamburger-container");switch(a.classList.add(localStorage.getItem("mode")),localStorage.getItem("mode")){case"train":a.classList.replace("play","train");break;case"play":a.classList.replace("train","play")}}),document.querySelector(".close-button").addEventListener("click",s=>{document.querySelector(".hamburger-container").classList.add("hidden"),console.log("close")}),document.querySelector(".hamburger-menu").addEventListener("click",s=>{console.log(s.target),s.target.parentNode.classList.contains("nav-item")&&(console.log("yep"),document.querySelectorAll(".nav-item > a").forEach(s=>s.classList.remove("active")),s.target.classList.add("active"))}),p(),document.querySelector(".cards-wrapper").addEventListener("click",s=>{if("main"===localStorage.getItem("page")){let a;if(s.target.classList.contains("card")?a=s.target:s.target.parentNode.classList.contains("card")&&(a=s.target.parentNode),console.log(a),null!=a){let s=function(s){let a;for(let e=0;e<s.children.length;e++)s.children[e].classList.contains("section-title")&&(a=s.children[e].innerHTML);return a}(a).toLowerCase();console.log("title "+s),localStorage.setItem("page","category"),localStorage.setItem("category",s),u(localStorage.getItem("mode"),localStorage.getItem("page"),localStorage.getItem("category"))}}else"category"===localStorage.getItem("page")&&s.target.classList.contains("card-image")&&(s.target.nextSibling.play(),console.log("sound"))})}}]);