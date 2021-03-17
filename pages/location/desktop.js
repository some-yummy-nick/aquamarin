import Page from '@/components/page'
import Content from '@/components/content'
import Switch from '@/components/switch'
import get from 'lodash/get'
import { Map } from '@/services/yandex-map'
import { useEffect, useState, useRef, useContext } from 'react'
import { Router } from '@/routes'
import { SettingsContext } from '@/components/context/settings'

const controls = [
  { name: 'расположение', page: 'location', selected: true },
  { name: 'инфраструктура', page: 'infrastructure' }
]

const radius = [500, 1000, 1500, 2000]

const Location = () => {
  const mapRef = useRef()
  const mapController = useRef()
  const [renderType, setRenderType] = useState('sputnik')

  const settings = useContext(SettingsContext)

  const complexCoordinates = {
    lat: get(settings.geo, 'lat', null),
    lng: get(settings.geo, 'lon', null)
  }

  const createYMap = () => {
    mapController.current = new Map({
      mapInitialZoom: 16,
      mapContainer: mapRef.current,
      apiKey: 'b588c8ce-943d-483c-a443-516257557a90',
      mapCenter: [55.788554, 49.254713],
      placemarks: [],
      mapControls: [],
      afterMapLoaded() {
        mapController.current.setMapType(Map.constants.HYBRID)
        createPlacemarks('sputnik')
      }
    })
  }

  const createPlacemarks = renderType => {
    mapController.current.setMapType(Map.constants.HYBRID)

    mapController.current.createPlacemark(
      {
        ...complexCoordinates,
        image: {
          iconLayout: 'default#image',
          iconImageHref: require('@/static/branding/complex-marker.svg'),
          iconImageSize: [76, 55],
          iconImageOffset: [-76 / 2, -55]
        }
      },
      { parse: false }
    )

    mapController.current.createMapImageOverlay({
      bounds: [
        [55.880019670284902, 49.28790967810213],
        [55.880067917159316, 49.31031148779451],
        [55.868124978830316, 49.31048314917146],
        [55.868293894581896, 49.28709428656156]
      ],
      image: '/static/branding/render.png'
    })
  }

  const destroyYMap = () => {
    mapController.current.destroy()
    mapController.current = null
  }

  const setMapType = type => {
    if (!mapController.current) {
      return
    }

    if ('sputnik' === type) {
      mapController.current.setMapType(Map.constants.HYBRID)
      setRenderType('sputnik')
      createPlacemarks('sputnik')
      return
    }

    mapController.current.setMapType(Map.constants.SCHEME)
    setRenderType('scheme')
    createPlacemarks('scheme')
  }

  useEffect(() => {
    createYMap()
    return destroyYMap
  }, [])

  const color = { [renderType === 'sputnik' ? 'color7' : 'color4']: true }

  return (
    <Page footer={false}>
      <Content flexible paddingless>
        <div className="flex flex-column" style={{ flex: 1 }}>
          <div className="flex-none">
            <Content dbp>
              <div className="flex justify-center">
                <Switch.Desktop
                  controls={controls}
                  bottomBorder={false}
                  onClick={({ page }) => Router.pushRoute(page)}
                />
              </div>
            </Content>
          </div>
          <div className="flex flex-auto">
            <div className="flex" style={{ flex: 1 }}>
              <div className="map-wrap flex-auto">
                <div ref={mapRef} className="map flex-auto" />
              </div>
            </div>
          </div>
        </div>
      </Content>
      <style jsx>{`
        .map-wrap {
          position: relative;
        }
        .map {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
      `}</style>
    </Page>
  )
}

Location.getInitialProps = async () => {}

export default Location
