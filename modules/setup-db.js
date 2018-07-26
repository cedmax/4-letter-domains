const db = require('../scripts/db')
const combine = require('../scripts/combine')

module.exports = ({ chars, domainLength, domainExtension }) => {
  const key = `${domainLength}-${chars}${domainExtension}`
  const lastKey = db.get('key').value()

  if (key !== lastKey) {
    const combinations = combine({ chars, domainLength }).map(item => ({
      name: item.join(''),
      checked: false
    }))

    db.set('combinations', combinations)
      .set('key', key)
      .write()
  }
}
