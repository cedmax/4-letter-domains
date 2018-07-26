const Combinatorics = require("js-combinatorics");

module.exports = ({ chars, domainLength }) =>
  Combinatorics.baseN(chars.split(""), domainLength).toArray();
