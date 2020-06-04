$(document).ready(function () {
  // Подключаем стили
  $("<style/>", {
    text: "/* inject:../css/brands-list.css */ /* endinject */",
  }).appendTo("head");

  if(window.screen.width < 385) {
    var list_items = $('.tn-atom').filter(function() { return $(this).css('font-size') === '20px' } )
    list_items.css('font-size', '16px')
  }
});
