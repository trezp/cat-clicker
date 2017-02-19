
module.exports = {
  getWordsWith: (type) =>{
    /* takes in the name of the API object's relationshipType so the associated
    word list can be found with the Array.find method. */
    return function wordList(obj){
      return obj.relationshipType === type;
    }
  },
  getRandomNum: (length) => {
    return Math.floor(Math.random() * length);
  }
}
