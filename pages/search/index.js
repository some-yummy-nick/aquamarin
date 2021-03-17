import withFetch from '@/components/hocs/with-fetch'
import selectFilter from '@/select/filter'
import DeviceSpecific from '@/components/device-specific'
import Desktop from './desktop'
import Phablet from './phablet'

const Search = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Search.getInitialProps = async ({ query, request }) => {
  const response = await request.get('/search')
  return { initialFilter: selectFilter(response), rooms: query.rooms }
}

export default withFetch(Search)
