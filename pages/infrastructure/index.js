import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'
import uniqBy from 'lodash/uniqBy'
import withSeo from '@/select/seo'

const Infrastructure = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Infrastructure.getInitialProps = async ({ request }) => {
  const response = await request.get('/complex/infrastructure')
  const placemarks = response.body.data

  const groups = uniqBy(placemarks, 'mark_type_id')
    .map(group => ({ ...group.mark_type, visible: true }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return withSeo(() => ({ placemarks, groups }))(response.body)
}

export default withFetch(Infrastructure)
