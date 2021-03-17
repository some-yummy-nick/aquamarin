import classnames from 'classnames'

export default function Hero({ inView, onLoad }) {
  const [ready, setReady] = React.useState(false)
  const [ready1, setReady1] = React.useState(false)

  React.useEffect(() => {
    let timer
    const img = document.createElement('img')

    img.src = '/static/branding/main-slide.jpg'
    img.onload = () => {
      timer = setTimeout(() => setReady1(true), 1000)
      setReady(true)
      onLoad()
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="main">
      <div className="wrap">
        <div className="h1-wrap">
          <div
            className={classnames('h1 transition', { 'h1-hidden': !ready1 })}
          >
            ЭТО - ТОЛЬКО ДЛЯ ВАС, <br />
            ВЕДЬ ВЫ ОСОБЕННЫ
          </div>
        </div>
        <div style={{ height: 25 }} />
        <div className="t1-wrap">
          <div
            className={classnames('t1 transition', { 't1-hidden': !ready1 })}
          >
            Уникальное сочетание удобства расположения, <br />
            стильной архитектуры, бережного девелопмента <br />и высокого
            сервиса от Унистрой.
          </div>
        </div>
      </div>
      <div className={classnames('picture', { scaled: ready && inView })}>
        <img src="/static/branding/main-slide.jpg" data-swiper-parallax="30%" />
      </div>
      <style jsx>{`
        .main {
          display: flex;
          overflow: hidden;
          position: relative;
          min-height: calc(100vh - 90px);
        }
        .h1 {
          font-weight: 500;
          font-size: 80px;
          line-height: 106.68%;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #ffffff;
          font-family: var(--heading-font);
        }
        .h1-wrap,
        .t1-wrap {
          overflow: hidden;
        }
        .wrap {
          z-index: 1;
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-60%);
        }
        .t1 {
          font-size: 16px;
          line-height: 150%;
          color: #ffffff;
        }
        .picture {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          transform-origin: left;
          transform: scale(1.05);
          transition: transform 20000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &.scaled {
            transform: scale(1);
          }
        }
        .transition {
          transition: transform 3000ms cubic-bezier(0.19, 1, 0.22, 1),
            opacity 3000ms cubic-bezier(0.19, 1, 0.22, 1);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .h1-hidden {
          transform: translateY(101%);
        }
        .t1-hidden {
          transform: translateY(-101%);
        }
      `}</style>
    </div>
  )
}
