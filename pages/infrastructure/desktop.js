import Page from '@/components/page'
import Content from '@/components/content'
import Sidebar from '@/components/sidebar'
import InfrastructureGroups from '@/components/infrastructure/groups'
import Switch from '@/components/switch'
import get from 'lodash/get'
import { useEffect, useState, useRef, useContext } from 'react'
import { Map } from '@/services/yandex-map'
import { Router } from '@/routes'
import { SettingsContext } from '@/components/context/settings'

const controls = [
  { name: 'расположение', page: 'location' },
  { name: 'инфраструктура', page: 'infrastructure', selected: true }
]

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

  useEffect(() => {
    createMap()
    return destroyMap
  }, [])

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
                <div ref={mapRef} className="map" />
              </div>
              <div className="sidebar-wrap">
                <Sidebar>
                  <div style={{ padding: '30px 50px' }}>
                    <InfrastructureGroups
                      groups={mapGroups}
                      onClick={toggleGroup}
                    />
                  </div>
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <style jsx>{`
        .sidebar-wrap {
          & :global(.sidebar) {
            height: 100%;
            background: #white;
          }
        }
        .map-wrap {
          position: relative;
        }
        .map {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          :global([class*='ground-pane']) {
            filter: grayscale(1);
          }
        }
      `}</style>
    </Page>
  )
}

export default Infrastructure
