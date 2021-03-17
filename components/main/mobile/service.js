export default function Service() {
  return (
    <div className="service">
      <div className="wrap">
        <div className="h1">
          Это высокий сервис – <br />
          <span style={{ color: 'white' }}>вестибюль с консьерж-сервисом</span>
        </div>
        <div className="t1">
          На 1-м этаже дома будет организовано лобби с возможностью
          консьерж-сервиса, зоной ожидания, библиотекой и офисом Сервисной
          компании. Также для вашего удобства мы оборудовали колясочную комнату
          и отдельный выход во двор.
        </div>
      </div>
      <style jsx>{`
        .service {
          display: flex;
          min-height: 110vh;
          position: relative;
          background: url(/static/branding/service-slide-mobile.jpg);
          background-size: cover;
          background-position: 50% 50%;
        }
        .wrap {
          padding: 70px 20px 0 20px;
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
          font-size: 14px;
          line-height: 150%;
          color: #ffffff;
          margin-top: 25px;
        }
      `}</style>
    </div>
  )
}
