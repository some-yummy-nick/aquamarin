import withFetch from '@/components/hocs/with-fetch'
import selectGenplan from '@/select/genplan'
import selectMarks from '@/select/marks'
import DeviceSpecific from '@/components/device-specific'
import Desktop from './desktop'
import Phablet from './phablet'
import withSeo from '@/select/seo'

const Genplan = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Genplan.getInitialProps = async ({ request }) => {
  const genplan = await request.get('/genplan')
  const marks = await request.get('/genplan/marks')

  return withSeo(() => ({
    ...selectGenplan(genplan.body),
    ...selectMarks(marks.body)
  }))(genplan.body)
}

export default withFetch(Genplan)
