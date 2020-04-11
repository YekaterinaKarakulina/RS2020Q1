!function(e){var t={};function a(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(r,s,function(t){return e[t]}.bind(null,s));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);class r{constructor({word:e,translation:t,imageSrc:a,audioSrc:r,sectionTitle:s,className:n}){this.word=e,this.translation=t,this.imageSrc=a,this.audioSrc=r,this.sectionTitle=s,this.className=n}generateCard(){const e=document.createElement("div");if(e.classList.add("card"),this.sectionTitle&&(e.classList.add("sectionCard"),e.classList.add(this.className),e.append(this.createImgBlock("sectionImage")),e.append(this.createSectionTitle())),this.word){e.classList.add("trainCard"),e.append(this.createImgBlock("trainImage"));const t=document.createElement("div");t.className="wordDescription",t.innerHTML=this.word;const a=document.createElement("div");a.className="rotateElement";const r=document.createElement("div");r.className="wordDescriptionContainer",r.append(t),r.append(a),e.append(r)}return e}createImgBlock(e){const t=document.createElement("div");t.className=e;const a=document.createElement("img");return a.setAttribute("src",this.imageSrc),t.append(a),t}createSectionTitle(){const e=document.createElement("div");return e.classList.add("sectionTitle"),e.classList.add(this.className),e.innerHTML=this.sectionTitle,e}}var s=[{word:"cry",translation:"плакать",imageSrc:"./src/assets/images/cardsActionA/cry.jpg",audioSrc:"audio/cry.mp3"},{word:"dance",translation:"танцевать",imageSrc:"./src/assets/images/cardsActionA/dance.jpg",audioSrc:"audio/dance.mp3"},{word:"dive",translation:"нырять",imageSrc:"./src/assets/images/cardsActionA/dive.jpg",audioSrc:"audio/dive.mp3"},{word:"draw",translation:"рисовать",imageSrc:"./src/assets/images/cardsActionA/draw.jpg",audioSrc:"audio/draw.mp3"},{word:"fish",translation:"ловить рыбу",imageSrc:"./src/assets/images/cardsActionA/fish.jpg",audioSrc:"audio/fish.mp3"},{word:"fly",translation:"летать",imageSrc:"./src/assets/images/cardsActionA/fly.jpg",audioSrc:"audio/fly.mp3"},{word:"hug",translation:"обнимать",imageSrc:"./src/assets/images/cardsActionA/hug.jpg",audioSrc:"audio/hug.mp3"},{word:"jump",translation:"прыгать",imageSrc:"./src/assets/images/cardsActionA/jump.jpg",audioSrc:"audio/jump.mp3"}];const n=document.querySelector(".cardsWrapper"),c=new class{constructor(e){this.className=e}generateSectionCards(e){let t=document.createElement("div");t.className=this.className;for(let a=0;a<e.length;a++)t.append(new r(e[a]).generateCard());return console.log(t),t}generateCategoryCards(e){let t=document.createElement("div");t.className=this.className;for(let a=0;a<e.length;a++)t.append(new r(e[a]).generateCard());return console.log(t),t}}("sectionCards").generateSectionCards(s);n.append(c)}]);