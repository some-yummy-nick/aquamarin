import classnames from 'classnames'
import ModalsPortal from '@/components/modals/portal'
import Cookies from '@/components/cookies'
import NoSRR from 'react-no-ssr'
import { useContext } from 'react'
import { MenuPhablet } from '@/components/menu'
import { NavigationPhablet } from '@/components/navigation'
import { LayoutContext } from '@/components/context/layout'
import { FooterPhablet } from '@/components/footer'
import { AppContext } from '@/components/context/app'
import { AppConsumer } from '@/components/context/app'

const PagePhablet = ({ children, footer = true, theme }) => {
  const { menuOpened } = useContext(LayoutContext)
  const app = useContext(AppContext)
  return (
    <>
      <div className={classnames('all-wrap')}>
        <div className="menu-wrap">
          <MenuPhablet theme={theme} />
        </div>
        <div className="page-wrap">{children}</div>
        {footer && (
          <div className="footer-wrap">
            <FooterPhablet />
          </div>
        )}
      </div>
      {menuOpened && (
        <div className="navigation-wrap">
          <NavigationPhablet />
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
      <style jsx>{`
        .menu-wrap {
          top: 0;
          right: 0;
          left: 0;
          z-index: 2500;
          position: sticky;
        }
        .hidden {
          visibility: hidden;
        }
        .page-wrap {
          position: relative;
          min-height: calc(100vh - 80px);
        }
      `}</style>
    </>
  )
}

export default PagePhablet
