(()=>{"use strict";var e={543:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},240:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"},567:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},320:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},355:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},205:e=>{e.exports="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.m=e,n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.b=document.baseURI||self.location.href,n.d({},{t:()=>i});var r=[{name:"Архыз",link:new URL(n(543),n.b),alt:"Красивы горы и холмы Архыза."},{name:"Челябинская область",link:new URL(n(567),n.b),alt:"Не замерзшая река в Челябинской области."},{name:"Иваново",link:new URL(n(320),n.b),alt:"Вид на тихий квартал города Иваново."},{name:"Камчатка",link:new URL(n(355),n.b),alt:"Тундровые просторы Камчати на фоне заснеженных гор."},{name:"Холмогорский район",link:new URL(n(205),n.b),alt:"Окруженная лесом, железная дорога Холмогорского района, уходящая в даль."},{name:"Байкал",link:new URL(n(240),n.b),alt:"Прибрежные зимние скалы озера 'Байкал'."}];function o(e,t,n,r){var o=i.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),p=o.querySelector(".card__like-button"),a=o.querySelector(".card__image"),u=o.querySelector("img");return u.src=e.link,u.alt=e.alt,o.querySelector(".card__title").textContent=e.name,a.addEventListener("click",(function(){t(e)})),c.addEventListener("click",n),p.addEventListener("click",r),o}function c(e){e.target.closest(".card").remove()}function p(e){e.target.classList.toggle("card__like-button_is-active")}var a=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d)},u=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)};function d(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");u(t)}}var i=document.querySelector("#card-template").content,s=document.querySelector(".content").querySelector(".places__list"),l=document.querySelector(".popup_type_image"),_=l.querySelector(".popup__close"),y=l.querySelector(".popup__image"),m=l.querySelector(".popup__caption");function v(e){y.src=e.link,m.textContent=e.name,y.alt=e.name,a(l)}r.forEach((function(e){var t=o(e,v,c,p);s.append(t)}));var f=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_new-card"),q=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),L=f.querySelector(".popup__close"),x=k.querySelector(".popup__close");q.addEventListener("click",(function(){g.value=h.textContent,E.value=w.textContent,a(f)})),S.addEventListener("click",(function(){a(k)})),L.addEventListener("click",(function(){u(f)})),x.addEventListener("click",(function(){u(k)})),_.addEventListener("click",(function(){u(l)})),f.addEventListener("mousedown",(function(e){e.target===f&&u(f)})),k.addEventListener("mousedown",(function(e){e.target===k&&u(k)})),l.addEventListener("mousedown",(function(e){e.target===l&&u(l)}));var b=f.querySelector(".popup__form"),g=b.querySelector(".popup__input_type_name"),E=b.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),w=document.querySelector(".profile__description");b.addEventListener("submit",(function(e){e.preventDefault(),h.textContent=g.value,w.textContent=E.value,u(f)}));var j=k.querySelector(".popup__form"),R=j.querySelector(".popup__input_type_card-name"),U=j.querySelector(".popup__input_type_url");j.addEventListener("submit",(function(e){e.preventDefault();var t=o({name:R.value,link:U.value},v,c,p);s.prepend(t),u(k),j.reset()}))})();