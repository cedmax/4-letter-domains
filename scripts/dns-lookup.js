const dns = require("dns");

module.exports = (domain, callback) =>
  dns.resolveNs(domain, err => callback(!!(err && err.code === "ENOTFOUND")));
