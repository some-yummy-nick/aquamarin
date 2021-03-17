import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'
import { HTTPError } from '@/fetch'
import withSeo from '@/select/seo'

const Show = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Show.defaultProps = {
  albums: [],
  pageTitle: 'Галерея',
  current: {
    photos: []
  }
}

Show.getInitialProps = async ({ query, request }) => {
  let current
  const response = await request.get(`/gallery`)

  if (query.id) {
    current = response.body.data.find(x => x.id == query.id)
  } else {
    current = response.body.data[0]
  }

  if (void 0 === current || current.length === 0) {
    throw new HTTPError({ statusCode: 404 })
  }

  return withSeo(({ data }) => ({ current, albums: data }))(response.body)
}

export default withFetch(Show)
