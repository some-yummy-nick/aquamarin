const auth = require('basic-auth')
const admins = { atmosfera: { password: 'atmosfera2020' } }
module.exports = function(request, response, next) {
  const user = auth(request)

  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="atmosfera"')
    return response.status(401).send()
  }

  return next()
}
