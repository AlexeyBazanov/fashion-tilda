$(document).ready(function() {

  // Подключаем стили для страницы
  $("<style/>", {
    text: "/* inject:../css/photo.css */ /* endinject */",
  }).appendTo("head");

  // Подгружаем стили для слайдера
  $("<link>", {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper/css/swiper.min.css",
  }).appendTo("head");

  // Подгружаем стили для галереи
  // $("<link>", {
  //   rel: "stylesheet",
  //   href: "https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.3.2/css/lightgallery.css",
  // }).appendTo("head");

  // Находим все блоки с контентом
  let items = $(".t-rec");

  // Итерируем все блоки с контентом
  items.each(function (index, item) {

    // Создаем блок, в который будем вставлять контент
    let row = $("<div/>", {
      class: "photo-row",
    }).insertBefore('#t-footer');

    // Ищем заголовки с названием страницы, сезоном фотосессии и датой, если находим - создаем блок
    $(item).find('.tn-atom[field]').each(function(textElementIndex, textElement) {
      let currentTextElement = $(textElement);
      let headerText = currentTextElement.text().toLowerCase();
      let headerClass;

      if(headerText.length < 1) { return true; }

      if(headerText === 'фото') {
        headerClass = 'photo-title'
      } else if (headerText.match(/сезон/g)) {
        headerClass = 'photo-season'
      } else {
        headerClass = 'photo-date'
      }

      if(headerClass) {
        $("<div/>", {
          class: headerClass,
          text: currentTextElement.text()
        }).appendTo(row);
      }
    });

    // Ищем блоки с фотографиями и итерируем их если находим
    let photoBlocks = $(item).find('.t692__linkwrapper');

    if(photoBlocks.length) {

      // ---> Создаем основу слайдера для фотографий
      let slider = $("<div/>", {
        class: "swiper-container",
      }).appendTo(row);

      let sliderContainer = $("<div/>", {
        class: "swiper-wrapper",
      }).appendTo(slider);

      $("<div/>", {
        class: "swiper-button-prev",
      }).appendTo(slider);

      $("<div/>", {
        class: "swiper-button-next",
      }).appendTo(slider);
      // <--- Создали основу слайдера для фотографий

      photoBlocks.each(function (photoBlockIndex, photoBlockItem) {

        // Создаем новый слайд
        let slide = $("<div/>", {
          class: "swiper-slide"
        }).appendTo(sliderContainer);

        // Создаем блок с названием фотосессии и кладем в слайдер
        $("<div/>", {
          class: "photo-session-name",
          text: $(photoBlockItem).find('.t-heading').text()
        }).appendTo(slide);

        // Создаем блок с картинкой и кладем в слайдер под блоком с названием
        let photoSessionImage = $("<div/>", {
          "data-background": $(photoBlockItem).find('.t-bgimg').attr('data-original'),
          class: "swiper-lazy",
          "data-gallery-link": $(photoBlockItem).attr('href')
        }).appendTo(slide);

        // Добавляем прелоадер к картинке
        $("<div/>", {
          class: "swiper-lazy-preloader",
        }).appendTo(photoSessionImage);

        // Добавляем блок со ссылкой на страницу коллекции
        $("<div/>", {
          class: "photo-session-gallery-link",
          text: "Просмотреть",
          "data-gallery-link":  $(photoBlockItem).attr('href')
        }).appendTo(slide);

      });

    }

  });


  // Создаем тег со скриптом слайдера
  var slider = document.createElement("script");
  slider.setAttribute("src", "https://unpkg.com/swiper/js/swiper.min.js");
  document.body.appendChild(slider);

  // После загрузки кода слайдера, инициализируем все слайдеры на странице
  slider.addEventListener("load", function() {

    // Создаем функцию, определяющую виден ли элемент при скролле
    $.fn.isInViewport = function() {
      let elementTop = $(this).offset().top;
      let elementBottom = elementTop + $(this).outerHeight();
      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // Создаем функцию - инициализатор слайдера
    let sliderInitializer = function () {
      $(".swiper-container").each(function (swiperIndex, swiperElement) {
        let containerElement = $(swiperElement);
        // Если элемент в поле видимости и он не был инициализирован - инициализируем его
        if(containerElement.isInViewport() && !containerElement.hasClass('swiper-container-initialized')) {
          new Swiper(containerElement, {
            // Disable preloading of all images
            preloadImages: false,
            // Enable lazy loading
            lazy: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            observer: true,
            observeParents: true
          });
        }
      });
    };

    // Навешиваем функцию, проверяющую видимость элемента при скролле. Если слайдер виден - он инициализируется.
    $(window).on('resize scroll', function() {
      sliderInitializer();
    });

    // Вызываем инициализатор слайдеров, чтобы отобразить видимые слайдеры при загрузке страницы
    sliderInitializer();

  }, false);

  $(document).on('click', 'div[data-gallery-link]', function (e) {
    let newTab = window.open($(this).attr('data-gallery-link'), '_blank');
    newTab.focus();
  })

  // Создаем тег со скриптом галереи
  // let gallery = document.createElement("script");
  // gallery.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.3.2/js/lightgallery.js");
  // document.body.appendChild(gallery);

  // После загрузки галереи создаем ивенты для подгрузки галереи со страницы с фотосессией
  // gallery.addEventListener("load", function() {
  //
  //   $(document).on('click', 'div[data-gallery-link]', function (e) {
  //     e.preventDefault();
  //     let target = $(this);
  //
  //     if(target.parent().hasClass('ajax-sending')) {
  //       return true;
  //     }
  //
  //     $.ajax({
  //       url: target.attr('data-gallery-link'),
  //       // url: 'http://localhost:1234/html/photo-page.html',
  //       type: "get",
  //       dataType: "html",
  //       beforeSend: function (xhr) {
  //         target.parent().addClass('ajax-sending');
  //       },
  //       success: function(data) {
  //
  //         let dynamicElementsImages = []
  //
  //         $.each( $(data).find('.t-bgimg') , function( imgIndex, imgElement ) {
  //           dynamicElementsImages.push({ src: $(imgElement).attr('data-original') });
  //         });
  //
  //         target.lightGallery({
  //           dynamic: true,
  //           dynamicEl: dynamicElementsImages
  //         })
  //
  //       },
  //       complete: function () {
  //         target.parent().removeClass('ajax-sending');
  //       }
  //     });
  //
  //   });
  //
  // });

});
