const SHA256 = require("crypto-js/sha256");


console.log(SHA256("This is a test string" + 0).toString());
console.log(SHA256("This is a test string" + 0).toString());
console.log(SHA256("This is a test string" + 0).toString());
console.log(SHA256("This is a test string" + 0).toString());
class Block {
  constructor(index, data,previousHash="") {
    this.index = index;
    let dt = new Date();
    this.timestamp = dt.toString();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();

  }

calculateHash(FromValidate) {
  if(FromValidate){
    console.log("In calculateHash......");
    console.log("Previous hash=" + this.previousHash);
    console.log("Hash using current data = " + SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce.toString()).toString());
    console.log("......................");
  }
  return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce.toString()).toString();
}
}
