$(document).ready(function () {

  // Находим все блоки с контентом
  var items = $(".t-rec");

  // Итерируем все блоки с контентом
  items.each(function (index, item) {

    if ($(item).parents('#t-header').length) {
      return true;
    }

    // Создаем новый блок, в который будем добавлять вытащенный из скрытых элементов контент
    var row = $("<div/>", {
      class: "news-row",
    }).insertBefore('#allrecords > .t-rec_pt_120');

    // Переделываем название новости
    if ($(item).prev().attr('id') === 't-header') {

      var title_date;
      var title_texts = [];

      $(item).find('.tn-atom').each(function (idx, elem) {

        var block = $(elem);

        if (["50px", "30px", "25px"].includes(block.css("font-size"))) {
          $('<h1/>', {
            class: 'news-name',
            html: block.html()
          }).appendTo(row);
        }

        if (block.css("font-size") === "15px") {

          if(block.text().length > 30) {
            title_texts.push(block.text());
          } else {
            title_date = block.text();
          }

        }

      });

      if(title_date) {
        $('<div/>', {
          class: 'news-date',
          text: title_date
        }).appendTo(row);
      }

      if(title_texts.length) {
        for (var i = 0; i < title_texts.length; i++) {
          $('<div/>', {
            class: 'news-text',
            text: title_texts[i],
            style: 'margin-top: 20px'
          }).appendTo(row);
        }
      }

      return true;
    }

    // Проходимся по всем вложенным элементам
    $(item)
      .find("*")
      .each(function (index, element) {
        var block = $(element);

        // Ищем старые заголовки и создаем новые
        if (block.hasClass("tn-atom") && block.css("font-size") === "35px") {
          $("<h2/>", {
            class: "news-title",
            text: block.text(),
          }).appendTo(row);
        }

        // Ищем старый текст новостей и создаем новый
        if (
          block.hasClass("tn-atom") && ["14px", "16px", "20px"].includes(block.css("font-size")) &&
          !["Смотреть все фото", "Смотреть все видео"].includes(block.text())
        ) {
          $("<div/>", {
            class: "news-text",
            html: block.html().replace('img', 'div')
          }).appendTo(row);
        }

        // Вытаскиваем цитаты
        if(block.hasClass('t253')) {
          var quoteWrapper = $("<div/>", {
            class: "news-quote",
          }).appendTo(row);

          $("<div/>", {
            class: "news-quote_text",
            text: block.find('.t253__text').text()
          }).appendTo(quoteWrapper);

          $("<div/>", {
            class: "news-quote_author",
            text: block.find('.t253__author').text()
          }).appendTo(quoteWrapper);
        }

        // Ищем картинку превью и галерею, заменяем на слайдер
        if (block.hasClass("tn-atom") && block.text() === 'Смотреть все фото') {
          var images = [];
          // images.push(block.attr("data-original"));
          var popup_images = $(
            '.t-popup[data-tooltip-hook="' + block.attr("href") + '"]'
          ).find(".t-bgimg");

          popup_images.each(function (index, element) {
            images.push($(element).attr("data-original"));
          });

          var images_length = images.length;

          if (images_length > 0) {
            // Создаем контйнер слайдера
            var slider = $("<div/>", {
              class: "swiper-container",
            }).appendTo(row);

            var slider_container = $("<div/>", {
              class: "swiper-wrapper",
            }).appendTo(slider);

            $("<div/>", {
              class: "swiper-button-prev",
            }).appendTo(slider);

            $("<div/>", {
              class: "swiper-button-next",
            }).appendTo(slider);

            // Добавляем слайды с картинками
            for (var i = 0; i < images_length; i++) {
              var slide = $("<div/>", {
                class: "swiper-slide",
              }).appendTo(slider_container);

              var slide_image = $("<div/>", {
                "data-background": images[i],
                class: "swiper-lazy",
              }).appendTo(slide);

              $("<div/>", {
                class: "swiper-lazy-preloader",
              }).appendTo(slide_image);
            }
          }
        }

        if (block.hasClass("tn-atom") && block.text() === 'Смотреть все видео') {
          var videos = [];

          var popup_video = $(
            '.t-popup[data-tooltip-hook="' + block.attr("href") + '"]'
          ).find(".t746__play");

          popup_video.each(function (index, element) {
            videos.push($(element).attr("data-slider-video-url"));
          });

          var videos_length = videos.length;

          if (videos_length > 0) {
            // Создаем контйнер слайдера
            var slider = $("<div/>", {
              class: "swiper-container",
            }).appendTo(row);

            var slider_container = $("<div/>", {
              class: "swiper-wrapper",
            }).appendTo(slider);

            $("<div/>", {
              class: "swiper-button-prev",
            }).appendTo(slider);

            $("<div/>", {
              class: "swiper-button-next",
            }).appendTo(slider);

            // Добавляем слайды с видео
            for (var i = 0; i < videos_length; i++) {
              var slide = $("<div/>", {
                class: "swiper-slide",
              }).appendTo(slider_container);

              $("<iframe/>", {
                src: "https://www.youtube.com/embed/" + videos[i],
                height: '400px',
                width: '100%'
                // class: "swiper-lazy",
              }).appendTo(slide);
            }
          }
        }
      });

    // Удаляем блок, если нет элементов
    if (row.children().length === 0) {
      row.hide();
    }

  });

  // Проставляем стиль фона для всех элементов-картинок. Скрваем картинки которые уже есть в слайдерах.
  $('.news-text .tn-atom__img').each(function (index, element) {
    var img_block = $(element);
    img_block.css('background-image', 'url('+ img_block.attr('data-original') +')');

    if(img_block.parent().next().hasClass('swiper-container')) {
      img_block.hide();
    }
  });

  // Добавляем дополнительные стили для новых блоков
  $("<style/>", {
    text: "/* inject:../css/news-item.css */ /* endinject */",
  }).appendTo("head");

  // Подгружаем стили для слайдера
  $("<link>", {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper/css/swiper.min.css",
  }).appendTo("head");

  // Подгружаем скрипт слайдера и после загрузки инициализируем все слайдеры на странице
  var slider = document.createElement("script");
  slider.setAttribute("src", "https://unpkg.com/swiper/js/swiper.min.js");
  document.body.appendChild(slider);

  slider.addEventListener(
    "load",
    function () {
      $(".swiper-container").each(function (index, element) {
        new Swiper($(element), {
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
      });
    },
    false
  );
});
