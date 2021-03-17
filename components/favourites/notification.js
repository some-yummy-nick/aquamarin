import classnames from 'classnames'

const Notification = ({ count, theme, menuOpened }) => (
  <div
    className={classnames('notification', {
      [theme]: true,
      opened: menuOpened
    })}
  >
    {/* prettier-ignore */}
    <span>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20Z" fill="url(#paint0_radial)"/>
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.9949 19.9949) scale(19.9992)">
            <stop offset="0.5625" stopColor="#FFFF00" stopOpacity="0"/>
            <stop offset="0.78125" stopColor="#FFC000" stopOpacity="0.155"/>
            <stop offset="1" stopColor="#FF8200" stopOpacity="0.31"/>
          </radialGradient>
        </defs>
      </svg>
    </span>
    <div className="count">{count}</div>
    <div className="label">
      <div>Выбрано</div> квартир
    </div>
    <style jsx>{`
      .notification {
        width: 40px;
        height: 40px;
        position: relative;
        cursor: pointer;
        color: black;
        span {
          color: var(--color1);
        }
        &.transparent {
          span {
            color: white;
          }
        }
        &.opened {
          span {
            color: black;
          }
        }
        &:hover {
          .label {
            display: block;
          }
          .count {
          }
          svg {
          }
        }
        &.opened {
          &:hover {
            svg {
            }
          }
        }
      }
      .count {
        color: var(--color1);
        font-size: 20px;
        font-weight: 500;
        top: 50%;
        left: 50%;
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        .transparent & {
          color: white;
        }
        .opened & {
          color: var(--color1);
        }
      }
      .label {
        font-weight: 500;
        font-size: 10px;
        text-transform: uppercase;
        color: #646464;
        position: absolute;
        line-height: 1;
        bottom: 10px;
        left: 50px;
        .transparent & {
          color: white;
        }
        .opened & {
          color: #646464;
        }
      }
    `}</style>
  </div>
)

export default Notification
