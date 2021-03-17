import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '@/static/bounce-marker.js'

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

export default function Advantages({ inView, advantages }) {
  const mapRef = React.useRef()
  const ready = React.useRef(false)
  const markersRef = React.useRef([])
  const leafletRef = React.useRef(null)

  React.useEffect(() => {
    if (ready.current) return

    const width = 791
    const height = 675
    const center = [-357, 369.9718390366588]
    const tile = '/static/branding/advantages-tile.svg'

    if (null === leafletRef.current) {
      leafletRef.current = L.map(mapRef.current, {
        zoom: 1,
        minZoom: 1,
        maxZoom: 1,
        crs: L.CRS.Simple,
        attributionControl: false,
        scrollWheelZoom: false,
        zoomControl: false
      })

      // debug only
      // leafletRef.current.on('click', ({ latlng }) =>
      //   console.log([latlng.lat, latlng.lng])
      // )

      // prettier-ignore
      const southWest = leafletRef.current.unproject([0, height], leafletRef.current.getMaxZoom() - 1)
      // prettier-ignore
      const northEast = leafletRef.current.unproject([width, 0], leafletRef.current.getMaxZoom() - 1)
      // prettier-ignore
      const bounds = new L.LatLngBounds(southWest, northEast)

      L.imageOverlay(tile, bounds).addTo(leafletRef.current)
      leafletRef.current.setMaxBounds(bounds)
      leafletRef.current.setView(center)
    }

    if (inView) {
      // complex icon
      const complexIcon = L.icon({
        iconUrl: '/static/advantages/root.svg',
        iconSize: [92, 79],
        iconAnchor: [92 / 2, 79]
      })

      const complexMarker = L.marker(center, {
        icon: complexIcon,
        bounceOnAdd: true,
        bounceOnAddOptions: { duration: 2000, height: 400, loop: 1 }
      }).addTo(leafletRef.current)

      markersRef.current.push(complexMarker)
      ready.current = true
    }

    const featureGroup = L.featureGroup().addTo(leafletRef.current)
    advantages.forEach(source => {
      const marker = markerFactory(source)
      marker.addTo(featureGroup)
    })

    leafletRef.current.fitBounds(featureGroup.getBounds())
  }, [inView])

  return (
    <div className="advantages">
      <div className="l">
        <div id="advantages-map" className="swiper-no-swiping" ref={mapRef} />
      </div>
      <div className="r" data-swiper-parallax="30%">
        <div className="h1">
          Это удобно – <br />
          <span style={{ color: 'white' }}>
            рядом выезд на проспект <br />
            Салавата Юлаева
          </span>
        </div>
        <div className="t1">
          В шаговой доступности – достопримечательности: <br />
          одна из красивейших строящихся мечетей страны <br />
          «Ар-Рахим», государственные музеи истории и <br />
          быта, театральные и концертные залы, здание <br />
          госфилармонии. С верхних этажей откроется <br />
          живописный вид на набережную реки Белая, <br />
          исторический центр Уфы и живописный пригород.
        </div>
      </div>
      <style jsx>{`
        .advantages {
          min-height: calc(100vh - 90px);
          background: #3d3d3d;
          box-sizing: border-box;
          padding: 0 50px 0 0;
          display: flex;
          :global(.leaflet-container) {
            background: none;
          }
        }
        .l {
          flex: 1;
        }
        .r {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-left: 100px;
        }
        .h1 {
          font-weight: 500;
          font-size: 40px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
        }
        .t1 {
          font-size: 16px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 25px;
        }
        .l {
          position: relative;
        }
        #advantages-map {
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          position: absolute;
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
          z-index: 100000000 !important;
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
