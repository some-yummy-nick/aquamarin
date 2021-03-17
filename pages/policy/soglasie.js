import withFetch from '@/components/hocs/with-fetch'
import Page, { PagePhablet } from '@/components/page'
import Content from '@/components/content'
import { Link } from '@/routes'
import Spacer from '@/components/typo/spacer'
import DeviceSpecific from '@/components/device-specific'

const Soglasie = props => {
  return (
    <>
      <div className="no-print">
        <DeviceSpecific
          {...props}
          desktop={() => {
            return (
              <Page>
                <Content width={1280}>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.soglasie.html
                      }}
                    />
                  </div>
                  <Spacer tSpace="20px">
                    <Link route={'/policy'}>
                      <a>Перейти к политике конфиденциальности</a>
                    </Link>
                  </Spacer>
                </Content>
              </Page>
            )
          }}
          phablet={() => {
            return (
              <PagePhablet>
                <Content width={1280}>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.soglasie.html
                      }}
                    />
                  </div>
                  <Spacer tSpace="20px">
                    <Link route={'/policy'}>
                      <a>Перейти к политике конфиденциальности</a>
                    </Link>
                  </Spacer>
                </Content>
              </PagePhablet>
            )
          }}
        />
      </div>
      <div className="print soglasie">
        <div dangerouslySetInnerHTML={{ __html: props.soglasie.html }} />
      </div>

      <style global jsx>
        {`
          .print {
            display: none;
          }
          @media print {
            html,
            body {
              min-width: 100%;
            }
            .no-print {
              display: none;
            }
            .print {
              display: block;
            }
          }
        `}
      </style>
    </>
  )
}

Soglasie.getInitialProps = async ({ request }) => {
  const response = await request.get('/policy/soglasie')
  return { soglasie: response.body.data }
}

export default withFetch(Soglasie)
