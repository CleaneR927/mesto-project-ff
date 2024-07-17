const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinsk_oblastImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorsky_rayonImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const initialCards = [
  { name: 'Архыз', link: arkhyzImage, alt: "Красивы горы и холмы Архыза." },
  { name: 'Челябинская область', link: chelyabinsk_oblastImage, alt: "Не замерзшая река в Челябинской области." },
  { name: 'Иваново', link: ivanovoImage, alt: "Вид на тихий квартал города Иваново." },
  { name: 'Камчатка', link: kamchatkaImage, alt: "Тундровые просторы Камчати на фоне заснеженных гор." },
  { name: 'Холмогорский район', link: kholmogorsky_rayonImage, alt: "Окруженная лесом, железная дорога Холмогорского района, уходящая в даль." },
  { name: 'Байкал', link: baikalImage, alt: "Прибрежные зимние скалы озера 'Байкал'." },
]; 

export{ initialCards };
