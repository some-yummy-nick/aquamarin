import ResponsiveHeight from '@/components/responsive-height'
import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'

const swiperParams = {
  spaceBetween: 20,
  slidesPerView: 1,
  keyboard: false,
  mousewheel: false
}

function Card({ height, picture, text }) {
  return (
    <div className="card">
      <img src={picture} className="card-picture" style={{ height }} />
      <div className="card-text" dangerouslySetInnerHTML={{ __html: text }} />
      <style jsx>{`
        .card {
          overflow: hidden;
        }
        .card-picture {
          width: 102%;
          object-fit: cover;
        }
        .card-text {
          font-size: 14px;
          line-height: 120%;
          color: #ffffff;
          margin-top: 16px;
        }
      `}</style>
    </div>
  )
}

const ResponsiveCard = ResponsiveHeight({ width: 320, height: 240 })(Card)

export default function Parking() {
  const swiperRef = React.useRef(null)

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
          изолированными въездами для каждого уровня. В доме будет 3 скоростных
          лифта, 2 из которых – со спуском в паркинг.
        </div>
        <div className="t1">
          <Swiper ref={swiperRef} {...swiperParams}>
            <div className="slide">
              <ResponsiveCard
                picture="/static/branding/p1.jpg"
                text="Места для двух автомобилей"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                picture="/static/branding/p2.jpg"
                text="Места для  мотоциклов"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                picture="/static/branding/p3.jpg"
                text="Гаражные боксы"
              />
            </div>
            <div className="slide">
              <ResponsiveCard
                picture="/static/branding/p4.jpg"
                text="Кладовые помещения"
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
        .parking {
          background: #262729 url(/static/branding/bg1m.png) no-repeat;
          background-position: 0 100%;
          box-sizing: border-box;
          background-size: 100%;
          padding: 40px 20px;
          padding-top: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .h1 {
          font-weight: 500;
          font-size: 28px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
        }
        .t1 {
          color: white;
          font-size: 14px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 25px;
        }
        .t1 {
          margin-top: 25px;
        }
        .t2 {
          display: flex;
          margin-top: 40px;
          justify-content: flex-end;
        }
        .sw {
          width: 48px;
          height: 48px;
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
