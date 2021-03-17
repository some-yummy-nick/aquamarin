import Phablet from './phablet'
import Desktop from './desktop'
import DeviceSpecific from '@/components/device-specific'

const Main = props => {
  return <DeviceSpecific {...props} phablet={Phablet} desktop={Desktop} />
}

Main.getInitialProps = async () => {
  return {
    advantages: [
      {
        smallIcon: '/static/advantages/1s.png',
        largeIcon: '/static/advantages/1l.png',
        textLabel: 'Филармония имени Х. Ахметова',
        latlng: [-212, 143.98906333358738]
      },
      {
        smallIcon: '/static/advantages/2s.png',
        largeIcon: '/static/advantages/2l.png',
        textLabel: 'Гостиный двор',
        latlng: [-252, 157.48803444859388]
      },
      {
        smallIcon: '/static/advantages/3s.png',
        largeIcon: '/static/advantages/3l.png',
        textLabel: 'Театр оперы и балета',
        latlng: [-289, 173.4868150293423]
      },
      {
        smallIcon: '/static/advantages/4s.png',
        largeIcon: '/static/advantages/4l.png',
        textLabel: 'Национальный музей Республики Башкортостан',
        latlng: [-343, 203.48452861824558]
      },
      {
        smallIcon: '/static/advantages/5s.png',
        largeIcon: '/static/advantages/5l.png',
        textLabel: 'Академический театр драмы имени М. Гафури',
        latlng: [-367, 136.98959682950996]
      },
      {
        smallIcon: '/static/advantages/6s.png',
        largeIcon: '/static/advantages/6l.png',
        textLabel: 'Мечеть Ар-Рахим',
        latlng: [-408, 396.96978126667176]
      },
      {
        smallIcon: '/static/advantages/7s.png',
        largeIcon: '/static/advantages/7l.png',
        textLabel: 'Монумент Дружбы',
        latlng: [-484.5, 360.4725249599878]
      },
      {
        smallIcon: '/static/advantages/8s.png',
        largeIcon: '/static/advantages/8l.png',
        textLabel: 'Уфа-Арена',
        latlng: [-68.5, 285.97839341513605]
      },
      {
        smallIcon: '/static/advantages/9s.png',
        largeIcon: '/static/advantages/9l.png',
        textLabel: 'Лесопарк имени Лесоводов Башкирии',
        latlng: [-167, 712.4513375504916]
      }
    ]
  }
}

export default Main
