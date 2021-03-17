import Desktop from './desktop'
import Phablet from './phablet'
import withSeo from '@/select/seo'
import withFetch from '@/components/hocs/with-fetch'
import DeviceSpecific from '@/components/device-specific'

const Contacts = props => (
  <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
)

Contacts.getInitialProps = async ({ request }) => {
  const response = await request.get('/contacts')
  return withSeo(({ data }) => ({ offices: data }))(response.body)
}

export default withFetch(Contacts)
