import withFetch from '@/components/hocs/with-fetch'
import Page, { PagePhablet } from '@/components/page'
import Content from '@/components/content'
import { Link } from '@/routes'
import Spacer from '@/components/typo/spacer'
import DeviceSpecific from '@/components/device-specific'

const Policy = props => {
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
                      dangerouslySetInnerHTML={{ __html: props.policy.html }}
                    />
                  </div>
                  <Spacer tSpace="20px">
                    <Link route={'/policy/soglasie'}>
                      <a>Открыть Согласие на обработку персональных данных</a>
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
                      dangerouslySetInnerHTML={{ __html: props.policy.html }}
                    />
                  </div>
                  <Spacer tSpace="20px">
                    <Link route={'/policy/soglasie'}>
                      <a>Открыть Согласие на обработку персональных данных</a>
                    </Link>
                  </Spacer>
                </Content>
              </PagePhablet>
            )
          }}
        />
      </div>
      <div className="print policy">
        <div dangerouslySetInnerHTML={{ __html: props.policy.html }} />
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

Policy.getInitialProps = async ({ request }) => {
  const response = await request.get('/policy')
  return { policy: response.body.data }
}

export default withFetch(Policy)
