//Array sanitizing function
Array.prototype.sanitize = function(sanitizeValue){
    for(var i = 0;i < this.length; i++){
    if(this[i]==sanitizeValue){
        //remove empty result from array
        this.splice(i,1);
        //adjust count of array
        i--;
    }
    }
    return this;
};

//String sanitizing functions
String.prototype.stripTags = function(){
     return this.replace(/<[^>]+>/g," ");
};

String.prototype.stripNewLines = function(){
    return this.replace(/\r\n|\n|\r/gm," ");
};

String.prototype.stripExcessWhite = function(){
    return this.replace(/s{2,}/gm,"");
};

String.prototype.stripPunctuation = function(){
    return this.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/gm," ");
};

//prep input
function prepInput(string){
  var x = string.stripTags().stripPunctuation().stripNewLines().stripExcessWhite().split(" ");
  x.sanitize("");
  return x;
}

//compare input strings to dictionary strings
function stringCompare(dictionary, input){
    var valid = false;
    for(var i=0;i<input.length;i++){
        for(var d=0;d<dictionary.length;d++){
            if(input[i] === dictionary[d]){
               valid = true;
               input.splice(i,1);
               i--;
               break;
            }
        }
        if(valid){valid = false;}
    }
    return input;
}

//prep input, compare strings, output input with highlighted failures
function spellCheck(divID, dictionary, isInput){
    var str, input;
    if(!isInput){
        //non-input
        str = document.getElementById(divID).innerHTML;
        input = prepInput(str);
        input = stringCompare(dictionary, input);
        if(input.length < 1)
          return false;
         for(var e=0; e<input.length;e++){
            var reg = new RegExp(input[e],"g");
            str = str.replace(reg, "<span style='color:red'>"+input[e]+"</span>");
         }
         return str;
    }
    
    if(isInput){
        //inputs
        str = document.getElementById(divID).value;
        input = prepInput(str);
        input = stringCompare(dictionary, input);
        if(input.length < 1){
          document.getElementById(divID).style.border='';
           return false;
        }
        document.getElementById(divID).style.border='1px solid red';
        return input;
    }
}
