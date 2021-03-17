export default [
  {
    title: 'о проекте',
    child: [
      {
        title: 'главная',
        route: 'main'
      },
      {
        title: 'новости',
        route: 'news'
      },
      {
        title: 'галерея',
        route: 'gallery'
      }
    ]
  },
  {
    title: 'выбрать',
    child: [
      {
        title: 'апартаменты',
        route: 'house',
        params: { typeId: 'apartments' }
      },
      {
        title: 'коммерческие',
        route: 'house',
        params: { typeId: 'commercial' }
      }
    ]
  },
  {
    title: 'расположение',
    route: 'location'
  },
  {
    title: 'контакты',
    route: 'contacts'
  }
]
