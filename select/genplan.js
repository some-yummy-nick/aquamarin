import { createSelector } from 'reselect'
export default createSelector(
  response => response,
  response => ({
    genplan: response.data.map(house => {
      let houseMarker = house.mark_genplan
      let housePolygon = house.poly_genplan

      // Так и только так / нужно координаты метки и обводки дома
      if (null === houseMarker || null === housePolygon) {
        return {
          ...house,
          houseMarker: null,
          housePolygon: null,
          sections: []
        }
      }

      // Метка дома
      houseMarker = JSON.parse(houseMarker).geometry.coordinates
      housePolygon = JSON.parse(housePolygon).geometry.coordinates[0]

      // Вернем результат
      // prettier-ignore
      return {
        ...house,
        houseMarker: [houseMarker[1], houseMarker[0]],
        housePolygon: housePolygon.map(coordinates => ([coordinates[1], coordinates[0]])),
        sections: house.sections.map(section => {
          const sectionMarker = JSON.parse(section.mark_genplan).geometry.coordinates
          const sectionPolygon = JSON.parse(section.poly_genplan).geometry.coordinates[0]

          return {
            ...section,
            sectionMarker: [sectionMarker[1], [sectionMarker[0]]],
            sectionPolygon: sectionPolygon.map(coordinates => {
              return [coordinates[1], coordinates[0]]
            })
          }
        })
      }
    })
  })
)
