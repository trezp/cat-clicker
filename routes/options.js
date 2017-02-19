const apiKey = require('./config');

module.exports = (keyWord, queryString) => {
  let uri = 'http://api.wordnik.com:80/v4/word.json/';
  uri += keyWord;
  uri += '/';
  uri += queryString;
  uri += '?useCanonical=true&limitPerRelationshipType=10&';

  return options = {
    uri: uri,
    qs: {
      api_key: apiKey
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
}
