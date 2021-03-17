import React from 'react'
import withFetch from '@/components/hocs/with-fetch'
import Scroller from '@/components/scroller'
import defer from 'lodash/debounce'
import range from 'lodash/range'
import Floor from '@/components/search/matrix/floor'
import Flat from '@/components/search/matrix/flat'
import EmptyFloor from '@/components/search/matrix/empty-floor'
import Total from '@/components/search/total'
import Legend from '@/components/search/legend'
import Content from '@/components/content'
import ReactTooltip from 'react-tooltip'
import Tooltip from '@/components/tooltip'
import FlatTooltip from '@/components/flat/tooltip'
import Section from '@/components/search/matrix/section'
import { Router } from '@/routes'

const MAX = 35
const MIN = 20
const OFFSET = 200

class Matrix extends React.Component {
  list = []
  floors = {}
  sections = {}

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: false,
      matrix: {},
      total: 0,
      curFloor: null,
      flatHeight: 0
    }

    this.wrapRef = React.createRef()
  }

  fetchResults = async () => {
    this.setState({ loading: true })

    try {
      const response = await this.props.request.get('/search/matrix')
      this.list = response.body.data

      for (let flat of this.list) {
        this.floors[flat.house] = 0

        if (this.sections[flat.house] === void 0) {
          this.sections[flat.house] = {}
        }

        this.sections[flat.house].min = 0
        this.sections[flat.house].max = 0

        if (this.floors[flat.house] < flat.floor) {
          this.floors[flat.house] = flat.floor
        }

        if (this.sections[flat.house].min < flat.section) {
          this.sections[flat.house].min = flat.section
        }

        if (this.sections[flat.house].max > flat.section) {
          this.sections[flat.house].max = flat.section
        }
      }

      const maxStage = Math.max.apply(Math, Object.values(this.floors))
      this.calcFlatHeight(maxStage)

      this.applyFilter()
    } catch (error) {
      this.setState({
        loading: false,
        error
      })
    }

    this.setState({ loading: false })
  }

  createMatrixStruct(results) {
    // Группируем дом/подъезд/этаж
    const struct = results.reduce((acc, cur) => {
      const { house, section, floor } = cur

      acc[house] || (acc[house] = {})
      acc[house][section] || (acc[house][section] = {})
      acc[house][section][floor] || (acc[house][section][floor] = [])

      return acc
    }, {})

    // Заполняем данными
    for (let flat of results) {
      struct[flat.house][flat.section][flat.floor].push(flat)
    }

    return struct
  }

  showFlat = ({ apartment_ui }) => {
    Router.pushRoute('showFlat', { flat: apartment_ui })
  }

  findFlatById = id => {
    return this.list.find(flat => flat.apartment_ui === id) || {}
  }

  setCurrentFloor = floor => {
    this.setState({ setCurrentFloor: floor })
  }

  applyFilter = defer(() => {
    const { floors, square, rooms, houses, cost } = this.props.filter
    const results = this.list
      .filter(result => {
        // Фильтруем подъезды по домам
        if (!houses[result.house]) return true
        return houses[result.house].includes(result.section)
      })
      .filter(result => {
        // Фильтруем диапазон этажей
        const { min, max } = floors
        return result.floor >= min && result.floor <= max
      })
      .filter(result => {
        // Фильтруем диапазон площадей
        const { min, max } = square
        const { apart_square } = result
        result.hidden = !(apart_square >= min && apart_square <= max)
        return true
      })
      .filter(result => {
        // Не определена макс цена - значит фильтр по цене недоступен
        if (!cost) return true
        // Квартира уже не подходит под условия фильтра
        if (result.hidden) return true
        // Фильтруем диапазон цен
        const { min, max } = cost
        const { apartment_cost } = result
        if (apartment_cost) {
          result.hidden = !(apartment_cost >= min && apartment_cost <= max)
        }

        return true
      })
      .filter(result => {
        // Квартира уже не подходит под условия фильтра
        if (result.hidden) return true
        // Фильтруем комнаты
        if (0 === rooms.length) return true
        result.hidden = !rooms.includes(result.rooms_count)
        return true
      })

    const newTotal = results.reduce((acc, item) => {
      if (item.sold_status != 1 && !item.hidden) acc++
      return acc
    }, 0)

    const struct = this.createMatrixStruct(results)
    this.setState({ total: newTotal, matrix: struct })
  })

  componentDidMount() {
    this.fetchResults()
  }

  calcFlatHeight(maxStage) {
    const h = (this.wrapRef.current.clientHeight - OFFSET) / maxStage
    this.setState({ flatHeight: h > MAX ? MAX : h < MIN ? MIN : h })
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.applyFilter()
  }

  render() {
    const { matrix, total, flatHeight } = this.state
    return (
      <div className="flex flex-auto flex-column">
        <div className="flex-none">
          <div className="count-wrap">
            <Content auto dtp dbp>
              <div className="flex items-center count-wrap-bord">
                <div className="flex-auto">
                  <Total
                    total={total}
                    suf="кв."
                    all={this.props.filter.availableFlats}
                  />
                </div>
                <div className="flex-none">
                  <Legend />
                </div>
              </div>
            </Content>
          </div>
        </div>
        <div className="flex-auto relative" ref={this.wrapRef}>
          <div className="scroller-wrap">
            <Scroller inverse={true}>
              <div className="wrap-all-houses flex">
                {Object.keys(matrix).map(house => {
                  const sections = range(
                    this.sections[house].max + 1,
                    this.sections[house].min + 1
                  )
                  const floors = range(this.floors[house], 0)
                  return (
                    <div
                      className="inline-flex items-end relative wrap-all"
                      key={`house-${house}`}
                    >
                      <div className="flex-none floors-wrap">
                        <div className="heading" />
                        {floors.map(floor => (
                          <Floor
                            key={floor}
                            height={flatHeight}
                            selected={this.state.setCurrentFloor === floor}
                          >
                            {floor}
                          </Floor>
                        ))}
                      </div>
                      {sections.map((section, index) => {
                        // TODO: разобраться, почему есть пустые подъезды
                        if (void 0 === matrix[house][section]) {
                          return null
                        }
                        return (
                          <Section section={section} key={`section-${section}`}>
                            {floors.map(floor => {
                              if (void 0 === matrix[house][section]) {
                                return null
                              }

                              const flats = matrix[house][section][floor]
                              if (void 0 === flats || 0 === flats.length) {
                                return (
                                  <EmptyFloor
                                    height={flatHeight}
                                    key={`floor-${floor}`}
                                  />
                                )
                              }
                              return (
                                <div
                                  className="flex floor-wrap"
                                  data-floor={floor}
                                  key={`floor-${floor}`}
                                >
                                  {flats.map(flat => {
                                    console.log(flat.hidden)
                                    return flat.hidden ? (
                                      <Flat
                                        {...flat}
                                        key={flat.apartment_ui}
                                        style={{
                                          opacity: 0,
                                          height: flatHeight,
                                          width: flatHeight
                                        }}
                                        onMouseEnter={() =>
                                          this.setCurrentFloor(floor)
                                        }
                                      />
                                    ) : (
                                      <Flat
                                        {...flat}
                                        style={{
                                          height: flatHeight,
                                          width: flatHeight
                                        }}
                                        key={flat.apartment_ui}
                                        data-place="top"
                                        data-tip={flat.apartment_ui}
                                        data-delay-hide={300}
                                        onClick={() => this.showFlat(flat)}
                                        onMouseEnter={() =>
                                          this.setCurrentFloor(floor)
                                        }
                                      />
                                    )
                                  })}
                                </div>
                              )
                            })}
                          </Section>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </Scroller>
          </div>
        </div>
        <Tooltip
          styless={true}
          animated={true}
          clickable={false}
          paddingless={true}
          getContent={id =>
            null === id ? null : <FlatTooltip flat={this.findFlatById(id)} />
          }
        />
        <style jsx>{`
          .scroller-wrap {
            top: 10px;
            right: 50px;
            bottom: 0;
            left: 50px;
            position: absolute;
            :global(.scrollbar-container) {
              display: flex;
              align-items: center;
            }
          }
          .count-wrap {
            padding: 35px 0 0 0;
          }
          .house-name {
            font-weight: 500;
            font-size: 14px;
            text-transform: uppercase;
            position: absolute;
            top: -40px;
            left: 0;
            text-align: left;
            span {
              color: var(--color9);
            }
          }
          .wrap-all {
            padding-right: 40px;
          }
          .count-wrap-bord {
            padding-bottom: 10px;
            // border-bottom: solid 1px #e3e6ea;
          }
          .floors-wrap {
            // position: absolute;
            bottom: 0;
            z-index: 10;
            left: 0;
            background: white;
            // border-right: solid 1px #a9a9a9;
          }
          .heading {
            display: none;
            width: 100%;
            height: 43px;
            position: absolute;
            background: white;
            top: -43px;
            border-right: solid 1px #a9a9a9;
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(Matrix)
