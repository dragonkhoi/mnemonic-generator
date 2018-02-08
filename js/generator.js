var wordToPronunciation = {};
var pronunciationToWord = {};

var wordTrie = new Trie();
var pronunciationTrie = new ArrTrie();

// build the dictionary
var toProcess = dictionaryString;
while(toProcess != ""){
    var spaceIndex = toProcess.indexOf(" ");
    var word = toProcess.substring(0, spaceIndex);
    toProcess = toProcess.substring(spaceIndex + 2);
    var pipeIndex = toProcess.indexOf("|");
    var pron = toProcess.substring(0, pipeIndex - 1);
    toProcess = toProcess.substring(pipeIndex + 2);
    // console.log(pron);
    var pronSplit = pron.split(" ");
    // console.log(pronSplit);

    if(!wordToPronunciation[word]){
      wordToPronunciation[word] = pron;
    }
    else{
      wordToPronunciation[word].push(pron);
    }
    if(!pronunciationToWord[pron]){
      pronunciationToWord[pron] = [word];
    }
    else
    {
      pronunciationToWord[pron].push(word);
    }
    wordTrie.add(word);
    pronunciationTrie.add(pronSplit);
}
//console.log(wordToPronunciation["!EXCLAMATION-POINT"]);
//console.log(wordToPronunciation);

//console.log(pronunciationToWord);
//console.log(pronunciationTrie);

function findVal(){
  var searchText = document.getElementById("searchVal").value;
  console.log(searchText);
  console.log(wordTrie.contains(searchText));
  console.log(wordToPronunciation[searchText]);
  // search for phonemes one at a time
  // once a final phoneme is found, save it
  var pron = wordToPronunciation[searchText];
  var pronSplit = pron.split(" ");
  console.log(pron);
  var currentNode = pronunciationTrie.root;
  var searchPron = "";
  var soundsWithin = [];
  console.log(currentNode);
  for(var i = 0; i < pronSplit.length; i++){
    var foundMatch = false;
    for(nodeChild in currentNode.children){
      console.log(nodeChild);
      if(pronSplit[i] == nodeChild){
        console.log(currentNode.children[nodeChild]);
        currentNode = currentNode.children[nodeChild];
        if(currentNode.word != null && currentNode.word != ""){
          soundsWithin.push(currentNode.word);
          console.log("this is a word: " + currentNode.word);
        }
        if(searchPron != ""){
          searchPron += " " + pronSplit[i];
        }
        else {
          searchPron += pronSplit[i];
        }
        foundMatch = true;
        break;
      }
    }
    // no nodeChild matched
    if(!foundMatch) {
      console.log("no matches found: alternates are: " + currentNode.children);
    }
  }
  for(var i = 0; i < soundsWithin.length; i++){
    console.log(pronunciationToWord[soundsWithin[i]]);
  }
  console.log(searchPron);
}
