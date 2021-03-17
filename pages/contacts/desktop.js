import Title from '@/components/typo/title'
import Page from '@/components/page'
import Content from '@/components/content'
import Scroller from '@/components/scroller'
import Offices from '@/components/offices'
import Socials from '@/components/socials'
import get from 'lodash/get'
import { Map } from '@/services/yandex-map'
import { SettingsContext } from '@/components/context/settings'
import { useRef, useEffect, useContext } from 'react'
import { yandexMapAPIKey } from '@/consts'

const Contacts = props => {
  const mapRef = useRef()
  const { offices } = props
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

        map.fitIntoView({ zoomMargin: 200 })
      }
    })
    return () => map.destroy()
  }, [])

  return (
    <Page footer={false}>
      <Content flex relative paddingless>
        <div className="sidebar">
          <div className="scroll-wrap">
            <Scroller>
              <Content flex column>
                <div className="flex-none">
                  <Title marginless>Контакты</Title>
                </div>
                <div className="flex-none">
                  <div className="phone">
                    <small>{phonePts[1]}</small> {phonePts[2]}
                  </div>
                </div>
                <div className="flex-auto">
                  <div className="offices-title">Офисы продаж:</div>
                  <Offices offices={offices} />
                </div>
                <div className="socials flex-none">
                  <Socials {...social} />
                </div>
              </Content>
            </Scroller>
          </div>
        </div>
        <div className="map flex-auto">
          <div className="map-container" ref={mapRef} />
        </div>
      </Content>
      <style jsx>{`
        .sidebar {
          width: 380px;
          position: relative;
          background: white;
          & :global(h1) {
            color: black;
          }
        }
        .map {
          position: relative;
        }
        .map-container {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          :global([class*='ground-pane']) {
            filter: grayscale(1);
          }
        }
        .scroll-wrap {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          position: absolute;
        }
        .phone {
          font-size: 30px;
          font-weight: 500;
          margin-top: 0px;
          margin-bottom: 20px;
          color: var(--color1);
        }
        .socials {
          margin-top: 60px;
        }
        .offices-title {
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          text-transform: uppercase;
          color: #b4b4b4;
          margin: 20px 0 16px 0;
        }
      `}</style>
    </Page>
  )
}

export default Contacts
