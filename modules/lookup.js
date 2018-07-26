const db = require('../scripts/db')
const eachLimit = require('async/eachLimit')
const bar = require('../scripts/progress-bar')
const dnsLookup = require('../scripts/dns-lookup')

const lookupDomain = domainExtension => (combination, callback) => {
  const domain = combination.name + domainExtension

  dnsLookup(domain, available => {
    db.get('combinations')
      .find(combination)
      .set('checked', true)
      .set('available', available)
      .write()
    bar.increment()
    callback(null, combination)
  })
}

module.exports = ({ parallel, domainExtension }) =>
  new Promise(resolve => {
    const combinations = db.get('combinations')
    bar.start(
      combinations.size().value(),
      combinations
        .filter({ checked: true })
        .size()
        .value()
    )

    eachLimit(
      combinations.filter({ checked: false }),
      parallel,
      lookupDomain(domainExtension),
      resolve
    )
  })
