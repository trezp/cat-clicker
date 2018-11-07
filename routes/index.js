const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');
const utils = require('./utilities');

function findRelationshipType(type, response){
  return response.find( (item) => {
    if (item.relationshipType === type){
      return item.words
    }
  });  
}

router.get('/', function(req, res, next) {
  const request = utils.makeRequest(req.query.wordsearch, 'relatedWords'); 
  
  requestPromise(request)
    .then((response) => {
      console.log(response)
      const rhymes = findRelationshipType('rhyme',response);
      const context = findRelationshipType('same-context', response);
      const syn = findRelationshipType('synonym', response);
      const cross = findRelationshipType('cross-reference', response);

      let sentence = "";
      let poetry = [];
      context.words.forEach(word => {
        poetry.push(`I am ${word}.`);
      });
      
      res.render('index', {
        rhymes: rhymes.words,
        context: context.words,
        syn: syn.words,
        cross: cross.words,
        sentence: sentence,
        poetry: poetry
      });
    })
    .catch(err => res.send(err));
  // const relatedWords = options(req.query.wordsearch, 'relatedWords');

  // requestPromise(relatedWords)
  //   .then((response) => {
  //     console.log(response)
  //     req.wordList = response.find(utils.getWordsWith('same-context')).words[0];
  //     return requestPromise(options(req.wordList, 'examples'));
  //   })
  //   .then((response) =>{
  //     //console.log(response);
  //     req.exampleText = response.examples[0].text;
  //   })
  //   .finally((response) => {
  //     res.render("index", {
  //       title: req.query.wordsearch, 
  //       relatedWord: req.relatedWord, 
  //       words: req.exampleText
  //     });
  //   })
  //   .catch((err) => {
  //     res.send("Waaah it didn't work:" + ' ' + err)
  //   });;
});

module.exports = router;
