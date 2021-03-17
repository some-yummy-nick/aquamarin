import baseEnum from './base-enum'

const typology = [
  ['1', 'Однокомнатная', '#402956', '#b3a9bb'],
  ['1S', 'Однокомнатная, smart-планировка', '#402956', '#b3a9bb'],
  ['2', 'Двухкомнатная', '#448c33', '#b4d1ad'],
  ['2S', 'Двухкомнатная, smart-планировка', '#448c33', '#b4d1ad'],
  ['2L', 'Двухкомнатная, лофт-квартира', '#d58419', '#edcca0'],
  ['3', 'Трехкомнатная', '#4175bf', '#b3c8e5'],
  ['3S', 'Трехкомнатная, smart-планировка', '#4175bf', '#b3c8e5'],
  ['3F', 'Трехкомнатная, двухуровневая', '#2a9b9b', '#aad7d7'],
  ['3L', 'Трехкомнатная, лофт-квартира', '#4175bf', '#b3c8e5'],
  ['4S', 'Четырехкомнатная, smart-планировка', '#e8492e', '#f6b6ab'],
  ['4F', 'Четрыехкомнатная, двухуровневая', '#e8492e', '#f6b6ab']
]

const createStruct = typology => {
  return typology.reduce((acc, cur) => {
    const [key, name, textColor, krugColor] = cur
    acc[key] = { key, name, textColor, krugColor }
    return acc
  }, {})
}

export default Object.assign(baseEnum, createStruct(typology), {
  toArray: function() {
    return typology
  }
})
