import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'

const swiperParams = {
  spaceBetween: 0,
  slidesPerView: 1,
  keyboard: false,
  mousewheel: false
}

function Card({ height, picture }) {
  return (
    <div className="card">
      <img src={picture} className="card-picture" style={{ height }} />
      <style jsx>{`
        .card {
          overflow: hidden;
          min-height: calc(100vh - 80px);
        }
        .card-picture {
          width: 101%;
          display: block;
          object-fit: cover;
          height: calc(100vh - 80px);
        }
      `}</style>
    </div>
  )
}

export default function Security() {
  const swiperRef = React.useRef(null)

  return (
    <div className="security">
      <div className="wrap">
        <div className="wl">
          <div className="h1">
            Это безопасно – <br />
            <span style={{ color: 'white' }}>
              закрытый двор с <br />
              видеонаблюдением
            </span>
          </div>
          <div className="t1">
            <div className="r1">
              <div className="r1-col">
                <div className="r1-icon">
                  <img src="/static/branding/s1.svg" />
                </div>
                <div className="r1-text">
                  Двор для семейных прогулок, <br />
                  закрытый от машин <br />и доступа посторонних
                </div>
              </div>
              <div className="r1-col">
                <div className="r1-icon">
                  <img src="/static/branding/s2.svg" />
                </div>
                <div className="r1-text">
                  Вся территория двора, включая <br />
                  вход в подъезд, будет <br />
                  выполнена на одном уровне
                </div>
              </div>
            </div>
            <div className="r1">
              <div className="r1-col">
                <div className="r1-icon">
                  <img src="/static/branding/s3.svg" />
                </div>
                <div className="r1-text">
                  На территории оборудованные <br />
                  игровые зоны для детей <br />
                  разных возрастов
                </div>
              </div>
              <div className="r1-col">
                <div className="r1-icon">
                  <img src="/static/branding/s4.svg" />
                </div>
                <div className="r1-text">
                  Спортивные и прогулочные <br />
                  локации с ландшафтным <br />
                  озеленением
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wr">
          <Swiper ref={swiperRef} {...swiperParams}>
            <div className="slide">
              <Card picture="/static/branding/s1.jpg" />
            </div>
            <div className="slide">
              <Card picture="/static/branding/s2.jpg" />
            </div>
            <div className="slide">
              <Card picture="/static/branding/s3.jpg" />
            </div>
          </Swiper>
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
      </div>
      <style jsx>{`
        .security {
          background: #262729;
          min-height: calc(100vh - 80px);
        }
        .h1 {
          font-weight: 500;
          font-size: 28px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
          margin-bottom: 35px;
        }
        .wrap {
        }
        .wl {
          background: #262729 url(/static/branding/bg2m.png) no-repeat;
          background-position: 0 100%;
          background-size: 101%;
          padding: 70px 20px 0 20px;
        }
        .wr {
          position: relative;
          margin-top: 45px;
        }
        .slide {
          min-height: calc(100vh - 90px);
        }
        .r1 {
        }
        .r1-text {
          font-size: 14px;
          line-height: 150%;
          color: #ffffff;
        }
        .r1-col {
          display: flex;
          align-items: center;
          margin-top: 35px;
          img {
            width: 45px;
            display: block;
            margin-right: 20px;
          }
        }
        .sw {
          width: 48px;
          height: 48px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #262729;
          &:hover {
            color: #262729;
            background: var(--color1);
          }
        }
        .t2 {
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          position: absolute;
          display: flex;
          transform: translateZ(0);
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
