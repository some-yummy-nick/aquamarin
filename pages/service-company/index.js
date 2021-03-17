import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'

const ServiceCompany = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

ServiceCompany.getInitialProps = async ({ request }) => {
  // prettier-ignore
  const response = await request.get('https://uos.unistroyrf.ru/pages/common/service-company')
  return { rawHtmlPage: response.text }
}

export default withFetch(ServiceCompany)
