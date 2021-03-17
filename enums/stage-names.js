import baseEnum from './base-enum'
export default Object.assign(baseEnum, {
  mansard: 'Мансарда',
  basement: 'Подвал',
  ground: 'Цокольный',
  '0': 'Нулевой',
  '1': 'Первый',
  '2': 'Второй',
  '3': 'Третий',
  '4': 'Четвертый',
  '5': 'Пятый',
  getName(stage) {
    const num = stage.floor_no
    const type = stage.floor_type

    if ('floor' !== type) {
      return this[type]
    }

    return this[num]
  }
})
