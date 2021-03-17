import classnames from 'classnames'

export default function Service({ inView }) {
  const [ended, setEnded] = React.useState(false)

  const video1Ref = React.useRef()
  const video2Ref = React.useRef()

  React.useEffect(() => {
    if (inView && video1Ref.current) {
      video1Ref.current.play()
    }
  }, [inView])

  return (
    <div className="service">
      <div className="wrap">
        <div className="h1">
          Это высокий сервис – <br />
          <span style={{ color: 'white' }}>вестибюль с консьерж-сервисом</span>
        </div>
        <div className="t1">
          На 1-м этаже дома будет организовано лобби <br />
          с возможностью консьерж-сервиса, зоной ожидания, <br />
          библиотекой и офисом Сервисной компании. <br />
          Также для вашего удобства мы оборудовали <br />
          колясочную комнату и отдельный выход во двор.
        </div>
      </div>
      <div className="all" data-swiper-parallax="30%">
        <div className={classnames('picture', { scaled: inView })}>
          <video preload="preload" autoPlay loop muted ref={video2Ref}>
            <source
              src="/static/branding/service-video-2.mp4"
              type="video/mp4"
            />
          </video>
          <video
            preload="preload"
            autoPlay
            muted
            ref={video1Ref}
            onEnded={() => setEnded(true)}
            style={{ opacity: ended ? 0 : 1 }}
          >
            <source
              src="/static/branding/service-video-1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <style jsx>{`
        .service {
          display: flex;
          position: relative;
          min-height: calc(100vh - 90px);
        }
        .wrap {
          z-index: 10;
          position: absolute;
          right: 50px;
          top: 40%;
          transform: translateZ(0);
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
        .all {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        .picture {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          transform-origin: left;
          transition: transform 20000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1.05);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &.scaled {
            transform: scale(1);
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  )
}
