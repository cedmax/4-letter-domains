const db = require("../scripts/db");
const logger = require("../scripts/logger");

module.exports = ({ domainExtension }) =>
  logger(
    db
      .getCombinations()
      .filter({ available: true })
      .value()
      .map(
        ({ name }) =>
          `${name}${domainExtension} - https://who.is/whois/${name}${domainExtension}`
      )
      .join("\n")
  );
