const express = require('express');
const router = express.Router();
const request = require('request');
const requestPromise = require('request-promise');
const qsConfig = require('./uri');

function getWordsWith(type){
  /* takes in the name of the API object's relationshipType so the associated
  word list can be found with the Array.find method. */
  return function wordList(obj){
    return obj.relationshipType === type;
  }
}

function getRandomNum(length){
  return Math.floor(Math.random() * length);
}

router.get('/', function(req, res, next) {
  const relatedWords = qsConfig(req.query.wordsearch, 'relatedWords');

  requestPromise(relatedWords)
    .then((response) => {
      req.wordList = response.find(getWordsWith('same-context')).words;
      const num = getRandomNum(req.wordList.length);
      req.relatedWord = req.wordList[num];
      return requestPromise(qsConfig(req.wordList[num], 'examples'));
    })
    .then((response) =>{
      const num = getRandomNum(response.examples.length);
      req.exampleText = response.examples[num].text;
    })
    .finally((response) => {
      res.render("index", {title: req.query.wordsearch, relatedWord: req.relatedWord, words: req.exampleText});
    })
    .catch((err) => {
      res.send("Waaah it didn't work:" + ' ' + err)
    });;
});

module.exports = router;
