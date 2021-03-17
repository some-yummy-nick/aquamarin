import L from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

function markerFactory({ smallIcon, largeIcon, textLabel, latlng }) {
  const icon = L.divIcon({
    html: `
        <div class='advantages-icon-wrap'>
          <img src='${smallIcon}' class='advantages-icon-small' />
          <div class="advantages-icon-preview">
            <img src='${largeIcon}' class='advantages-icon-large' />
            <div class="advantages-icon-text">${textLabel}</div>
          </div>
        </div>
      `,
    className: 'advantages-icon',
    iconSize: [47, 47],
    iconAnchor: [47 / 2, 47 / 2]
  })

  const marker = L.marker(latlng, { icon })

  marker.on('mouseover', function() {
    const icon = this._icon
    icon.classList.add('advantages-icon-active')
  })

  marker.on('mouseout', function() {
    const icon = this._icon
    icon.classList.remove('advantages-icon-active')
  })

  return marker
}

export default function Advantages({ advantages }) {
  const mapRef = React.useRef()

  React.useEffect(() => {
    const map = L.map(mapRef.current, {
      zoom: 1,
      minZoom: 1,
      maxZoom: 1,
      crs: L.CRS.Simple,
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false,
      gestureHandling: true,
      gestureHandlingOptions: { duration: 300000 }
    })

    const width = 791
    const height = 675
    const center = [-357, 369.9718390366588]
    const tile = '/static/branding/advantages-tile.svg'

    const southWest = map.unproject([0, height], map.getMaxZoom() - 1)
    const northEast = map.unproject([width, 0], map.getMaxZoom() - 1)
    const bounds = new L.LatLngBounds(southWest, northEast)

    L.imageOverlay(tile, bounds).addTo(map)
    map.setMaxBounds(bounds)

    // debug only
    // map.on('click', ({ latlng }) => console.log([latlng.lat, latlng.lng]))

    // complex icon
    const complexIcon = L.icon({
      iconUrl: '/static/advantages/root.svg',
      iconSize: [92, 79],
      iconAnchor: [92 / 2, 79]
    })

    L.marker(center, { icon: complexIcon }).addTo(map)

    map.setView(center)

    const featureGroup = L.featureGroup().addTo(map)
    advantages.forEach(source => {
      const marker = markerFactory(source)
      marker.addTo(featureGroup)
    })

    map.fitBounds(featureGroup.getBounds())
  }, [])

  return (
    <div className="advantages">
      <div className="h1">
        Это удобно – <br />
        <span style={{ color: 'white' }}>
          рядом выезд на проспект <br />
          Салавата Юлаева
        </span>
      </div>
      <div className="t1">
        В шаговой доступности – достопримечательности: одна из красивейших
        строящихся мечетей страны «Ар-Рахим», государственные музеи истории и
        быта, театральные и концертные залы, здание госфилармонии. С верхних
        этажей откроется живописный вид на набережную реки Белая, исторический
        центр Уфы и живописный пригород.
      </div>
      <div className="map-wrap">
        <div id="advantages-map" ref={mapRef} />
      </div>
      <style jsx>{`
        .advantages {
          min-height: calc(100vh - 90px);
          background: #3d3d3d;
          box-sizing: border-box;
          padding: 40px 20px;
          padding-bottom: 0;
          :global(.leaflet-container) {
            background: none;
          }
        }
        .h1 {
          font-weight: 500;
          font-size: 28px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
        }
        .t1 {
          font-size: 14px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 25px;
        }
        .l {
          position: relative;
        }
        .map-wrap {
          height: 400px;
          margin-left: -40px;
          position: relative;
          margin-top: 20px;
          width: calc(100vw + 20px);
          :global(.leaflet-container:after) {
            font-size: 12px !important;
            text-align: center !important;
            justify-content: center;
            padding: 0;
          }
        }
      `}</style>
      <style jsx global>{`
        .advantages-icon-small {
          width: 47px;
          height: 47px;
          display: block;
        }
        .advantages-icon-preview {
          top: -43px;
          left: -43px;
          position: absolute;
          text-align: center;
          transform: scale(0);
          opacity: 0;
          transition: 750ms cubic-bezier(0.19, 1, 0.22, 1);
        }
        .advantages-icon-active {
          .advantages-icon-preview {
            opacity: 1;
            transform: scale(1);
          }
        }
        .advantages-icon-large {
          width: 133px;
          height: 133px;
          display: block;
        }
        .advantages-icon-text {
          font-weight: 500;
          font-size: 14px;
          line-height: 130%;
          text-align: center;
          color: #ffffff;
          position: absolute;
          left: 0;
          right: 0;
          top: 143px;
        }
      `}</style>
    </div>
  )
}
