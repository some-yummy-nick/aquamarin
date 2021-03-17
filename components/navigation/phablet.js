import Content from '@/components/content'
import { Router } from '@/routes'
import { ModalContext } from '@/components/context/modal'
import { AppConsumer } from '@/components/context/app'
import { useContext } from 'react'
import { LayoutContext } from '@/components/context/layout'
import { Link } from '@/routes'

const PhabletNavigation = () => {
  const { closeMenu } = useContext(LayoutContext)
  const { showModal } = useContext(ModalContext)

  return (
    <div className="navigation">
      <div className="navigation-inner">
        <AppConsumer>
          {({ logout, user }) => (
            <Content>
              <div className="b menu">
                <div className="l">
                  <div className="flex items-center">
                    <div className="flex-none">О комплексе</div>
                    <div className="flex-auto">
                      <div className="spacer" />
                    </div>
                  </div>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('main')
                    closeMenu()
                  }}
                >
                  Главная
                  <Link to="main">
                    <a>Главная</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('gallery')
                    closeMenu()
                  }}
                >
                  Галерея
                  <Link to="gallery">
                    <a>Галерея</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('infrastructure')
                    closeMenu()
                  }}
                >
                  Инфраструктура
                  <Link to="infrastructure">
                    <a>Инфраструктура</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('location')
                    closeMenu()
                  }}
                >
                  Расположение
                  <Link to="location">
                    <a>Расположение</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('about')
                    closeMenu()
                  }}
                >
                  О проекте
                  <Link to="about">
                    <a>О проекте</a>
                  </Link>
                </div>
              </div>
              <div className="b menu">
                <div className="l">
                  <div className="flex items-center">
                    <div className="flex-none">Выбрать квартиру</div>
                    <div className="flex-auto">
                      <div className="spacer" />
                    </div>
                  </div>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('genplan')
                    closeMenu()
                  }}
                >
                  Генплан
                  <Link to="genplan">
                    <a>Генплан</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('search', { page: 'params' })
                    closeMenu()
                  }}
                >
                  По параметрам
                  <Link to="search" params={{ page: 'params' }}>
                    <a>По параметрам</a>
                  </Link>
                </div>
              </div>
              <div className="b menu">
                <div className="l">
                  <div className="flex items-center">
                    <div className="flex-none">информация</div>
                    <div className="flex-auto">
                      <div className="spacer" />
                    </div>
                  </div>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('news')
                    closeMenu()
                  }}
                >
                  Новости
                  <Link to="news">
                    <a>Новости</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('developer')
                    closeMenu()
                  }}
                >
                  Застройщик
                  <Link to="developer">
                    <a>Застройщик</a>
                  </Link>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    Router.pushRoute('contacts')
                    closeMenu()
                  }}
                >
                  Контакты
                  <Link to="contacts">
                    <a>Контакты</a>
                  </Link>
                </div>
              </div>
              <div className="b menu">
                <div className="l">
                  <div className="flex items-center">
                    <div className="flex-none">как купить</div>
                    <div className="flex-auto">
                      <div className="spacer" />
                    </div>
                  </div>
                </div>
                <div
                  className="i"
                  onClick={() => {
                    window.open('https://unistroyrf.ru/ipoteka/')
                  }}
                >
                  Ипотека
                </div>
                {/* <div */}
                {/*   className="i" */}
                {/*   onClick={() => { */}
                {/*     window.open('https://unistroyrf.ru/oplata/rassrochka/') */}
                {/*   }} */}
                {/* > */}
                {/*   Рассрочка */}
                {/* </div> */}
                <div
                  className="i"
                  onClick={() => {
                    window.open('https://unistroyrf.ru/oplata/obmen/')
                  }}
                >
                  Trade In
                </div>
              </div>
              <div className="login-wrap">
                {user ? (
                  <span
                    onClick={async () => {
                      if (confirm('Вы уверены?')) {
                        await logout()
                        location.replace('/')
                      }
                    }}
                  >
                    {user && user.manager && user.manager.short_name}
                    <div className="user-name">Выход</div>
                  </span>
                ) : (
                  <span
                    onClick={async () => {
                      const Login = await import('@/components/modals/login')
                      showModal(Login.default, { centerContent: true })
                    }}
                  >
                    Авторизация
                  </span>
                )}
              </div>
            </Content>
          )}
        </AppConsumer>
      </div>
      <style jsx>{`
        .navigation {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: fixed;
          overflow: auto;
          background: white;
          z-index: 1000;
        }
        .navigation-inner {
          top: 80px;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          overflow: auto;
        }
        .menu :global(a) {
          display: none;
        }
        .l {
          color: #c6c6c6;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        .i {
          color: black;
          display: flex;
          font-size: 18px;
          min-height: 40px;
          align-items: center;
        }
        .b {
          margin-bottom: 50px;
        }
        .login-wrap {
          .user-name {
            text-decoration: underline;
          }
        }
        .spacer {
          height: 1px;
          margin-left: 10px;
          color: rgba(white, 0.4);
        }
      `}</style>
    </div>
  )
}

export default PhabletNavigation
