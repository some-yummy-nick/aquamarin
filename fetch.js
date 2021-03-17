import agent from 'superagent'
import emitter from '@/emitter'
// prettier-ignore
export default ({ token = null, gmc = null }) => {
  // test
  return {
    baseURL: 'https://uos.unistroyrf.ru/promo/1.0',
    headers: {
      'Alias': 'atmos',
      //'Alias': 'maxim',
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    run() {
      return agent
        .agent()
        .set(this.headers)
        .set(this.auth(token))
        .set('Gmc', gmc)
        .use(req =>{
          req.once('response', res =>{
            if (res.status === 203 && process.browser) {
              emitter.emit('request/logout', { token, gmc })
            }
          })
        })
    },
    get(url) {
      return this.run().get(this.parseUrl(url))
    },
    post(url) {
      return this.run().post(this.parseUrl(url))
    },
    parseUrl(url) {
      return url[0] === '/' ? this.baseURL + url : url
    },
    auth: token => ({ Authorization: `Bearer ${token}` }),
    token: () => token,
  }
}

function HTTPError({ message, statusCode }) {
  this.name = 'HTTPError'
  this.message = message || 'HTTPError'
  this.statusCode = statusCode || 422
  this.stack = new Error().stack
}
HTTPError.prototype = Object.create(Error.prototype)
HTTPError.prototype.constructor = HTTPError

export { HTTPError }
