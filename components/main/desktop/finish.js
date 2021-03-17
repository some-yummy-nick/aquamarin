import Button from '@/components/button'
import classnames from 'classnames'
import { Router } from '@/routes'

export default function Finish({ inView }) {
  return (
    <div className="finish">
      <div className="wrap">
        <div className="h1">
          Это функционально – <br />
          <span style={{ color: 'white' }}>
            квартиры с мастер-спальнями, <br />
            ванной с окном
          </span>
        </div>
        <div className="t1">
          В 25-этажном доме представлены различные <br />
          форматы квартир: с мастер-спальнями, ванной с окном, <br />
          увеличенными оконными проемами, теплыми лоджиями, <br />
          где вы сможете воплотить самые смелые дизайнерские решения.
        </div>
        <div className="t2">
          <Button
            primary
            onClick={() => Router.pushRoute('search', { page: 'params' })}
          >
            Выбрать квартиру
          </Button>
        </div>
      </div>
      <div className={classnames('picture', { scaled: inView })}>
        <img
          data-swiper-parallax="30%"
          src="/static/branding/finish-slide.jpg"
        />
      </div>
      <style jsx>{`
        .finish {
          display: flex;
          position: relative;
          min-height: calc(100vh - 90px);
        }
        .wrap {
          position: absolute;
          left: 50px;
          top: 30%;
          z-index: 1;
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
        .t2 {
          margin-top: 30px;
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
        }
      `}</style>
    </div>
  )
}
