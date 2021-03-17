import React from 'react'
import { Map, TileLayer, FeatureGroup, Polygon } from 'react-leaflet'
import Markers from '@/components/genplan/markers'
import ZoomControl from '@/components/genplan/zoom-control'
import 'leaflet/dist/leaflet.css'
import HouseMarker from '@/components/genplan/house-marker'
import Spinner from '@/components/spinner'
import { closestLayer } from 'leaflet-geometryutil'
import { fixTilesGap } from '@/helpers'
import { Router } from '@/routes'
import { ModalContext } from '@/components/context/modal'

const minZoom = 3
const maxZoom = 5
const dimensions = [4096 * 2, 2048 * 2]
const polygonStyle = { color: '#FF8200' }

class Genplan extends React.Component {
  static contextType = ModalContext
  constructor(props) {
    super(props)

    this.state = {
      zoom: minZoom,
      currentHouse: null
    }

    this.houseRef = {}
    this.sectionRef = {}

    this.houseMarkerRef = {}
    this.sectionMarkerRef = {}

    this.mapRef = React.createRef()
  }

  get map() {
    return this.mapRef.current.leafletElement
  }

  componentDidMount() {
    if (this.map) {
      this.map.doubleClickZoom.disable()
    }

    this.setBounds()
    fixTilesGap()
  }

  calcBounds() {
    const width = dimensions[0]
    const height = dimensions[1]
    const maxLevel = maxZoom
    const orgLevel = maxZoom
    const minLevel = minZoom

    const tileWidth = 256 * Math.pow(2, orgLevel)
    const radius = tileWidth / 2 / Math.PI
    const rx = width - tileWidth / 2
    const ry = -height + tileWidth / 2

    const west = -180
    const east = (180 / Math.PI) * (rx / radius)
    const north = 85.05
    const south =
      (360 / Math.PI) * (Math.atan(Math.exp(ry / radius)) - Math.PI / 4)
    const rc = (tileWidth / 2 + ry) / 2
    const centerLat =
      (360 / Math.PI) * (Math.atan(Math.exp(rc / radius)) - Math.PI / 4)
    const centerLon = (west + east) / 2
    const bounds = [[south, west], [north, east]]

    return { bounds, centerLat, centerLon }
  }

  setBounds() {
    const { map } = this
    const { bounds, centerLat, centerLon } = this.calcBounds()

    map.setMaxZoom(maxZoom)
    map.setMinZoom(minZoom)

    if (this.props.center) {
      map.setView(this.props.center, minZoom)
    } else {
      map.setView(new L.latLng(centerLat, centerLon), minZoom)
    }
    map.on('drag', () => map.panInsideBounds(bounds, { animate: false }))
  }

  zoomIn = () => {
    const zoom = this.map.getZoom()

    if (zoom >= maxZoom) {
      return
    }

    this.map.zoomIn()

    this.setState({ zoom: zoom + 1 })
  }

  zoomOut = () => {
    const zoom = this.map.getZoom()

    if (zoom <= minZoom) {
      return
    }

    this.map.zoomOut()

    this.setState({ zoom: zoom - 1 })
  }

  onZoomEnd = () => {
    const zoom = this.map.getZoom()

    this.setState(() => {
      this.map.fireEvent('drag')

      if (zoom === minZoom) {
        this.props.onZoom(zoom)
        return { zoom, currentHouse: null }
      }

      this.props.onZoom(zoom)
      return { zoom }
    })
  }

  onMoveEnd = () => {
    if (this.map.getZoom() < maxZoom) {
      return
    }

    const center = this.map.getCenter()
    const layers = Object.values(this.houseRef).map(polygon => {
      return polygon === null ? null : polygon.leafletElement
    })

    // Бывает и такое
    if (layers.some(layer => null === layer)) {
      return
    }

    // Ищиим ближайший полигон, тобеж дом, к центру карты
    const polygon = closestLayer(this.map, layers, center)
    this.setState({
      currentHouse: polygon ? polygon.layer.options.house : null
    })
  }

  onHouseEnter = (ev, house) => {
    this.highLightPolygon(ev.target)
    this.houseMarkerRef[house.id].openPanel()
  }

  onHouseLeave = (ev, house) => {
    this.unhighLightPolygon(ev.target)
    this.houseMarkerRef[house.id].closePanel()
  }

  onHouseShow = (ev, house) => {
    const center = ev.target.getCenter()
    this.setState({ currentHouse: house }, () => {
      this.zoomToHouse(center)
    })
  }

  onSectionEnter = (ev, section) => {
    ev.target.setStyle({ fillOpacity: 0.2 })
    this.sectionMarkerRef[section.id].openPanel()
  }

  onSectionLeave = (ev, section) => {
    ev.target.setStyle({ fillOpacity: 0 })
    this.sectionMarkerRef[section.id].closePanel()
  }

  onSectionShow = (ev, house, section) => {
    if (!section.opened) return
    Router.pushRoute('showStage', {
      house: house.id,
      entrance: section.number,
      stage: section.min_floor
    })
  }

  highLightPolygon = element => {
    element.setStyle({ fillOpacity: 0.2 })
  }

  unhighLightPolygon = element => {
    element.setStyle({ fillOpacity: 0 })
  }

  zoomToHouse = center => {
    this.map.setView(center, this.map.getMaxZoom())
  }

  markerClick = marker => {
    if (marker.html) {
      const Modal = () => (
        <>
          <div className="wrap">
            <Spinner center color7 />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: marker.html }}
          />
          <style jsx>{`
            @import 'mixins/r';
            .wrap {
              @extend %abs-container;
              position: fixed;
              z-index: -1;
            }
            .content {
              width: 100%;
              top: 50%;
              left: 50%;
              position: fixed;
              transform: translate(-50%, -50%);
            }
            .content :global(a) {
              bottom: 10px !important;
              right: 10px !important;
              top: auto;
            }
          `}</style>
        </>
      )
      this.context.showModal(Modal)
    }
  }

  render() {
    const { bounds } = this.calcBounds()
    return (
      <Map
        zoom={minZoom}
        ref={this.mapRef}
        zoomControl={false}
        attributionControl={false}
        onZoomEnd={this.onZoomEnd}
        onMoveEnd={this.onMoveEnd}
      >
        {/* Рендер генплана */}
        <TileLayer
          url="/static/render/v4/{z}-{x}-{y}.jpg"
          bounds={bounds}
          noWrap={true}
        />
        {/* Статические маркеры */}
        <Markers markers={this.props.markers} onClick={this.markerClick} />
        {/* Зумилка */}
        {this.props.showZoomControl && (
          <ZoomControl
            onZoomIn={this.zoomIn}
            onZoomOut={this.zoomOut}
            minDisabled={this.state.zoom <= minZoom}
            maxDisabled={this.state.zoom >= maxZoom}
            position={{ left: 40, bottom: 40 }}
            helpTextShown={this.state.zoom === minZoom}
          />
        )}
        {/* Обводки */}
        {this.props.genplan.map(house => {
          if (null === house.houseMarker || null === house.housePolygon) {
            return null
          } else if (this.state.zoom >= 4) {
            // Обводки подъезда
            return (
              <FeatureGroup key={house.id}>
                {house.sections.map(section => {
                  return (
                    <FeatureGroup key={section.id}>
                      <HouseMarker
                        position={{
                          lat: section.sectionMarker[0],
                          lng: section.sectionMarker[1]
                        }}
                        text={() => (
                          <>
                            {section.status_id != 'on_sale' ? (
                              <div> {section.status_name} </div>
                            ) : (
                              <div style={{ marginTop: -3 }}>
                                <div className="gl-flats-count">
                                  {section.flats_available}
                                  <small> кв.</small>
                                </div>
                                <div style={{ marginTop: -3 }}>
                                  Подъезд № <span>{section.number}</span>
                                  {section.is_through == 1 && ' (сквозной)'}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        label={section.number}
                        ref={ref => (this.sectionMarkerRef[section.id] = ref)}
                        onClick={ev => this.onSectionShow(ev, house, section)}
                        onMouseOver={() => {
                          const polygon = this.sectionRef[section.id]
                            .leafletElement
                          this.highLightPolygon(polygon)
                        }}
                        onMouseOut={() => {
                          const polygon = this.sectionRef[section.id]
                            .leafletElement
                          this.unhighLightPolygon(polygon)
                        }}
                      />
                      <Polygon
                        key={section.id}
                        ref={ref => (this.sectionRef[section.id] = ref)}
                        onMouseOver={ev => this.onSectionEnter(ev, section)}
                        onMouseOut={ev => this.onSectionLeave(ev, section)}
                        onClick={ev => this.onSectionShow(ev, house, section)}
                        positions={section.sectionPolygon}
                        color={polygonStyle.color}
                        fillOpacity={0}
                        stroke={false}
                      />
                    </FeatureGroup>
                  )
                })}
              </FeatureGroup>
            )
          } else {
            // Обводка дома и маркер
            return (
              <FeatureGroup key={house.id}>
                <HouseMarker
                  house={house.id}
                  position={{
                    lat: house.houseMarker[0],
                    lng: house.houseMarker[1]
                  }}
                  label={house.number}
                  ref={ref => (this.houseMarkerRef[house.id] = ref)}
                  text={() => (
                    <>
                      {house.status_id != 'on_sale' ? (
                        <div>{house.status_name}</div>
                      ) : (
                        <div>
                          <div className="gl-flats-count">
                            {house.flats_available} <small>кв.</small>
                          </div>
                          {house.finish_date && (
                            <div>Срок сдачи: {house.finish_date}</div>
                          )}
                          {house.has_remont ? (
                            <div data-action="otdelka" className="gl-link">
                              отделка под заказ
                            </div>
                          ) : null}
                        </div>
                      )}
                    </>
                  )}
                  onClick={action => {
                    // Клип из попапа
                    if (action === 'otdelka') {
                      Router.pushRoute('otdelka')
                      return
                    }

                    const polygon = this.houseRef[house.id].leafletElement
                    const center = polygon.getCenter()

                    this.setState({ currentHouse: house }, () => {
                      this.zoomToHouse(center)
                    })
                  }}
                  onMouseOver={() => {
                    const polygon = this.houseRef[house.id].leafletElement
                    this.highLightPolygon(polygon)
                  }}
                  onMouseOut={() => {
                    const polygon = this.houseRef[house.id].leafletElement
                    this.unhighLightPolygon(polygon)
                  }}
                />
                <Polygon
                  key={house.id}
                  house={house}
                  ref={ref => (this.houseRef[house.id] = ref)}
                  onMouseOver={ev => this.onHouseEnter(ev, house)}
                  onMouseOut={ev => this.onHouseLeave(ev, house)}
                  onClick={ev => this.onHouseShow(ev, house)}
                  positions={house.housePolygon}
                  color={polygonStyle.color}
                  fillOpacity={0}
                  stroke={false}
                />
              </FeatureGroup>
            )
          }
        })}
        <style jsx>{`
          .gl-link {
            color: var(--color5);
            text-transform: uppercase;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            margin-top: 5px;
            text-decoration: underline;
          }
          .gl-flats-count {
            font-size: 18px;
            small {
              font-size: 10px;
            }
          }
        `}</style>
      </Map>
    )
  }
}

Genplan.defaultProps = {
  showZoomControl: true,
  onZoom: () => {}
}

export default Genplan
