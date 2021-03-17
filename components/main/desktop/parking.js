import ResponsiveHeight from '@/components/responsive-height'
import { timeline } from 'popmotion'

function Card({ height, picture, text, index, inView }) {
  const timelineRef = React.useRef()
  const [opacity, setOpacity] = React.useState(0)
  const [animatedHeight, setAnimatedHeight] = React.useState(0)

  React.useEffect(() => {
    if (inView) {
      timelineRef.current = timeline([
        index * 100,
        {
          track: 'a',
          from: 0,
          to: height,
          duration: 1250
        },
        index * 200,
        {
          track: 'b',
          from: 0,
          to: 100,
          duration: 1250
        }
      ]).start({
        update({ a, b }) {
          setAnimatedHeight(a)
          setOpacity(b)
        }
      })
    }
  }, [inView])

  return (
    <div className="card">
      <div className="placeholder" style={{ height }}>
        <div className="placeholder-inner" style={{ height: animatedHeight }}>
          <img src={picture} className="card-picture" style={{ height }} />
        </div>
      </div>
      <div
        className="card-text"
        style={{ opacity: opacity / 100 }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <style jsx>{`
        .card {
          overflow: hidden;
        }
        .card-picture {
          width: 103%;
          height: 100%;
          object-fit: cover;
        }
        .placeholder-inner {
          overflow: hidden;
          will-change: height;
        }
        .card-text {
          opacity: 0;
          font-size: 20px;
          line-height: 120%;
          color: #ffffff;
          margin-top: 14px;
          will-change: opacity;
        }
      `}</style>
    </div>
  )
}

const ResponsiveCard = ResponsiveHeight({ width: 1366, height: 350 })(Card)

export default function Parking({ inView }) {
  return (
    <div className="parking">
      <div className="wrap">
        <div className="h1">
          Это продумано – <br />
          <span style={{ color: 'white' }}>
            для автомобилей 2-уровневый подземный паркинг
          </span>
        </div>
        <div className="t1">
          Дом оборудован подземным двухуровневым паркингом на 103 места с
          изолированными въездами для каждого уровня. <br /> В доме будет 3
          скоростных лифта, 2 из которых – со спуском в паркинг.
        </div>
        <div className="t3">
          <ResponsiveCard
            index={1}
            inView={inView}
            picture="/static/branding/p1.jpg"
            text="Места для <br /> двух автомобилей"
          />
          <ResponsiveCard
            index={2}
            inView={inView}
            picture="/static/branding/p2.jpg"
            text="Места для <br /> мотоциклов"
          />
          <ResponsiveCard
            index={3}
            inView={inView}
            picture="/static/branding/p3.jpg"
            text="Гаражные <br /> боксы"
          />
          <ResponsiveCard
            index={4}
            inView={inView}
            picture="/static/branding/p4.jpg"
            text="Кладовые <br /> помещения"
          />
        </div>
      </div>
      <style jsx>{`
        .parking {
          min-height: calc(100vh - 90px);
          background: #262729 url(/static/branding/bg1.png) no-repeat;
          background-position: 100% 100%;
          background-size: 100%;
          padding: 0 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .h1 {
          font-weight: 500;
          font-size: 40px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
        }
        .t1 {
          font-size: 16px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 25px;
        }
        .t3 {
          display: grid;
          grid-gap: 60px;
          margin-top: 45px;
          grid-template-columns: repeat(4, 1fr);
        }
      `}</style>
    </div>
  )
}
