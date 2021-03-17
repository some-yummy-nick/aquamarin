import React from 'react'
import { FeatureGroup } from 'react-leaflet'
import IconMarker from '@/components/genplan/icon-marker'

class Markers extends React.PureComponent {
  render() {
    return (
      <FeatureGroup>
        {this.props.markers.map((marker, _) => (
          <IconMarker
            key={_}
            image={marker.mark_type.icon_url}
            position={{
              lat: marker.marker[0],
              lng: marker.marker[1]
            }}
            text={marker.name}
            onClick={() => this.props.onClick(marker)}
          />
        ))}
      </FeatureGroup>
    )
  }
}

export default Markers
