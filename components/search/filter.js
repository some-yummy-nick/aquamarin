import React from 'react'
import xor from 'lodash/xor'
import cloneDeep from 'lodash/cloneDeep'
import Button from '@/components/button'
import RangeSlider from '@/components/range-slider'
import GenplanScheme from '@/components/genplan/scheme'
import mapValues from 'lodash/mapValues'
import Spacer from '@/components/typo/spacer'
import LeftArrowIcon from '@/components/icons/left-arrow-icon'
import isEqual from 'lodash/isEqual'
import flatten from 'lodash/flatten'
import { UserAgent } from '@quentin-sommer/react-useragent'
import { Router } from '@/routes'

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      houses: {}
    }
  }

  setSquare = square => {
    if (square.max > this.state.squareMax) {
      square.max = this.state.squareMax
    }

    if (square.min < this.state.squareMin) {
      square.min = this.state.squareMin
    }

    this.setState({ square }, this.requestOnChange)
  }

  setFloors = floors => {
    if (floors.max > this.state.floorsMax) {
      floors.max = this.state.floorsMax
    }

    if (floors.min < this.state.floorsMin) {
      floors.min = this.state.floorsMin
    }

    this.setState({ floors }, this.requestOnChange)
  }

  setCost = cost => {
    if (cost.max > this.state.costMax) {
      cost.max = this.state.costMax
    }

    if (cost.min < this.state.costMin) {
      cost.min = this.state.costMin
    }

    this.setState({ cost }, this.requestOnChange)
  }

  toggleRoom = room => {
    this.setState(
      { rooms: xor(this.state.rooms, [+room]) },
      this.requestOnChange
    )
  }

  toggleSection = (houseNum, sectionNum) => {
    const houses = this.state.houses

    if (void 0 === houses[houseNum]) {
      houses[houseNum] = []
    }

    // Если что, вопросы к Тимуру
    houses[houseNum] = Array.isArray(sectionNum)
      ? isEqual(houses[houseNum], sectionNum)
        ? []
        : sectionNum
      : xor(houses[houseNum], [sectionNum])

    this.setState({ houses }, this.requestOnChange)
  }

  requestOnChange = () => {
    // Магия фильтра
    // Здесь все вопросы к Усатому, так было велено сделать
    const filter = cloneDeep(this.state)
    const {
      floorsMin,
      floorsMax,
      squareMin,
      squareMax,
      costMin,
      costMax
    } = this.state

    // Система, основанная на ифах
    if (filter.floors.min <= floorsMin) {
      filter.floors.min = 0
    }

    if (filter.floors.max >= floorsMax) {
      filter.floors.max = 9999
    }

    if (filter.square.min <= squareMin) {
      filter.square.min = 0
    }

    if (filter.square.max >= squareMax) {
      filter.square.max = 9999
    }

    if (filter.cost.min <= costMin) {
      filter.cost.min = 0
    }

    if (filter.cost.max >= costMax) {
      filter.cost.max = 9999999999999
    }

    filter.houses = mapValues(filter.houses, selected => {
      return selected.length ? selected : null
    })

    if (!this.props.initialFilter.costShown) {
      delete filter.cost
    }

    this.props.onChange(filter)
  }

  isButtonSelected = key => {
    return this.state.rooms.includes(+key)
  }

  flushFilter = () => {
    const filter = this.getInitialFilter()
    this.setState(filter, this.requestOnChange)
  }

  getInitialFilter() {
    // Инициализация фильтра с сервера
    const { initialFilter, rooms } = this.props
    const filter = {
      rooms: [],
      houses: {},
      roomsList: initialFilter.rooms,
      housesList: initialFilter.houses,
      floorsMin: initialFilter.minFloor,
      floorsMax: initialFilter.maxFloor,
      floors: {
        min: initialFilter.minFloor,
        max: initialFilter.maxFloor
      },
      squareMin: initialFilter.minSquare,
      squareMax: initialFilter.maxSquare,
      square: {
        min: initialFilter.minSquare,
        max: initialFilter.maxSquare
      },
      costMin: initialFilter.minCost,
      costMax: initialFilter.maxCost,
      cost: {
        min: initialFilter.minCost,
        max: initialFilter.maxCost
      },
      availableFlats: initialFilter.availableFlats
    }

    if (filter.roomsList.indexOf(+rooms) !== -1) {
      filter.rooms.push(+rooms)
    }
    return filter
  }

  UNSAFE_componentWillMount() {
    this.flushFilter()
  }

  render() {
    const selectedSelections = flatten(Object.values(this.state.houses))
    // console.log(selectedSelections)

    return (
      <UserAgent>
        {agent => (
          <>
            <div className="header">
              <Button
                link
                large
                secondary
                leftIcon={<LeftArrowIcon />}
                onClick={() => Router.pushRoute('genplan')}
              >
                Генплан
              </Button>
              {/* prettier-ignore */}
              <div className="drop-filter" onClick={this.flushFilter}>
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                  <rect y="7.11694" width="8.99928" height="0.818116" transform="rotate(-45 0 7.11694)" fill="currentColor"/>
                  <rect x="0.578613" y="0.753418" width="8.99928" height="0.818116" transform="rotate(45 0.578613 0.753418)" fill="currentColor"/>
                </svg>
                Сбросить фильтр
              </div>
            </div>
            {agent.mobile && (
              <Spacer bSpace={15}>
                <div className="label">Выберите подъезд</div>
              </Spacer>
            )}
            <Spacer bSpace={agent.mobile ? 40 : 0}>
              <GenplanScheme
                showTooltips={false}
                autoScale={!agent.mobile}
                selected={this.state.houses}
                onClickSection={this.toggleSection}
                showSchemeModeControl={true}
                showControls={true}
              />
              {selectedSelections.length > 0 && (
                <div className="selected">
                  Подъезд <span>№ {selectedSelections.join(', ')}</span>
                </div>
              )}
            </Spacer>
            <div className="row">
              <div className="label">Кол-во комнат</div>
              <div className="label">
                <div className="rooms-buttons-wrap flex">
                  {this.state.roomsList.map(room => (
                    <Button
                      square
                      key={room}
                      spacing={8}
                      selected={this.isButtonSelected(room)}
                      onClick={() => this.toggleRoom(room)}
                    >
                      {room}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="label">Этаж</div>
              <Spacer rSpace={agent.mobile ? 10 : 0}>
                <div>
                  <RangeSlider
                    wrap
                    showGradusnik
                    value={this.state.floors}
                    minValue={this.state.floorsMin}
                    maxValue={this.state.floorsMax}
                    onChange={this.setFloors}
                  />
                </div>
              </Spacer>
            </div>
            <div className="row">
              <div className="label">
                Площадь м<sup>2</sup>
              </div>
              <Spacer rSpace={agent.mobile ? 10 : 0}>
                <div>
                  <RangeSlider
                    wrap
                    showGradusnik
                    value={this.state.square}
                    minValue={this.state.squareMin}
                    maxValue={this.state.squareMax}
                    onChange={this.setSquare}
                  />
                </div>
              </Spacer>
            </div>
            {this.props.initialFilter.costShown && (
              <div className="row">
                <div className="label">Стоимость, млн.руб</div>
                <Spacer rSpace={agent.mobile ? 10 : 0}>
                  <div>
                    <RangeSlider
                      wrap
                      showGradusnik
                      value={this.state.cost}
                      minValue={this.state.costMin}
                      maxValue={this.state.costMax}
                      onChange={this.setCost}
                      formatLabel={val => {
                        return (val / 1000000).toFixed(1)
                      }}
                    />
                  </div>
                </Spacer>
              </div>
            )}
            <style jsx>{`
              .row {
                margin: 40px 0;
              }
              .label {
                color: #b4b4b4;
                font-size: 10px;
                margin-bottom: 8px;
                text-transform: uppercase;
              }
              .rooms-buttons-wrap {
                margin-left: -8px;
              }
              .drop-filter {
                font-size: 10px;
                cursor: pointer;
                margin-top: 15px;
                svg {
                  margin-right: 3px;
                }
                &:hover {
                  color: var(--color1-dark);
                }
              }
              .header {
                margin-bottom: 45px;
              }
              .selected {
                color: #646464;
                font-weight: 500;
                font-size: 14px;
                margin-top: 10px;
                text-transform: uppercase;
                span {
                  color: var(--color1);
                }
              }
            `}</style>
          </>
        )}
      </UserAgent>
    )
  }
}

Filter.defaultProps = {
  initialFilter: {}
}

export default Filter
