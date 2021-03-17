import ResponsiveHeight from '@/components/responsive-height'
import { timeline } from 'popmotion'

import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'

const swiperParams = {
  spaceBetween: 60,
  slidesPerView: 4,
  keyboard: false,
  mousewheel: false
}

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

export default function Comfort({ inView }) {
  const swiperRef = React.useRef(null)

  return (
    <div className="comfort">
      <div className="wrap">
        <div className="h1">
          Это выше комфорта – <br />
          <span style={{ color: 'white' }}>
            дом наделен преимуществами бизнес-класса
          </span>
        </div>
        <div className="t1">
          <Swiper ref={swiperRef} {...swiperParams}>
            <div className="slide">
              <ResponsiveCard
                index={1}
                inView={inView}
                picture="/static/branding/c1.jpg"
                text="Закрытая <br /> территория"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                index={2}
                inView={inView}
                picture="/static/branding/c2.jpg"
                text="Паркинг с гаражами, <br /> мотоместами и семейными <br /> парковками"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                index={3}
                inView={inView}
                picture="/static/branding/c3.jpg"
                text="Высокие потолки <br /> - 2.85 м"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                index={4}
                inView={inView}
                picture="/static/branding/c4.jpg"
                text="Консьерж- <br /> сервис"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                index={5}
                inView={inView}
                picture="/static/branding/c5.jpg"
                text="Увеличенные оконные <br /> проёмы"
              />
            </div>
          </Swiper>
        </div>
        {/* prettier-ignore */}
        <div className='t2'>
          <div className="sw prev" onClick={() => swiperRef.current.swiper.slidePrev()}>
            <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
              <path d="M1.65427 10.5463L11.5377 20.4297L11.5377 23.3548L0.191708 12.0089L1.65427 10.5463Z" fill="currentColor" />
              <path d="M0.191406 12.0017L11.5374 0.655703L11.5374 3.58082L1.65397 13.4643L0.191406 12.0017Z" fill="currentColor" />
            </svg>
          </div>
          <div className="sw next" onClick={() => swiperRef.current.swiper.slideNext()}>
            <svg width="13" height="24" viewBox="0 0 13 24" fill="none">
              <path d="M11.3462 10.5463L1.46276 20.4297L1.46276 23.3548L12.8088 12.0089L11.3462 10.5463Z" fill="currentColor"/>
              <path d="M12.8086 12.0017L1.46259 0.655703L1.46259 3.58082L11.346 13.4643L12.8086 12.0017Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      <style jsx>{`
        .comfort {
          min-height: calc(100vh - 90px);
          background: #262729 url(/static/branding/bg1.png) no-repeat;
          background-position: 100% 100%;
          box-sizing: border-box;
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
          margin-top: 25px;
        }
        .t2 {
          display: flex;
          justify-content: flex-end;
        }
        .sw {
          width: 72px;
          height: 72px;
          color: white;
          border: solid 1px white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          & + & {
            margin-left: -1px;
          }
          &:hover {
            color: #262729;
            background: var(--color1);
            border-color: var(--color1);
          }
        }
      `}</style>
    </div>
  )
}
