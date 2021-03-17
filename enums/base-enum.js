export default {
  toHash: function(key = 'key') {
    const values = Object.values(this).filter(x => typeof x !== 'function')
    return values.reduce((acc, curr) => {
      acc[curr[key]] = curr
      return acc
    }, {})
  },

  getByKey: function(key) {
    return this[key] || {}
  }
}
