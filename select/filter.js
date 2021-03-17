import { createSelector } from 'reselect'
export default createSelector(
  response => response.body,
  response => ({
    rooms: response.data.rooms.map(room => +room),
    minFloor: +response.data.minFloor,
    maxFloor: +response.data.maxFloor,
    minSquare: Math.floor(+response.data.minSquare),
    maxSquare: Math.ceil(+response.data.maxSquare),
    minCost: Math.ceil(+response.data.minCost),
    maxCost: Math.ceil(+response.data.maxCost),
    costShown: response.meta.show_cost,
    availableFlats: response.data.available_flats
  })
)
