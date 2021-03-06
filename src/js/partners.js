$(document).ready(function () {
  // Подключаем стили
  $("<style/>", {
    text: "/* inject:../css/partners.css */ /* endinject */",
  }).appendTo("head");

  // Подгружаем стили для слайдера
  $("<link>", {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper@5.4.5/css/swiper.min.css",
  }).appendTo("head");

  // Вставляем в документ верстку. Русскую для русскоязычной версии сайта и английскую для англоязчной
  if(window.location.hostname === 'generaltestfashion.tilda.ws') {
    document.getElementById('t-footer').insertAdjacentHTML('beforeBegin', '/* inject-html:../html/partners-partial.html */ /* endinject-html */')
  } else {
    document.getElementById('t-footer').insertAdjacentHTML('beforeBegin', '/* inject-html:../html/partners-partial-eng.html */ /* endinject-html */')
  }

  // Подгружаем скрипт слайдера и после загрузки инициализируем все слайдеры на странице
  var slider = document.createElement("script");
  slider.setAttribute("src", "https://unpkg.com/swiper@5.4.5/js/swiper.min.js");
  document.body.appendChild(slider);

  slider.addEventListener("load", function() {
    $(".swiper-container").each(function (index, element) {
      new Swiper($(element), {
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazy: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true
      });
    });
  }, false);
});
