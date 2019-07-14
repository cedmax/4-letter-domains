const setupDb = require('./modules/setup-db')
const lookup = require('./modules/lookup')
const printList = require('./modules/print-list')

;(async config => {
  setupDb(config)
  await lookup(config)
  await printList(config)
  process.exit(0)
})(require('./config.json'))
