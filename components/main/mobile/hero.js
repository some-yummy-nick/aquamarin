import classnames from 'classnames'

export default function Hero() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return (
    <div className="main">
      <div className="wrap">
        <div className="h1">
          ЭТО - ТОЛЬКО ДЛЯ ВАС, <br />
          ВЕДЬ ВЫ ОСОБЕННЫ
        </div>
        <div className="t1">
          Уникальное сочетание удобства <br />
          расположения, стильной архитектуры, <br />
          бережного девелопмента и высокого <br />
          сервиса от Унистрой.
        </div>
      </div>
      <div className={classnames('picture', { scaled: !ready })}>
        <img src="/static/branding/main-slide-mobile.jpg" />
      </div>
      <style jsx>{`
        .main {
          display: flex;
          overflow: hidden;
          position: relative;
          min-height: calc(100vh - 80px);
        }
        .h1 {
          font-weight: 500;
          font-size: 40px;
          line-height: 106.68%;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #ffffff;
          font-family: var(--heading-font);
        }
        .wrap {
          z-index: 1;
          padding: 40px 20px;
          position: relative;
        }
        .t1 {
          font-size: 14px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 20px;
        }
        .picture {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          transform-origin: left;
          transition: transform 20000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &.scaled {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}
