const setupDb = require('./modules/setup-db')
const lookup = require('./modules/lookup')
const printList = require('./modules/print-list')

;(async config => {
  setupDb(config)
  await lookup(config)
  printList(config)
})(require('./config.json'))
