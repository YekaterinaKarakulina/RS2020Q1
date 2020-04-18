!function(e){var s={};function a(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=s,a.d=function(e,s,t){a.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:t})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,s){if(1&s&&(e=a(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var r in e)a.d(t,r,function(s){return e[s]}.bind(null,r));return t},a.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(s,"a",s),s},a.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},a.p="",a(a.s=0)}([function(e,s,a){"use strict";a.r(s);class t{constructor({word:e,translation:s,imageSrc:a,audioSrc:t,sectionTitle:r,className:c}){this.word=e,this.translation=s,this.imageSrc=a,this.audioSrc=t,this.sectionTitle=r,this.className=c}createSectionTitle(){const e=document.createElement("div");return e.classList.add("section-title"),e.classList.add(this.className),e.innerHTML=this.sectionTitle,e}createImgBlock(e){const s=document.createElement("div");return s.className=e,s.setAttribute("style",`background-image: url(${this.imageSrc});`),s}createSoundBlock(e){const s=document.createElement("audio");s.className=e;const a=document.createElement("source");return a.setAttribute("src",this.audioSrc),a.setAttribute("type","audio/mpeg"),s.append(a),s}generateSectionCard(){const e=document.createElement("div");return e.classList.add("card"),e.classList.add("section-card"),e.classList.add(this.className),e.append(this.createImgBlock("section-image")),e.append(this.createSectionTitle()),e}generateTrainPlayCard(){const e=document.createElement("div");e.classList.add("card"),e.classList.add("train-card");const s=document.createElement("div");s.classList.add("card-face"),s.classList.add("card-face-front");const a=document.createElement("div");a.classList.add("card-face"),a.classList.add("card-face-back");const t=document.createElement("div");t.className="card-word",t.innerHTML=this.word;const r=document.createElement("div");r.className="card-word",r.innerHTML=this.translation;const c=document.createElement("a");c.className="card-icon";const o=document.createElement("object");o.className="icon-rotate",o.setAttribute("type","image/svg+xml"),o.setAttribute("data","./src/assets/images/rotate.svg");const n=document.createElement("object");n.className="icon-rotate",n.setAttribute("type","image/svg+xml"),n.setAttribute("data","./src/assets/images/rotate.svg");const i=document.createElement("a");i.className="card-icon",c.append(o),i.append(n);const d=document.createElement("div");d.className="card-description",d.append(t),d.append(c);const l=document.createElement("div");return l.className="card-description",l.append(r),l.append(i),s.append(this.createImgBlock("card-image")),s.append(this.createSoundBlock("card-sound")),s.append(d),a.append(this.createImgBlock("card-image")),a.append(l),e.append(s),e.append(a),e}}class r{constructor(e){this.className=e}generateCards(e){const s=document.createElement("div");s.className=this.className;for(let a=0;a<e.length;a++)s.append(new t(e[a]).generateSectionCard());return s}generateTrainPlayCards(e){const s=document.createElement("div");s.className=this.className;for(let a=0;a<e.length;a++)s.append(new t(e[a]).generateTrainPlayCard());return s}}var c=[{sectionTitle:"Action (set A)",className:"actionA",imageSrc:"./src/assets/images/cardsMainPage/dance.jpg"},{sectionTitle:"Action (set B)",className:"actionB",imageSrc:"./src/assets/images/cardsMainPage/swim.jpg"},{sectionTitle:"Animal (set A)",className:"animalA",imageSrc:"./src/assets/images/cardsMainPage/cat.jpg"},{sectionTitle:"Animal (set B)",className:"animalB",imageSrc:"./src/assets/images/cardsMainPage/bird.jpg"},{sectionTitle:"Clothes",className:"clothes",imageSrc:"./src/assets/images/cardsMainPage/blouse.jpg"},{sectionTitle:"Emotions",className:"emotion",imageSrc:"./src/assets/images/cardsMainPage/smile.jpg"}];var o=[{word:"cry",translation:"плакать",imageSrc:"./src/assets/images/cardsActionA/cry.jpg",audioSrc:"./src/assets/sounds/cardsActionA/cry.mp3"},{word:"dance",translation:"танцевать",imageSrc:"./src/assets/images/cardsActionA/dance.jpg",audioSrc:"./src/assets/sounds/cardsActionA/dance.mp3"},{word:"dive",translation:"нырять",imageSrc:"./src/assets/images/cardsActionA/dive.jpg",audioSrc:"./src/assets/sounds/cardsActionA/dive.mp3"},{word:"draw",translation:"рисовать",imageSrc:"./src/assets/images/cardsActionA/draw.jpg",audioSrc:"./src/assets/sounds/cardsActionA/draw.mp3"},{word:"fish",translation:"ловить рыбу",imageSrc:"./src/assets/images/cardsActionA/fish.jpg",audioSrc:"./src/assets/sounds/cardsActionA/fish.mp3"},{word:"fly",translation:"летать",imageSrc:"./src/assets/images/cardsActionA/fly.jpg",audioSrc:"./src/assets/sounds/cardsActionA/fly.mp3"},{word:"hug",translation:"обнимать",imageSrc:"./src/assets/images/cardsActionA/hug.jpg",audioSrc:"./src/assets/sounds/cardsActionA/hug.mp3"},{word:"jump",translation:"прыгать",imageSrc:"./src/assets/images/cardsActionA/jump.jpg",audioSrc:"./src/assets/sounds/cardsActionA/jump.mp3"}];var n=[{word:"open",translation:"открывать",imageSrc:"./src/assets/images/cardsActionB/open.jpg",audioSrc:"./src/assets/sounds/cardsActionB/open.mp3"},{word:"play",translation:"играть",imageSrc:"./src/assets/images/cardsActionB/play.jpg",audioSrc:"./src/assets/sounds/cardsActionB/play.mp3"},{word:"point",translation:"указывать",imageSrc:"./src/assets/images/cardsActionB/point.jpg",audioSrc:"./src/assets/sounds/cardsActionB/point.mp3"},{word:"ride",translation:"ездить",imageSrc:"./src/assets/images/cardsActionB/ride.jpg",audioSrc:"./src/assets/sounds/cardsActionB/ride.mp3"},{word:"run",translation:"бегать",imageSrc:"./src/assets/images/cardsActionB/run.jpg",audioSrc:"./src/assets/sounds/cardsActionB/run.mp3"},{word:"sing",translation:"петь",imageSrc:"./src/assets/images/cardsActionB/sing.jpg",audioSrc:"./src/assets/sounds/cardsActionB/sing.mp3"},{word:"skip",translation:"пропускать, прыгать",imageSrc:"./src/assets/images/cardsActionB/skip.jpg",audioSrc:"./src/assets/sounds/cardsActionB/skip.mp3"},{word:"swim",translation:"плавать",imageSrc:"./src/assets/images/cardsActionB/swim.jpg",audioSrc:"./src/assets/sounds/cardsActionB/swim.mp3"}];var i=[{word:"cat",translation:"кошка",imageSrc:"./src/assets/images/cardsAnimalA/cat.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/cat.mp3"},{word:"chick",translation:"цыпленок",imageSrc:"./src/assets/images/cardsAnimalA/chick.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/chick.mp3"},{word:"chicken",translation:"курица",imageSrc:"./src/assets/images/cardsAnimalA/chicken.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/chicken.mp3"},{word:"dog",translation:"собака",imageSrc:"./src/assets/images/cardsAnimalA/dog.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/dog.mp3"},{word:"horse",translation:"лошадь",imageSrc:"./src/assets/images/cardsAnimalA/horse.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/horse.mp3"},{word:"pig",translation:"свинья",imageSrc:"./src/assets/images/cardsAnimalA/pig.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/pig.mp3"},{word:"rabbit",translation:"кролик",imageSrc:"./src/assets/images/cardsAnimalA/rabbit.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/rabbit.mp3"},{word:"sheep",translation:"овца",imageSrc:"./src/assets/images/cardsAnimalA/sheep.jpg",audioSrc:"./src/assets/sounds/cardsAnimalA/sheep.mp3"}];var d=[{word:"bird",translation:"птица",imageSrc:"./src/assets/images/cardsAnimalB/bird.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/bird.mp3"},{word:"fish",translation:"рыба",imageSrc:"./src/assets/images/cardsAnimalB/fish.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/fish.mp3"},{word:"frog",translation:"лягушка",imageSrc:"./src/assets/images/cardsAnimalB/frog.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/frog.mp3"},{word:"giraffe",translation:"жираф",imageSrc:"./src/assets/images/cardsAnimalB/giraffe.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/giraffe.mp3"},{word:"lion",translation:"лев",imageSrc:"./src/assets/images/cardsAnimalB/lion.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/lion.mp3"},{word:"mouse",translation:"мышь",imageSrc:"./src/assets/images/cardsAnimalB/mouse.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/mouse.mp3"},{word:"turtle",translation:"черепаха",imageSrc:"./src/assets/images/cardsAnimalB/turtle.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/turtle.mp3"},{word:"dolphin",translation:"дельфин",imageSrc:"./src/assets/images/cardsAnimalB/dolphin.jpg",audioSrc:"./src/assets/sounds/cardsAnimalB/dolphin.mp3"}];var l=[{word:"skirt",translation:"юбка",imageSrc:"./src/assets/images/cardsClothes/skirt.jpg",audioSrc:"./src/assets/sounds/cardsClothes/skirt.mp3"},{word:"pants",translation:"брюки",imageSrc:"./src/assets/images/cardsClothes/pants.jpg",audioSrc:"./src/assets/sounds/cardsClothes/pants.mp3"},{word:"blouse",translation:"блузка",imageSrc:"./src/assets/images/cardsClothes/blouse.jpg",audioSrc:"./src/assets/sounds/cardsClothes/blouse.mp3"},{word:"dress",translation:"платье",imageSrc:"./src/assets/images/cardsClothes/dress.jpg",audioSrc:"./src/assets/sounds/cardsClothes/dress.mp3"},{word:"boot",translation:"ботинок",imageSrc:"./src/assets/images/cardsClothes/boot.jpg",audioSrc:"./src/assets/sounds/cardsClothes/boot.mp3"},{word:"shirt",translation:"рубашка",imageSrc:"./src/assets/images/cardsClothes/shirt.jpg",audioSrc:"./src/assets/sounds/cardsClothes/shirt.mp3"},{word:"coat",translation:"пальто",imageSrc:"./src/assets/images/cardsClothes/coat.jpg",audioSrc:"./src/assets/sounds/cardsClothes/coat.mp3"},{word:"shoe",translation:"туфли",imageSrc:"./src/assets/images/cardsClothes/shoe.jpg",audioSrc:"./src/assets/sounds/cardsClothes/shoe.mp3"}];var m=[{word:"sad",translation:"грустный",imageSrc:"./src/assets/images/cardsEmotions/sad.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/sad.mp3"},{word:"angry",translation:"сердитый",imageSrc:"./src/assets/images/cardsEmotions/angry.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/angry.mp3"},{word:"happy",translation:"счастливый",imageSrc:"./src/assets/images/cardsEmotions/happy.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/happy.mp3"},{word:"tired",translation:"уставший",imageSrc:"./src/assets/images/cardsEmotions/tired.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/tired.mp3"},{word:"surprised",translation:"удивлённый",imageSrc:"./src/assets/images/cardsEmotions/surprised.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/surprised.mp3"},{word:"scared",translation:"испуганный",imageSrc:"./src/assets/images/cardsEmotions/scared.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/scared.mp3"},{word:"smile",translation:"улыбка",imageSrc:"./src/assets/images/cardsEmotions/smile.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/smile.mp3"},{word:"laugh",translation:"смех",imageSrc:"./src/assets/images/cardsEmotions/laugh.jpg",audioSrc:"./src/assets/sounds/cardsEmotions/laugh.mp3"}];let g;localStorage.setItem("mode","train"),localStorage.setItem("page","main"),localStorage.setItem("isGameStarted",!1);let u,p,S=[],h=0,A=0;function y(){if(null===document.querySelector(".start-game-button")){const e=document.createElement("button");e.className="start-game-button",e.setAttribute("type","button"),e.innerHTML="start game",document.querySelector(".wrapper").append(e)}}function f(){null!=document.querySelector(".start-game-button")&&document.querySelector(".start-game-button").remove()}function w(){null!=document.querySelector(".icon-repeat-container")&&document.querySelector(".icon-repeat-container").remove()}function b(){console.log("just change train cards");const e=document.querySelector(".cards-wrapper").firstElementChild;let s=document.querySelectorAll(".card-description"),a=[];switch(localStorage.getItem("mode")){case"train":e.classList.replace("play-cards","train-cards"),a=document.querySelectorAll(".train-cards > *"),a.forEach(e=>e.classList.replace("play-card","train-card")),s.forEach(e=>e.classList.remove("hidden"));break;case"play":e.classList.replace("train-cards","play-cards"),a=document.querySelectorAll(".play-cards > *"),a.forEach(e=>e.classList.replace("train-card","play-card")),s.forEach(e=>e.classList.add("hidden"))}}function L(e,s,a){console.log("render cards, mode = "+e+" page = "+s+" categoryTitle = "+a);const t=document.querySelector(".cards-wrapper");if("true"===localStorage.getItem("isGameStarted")&&(console.log("tra"),w()),"main"===s){const s=new r("section-cards").generateCards(c);t.innerHTML="",t.append(s),document.querySelectorAll(".section-cards > *").forEach(s=>s.classList.add(e)),f()}else if("category"===s){t.innerHTML="";let e,s=[];switch("train"===localStorage.getItem("mode")?e="train-cards":"play"===localStorage.getItem("mode")&&(e="play-cards",console.log("render cards add start button"),y()),a){case"action (set a)":s=new r(e).generateTrainPlayCards(o);break;case"action (set b)":s=new r(e).generateTrainPlayCards(n);break;case"animal (set a)":s=new r(e).generateTrainPlayCards(i);break;case"animal (set b)":s=new r(e).generateTrainPlayCards(d);break;case"clothes":s=new r(e).generateTrainPlayCards(l);break;case"emotions":s=new r(e).generateTrainPlayCards(m)}t.append(s),b()}}function j(e){const s=document.createElement("audio"),a=document.createElement("source");a.setAttribute("src",e),a.setAttribute("type","audio/mpeg"),s.append(a),s.play()}function v(){document.querySelector(".modeSwitch").addEventListener("mouseup",e=>{switch(localStorage.getItem("mode")){case"train":localStorage.setItem("mode","play");break;case"play":localStorage.setItem("mode","train"),localStorage.setItem("isGameStarted",!1),w()}if("main"===localStorage.getItem("page"))!function(){console.log("just change section cards");let e=document.querySelectorAll(".section-cards > *");switch(e.forEach(e=>e.classList.add(localStorage.getItem("mode"))),localStorage.getItem("mode")){case"train":e.forEach(e=>e.classList.replace("play","train"));break;case"play":e.forEach(e=>e.classList.replace("train","play"))}}();else if("category"===localStorage.getItem("page"))switch(b(),localStorage.getItem("mode")){case"train":f();break;case"play":y()}})}function E(){if(h<8){u=function(e){return e[Math.floor(Math.random()*e.length)]}(S);for(let e=0;e<S.length;e++)S[e]===u&&S.splice(e,1);p=function(e,s){let a=e[s];return a.classList.add(s),a}(g,u),p.querySelector(".card-sound").play(),document.querySelector(".icon-repeat-container").addEventListener("click",e=>{"true"===localStorage.getItem("isGameStarted")&&(console.log("sound 2"),p.querySelector(".card-sound").play())})}else console.log("stop game!!! points "+h+" errors "+A),A=0,h=0,localStorage.setItem("isGameStarted",!1),localStorage.setItem("mode","train"),localStorage.setItem("page","main"),document.querySelector(".onoffswitch-inner").click(),L(localStorage.getItem("mode"),localStorage.getItem("page"),localStorage.getItem("category")),w()}function I(){document.querySelector(".wrapper").addEventListener("click",e=>{if(localStorage.setItem("isGuessed",!1),"start-game-button"===e.target.className){localStorage.setItem("isGameStarted",!0),function(){const e=document.querySelectorAll(".play-card");var s=[];for(let a=0;a<e.length;a++)s.push(e[a]);document.querySelector(".play-cards").innerHTML="";for(let a=0;a<e.length;a++){let e=Math.floor(Math.random()*s.length),a=s[e];s.splice(e,1),document.querySelector(".play-cards").append(a)}}(),f(),function(){const e=document.createElement("a");e.className="icon-repeat-container";const s=document.createElement("object");s.className="icon-repeat",s.setAttribute("type","image/svg+xml"),s.setAttribute("data","./src/assets/images/repeat.svg"),e.append(s),document.querySelector(".wrapper").append(e)}(),g=document.querySelectorAll(".play-card");for(let e=0;e<g.length;e++)S.push(e);E()}})}window.onload=function(){L(localStorage.getItem("mode"),localStorage.getItem("page")),document.querySelector(".hamburger").addEventListener("click",e=>{document.querySelector(".hamburger-container").classList.remove("hidden");let s=document.querySelector(".hamburger-container");s.classList.add(localStorage.getItem("mode"));let a=document.querySelectorAll(".nav-item > a");if(a.forEach(e=>e.classList.remove("active")),"main"==localStorage.getItem("page"))for(let e=0;e<a.length;e++)"main page"===a[e].innerHTML.toLowerCase()&&a[e].classList.add("active");else if("category"===localStorage.getItem("page"))for(let e=0;e<a.length;e++)a[e].innerHTML.toLowerCase()===localStorage.getItem("category")&&a[e].classList.add("active");switch(localStorage.getItem("mode")){case"train":s.classList.replace("play","train");break;case"play":s.classList.replace("train","play")}}),document.querySelector(".close-button").addEventListener("click",e=>{document.querySelector(".hamburger-container").classList.add("hidden")}),document.querySelector(".hamburger-menu").addEventListener("click",e=>{if(e.target.parentNode.classList.contains("nav-item")){document.querySelectorAll(".nav-item > a").forEach(e=>e.classList.remove("active")),e.target.classList.add("active");let s,a=document.querySelectorAll(".nav-item > a");for(let e=0;e<a.length;e++)a[e].classList.contains("active")&&(s=a[e].innerHTML.toLowerCase());document.querySelector(".hamburger-container").classList.add("hidden"),"main page"===s?(localStorage.setItem("page","main"),L(localStorage.getItem("mode"),localStorage.getItem("page"),localStorage.getItem("category"))):(localStorage.setItem("category",s),localStorage.setItem("page","category"),L(localStorage.getItem("mode"),localStorage.getItem("page"),localStorage.getItem("category")))}}),v(),document.querySelector(".cards-wrapper").addEventListener("click",e=>{if("main"===localStorage.getItem("page")){let s;if(e.target.classList.contains("card")?s=e.target:e.target.parentNode.classList.contains("card")&&(s=e.target.parentNode),null!=s){let e=function(e){let s;for(let a=0;a<e.children.length;a++)e.children[a].classList.contains("section-title")&&(s=e.children[a].innerHTML);return s}(s).toLowerCase();localStorage.setItem("page","category"),localStorage.setItem("category",e),L(localStorage.getItem("mode"),localStorage.getItem("page"),localStorage.getItem("category"))}}else if("category"===localStorage.getItem("page")&&"train"===localStorage.getItem("mode"))if(e.target.classList.contains("card-icon")){const s=e.target.parentNode.parentNode.parentNode;s.classList.add("is-flipped"),s.addEventListener("mouseleave",(function(){s.classList.remove("is-flipped")}))}else e.target.classList.contains("card-image")&&(e.target.nextSibling.play(),console.log("sound"))}),I(),document.querySelector(".cards-wrapper").addEventListener("mouseup",e=>{if("category"===localStorage.getItem("page")&&"play"===localStorage.getItem("mode")&&"true"===localStorage.getItem("isGameStarted")){let s;console.log(e.target),e.target.classList.contains("card-face")?s=e.target.parentNode:e.target.classList.contains("card-image")&&(s=e.target.parentNode.parentNode),s.classList.contains(u)?(console.log("yes you are right"),s.classList.add("not-active"),j("./src/assets/sounds/correct.mp3"),localStorage.setItem("isGuessed",!0),h+=1,E()):(console.log("no, try again"),A+=1,localStorage.setItem("isGuessed",!1),j("./src/assets/sounds/error.mp3"))}})}}]);