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
    wordToPronunciation[word] = pron;
    pronunciationToWord[pron] = word;
    wordTrie.add(word);
    pronunciationTrie.add(pron);
}
//console.log(wordToPronunciation);
console.log(pronunciationTrie);

function findVal(){
  var searchText = document.getElementById("searchVal").value;
  console.log(searchText);
  console.log(wordTrie.contains(searchText));
  console.log(wordToPronunciation[searchText]);
  var pron = wordToPronunciation[searchText];
  for(var i = 0; i < pron.length; i++){
    for(nodeChild in pronunciationTrie.root.children){
      //console.log(nodeChild);
      if(pron[i] == nodeChild){
        console.log(nodeChild);
        break;
      }
    }
  }
}
