import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import { selectNewsList } from '@/select/news'
import withFetch from '@/components/hocs/with-fetch'

const News = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

News.defaultProps = {
  news: [],
  total: 0,
  page: 1
}

News.getInitialProps = async ({ query, request }) => {
  const page = query.page || News.defaultProps.page
  const response = await request.get(`/news?page=${page}`)
  return { ...selectNewsList(response.body), page }
}

export default withFetch(News)
