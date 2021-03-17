import { createSelector } from 'reselect'
export default createSelector(
  response => response,
  response => ({
    markers: response.data.map(mark => {
      const marker = JSON.parse(mark.poly_genplan).geometry.coordinates
      return { ...mark, marker: [marker[1], marker[0]] }
    })
  })
)
