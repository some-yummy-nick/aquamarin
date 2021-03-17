const routes = require('next-routes')
module.exports = routes()
  // Главная
  .add('main', '/', 'main/index')

  // Генлпан
  .add('genplan', '/genplan', 'genplan/index')

  // Поиск квартир
  .add(
    'search',
    '/search/:page(params|plannings|matrix)/:rooms(1|2|3|4)?',
    'search/index'
  )

  // Все квартиры с такой планировкой
  .add('similarFlats', '/similar-flats/:planning(\\d+)', 'similar-flats/index')

  // Квартира деталька
  .add('showFlat', '/flat/:flat/:view(gallery)?', 'flat/index')

  // Деталька этажа
  .add(
    'showStage',
    '/stage/:house(\\d+)/:entrance(\\d+)/:stage(\\d+)',
    'stage/index'
  )

  // Галерея
  .add('gallery', '/gallery', 'gallery/list/index')
  .add('showGallery', '/gallery/:id(\\d+)', 'gallery/show/index')

  // Новости
  .add('news', '/news', 'news/list/index')
  .add('showNews', '/news/:id(\\d+)', 'news/show')

  // Контакты
  .add('contacts', '/contacts', 'contacts/index')

  // Сравнение квартир
  .add('favourites', '/favourites', 'favourites/index')

  // Сравнение квартир / пищать
  .add('printFavourites', '/favourites/print', 'favourites/print')

  // Инфраструктура
  .add('infrastructure', '/infrastructure', 'infrastructure/index')

  // Расположение
  .add('location', '/location', 'location/index')

  // Печать
  .add('print', '/print/:flat', 'print/index')

  // Политика
  .add('policy', '/policy', 'policy/index')
  .add('soglasie', '/policy/soglasie', 'policy/soglasie')

  // Застройщик
  .add('developer', '/developer', 'developer')

  // О проекте
  .add('about', '/about', 'about')

  // Сервисная компания
  .add('serviceCompany', '/service-company', 'service-company/index')

  // Движение солнца
  .add('suncalc', '/suncalc', 'suncalc/index')

  // Отделка на заказ
  .add('otdelka', '/otdelka/:flat?', 'otdelka/index')
