import themes from '@/enums/themes'
import classnames from 'classnames'
import { useContext } from 'react'
import { SettingsContext } from '@/components/context/settings'

const DesktopCallButton = ({ onClickCall, theme, menuOpened }) => {
  const settings = useContext(SettingsContext)
  const phonePts = settings.phone_html.split(/\s/)

  return (
    <div
      className={classnames('button', {
        [theme]: true,
        opened: menuOpened
      })}
    >
      <div className="label" onClick={onClickCall}>
        Заказать звонок
      </div>
      <div>
        <a href={`tel:${settings.phone}`}>
          <small className="pref">{phonePts[1]}</small>{' '}
          <span className="suff">{phonePts[2]}</span>
        </a>
      </div>
      <style jsx>{`
        @import 'mixins/r';
        .button {
          font-size: 14px;
          font-weight: 500;
          text-align: right;
          display: inline-block;
          color: black;
          .opened & {
            a {
            }
          }
        }
        .label {
          cursor: pointer;
          color: var(--color1-dark);
          text-transform: uppercase;
          &:hover {
            text-decoration: underline;
          }
          .opened & {
          }
        }
        a {
          font-size: 20px;
          font-weight: 500;
          color: #646464;
          text-decoration: none;
          margin-top: 2px;
          right: 0.3em;
          position: relative;
          .alternate &,
          .dark &,
          .opened & {
            color: #646464 !important;
          }
          .transparent & {
            color: #fff;
          }
          &:hover {
          }
        }
        :global(.transparent) {
        }
      `}</style>
    </div>
  )
}

DesktopCallButton.defaultProps = {
  onClickCall() {},
  theme: themes.default
}

export default DesktopCallButton
