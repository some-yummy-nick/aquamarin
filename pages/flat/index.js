import Phablet from './phablet'
import Desktop from './desktop'
import withFetch from '@/components/hocs/with-fetch'
import withSeo from '@/select/seo'
import DeviceSpecific from '@/components/device-specific'

const Flat = props => (
  <DeviceSpecific {...props} phablet={Phablet} desktop={Desktop} />
)

Flat.getInitialProps = async ({ query, request }) => {
  // prettier-ignore
  const response = await request.get('/genplan/placement').query({apartment_ui: query.flat})
  return withSeo(({ meta, data }) => ({ ...meta, ...data }))(response.body)
}

export default withFetch(Flat)
