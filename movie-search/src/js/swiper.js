var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 320px
        415: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        // when window width is >= 480px
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        // when window width is >= 640px
        1020: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      },
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  export default swiper;