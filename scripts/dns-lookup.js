const dns = require('dns')

module.exports = (domain, callback) =>
  dns.resolveNs(domain, err => {
    const available = !!(err && err.code === 'ENOTFOUND')
    callback(available)
  })
