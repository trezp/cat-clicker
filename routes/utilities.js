const apiKey = require('./config');

/**
 * Gets wordstuffs 
 * @param {string} type - definitions, phrases, examples, relatedWords
 */
function makeRequest(keyWord, queryString) {
  let uri = `
    http://api.wordnik.com:80/v4/word.json/${keyWord}/${queryString}?useCanonical=true&limitPerRelationshipType=10&`


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

function getWordsWith(type) {
  /* takes in the name of the API object's relationshipType so the associated
  word list can be found with the Array.find method. */
  return function wordList(obj){
    return obj.relationshipType === type;
  }
}

function getRandomNum(length){
  return Math.floor(Math.random() * length);
}
module.exports = {
  makeRequest,
  getWordsWith,
  getRandomNum
}
