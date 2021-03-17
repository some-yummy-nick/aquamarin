import Document, { Head, Main, NextScript } from 'next/document'
import UAParser from 'ua-parser-js'
import classnames from 'classnames'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      userAgent: ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent,
      ...initialProps
    }
  }

  render() {
    const result = new UAParser(this.props.userAgent)
    return (
      <html
        className={classnames({
          'is-mobile': result.getDevice().type === 'mobile',
          'is-tablet': result.getDevice().type === 'tablet'
        })}
      >
        {/* prettier-ignore */}
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {'development' !== process.env.NODE_ENV && (
            <div dangerouslySetInnerHTML={{ __html: SCRIPTS.join('') }} />
          )}
        </body>
      </html>
    )
  }
}

const SCRIPTS = [
  `
    <!-- UOS online widget -->
    <script src="https://unistroyrf.ru/widgets/online/online.js?d=${new Date()}" async></script>
    <!-- UOS online widget -->
  `,
  `
    <!-- calltouch -->
    <script type="text/javascript">
    (function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)};s.type="text/javascript";s.async=true;s.src="https://mod.calltouch.ru/init.js?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","05ac8bcc");
    </script>
    <!-- calltouch -->
  `
]
