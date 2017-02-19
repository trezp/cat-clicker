const express = require('express');
const router = express.Router();
const request = require('request');
const requestPromise = require('request-promise');
const options = require('./options');
const utils = require('./utilities');

router.get('/', function(req, res, next) {
  const relatedWords = options(req.query.wordsearch, 'relatedWords');

  requestPromise(relatedWords)
    .then((response) => {
      console.log(response)
      req.wordList = response.find(utils.getWordsWith('same-context')).words;
      const num = utils.getRandomNum(req.wordList.length);
      req.relatedWord = req.wordList[num];
      return requestPromise(options(req.wordList[num], 'examples'));
    })
    .then((response) =>{
      const num = utils.getRandomNum(response.examples.length);
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
