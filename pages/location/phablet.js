import Title from '@/components/typo/title'
import Content from '@/components/content'
import get from 'lodash/get'
import { useEffect, useRef, useContext } from 'react'
import { PagePhablet } from '@/components/page'
import { Map } from '@/services/yandex-map'
import { SettingsContext } from '@/components/context/settings'

const Location = () => {
  const mapRef = useRef()
  const mapController = useRef()

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
    })
  }

  const destroyYMap = () => {
    mapController.current.destroy()
    mapController.current = null
  }

  useEffect(createYMap, destroyYMap)

  return (
    <PagePhablet footer={false}>
      <Content>
        <div className="flex wrap">
          <div className="title-wrap">
            <Title>РАСПОЛОЖЕНИЕ</Title>
          </div>
          <div ref={mapRef} className="map flex-auto" />
        </div>
      </Content>
      <style jsx>{`
        .wrap {
          top: 70px;
          right: 0;
          bottom: 0;
          left: 0;
          position: fixed;
          background: white;
        }
        .title-wrap {
          top: 20px;
          left: 20px;
          z-index: 1500;
          position: absolute;
        }
        .title-wrap :global(h1) {
          color: white !important;
        }
        .map {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
      `}</style>
    </PagePhablet>
  )
}

Location.getInitialProps = async () => {}

export default Location
