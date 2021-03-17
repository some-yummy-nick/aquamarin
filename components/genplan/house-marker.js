import React, { Fragment, Component } from 'react'
import get from 'lodash/get'
import { renderToString } from 'react-dom/server'
import { divIcon } from 'leaflet'
import { Marker } from 'react-leaflet'

const minZIndex = 8888
const maxZIndex = 9999

class IconMarker extends Component {
  static defaultProps = {
    onClick() {}
  }

  constructor(props) {
    super(props)
    this.markerRef = React.createRef()
  }

  onMouseOver = ev => {
    this.marker._icon.classList.add('house-marker-active')
    this.marker.setZIndexOffset(maxZIndex)
    this.props.onMouseOver(ev)
  }

  onMouseOut = ev => {
    this.marker._icon.classList.remove('house-marker-active')
    this.marker.setZIndexOffset(minZIndex)
    this.props.onMouseOut(ev)
  }

  openPanel = () => {
    this.marker._icon.classList.add('house-marker-active')
    this.marker.setZIndexOffset(maxZIndex)
  }

  closePanel = () => {
    this.marker._icon.classList.remove('house-marker-active')
    this.marker.setZIndexOffset(minZIndex)
  }

  get marker() {
    return this.markerRef.current.leafletElement
  }

  render() {
    const { position, text, onClick, label } = this.props

    const createText = text => {
      if (typeof text === 'function') {
        return `
          <div class="house-marker-panel flex">
            <div class="house-marker-text">
              ${renderToString(text())}
            </div>
          </div>
        `
      }
    }

    const icon = divIcon({
      html: `
        <div class='icon-marker house-marker'>
          <div class='house-marker-icon'>
          <img src="/static/branding/house-marker.svg" width="44" height="44" />
            <div class='house-marker-label'>${label}</div>
          </div>
          ${createText(text)}
        </div>
      `,
      className: 'icon-icon',
      iconSize: [44, 44],
      iconAnchor: [44 / 2, 44]
    })

    return (
      <Fragment>
        <Marker
          position={position}
          icon={icon}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          ref={this.markerRef}
          onClick={({ originalEvent }) => {
            const target = originalEvent.target
            onClick(get(target, 'dataset.action', null))
          }}
        />
        <style global jsx>{`
          .house-marker {
            position: relative;
          }
          .house-marker-icon {
            display: block;
            text-align: center;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
            pointer-events: none;
          }
          .house-marker-panel {
            top: 0;
            height: auto;
            left: 0px;
            position: absolute;
            box-sizing: border-box;
            white-space: nowrap;
            transition: 0.5s;
            opacity: 0;
            transform: translateX(10%);
            pointer-events: none;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            height: 44px;
            border-radius: 44px;
            padding-left: 55px;
            padding-right: 24px;
            line-height: 1.3;
            display: flex;
            align-items: center;
            padding-top: 2px;
            font-weight: 500;
          }
          .house-marker-text {
            font-size: 8px;
            line-height: 1.3;
            text-transform: uppercase;
          }
          .house-marker-active .house-marker-panel {
            opacity: 1;
            pointer-events: all;
            transform: translateX(0);
          }
          .house-marker-label {
            top: 46%;
            left: 50%;
            z-index: 100;
            position: absolute;
            font-weight: 500;
            font-size: 18px;
            text-align: center;
            color: #ffffff;
            line-height: 1.3;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
        `}</style>
      </Fragment>
    )
  }
}

export default IconMarker
