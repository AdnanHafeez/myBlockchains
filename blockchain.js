//This is implementation of simple blockchains using tutorial from https://enlight.nyc/projects/blockchain/
// Only for learning purposes.
const SHA256 = require("crypto-js/sha256");

class Blockchain {

  constructor() {
    this.chain = [this.createGenesis()];
  }

  createGenesis() {
    return new Block(0,"GenesisBlock","0");
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    this.chain.push(newBlock);
  }

}

  // Check the integrity of a current blockchain
  checkValid() {

    for(let i = 1; i < this.chain.length; i++) {
      if(this.chain[i].calculateHash() !== this.chain[i].hash) {
        return false;
      }
      else if(this.chain[i].previousHash !== this.chain[i-1].hash){
        return false;
      }
    }

    return true;

  }


class Block {
  constructor(index, data,previousHash="") {
    this.index = index;
    let dt = new Date();
    this.timestamp = dt.toString();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

calculateHash() {
  return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
}

mineBlock() {
  
}
}
