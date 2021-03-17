import Burger from '@/components/burger'
import classnames from 'classnames'
import { useContext } from 'react'
import { Link } from '@/routes'
import { LayoutContext } from '@/components/context/layout'
import { SettingsContext } from '@/components/context/settings'

const MenuPhablet = props => {
  const settings = useContext(SettingsContext)
  const phonePts = settings.phone_html.split(/\s/)
  const { toggleMenu, menuOpened } = useContext(LayoutContext)

  const theme = props.theme
  const transparent = theme === 'transparent'

  let logo = 'logo-dark'
  if (transparent && !menuOpened) {
    logo = 'logo-white'
  }

  return (
    <div
      className={classnames('menu flex items-center', {
        opened: menuOpened,
        transparent: transparent
      })}
    >
      <div className="flex-none">
        <Link route="main">
          <a>
            <img className="logo" src={`/static/branding/${logo}.svg`} />
          </a>
        </Link>
      </div>
      <div className="flex-auto flex justify-center">
        <a href={`tel:${settings.phone}`} className="phone">
          <small>{phonePts[1]}</small> {phonePts[2]}
        </a>
      </div>
      <div className="flex-item">
        <Burger
          onClick={toggleMenu}
          mode={menuOpened ? 'close' : null}
          inverse={transparent && !menuOpened}
        />
      </div>
      <style jsx>{`
        .menu {
          height: 80px;
          background: white;
          padding: 10px 20px;
          box-sizing: border-box;
          &.opened {
            background: white;
          }
          &.transparent {
            background: none;
          }
        }
        a.phone {
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          color: var(--color1-dark);
          .opened & {
            color: var(--color1-dark) !important;
          }
          .transparent & {
            color: white;
          }
        }
        .logo {
          height: 50px;
          display: block;
        }
      `}</style>
    </div>
  )
}

export default MenuPhablet
