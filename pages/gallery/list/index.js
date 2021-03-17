import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'
import withSeo from '@/select/seo'

const List = props => (
  <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
)

List.getInitialProps = async ({ request }) => {
  const response = await request.get('/gallery')
  return withSeo(({ data }) => ({ gallery: data }))(response.body)
}

export default withFetch(List)
