import App, { Container } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import Error from './_error'
import { UserAgentProvider } from '@quentin-sommer/react-useragent'
import { AppProviderPersisted } from '@/components/context/app'
import { LayoutProvider } from '@/components/context/layout'
import { ModalProvider } from '@/components/context/modal'
import SeoHead from '@/components/seo/head'
import { Styles } from '@/components/branding'
import 'nprogress/nprogress.css'
import { SettingsContext } from '@/components/context/settings'
import Fingerprint2 from 'fingerprintjs2'
import { get } from 'lodash'
import fetch from '@/fetch'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'
import emitter from '@/emitter'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeError', () => NProgress.done())

Router.events.on('routeChangeComplete', () => {
  window.scrollTo(0, 0)
  NProgress.done()
})

Router.events.on('routeChangeStart', () => {
  const token = cookie.get('token') || null
  if (null === token) {
    emitter.emit('request/logout', { token })
  }
})

if (process.browser) {
  window.onUniPageLoad ||
    (window.onUniPageLoad = () => {
      emitter.emit('onUniPageLoad')
    })
}

const Providers = props => (
  <AppProviderPersisted>
    <ModalProvider>
      <LayoutProvider>
        <SettingsContext.Provider value={props.appSettings}>
          {props.children}
        </SettingsContext.Provider>
      </LayoutProvider>
    </ModalProvider>
  </AppProviderPersisted>
)

let settings = null

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      error: false,
      appSettings: {
        phone_html: ''
      },
      userAgent: ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
    }

    if (settings) {
      pageProps.appSettings = settings
    } else {
      try {
        const { token, gmc } = nextCookie(ctx)
        const response = await fetch({ token, gmc }).get('/complex/settings')
        const { meta, data } = response.body
        // TODO: сделать везде проверку телефона на null
        let struct = data
        if (struct.phone_html === null) {
          struct.phone_html = ''
        }
        // EOF TODO
        pageProps.appSettings = { ...meta, ...struct }
        settings = pageProps.appSettings
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error)
        }
      }
    }

    try {
      if (Component.getInitialProps) {
        const initialProps = await Component.getInitialProps(ctx)
        Object.assign(pageProps, { ...initialProps })
      }
    } catch (error) {
      pageProps.error = error
      if (process.env.NODE_ENV === 'development') {
        console.error(error)
      }
    }

    return { pageProps }
  }

  componentDidMount() {
    const createMurmur = components => {
      const values = components.map(component => component.value)
      return Fingerprint2.x64hash128(values.join(''), 31)
    }

    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        new Fingerprint2.get(components => {
          const result = createMurmur(components)
          cookie.set('gmc', result)
        })
      })
    } else {
      setTimeout(function() {
        new Fingerprint2.get(components => {
          const result = createMurmur(components)
          cookie.set('gmc', result)
        })
      }, 500)
    }

    const token = cookie.get('token') || null
    if (null === token) {
      emitter.emit('request/logout', { token })
    }
  }

  render() {
    const { Component, pageProps } = this.props
    const {
      userAgent,
      error,
      seo,
      appSettings,
      ...passThroughProps
    } = pageProps

    let pageSEO = seo
    if (void 0 === pageSEO && get(appSettings, 'seo.title')) {
      pageSEO = appSettings.seo
    }

    return (
      <UserAgentProvider ua={userAgent}>
        <Container>
          <Head>
            <title>
              Купить квартиру в доме на Максимова в Казани. Новые квартиры в
              Казани от застройщика
            </title>
            <meta
              name="description"
              content="Купить квартиру в новостройке от застройщика в доме на Максимова в Казани в рассрочку, ипотеку, мат. капитал или по трейд ин."
            />
          </Head>
          {pageSEO && <SeoHead {...pageSEO} />}
          <Providers appSettings={appSettings}>
            {error ? (
              <Error error={error} />
            ) : (
              <Component seo={seo} {...passThroughProps} />
            )}
          </Providers>
          <Styles />
        </Container>
      </UserAgentProvider>
    )
  }
}
