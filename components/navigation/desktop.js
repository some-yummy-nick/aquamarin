import NoSSR from 'react-no-ssr'
import Hotkeys from 'react-hot-keys'
import classnames from 'classnames'
import { LayoutContext } from '@/components/context/layout'
import { Link } from '@/routes'
import { Router } from '@/routes'
import { ModalContext } from '@/components/context/modal'
import { AppConsumer } from '@/components/context/app'
import { useContext } from 'react'

const DesktopNavigation = ({ closeMenu }) => {
  const { showModal } = useContext(ModalContext)
  const { menuOpened } = useContext(LayoutContext)

  function navigate(e, route, params = {}) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    Router.pushRoute(route, params)
    closeMenu()
  }

  async function openLoginForm() {
    const Login = await import('@/components/modals/login')
    showModal(Login.default, { centerContent: true })
  }

  return (
    <Hotkeys keyName="ctrl+alt+u,alt+q,alt+u" onKeyDown={openLoginForm}>
      <div className={classnames('menu', { opened: menuOpened })}>
        <AppConsumer>
          {({ logout, user }) => (
            <div className="menu-inner">
              <div className="menu-col">
                <div className="label">О комплексе</div>
                <div className="items">
                  <div className="item">
                    <Link to="main">
                      <div>
                        <a onClick={e => navigate(e, 'main')}>Главная</a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="gallery">
                      <div>
                        <a onClick={e => navigate(e, 'gallery')}>Галерея</a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="infrastructure">
                      <div>
                        <a onClick={e => navigate(e, 'infrastructure')}>
                          Инфраструктура
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="location">
                      <div>
                        <a onClick={e => navigate(e, 'location')}>
                          Расположение
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="about">
                      <div>
                        <a onClick={e => navigate(e, 'about')}>О проекте</a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="menu-col">
                <div className="label">Выбрать квартиру</div>
                <div className="items">
                  <div className="item">
                    <Link to="genplan">
                      <div>
                        <a onClick={e => navigate(e, 'genplan')}>Генплан</a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="search" params={{ page: 'params' }}>
                      <div>
                        <a
                          onClick={e =>
                            navigate(e, 'search', { page: 'params' })
                          }
                        >
                          По параметрам
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="search" params={{ page: 'plannings' }}>
                      <div>
                        <a
                          onClick={e =>
                            navigate(e, 'search', { page: 'plannings' })
                          }
                        >
                          По планировкам
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="search" params={{ page: 'matrix' }}>
                      <div>
                        <a
                          onClick={e =>
                            navigate(e, 'search', { page: 'matrix' })
                          }
                        >
                          По шахматке
                        </a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="menu-col">
                <div className="label">информация</div>
                <div className="items">
                  <div className="item">
                    <Link to="news">
                      <div>
                        <a onClick={e => navigate(e, 'news')}>Новости</a>
                      </div>
                    </Link>
                  </div>
                  {/* <div className="item"> */}
                  {/*   <span onClick={() => navigate('actions')}> */}
                  {/*     Акции */}
                  {/*   </span> */}
                  {/* </div> */}
                  <div className="item">
                    <Link to="developer">
                      <div>
                        <a onClick={e => navigate(e, 'developer')}>
                          Застройщик
                        </a>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="contacts">
                      <div>
                        <a onClick={e => navigate(e, 'contacts')}>Контакты</a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="menu-col">
                <div className="label">как купить</div>
                <div className="items">
                  <div className="item">
                    <span
                      onClick={() =>
                        window.open('https://unistroyrf.ru/ipoteka/')
                      }
                    >
                      Ипотека
                    </span>
                  </div>
                  {/* <div className="item"> */}
                  {/*   <span */}
                  {/*     onClick={() => */}
                  {/*       window.open('https://unistroyrf.ru/oplata/rassrochka/') */}
                  {/*     } */}
                  {/*   > */}
                  {/*     Рассрочка */}
                  {/*   </span> */}
                  {/* </div> */}
                  <div className="item">
                    <span
                      onClick={() =>
                        window.open('https://unistroyrf.ru/oplata/obmen/')
                      }
                    >
                      Trade In
                    </span>
                  </div>
                </div>
              </div>
              <NoSSR>
                <div className="user">
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
                    <span className="auth" onClick={openLoginForm}>
                      Авторизация
                    </span>
                  )}
                </div>
              </NoSSR>
            </div>
          )}
        </AppConsumer>
        <style jsx>{`
          .menu {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: fixed;
            z-index: 500;
            background: url(/static/branding/menu-background.svg);
            background-size: cover;
          }
          .menu-inner {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            position: absolute;
            display: flex;
            padding-top: 35vh;
            justify-content: center;
          }
          .label {
            font-size: 18px;
            text-transform: uppercase;
            display: inline-block;
            margin-bottom: 25px;
            white-space: nowrap;
            color: #c6c6c6;
            font-weight: 500;
          }
          .item span,
          .item :global(a) {
            display: inline-block;
            font-size: 18px;
            color: #000;
            cursor: pointer;
            margin-top: 10px;
            text-decoration: none;
            &:hover {
              color: var(--color1-dark);
            }
          }
          .user-name {
            font-size: 12px;
            &:hover {
              color: var(--color1-dark);
            }
          }
          .menu-col {
            margin: 0 3%;
          }
          .user {
            left: 50%;
            color: #c6c6c6;
            bottom: 50px;
            position: fixed;
            font-size: 12px;
            transform: translateX(-50%);
            cursor: pointer;
            text-align: center;
          }
          .auth {
            cursor: pointer;
            &:hover {
              color: var(--color2);
            }
          }
        `}</style>
      </div>
    </Hotkeys>
  )
}

export default DesktopNavigation
