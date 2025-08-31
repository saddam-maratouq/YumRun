

// ==================== custom swipper for events ====================// 


const swiper = new Swiper('.swiper', {
  
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },

    // Responsive breakpoints
    // breakpoints: {
    //   320: {   // when window width is >= 320px
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //   },
    //   480: {   // when window width is >= 480px
    //     slidesPerView: 3,
    //     spaceBetween: 30,
    //   },
    //   640: {   // when window width is >= 640px
    //     slidesPerView: 2,
    //     spaceBetween: 40,
    //   },
    //   1024: {   // big screens
    //     slidesPerView: 1,
    //     spaceBetween: 50,
    //   }
    // },
});