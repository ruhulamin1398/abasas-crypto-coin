const sha256 = require('crypto-js/sha256');
class Block{
    constructor (timestamp,data,previousHash){
        this.timestamp= timestamp;
        this.data= data;
        this.previousHash= previousHash;
        this.hash = this.calculateHash();

    }
    calculateHash(){
        return sha256(this.timestamp + JSON.stringify( this.data ) +  this.previousHash).toString()
    }
}


class Blocchain{
    constructor(){
        this.chain=[this.generateGenesisBlock()];

    }
    addBlock(newBlock){
        newBlock.previousHash= this.getLetestBlock().hash;
        newBlock.hash= newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    getLetestBlock(){
        return this.chain[this.chain.length-1];
    }

    generateGenesisBlock(){
        return new Block('2021-01-02','GENESIS',"0000");

    }


    isBlockchainValid(){
        for(let i=1 ; i< this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock= this. chain[i-1];
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let block = new Block("2016-01-01",{amount:10},"sdafsafasfsdafsadf")
const abasas_crypto_coin= new Blocchain();
abasas_crypto_coin.addBlock(block)



console.log(abasas_crypto_coin.isBlockchainValid());

const block2 = new Block("2016-01-01",{amount:12},"1111")
abasas_crypto_coin.addBlock(block2)


// console.log(abasas_crypto_coin);

abasas_crypto_coin.chain[1].data = "hacked";

console.log(abasas_crypto_coin.isBlockchainValid());
console.log(abasas_crypto_coin);
