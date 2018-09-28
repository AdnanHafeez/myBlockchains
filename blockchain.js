//This is implementation of simple blockchains using tutorial from https://enlight.nyc/projects/blockchain/
// Only for learning purposes.
const SHA256 = require("crypto-js/sha256");
const fs = require('fs');

class Blockchain {

  constructor() {
    this.chain = [this.createGenesis()];
    this.difficulty = 1;
  }

  createGenesis() {
    return new Block(0,"GenesisBlock","0");
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock, callback) {
    newBlock.previousHash = this.latestBlock().hash;
    let t = callback.bind(this);
    t(newBlock, this.pushNewBlock)

  }

  miningBlocks(newBlock, callback) {
    newBlock.mineBlock(this.difficulty);
    let pb = callback.bind(this);
    pb(newBlock);
  }
  pushNewBlock(newBlock){
    this.chain.push(newBlock);
  }
  // Check the integrity of a current blockchain
  checkValid() {
    //let count = 0;
    for(let i = 1; i < this.chain.length; i++) {
      if(this.chain[i].calculateHash() !== this.chain[i].hash) {
        //console.log("The hash is not equal at block = " + i);
        //console.log("Nonce = " + this.chain[i].nonce);
        return false;
        //count++;
      }
      else if(this.chain[i].previousHash !== this.chain[i-1].hash){
        //console.log("The previoushash is not equal at block = " + i);
        return false;
      }
    }
    //return count;
    return true;

  }
}

class Block {
  constructor(index, data,previousHash) {
    this.index = index;
    let dt = new Date();
    this.timestamp = dt.toString();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 1;
    this.hash = this.calculateHash();
  }

calculateHash() {
  let temp =  SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce.toString()).toString();
  return temp;
}

mineBlock(difficulty) {
  while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")) {
    this.nonce++;
    this.hash = this.calculateHash();
  }
  if(this.hash !== SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce.toString()).toString()){
    console.log("Hash saved = " + this.hash);
    console.log("Tries it took = " + tries);
    console.log("New hash 1 = " + SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce.toString()).toString() );
  }
}
}



let testChain = new Blockchain();
console.log("Mining Block...");

let warandpeace = fs.readFileSync("WarAndPeace.txt").toString().split("\n");
for(i in warandpeace) {
    testChain.addBlock(new Block(i,warandpeace[i],testChain.latestBlock().hash), testChain.miningBlocks);
}
console.log("Is the blockchain valid? " + testChain.checkValid().toString());
console.log("Blocks Mined: " + testChain.latestBlock().index);
