import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'

const Index = props => (
  <DeviceSpecific {...props} phablet={Phablet} desktop={Desktop} />
)

Index.getInitialProps = async ({ request }) => {
  return {
    // prettier-ignore
    rawHtmlPage: (await request.get(
      'https://uos.unistroyrf.ru/pages/common/project/about-atmos'
    )).text
  }
}

export default withFetch(Index)
