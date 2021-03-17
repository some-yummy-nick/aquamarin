import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'

const Location = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

export default Location
