import Desktop from './desktop'
import Phablet from './phablet'
import DeviceSpecific from '@/components/device-specific'
import withFetch from '@/components/hocs/with-fetch'
import withSeo from '@/select/seo'

const Otdelka = props => {
  return <DeviceSpecific {...props} desktop={Desktop} phablet={Phablet} />
}

Otdelka.getInitialProps = async ({ request }) => {
  const response = await request.get('/site/page?uri=otdelka')
  const data = JSON.parse(response.body.data.site_template_data).remonts

  const remonts = [],
    rimages = [],
    toggler = {},
    stepper = {}

  for (let { about, name, rooms } of data) {
    // Перключалки
    toggler[name] = {
      name: name,
      about: about
    }

    // Дизайны
    for (let room of rooms) {
      // Комнаты
      stepper[room.name] = room.desc
      remonts.push({ ...room, type: name })
      // Все картинки
      for (let design of room.designs) {
        rimages.push(design.image.url, design.image_wb.url)
      }
    }
  }

  return withSeo(({ data }) => ({
    remonts,
    rimages,
    toggler,
    stepper
  }))(response.body)
}

export default withFetch(Otdelka)
