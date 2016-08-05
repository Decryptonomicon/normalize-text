
// ABC's
var charset = [];
for (var i = 65; i <= 90; i++) {
  charset.push(String.fromCharCode(i));
}

function Shifter (key) {
  this.setKey(key);
}

Shifter.prototype.setKey = function (key) {
  key = key || "";
  this._key = key.toUpperCase().replace(/[^A-Z]/g, '');
};

Shifter.prototype.encrypt = function (clearText) {
  var ctArray = clearText.toUpperCase().replace(/[^A-Z]/g, '').split(''),
      ctArrayLen = ctArray.length,
      cipherText = [],
      keyLength = this._key.length;

  for (var i = 0; i < ctArrayLen; i++) {
    var clearTextCharIndex = charset.indexOf(ctArray[i]) ,
        keyIndex = i % keyLength,
        keyCharIndex = charset.indexOf(this._key[keyIndex]) ;

    // +1 since we are doing zero based character values
    cipherText.push(charset[(clearTextCharIndex + keyCharIndex + 1) % charset.length]);
  }

  return normalize(cipherText, clearText);
};

Shifter.prototype.decrypt = function (cipherText) {

    var ctArray = cipherText.toUpperCase().replace(/[^A-Z]/g, '').split(''),
        ctArrayLen = ctArray.length,
        clearText = [],
        keyLength = this._key.length;

    for (var i = 0; i < ctArrayLen; i++) {
      var cipherTextCharIndex = charset.indexOf(ctArray[i]) ,
          keyIndex = i % keyLength,
          keyCharIndex = charset.indexOf(this._key[keyIndex]) ;

      // +1 since we are doing zero based character values
      clearText.push(charset[(charset.length + (cipherTextCharIndex - (keyCharIndex + 1))) % charset.length]);
    }

    return normalize(clearText, cipherText);
};

function normalize (input, outputFormat) {
  var output = [],
      outputFormat = outputFormat.split(""),
      ofLen = outputFormat.length,
      ii = 0;

  for(var i = 0; i < ofLen; i++) {
    var ofChar = outputFormat[i],
        ofUpper = ofChar.toUpperCase(),
        validChar = charset.indexOf(ofUpper) > -1,
        isUpperCase = ofUpper === ofChar;

    if (!validChar) {
      output.push(ofChar);
      continue;
    }

    if(!isUpperCase) {
      output.push(input[ii].toLowerCase());
    } else {
      output.push(input[ii]);
    }
    ii++;
  }

  return output.join("")
}

module.exports = Shifter;
