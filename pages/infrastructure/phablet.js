import Content from '@/components/content'
import InfrastructureGroups from '@/components/infrastructure/groups'
import Title from '@/components/typo/title'
import get from 'lodash/get'
import { useEffect, useState, useRef, useContext } from 'react'
import { PagePhablet } from '@/components/page'
import { Map } from '@/services/yandex-map'
import { SettingsContext } from '@/components/context/settings'

const Infrastructure = ({ placemarks, groups }) => {
  const mapRef = useRef()
  const mapController = useRef()

  const [mapGroups, setMapGroups] = useState([])
  const settings = useContext(SettingsContext)

  const complexCoordinates = {
    lat: get(settings.geo, 'lat', null),
    lng: get(settings.geo, 'lon', null)
  }

  const createMap = () => {
    setMapGroups(groups)

    if (mapController.current) {
      destroyMap()
    }

    mapController.current = new Map({
      mapInitialZoom: 16,
      mapContainer: mapRef.current,
      apiKey: 'b588c8ce-943d-483c-a443-516257557a90',
      mapCenter: [54.724824, 55.998548],
      placemarks: placemarks,
      mapControls: [],
      getPlacemark(placemark) {
        const {
          mark_type,
          name,
          mark_type_id,
          geo_lat,
          geo_lon,
          address
        } = placemark

        const { icon_url, width, height, offcet_x, offcet_y } = mark_type
        return {
          body: address,
          lat: geo_lat,
          lng: geo_lon,
          header: name,
          group: mark_type.name,
          image: {
            iconLayout: 'default#image',
            iconImageHref: icon_url,
            iconImageSize: [+width, +height],
            iconImageOffset: [-offcet_x, -offcet_y]
          }
        }
      },
      afterPlacemarksCreated() {
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
        mapController.current.fitIntoView()
      }
    })
  }

  const destroyMap = () => {
    mapController.current.destroy()
  }

  const toggleMapGroup = ({ name, visible }) => {
    mapController.current.setPlacemarksGroupVisibility(name, visible)
  }

  const toggleGroup = ({ name }) => {
    if (mapController.current) {
      setMapGroups(
        groups.map(group => {
          if (group.name === name) {
            group.visible = !group.visible
            toggleMapGroup(group)
          }
          return group
        })
      )
    }
  }

  useEffect(createMap, destroyMap)

  return (
    <PagePhablet footer={false}>
      <Content>
        <div className="wrap">
          <div ref={mapRef} className="map" />
          <div className="groups-list">
            <InfrastructureGroups groups={mapGroups} onClick={toggleGroup} />
          </div>
          <div className="title-wrap">
            <Title>ИНФРАСТРУКТУРА</Title>
          </div>
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
        .groups-list {
          width: 53px;
          top: 70px;
          right: 0;
          bottom: 0;
          position: absolute;
          overflow: auto;
          z-index: 500;
          background: white;
          padding-left: 15px;
        }
        .map {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        .title-wrap {
          top: 20px;
          left: 20px;
          z-index: 500;
          position: absolute;
        }
      `}</style>
    </PagePhablet>
  )
}

export default Infrastructure
