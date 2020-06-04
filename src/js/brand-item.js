$(document).ready(function () {

  // Подключаем стили
  $("<style/>", {
    text: "/* inject:../css/brand-item.css */ /* endinject */",
  }).appendTo("head");

  // Подгружаем стили для слайдера
  $("<link>", {
    rel: "stylesheet",
    href: "https://unpkg.com/swiper/css/swiper.min.css",
  }).appendTo("head");

  // Создаем тег с названием бренда
  $('<div/>', {
    class: 'brand-title',
    text: $('div[data-elem-id=1579518131987] .tn-atom').text()
  }).insertBefore('#t-footer');

  // Создаем тег со слоганом бренда
  var slogan = $('div[data-elem-id=1579518244643] .tn-atom')

  if(slogan.length) {
    $('<div/>', {
      class: 'brand-sub-title',
      text: slogan.text()
    }).insertBefore('#t-footer');
  }

  // Создаем тег с иконкой бренда
  $('<div/>', {
    class: 'brand-icon',
    style: 'background-image: url('+ $('div[data-elem-id=1579518605209] .t-bgimg').attr('data-original') +');'
  }).insertBefore('#t-footer');

  // Создаем тег с описанием бренда
  $('<div/>', {
    class: 'brand-description',
    html: $('div[data-elem-id=1579518396909] .tn-atom').html()
  }).insertBefore('#t-footer');

  // Создаем тег для ссылок
  var linksWrapper = $('<div/>', {
    class: 'brand-links-wrapper'
  }).insertBefore('#t-footer');

  var icons = $('a.t-bgimg');

  // var instagramLink = $('div[data-elem-id=1579518482965]');
  var instagramLink = icons.filter(function() {
      return $(this).attr("href").match(/https:\/\/www\.instagram\.com\//gm)
  }).first();

  if(instagramLink.length) {
    $('<a/>', {
      class: 'brand-instagram-link',
      href: instagramLink.attr('href'),
      style: instagramLink.attr('style')
    }).appendTo(linksWrapper);
  }

  var facebookLink = icons.filter(function() {
    return $(this).attr("href").match(/https:\/\/www\.facebook\.com\//gm)
  }).first();

  if(facebookLink.length) {
    $('<a/>', {
      class: 'brand-facebook-link',
      href: facebookLink.attr('href'),
      style: facebookLink.attr('style')
    }).appendTo(linksWrapper);
  }

  var youtubeLink = icons.filter(function() {
    return $(this).attr("href").match(/https:\/\/www\.youtube\.com\//gm)
  }).first();

  if(youtubeLink.length) {
    $('<a/>', {
      class: 'brand-youtube-link',
      href: youtubeLink.attr('href'),
      style: youtubeLink.attr('style')
    }).appendTo(linksWrapper);
  }

  var vkLink = icons.filter(function() {
    return $(this).attr("href").match(/https:\/\/vk\.com\//gm)
  }).first();

  if(vkLink.length) {
    $('<a/>', {
      class: 'brand-vk-link',
      href: vkLink.attr('href'),
      style: vkLink.attr('style')
    }).appendTo(linksWrapper);
  }

  var collections_titles = $('#t-header + .t-rec .tn-atom').filter(function() {
    return $(this).css('font-weight') === '700' && $(this).css('font-size') === '15px';
  });

  if(collections_titles.length > 0) {
    $('<div/>', {
      class: 'brand-collections-title',
      text: 'Коллекции'
    }).insertBefore('#t-footer');
  }

  $('.t-popup').each(function (index, element) {
    var images = [];

    var popup_images = $(element).find(".t-bgimg");

    popup_images.each(function (index, element) {
      images.push($(element).attr("data-original"));
    });

    var images_length = images.length;

    if (images_length > 0) {

      // Создаем тег с название коллекции
      $('<div/>', {
        class: 'brand-collection-name',
        text: collections_titles.eq(index).text()
      }).insertBefore('#t-footer');

      // Создаем контейнер слайдера
      var slider = $("<div/>", {
        class: "swiper-container",
      }).insertBefore('#t-footer');

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
  });

  // Ищем скрины из инстаграма
  var instagram_screenshots = $('img.tn-atom__img');

  // Под запрос попадают 3 лого на сайте, если картинок больше трех - значит остальные это скрины
  if(instagram_screenshots.length > 3) {

    $('<div/>', {
      class: 'instagram-screenshots-title',
      text: 'Instagram'
    }).insertBefore('#t-footer');

    // Создаем контейнер слайдера
    var slider = $("<div/>", {
      class: "swiper-container swiper-container-instagram",
    }).insertBefore('#t-footer');

    var slider_container = $("<div/>", {
      class: "swiper-wrapper",
    }).appendTo(slider);

    $("<div/>", {
      class: "swiper-button-prev",
    }).appendTo(slider);

    $("<div/>", {
      class: "swiper-button-next",
    }).appendTo(slider);

    var images_to_skip = [
      'https://static.tildacdn.com/tild6461-6437-4664-b239-663131626362/logo.svg',
      'https://static.tildacdn.com/tild6665-3332-4731-b239-636464643534/palata_logo.svg',
      'https://static.tildacdn.com/tild3031-3339-4666-b865-316566396633/Rectangle.svg'
    ]

    instagram_screenshots.each(function (index, element) {

      var screenshot_url = $(element).attr('data-original');

      // Пропускаем ненужные нам логотипы
      if(images_to_skip.includes(screenshot_url)) { return true; }

      var slide = $("<div/>", {
        class: "swiper-slide",
      }).appendTo(slider_container);

      var slide_image = $("<div/>", {
        "data-background": screenshot_url,
        class: "swiper-lazy swiper-lazy-instagram",
      }).appendTo(slide);

      $("<div/>", {
        class: "swiper-lazy-preloader",
      }).appendTo(slide_image);
    });

    $('<a/>', {
      class: 'instagram-screenshots-link',
      text: 'Смотреть еще',
      href: $('.t-rec a.tn-atom').filter(function() {
        return $(this).text().toUpperCase() === 'СМОТРЕТЬ ЕЩЕ';
      }).first().attr('href')
    }).insertBefore('#t-footer');

  }

  var slider = document.createElement("script");
  slider.setAttribute("src", "https://unpkg.com/swiper/js/swiper.min.js");
  document.body.appendChild(slider);

  slider.addEventListener("load", function() {
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
  }, false);

});
