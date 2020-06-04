(function () {

  if(window.screen.width > 998) {
    return false;
  }

  // Вставляем общие стили
  $("<style/>", {
    text: "/* inject:../css/common.css */ /* endinject */",
  }).appendTo("head");

  // Пробегаемся по всем страницам, кроме новостей и брендов
  switch (window.location.pathname) {
    case '/news':
      $('<script/>',
        {
          src: 'https://fashiontilda.imfast.io/build/js/news-list.js',
          type: 'text/javascript'
        }
      ).appendTo('head');
      console.log('Адаптивные стили для страницы со списком новостей подгружены.');
      break;
    case '/partners':
      $('<script/>',
        {
          src: 'https://fashiontilda.imfast.io/build/js/partners.js',
          type: 'text/javascript'
        }
      ).appendTo('head');
      console.log('Адаптивные стили для страницы со списком парнеров подгружены.');
      break;
    case '/about':
      $('<script/>',
        {
          src: 'https://fashiontilda.imfast.io/build/js/about.js',
          type: 'text/javascript'
        }
      ).appendTo('head');
      console.log('Адаптивные стили для страницы «О нас» подгружены.');
      break;
    case '/designers':
      $('<script/>',
        {
          src: 'https://fashiontilda.imfast.io/build/js/brands-list.js',
          type: 'text/javascript'
        }
      ).appendTo('head');
      console.log('Адаптивные стили для страницы «Дизайнеры» подгружены.');
      break;
    default:
      break;
  }

  // Определяем страницу с брендами
  if($('.tn-atom.t-bgimg').filter(function() { return $(this).css('border-radius') === '3000px' } ).length === 1) {
    $('<script/>',
      {
        src: 'https://fashiontilda.imfast.io/build/js/brand-item.js',
        type: 'text/javascript'
      }
    ).appendTo('head');
    console.log('Адаптивные стили для страницы с брендом подгружены.');
  }

  // Определяем страницу с брендами
  if($('.tn-atom').filter(function() { return ['смотреть все фото', 'пресс-релиз', 'читайте также'].includes( $(this).text().toLowerCase() ) } ).length > 0) {
    $('<script/>',
      {
        src: 'https://fashiontilda.imfast.io/build/js/news-item.js',
        type: 'text/javascript'
      }
    ).appendTo('head');
    console.log('Адаптивные стили для страницы с новостью подгружены.');
  }

})();
