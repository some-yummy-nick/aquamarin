import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import { selectNewsItem } from '@/select/news'
import withFetch from '@/components/hocs/with-fetch'

const Show = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Show.defaultProps = {
  news: {}
}

Show.getInitialProps = async ({ query, request }) => {
  const response = await request.get(`/news/${query.id}`)
  return selectNewsItem(response.body)
}

export default withFetch(Show)
