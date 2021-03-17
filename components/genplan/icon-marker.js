import React, { Fragment, Component } from 'react'
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

  onMouseOver = () => {
    this.marker._icon.classList.add('icon-marker-active')
    this.marker.setZIndexOffset(maxZIndex)
  }

  onMouseOut = () => {
    this.marker._icon.classList.remove('icon-marker-active')
    this.marker.setZIndexOffset(minZIndex)
  }

  get marker() {
    return this.markerRef.current.leafletElement
  }

  render() {
    const { position, image, text, onClick } = this.props

    const createText = text => {
      return text
        ? `
        <div class='icon-marker-panel flex'>
          <div class='icon-marker-text'>${text}</div>
        </div>
      `
        : ''
    }

    const icon = divIcon({
      html: `
        <div class='icon-marker'>
          <div class='icon-marker-icon'>
            <img src='${image}'/>
          </div>
          ${createText(text)}
        </div>
      `,
      className: 'icon-icon',
      iconSize: [33, 33],
      iconAnchor: [33 / 2, 33]
    })

    return (
      <Fragment>
        <Marker
          position={position}
          icon={icon}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          ref={this.markerRef}
          onClick={onClick}
        />
        <style global jsx>{`
          .icon-marker {
            position: relative;
          }
          .icon-marker-icon {
            display: block;
            text-align: center;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
            pointer-events: none;
          }
          .icon-marker-panel {
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
            height: 33px;
            border-radius: 44px;
            padding-left: 43px;
            padding-right: 24px;
            line-height: 1.3;
            display: flex;
            align-items: center;
            padding-top: 2px;
            font-weight: 500;
          }
          .icon-marker-text {
            font-size: 10px;
            line-height: 1.3;
            font-weight: 500;
            text-transform: uppercase;
          }
          .icon-marker-active .icon-marker-panel {
            opacity: 1;
            pointer-events: all;
            transform: translateX(0);
          }
        `}</style>
      </Fragment>
    )
  }
}

export default IconMarker
