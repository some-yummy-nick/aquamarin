import posed from 'react-pose'

const Izba = props => (
  <svg width="35px" height="32px" viewBox="0 0 47 43">
    <path
      fill="rgb(242, 242, 244)"
      d="M46.443,21.484 C46.019,21.968 45.421,22.215 44.820,22.215 C44.329,22.215 43.834,22.048 43.432,21.708 L23.475,4.834 L3.523,21.708 C2.628,22.463 1.285,22.364 0.512,21.485 C-0.256,20.606 -0.154,19.281 0.739,18.525 L22.085,0.473 C22.885,-0.203 24.068,-0.203 24.869,0.473 L46.212,18.525 C47.106,19.280 47.209,20.606 46.443,21.484 ZM22.780,7.776 C23.182,7.437 23.773,7.437 24.172,7.776 L40.260,21.421 C40.495,21.620 40.630,21.911 40.630,22.215 L40.630,41.948 C40.630,42.527 40.151,42.998 39.562,42.998 L7.392,42.998 C6.802,42.998 6.324,42.527 6.324,41.948 L6.324,22.215 C6.324,21.911 6.460,21.620 6.695,21.421 L22.780,7.776 Z"
    />
  </svg>
)

const Favicon = props => (
  <div style={{ visibility: props.total > 0 ? 'visible' : 'hidden' }}>
    <Animated pose={props.total > 0 ? 'opened' : 'closed'} initialPose="closed">
      <div
        className="favicon flex items-center"
        onClick={() => {
          if (props.total > 0) {
            props.onClick()
          }
        }}
      >
        <div className="flex-none">
          <div className="izba">
            <div className="izba-icon">
              <Izba />
              <div className="izba-text">{props.total}</div>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <div className="label">
            сравнение
            <br />
            квартир
          </div>
        </div>
      </div>
    </Animated>
    <style jsx>{`
      .favicon {
        top: 0.5rem;
        left: 2rem;
        cursor: pointer;
        position: absolute;
      }
      .label {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.2;
        text-transform: uppercase;
      }
      .izba-text {
        top: 50%;
        left: 50%;
        font-size: 15px;
        font-weight: 500;
        position: absolute;
        color: var(--color2);
        transform: translate(-50%, -50%);
      }
      .izba-icon {
        margin-right: 0.5rem;
        position: relative;
      }
    `}</style>
  </div>
)

Favicon.defaultProps = {
  onClick() {},
  total: 0
}

const Animated = posed.div({
  opened: {
    x: 0,
    opacity: 1,
    transition: { stiffness: 250, type: 'spring' }
  },
  closed: {
    x: -150,
    opacity: 0,
    transition: { stiffness: 250, type: 'spring' }
  }
})

export default Favicon
