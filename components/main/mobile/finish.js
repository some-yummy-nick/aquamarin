import Button from '@/components/button'
import { Router } from '@/routes'

export default function Finish() {
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
        <img
          src="/static/branding/finish-slide.jpg"
          style={{ width: '100%' }}
        />
        <div className="t1">
          В 25-этажном доме представлены различные форматы квартир: с
          мастер-спальнями, ванной с окном, увеличенными оконными проемами,
          теплыми лоджиями, где вы сможете воплотить самые смелые дизайнерские
          решения.
        </div>
        <div className="t2">
          <Button
            block
            primary
            onClick={() => Router.pushRoute('search', { page: 'params' })}
          >
            Выбрать квартиру
          </Button>
        </div>
      </div>
      <style jsx>{`
        .finish {
          // display: flex;
          // position: relative;
          min-height: calc(100vh - 80px);
          background: #3d3d3d;
          // background: url(/static/branding/finish-slide.jpg);
          // background-size: cover;
          // background-position: 0 100%;
        }
        .wrap {
        }
        .h1 {
          font-weight: 500;
          font-size: 28px;
          line-height: 120%;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color1);
          font-family: var(--heading-font);
          padding: 40px 20px 20px 20px;
        }
        .t1 {
          color: white;
          font-size: 14px;
          line-height: 150%;
          margin-top: 20px;
          padding: 20px;
          padding-top: 0;
        }
        .t2 {
          padding: 20px;
          padding-bottom: 50px;
        }
      `}</style>
    </div>
  )
}
