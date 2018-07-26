const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db = low(new FileSync('db.json'))
db.defaults({ key: '', combinations: [] }).write()

module.exports = db
