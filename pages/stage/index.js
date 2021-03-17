import withFetch from '@/components/hocs/with-fetch'
import selectStage from '@/select/stage'
import Desktop from './_desktop'
import Phablet from './_phablet'
import DeviceSpecific from '@/components/device-specific'

const Stage = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Stage.getInitialProps = async ({ query, request }) => {
  const { house, entrance, stage } = query
  const response = await request.get(`/genplan/${house}/${entrance}/${stage}`)
  return selectStage(response.body)
}

export default withFetch(Stage)
