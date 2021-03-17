import Title from '@/components/typo/title'
import Content from '@/components/content'
import Spacer from '@/components/typo/spacer'
import Offices from '@/components/offices'
import Socials from '@/components/socials'
import get from 'lodash/get'
import { useRef, useEffect, useContext } from 'react'
import { PagePhablet } from '@/components/page'
import { Map } from '@/services/yandex-map'
import { yandexMapAPIKey } from '@/consts'
import { SettingsContext } from '@/components/context/settings'

const Contacts = props => {
  const { offices } = props
  const mapRef = useRef()

  const { social, ...settings } = useContext(SettingsContext)
  const phonePts = settings.phone_html.split(/\s/)

  const complexCoordinates = {
    lat: get(settings.geo, 'lat', null),
    lng: get(settings.geo, 'lon', null)
  }

  useEffect(() => {
    const mapContainer = mapRef.current
    const map = new Map({
      mapContainer: mapContainer,
      apiKey: yandexMapAPIKey,
      mapCenter: [0, 0],
      mapControls: [],
      placemarks: offices,
      getPlacemark({
        address_geo_lat,
        address_geo_lon,
        office_name,
        address_full
      }) {
        return {
          body: address_full,
          lat: address_geo_lat,
          lng: address_geo_lon,
          header: office_name,
          image: {
            iconLayout: 'default#image',
            iconImageHref: require('@/static/branding/office-marker.svg'),
            iconImageSize: [46, 45],
            iconImageOffset: [-46 / 2, -45]
          }
        }
      },
      afterPlacemarksCreated() {
        map.createPlacemark(
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

        map.fitIntoView({ zoomMargin: 50 })
      }
    })
    return () => map.destroy()
  }, [])

  return (
    <PagePhablet>
      <Content>
        <div className="title-wrap">
          <Title>Контакты</Title>
        </div>
      </Content>
      <Content>
        <Spacer vSpace={17}>
          <div className="phone">
            <small>{phonePts[1]}</small> {phonePts[2]}
          </div>
        </Spacer>
        <div className="offices-wrap">
          <Spacer tSpace={30}>
            <Offices offices={offices} />
          </Spacer>
        </div>
        <Spacer tSpace={35} bSpace={30}>
          <Socials {...social} />
        </Spacer>
      </Content>
      <div className="map-wrap">
        <div className="map-container" ref={mapRef} />
      </div>

      <style jsx>{`
        .map-wrap {
          height: 400px;
          position: relative;
        }
        .title-wrap {
          top: 20px;
          left: 20px;
          z-index: 1600;
          position: absolute;
        }
        .map-container {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        .phone {
          font-weight: 500;
          font-size: 24px;
          color: var(--color1);
        }
        .offices-wrap {
          & :global(.address),
          & :global(.workhours) {
            color: black;
          }
        }
      `}</style>
    </PagePhablet>
  )
}

export default Contacts
