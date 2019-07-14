const whois = require('whois-json')
const db = require('../scripts/db')
const logger = require('../scripts/logger')
const sleep = timer => new Promise(resolve => setTimeout(resolve, timer))
const bar = require('../scripts/progress-bar')

const checkWhois = async domain => {
  try {
    await sleep(500)
    const { status, expireDate } = await whois(domain)
    bar.increment()
    if (!['ok', 'UNASSIGNABLE', 'inactive / dnsHold'].includes(status)) {
      return { domain, status, expireDate }
    }
  } catch (e) {
    logger(e)
    logger(`failed ${domain}, retrying`)
    await sleep(5000)
    return checkWhois(domain)
  }
}

module.exports = async ({ domainExtension }) => {
  const data = db
    .get('combinations')
    .filter({ available: true })
    .value()

  const whoisList = data.map(({ name }) => `${name}${domainExtension}`)
  logger('')
  const results = []
  bar.start(whoisList.length, 0)
  for (let i = 0; i < whoisList.length; i++) {
    const a = await checkWhois(whoisList[i])
    results.push(a)
  }
  logger('')

  logger(
    results
      .filter(a => a)
      .sort(({ expireDate }, { expireDate: expireDateB }) =>
        expireDate < expireDateB ? -1 : 1
      )
      .map(
        ({ domain, status, expireDate }) =>
          `${domain} ${status} ${expireDate ? `(${expireDate})` : ''}`
      )
      .join('\n')
  )
}
