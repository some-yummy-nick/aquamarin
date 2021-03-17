import classnames from 'classnames'
import Menu from '@/components/menu'
import Navigation from '@/components/navigation'
import ModalsPortal from '@/components/modals/portal'
import posed from 'react-pose'
import Cookies from '@/components/cookies'
import NoSRR from 'react-no-ssr'
import Footer from '@/components/footer'
import { useContext, useState } from 'react'
import { LayoutContext } from '@/components/context/layout'
import { AppConsumer } from '@/components/context/app'
import { AppContext } from '@/components/context/app'

const Page = props => {
  const app = useContext(AppContext)
  const { closeMenu, menuOpened, toggleMenu } = useContext(LayoutContext)

  return (
    <>
      {menuOpened && <Navigation closeMenu={closeMenu} />}
      <div id="layout" className={classnames('layout', {})}>
        {props.menu && (
          <div
            className={classnames('menu-wrap', {
              fixed: props.stickHeader
            })}
          >
            <Menu theme={props.theme} />
          </div>
        )}
        <div
          className={classnames('body-wrap', {
            paddingless: !props.menu
          })}
        >
          {props.children}
        </div>
        {props.footer && (
          <div className="footer-wrap">
            <Footer />
          </div>
        )}
        <ModalsPortal />
        <NoSRR>
          {app.cookiesShown || (
            <Cookies onRequestClose={() => app.setCookiesShown(true)} />
          )}
        </NoSRR>
        <AppConsumer>
          {({ user }) => (
            <NoSRR>
              {!user ? (
                <home-widget
                  online-service-link="https://unistroyrf.ru/online"
                  confidential-link="https://unistroyrf.ru/politika"
                  show-delay="10000"
                  cookie-live="1"
                  source="new.vesna-kzn.ru"
                />
              ) : null}
            </NoSRR>
          )}
        </AppConsumer>
      </div>
      <style jsx>{`
        @import 'mixins/r';
        .body-wrap {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 92px);
          :global(.is-mobile) & {
            min-height: 100%;
            margin-top: 80px;
          }
        }
        .paddingless {
          padding: 0;
        }
        .layout {
        }
        .menu-wrap {
          top: 0;
          left: 0;
          width: 100%;
          z-index: 600;
          position: sticky;
          &.fixed {
            position: fixed;
          }
          :global(.is-mobile) & {
            position: fixed;
          }
        }
        .navigation-wrap {
          top: 0;
          left: 0;
          z-index: 1000;
          bottom: 0;
          position: fixed;
          pointer-events: none;
          &.opened {
            pointer-events: all;
          }
        }
        .navigation-wrap :global(.sidebar-wrap) {
          top: 0;
          left: 0;
          bottom: 0;
          width: 640px;
          position: fixed;
          z-index: 1000;
          transform: translateX(-100%);
        }
        .real-burger {
          top: 32px;
          left: 50px;
          z-index: 1001;
          position: fixed;
          cursor: pointer;
          color: black;
          &.inverse {
            color: white;
          }
        }
        .fader-wrap :global(.fader) {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: fixed;
          z-index: 1000;
          transform: translateX(-100%);
          // -webkit-backdrop-filter: blur(20px);
          // backdrop-filter: blur(20px);
          background: url(/static/branding/menu-blur.jpg);
          background-size: cover;
        }
        .fader-wrap.opened :global(.fader) {
          transform: translateX(0%);
        }
      `}</style>
    </>
  )
}

Page.defaultProps = {
  menu: true,
  footer: false
}

export default Page
