var wordToPronunciation = {};
var pronunciationToWord = {};

var wordTrie = new Trie();
var pronunciationTrie = new Trie();

// build the dictionary
var toProcess = dictionaryString;
while(toProcess != ""){
    var spaceIndex = toProcess.indexOf(" ");
    var word = toProcess.substring(0, spaceIndex);
    toProcess = toProcess.substring(spaceIndex + 2);
    var pipeIndex = toProcess.indexOf("|");
    var pron = toProcess.substring(0, pipeIndex - 1);
    toProcess = toProcess.substring(pipeIndex + 2);
    if(!wordToPronunciation[word]){
      wordToPronunciation[word] = [pron];
    }
    else{
      wordToPronunciation[word].push(word);
    }
    if(!pronunciationToWord[pron]){
      pronunciationToWord[pron] = [word];
    }
    else
    {
      pronunciationToWord[pron].push(word);
    }
    wordTrie.add(word);
    pronunciationTrie.add(pron);
}
//console.log(pronunciationToWord);
//console.log(pronunciationTrie);

function findVal(){
  var searchText = document.getElementById("searchVal").value;
  console.log(searchText);
  console.log(wordTrie.contains(searchText));
  console.log(wordToPronunciation[searchText]);
  var pron = wordToPronunciation[searchText][0];
  var currentNode = pronunciationTrie.root;
  var searchPron = "";
  var soundsWithin = [];
  console.log(currentNode);
  for(var i = 0; i < pron.length; i++){
    var foundMatch = false;
    for(nodeChild in currentNode.children){
      //console.log(nodeChild);
      if(pron[i] == nodeChild){
        console.log(currentNode.children[nodeChild]);
        currentNode = currentNode.children[nodeChild];
        if(currentNode.word != null && currentNode.word != ""){
          soundsWithin.push(currentNode.word);
          console.log("this is a word: " + currentNode.word);
        }
        searchPron += pron[i];
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
