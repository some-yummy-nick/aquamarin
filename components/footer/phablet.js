import Content from '@/components/content'
import { ModalConsumer } from '@/components/context/modal'
import Spacer from '@/components/typo/spacer'
import Socials from '@/components/socials'
import { useContext } from 'react'
import { SettingsContext } from '@/components/context/settings'
import { DeveloperLink } from './index'

export default ({ ...props }) => {
  const settings = useContext(SettingsContext)
  const phonePts = settings.phone_html.split(/\s/)

  return (
    <ModalConsumer>
      {({ showModal }) => (
        <Content paddingless>
          <div className="footer">
            <Spacer tSpace={30}>
              <div className="flex items-center">
                <div className="flex-auto">
                  <img
                      src={require('@/static/branding/logo.svg')}
                      height={60} width={150}
                  />
                </div>
                <div>
                  <div className="flex-none">
                    <div
                        className="label"
                        onClick={async () => {
                          const CallMe = await import('@/components/modals/call-me')
                          showModal(CallMe.default, { centerContent: true })
                        }}
                    >
                      Заказать звонок
                    </div>
                  </div>
                  <a className="phone" href={`tel:${settings.phone}`}>
                    <span className="pref">{phonePts[1]}</span>{' '}
                    <span className="suff">{phonePts[2]}</span>
                  </a>
                </div>
              </div>
            </Spacer>
            <Spacer tSpace={30}>
              <div className="flex items-center footer__bottom">
                <div className="copyright t5">
                  <div>Предложение не является публичной офертой.</div>
                  <div>
                    <div className="developer">
                      Застройщик: <span className="primary"><DeveloperLink {...settings.developer} /></span>
                    </div>
                  </div>
                </div>
                <div className="socials-wrap flex justify-center">
                  <Socials {...settings.social} />
                </div>
              </div>
            </Spacer>
          </div>
          <style jsx>{`

            .copyright{
              position:absolute;
              left:0;
            }
            .copyright .primary{
              color: #00A9A4;
            }
            .footer {
              padding: 20px;
              padding-top: 40px;
            }
            .footer__bottom{
              position:relative;
            }
            .t5 {
              font-size: 9px;
              font-weight: 500;
              line-height: 140%;
            }
            .phone {
              font-size: 18px;
              font-weight: 500;
              text-decoration: none;
              .pref {
                font-size: 12px;
              }
              .suff {
              }
            }
            .label {
              font-size: 12px;
              font-weight: 500;
              text-transform: uppercase;
              text-align:right;
            }
          `}</style>
        </Content>
      )}
    </ModalConsumer>
  )
}
