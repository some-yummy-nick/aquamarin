import NoSSR from 'react-no-ssr'
import Burger from '@/components/burger'
import FavouriteNotification from '@/components/favourites/notification'
import classnames from 'classnames'
import { Link } from '@/routes'
import { DesktopCallButton } from '@/components/call-button'
import { ModalConsumer } from '@/components/context/modal'
import { AppContext } from '@/components/context/app'
import { Router } from '@/routes'
import { useContext, useRef, useEffect, useState } from 'react'
import { LayoutContext } from '@/components/context/layout'

const xOffset = 100
const yOffset = 100

const MenuDesktop = props => {
  let logo = 'logo-dark'

  const theme = props.theme
  const transparent = theme === 'transparent'

  const { favouritesIds } = useContext(AppContext)
  const { menuOpened, toggleMenu, closeMenu } = useContext(LayoutContext)

  const hasFavourites = favouritesIds.length > 0

  const buttonRef = useRef()
  const [split, setSplit] = useState(false)

  if (transparent && !menuOpened) {
    logo = 'logo-white'
  }

  useEffect(() => {
    function animate(e) {
      if (void 0 === buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const { top, left, height, width } = rect

      const condition =
        e.clientX >= left &&
        e.clientX <= left + width + xOffset &&
        e.clientY <= top + height + yOffset

      setSplit(condition)
    }

    window.addEventListener('mousemove', animate)
    return () => window.removeEventListener('mousemove', animate)
  }, [])

  return (
    <div className={classnames('menu flex items-center', { [theme]: true })}>
      <div className="basis-1">
        <div className="burger-wrap">
          <div onClick={toggleMenu}>
            <Burger
              mode={menuOpened ? 'close' : null}
              inverse={theme === 'transparent' && !menuOpened}
            />
          </div>
        </div>
      </div>
      <div className="basis-3 flex justify-center relative">
        <div className={classnames('split-button', { split })}>
          <div
            className="split-button-lft"
            onClick={() => Router.pushRoute('genplan')}
          >
            На генплане
          </div>
          <div className="split-button-divider" />
          <div className="split-button-base" ref={buttonRef}>
            <span>Выбрать квартиру</span>
          </div>
          <div
            className="split-button-rgt"
            onClick={() => Router.pushRoute('search', { page: 'params' })}
          >
            По параметрам
          </div>
        </div>
      </div>
      <div className="basis-4 flex justify-center">
        <div className="logo-wrap" onClick={closeMenu}>
          <Link route="main">
            <a>
              <img src={`/static/branding/${logo}.svg`} height="75" />
            </a>
          </Link>
        </div>
      </div>
      <ModalConsumer>
        {({ showModal }) => (
          <div className="basis-4 flex justify-end">
            <div className="call-button-wrap">
              <DesktopCallButton
                theme={theme}
                menuOpened={menuOpened}
                onClickCall={async () => {
                  const CallMe = await import('@/components/modals/call-me')
                  showModal(CallMe.default, { centerContent: true })
                }}
              />
            </div>
          </div>
        )}
      </ModalConsumer>
      <NoSSR>
        {hasFavourites && (
          <div
            className="favourites-wrap"
            onClick={() => {
              Router.pushRoute('favourites')
              closeMenu()
            }}
          >
            <FavouriteNotification
              theme={theme}
              menuOpened={menuOpened}
              count={favouritesIds.length}
            />
          </div>
        )}
      </NoSSR>
      <style jsx>{`
        .menu {
          height: 90px;
          background: white;
          padding: 0 50px 0 50px;
          transform: translateZ(0);
          &.dark {
          }
          &.transparent {
            background: transparent;
          }
          &.alternate {
          }
        }
        .call-button-wrap {
          padding-top: 5px;
        }
        .favourites-wrap {
          top: 50%;
          right: 350px;
          position: absolute;
          transform: translateY(-50%);
        }
        .select-flat :global(a) {
          text-decoration: none;
          font-size: 1.2rem;
          padding: 15px 35px;
          text-transform: uppercase;
          color: var(--color1);
          border: 3px solid var(--color1);
          border-radius: 36px;
        }
        .select-flat.transparent :global(a) {
          background: var(--color1);
          color: black;
        }
        .logo-wrap {
          margin-top: 5px;
        }
        .opened {
          background: var(--color7);
        }
        .split-button {
          color: #ff4646;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          display: inline-flex;
          position: relative;
          // pseudo-hover state
          &.split {
            .split-button-base {
              width: 100%;
              span {
                opacity: 0;
              }
            }
            .split-button-lft,
            .split-button-rgt {
              opacity: 1;
              transition-delay: 0.2s;
            }
            .split-button-divider {
              opacity: 1;
            }
          }
        }
        .split-button-lft,
        .split-button-base,
        .split-button-rgt {
          height: 40px;
          box-sizing: border-box;
          border-radius: 40px;
          border: solid 2px #ff4646;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 25px;
          white-space: nowrap;
        }
        .split-button-base {
          top: 0;
          left: 50%;
          width: 180px;
          position: absolute;
          transform: translateX(-50%);
          transition: 0.5s;
          padding: 0;
          span {
            transition: 0.2s;
            transition-delay: 0.2s;
          }
        }
        .split-button-lft,
        .split-button-rgt {
          position: relative;
          cursor: pointer;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.2s;
          border-color: transparent;
          &:hover {
            color: var(--color1);
          }
        }
        .split-button-lft {
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .split-button-rgt {
          border-left: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .split-button-divider {
          height: 40px;
          width: 1px;
          background: #ff4646;
          opacity: 0;
          transition: 0.2s;
          transition-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}

export default MenuDesktop
