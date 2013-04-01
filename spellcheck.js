function spellCheck(divID, isInput){
    var out = new Array();
    var start = document.getElementById(divID);
    if(!isInput)
      var output = start.innerHTML;

    outputErrors(traverse());

  function traverse(element){
    var element = element || start; 
    if(element.hasChildNodes()){
      var child = element.firstChild;
      while(child){
        if(child.nodeType === 1 || child.nodeType === 3)
          traverse(child)
        child = child.nextSibling;
      }
    }
    if(element.data){
      var str = element.data;
      str = stripNewLines(str);
      str = stripExcessWhite(str);
      str = stripPunctuation(str);
      if(str && str !== " "){
          str = str.split(" ");
          if(str.length > 1)
              sanitize(str, "");
          for(var i=0;i<str.length;i++){
              var correct = stringCompare(str[i]);
              if(!correct)
                out.push(str[i]);
           }
      }
    }
  return out;
  }

  function outputErrors(array){
   for(var e=0; e<array.length;e++){
    var reg = new RegExp(array[e],"g");
    output = output.replace(reg, "<span style='color:red'>"+array[e]+"</span>");
   }
    start.innerHTML = output;
  }
}


function stripNewLines(input){
   return input.replace(/\r\n|\n|\r/gm, '');
};

function stripExcessWhite(input){
    return input.replace(/ {2,}?/gm,'');
};

function stripPunctuation(input){
    return input.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/gm,' ');
};

function sanitize(array, sanitizeValue){
    for(var i = 0;i < array.length; i++){
        if(array[i]==sanitizeValue){
            array.splice(i,1);
            i--;
        }
    }
    return array;
};

function stringCompare(input){
    var valid = false;
    var dictionary=["The", "quick", "brown", "fox", "jumped", "over", "the", "fence", "and", "went", "through", "yard", "When", "Billy", "went", "to", "school", "he", "became", "smarter", "everyday", "Jordan", "worked", "at", "became", "a", "super", "star", "He", "made", "lots", "of", "cool", "applications", "One", "his", "best", "applications", "was", "one", "that", "could", "predict", "future", "Please", "tell", "us", "your", "name", "Name", "Thank", "you"];
    for(var d=0;d<dictionary.length;d++){
        if(input === dictionary[d]){
            valid = true;
            break;
        }
    }
    return valid;
}