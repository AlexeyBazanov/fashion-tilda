$(document).ready(function () {

  // Подключаем общие стили
  $("<style/>", {
    text: "/* inject:../css/video.css */ /* endinject */",
  }).appendTo("head");

  // Подгружаем стили для ленивой подгрузки видео
  $("<link>", {
    rel: "stylesheet",
    href: "https://fashiontilda.imfast.io/build/css/yt-lazyload.css",
  }).appendTo("head");

  // Подгружаем стили для слайдера
  $("<link>", {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper@5.4.5/css/swiper.min.css",
  }).appendTo("head");


  // Подгружаем скрипт ленивой загрузки видео
  $('<script/>',
    {
      src: 'https://fashiontilda.imfast.io/build/js/yt-lazyload.js',
      type: 'text/javascript'
    }
  ).appendTo('head');

  // Подгружаем скрипт слайдера, при его инициализации создаем слайдеры на странице
  var slider = document.createElement("script");
  slider.setAttribute("src", "https://unpkg.com/swiper@5.4.5/js/swiper.min.js");
  document.body.appendChild(slider);

  slider.addEventListener("load", function() {

    // Создаем слайдеры
    $(".swiper-container").each(function (index, element) {
      new Swiper($(element), {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          // when window width is <= 480px
          980: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // when window width is <= 640px
          1280: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        },
        on: {
          init: function () {
            // Задаем всем загаловка высоту, основываясь на максимальной высоте всех заголовков
            // ( иначе из-за разного размера строки блоки будут `плавать`
            var titleMaxHeight = 0;
            var slideTitles = $(element).find('.slide-title');
            slideTitles.each(function() {
              if ($(this).height() > titleMaxHeight) { titleMaxHeight = $(this).height(); }
            });
            slideTitles.height(titleMaxHeight);
            slideTitles.width($(element).find('.swiper-slide').width());
          },
          resize: function () {
            $(element).find('.slide-title').width($(element).find('.swiper-slide').width());
          },
        },
      });
    });
  }, false);

});
