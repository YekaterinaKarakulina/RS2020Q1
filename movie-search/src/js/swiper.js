import Swiper from '../swiperAPI/swiperAPI';

const swiper = new Swiper('.swiper-container', {
  breakpoints: {
    // when window width is >= 415px
    415: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    // when window width is >= 1040px
    1040: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  },
  slidesPerGroup: 1,
  loop: false,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

export default swiper;
