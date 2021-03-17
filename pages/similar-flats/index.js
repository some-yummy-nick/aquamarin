import Desktop from './desktop'
import Phablet from './phablet'
import withFetch from '@/components/hocs/with-fetch'
import DeviceSpecific from '@/components/device-specific'

const SimilarFlats = props => (
  <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
)

SimilarFlats.getInitialProps = async ({ query, request }) => {
  const response = await request.get(`/search/plans/${query.planning}`)
  return { ...response.body.meta, placements: response.body.data }
}

export default withFetch(SimilarFlats)
