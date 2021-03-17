import React from 'react'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from '@/fetch'

export default Page => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      if (Page.getInitialProps) {
        const gmc = nextCookie(ctx).gmc || null
        const token = nextCookie(ctx).token || null
        return Page.getInitialProps({ ...ctx, request: fetch({ token, gmc }) })
      }
    }

    render() {
      const gmc = cookie.get('gmc') || null
      const token = cookie.get('token') || null
      return <Page {...this.props} request={fetch({ token, gmc })} />
    }
  }
}
