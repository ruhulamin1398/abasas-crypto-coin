const sha256 = require('crypto-js/sha256');
class Block{
    constructor (timestamp,data){
        this.timestamp= timestamp;
        this.data= data;
        this.hash = this.calculateHash();
        this.nonce=0;

    }
    calculateHash(){
        // console.log(sha256(this.nonce + this.timestamp + JSON.stringify( this.data ) +  this.previousHash).toString());
        return sha256(this.nonce + this.timestamp + JSON.stringify( this.data ) +  this.previousHash).toString();
    }


    mineBlock(difficulty){
        

        while(this.hash.toString().substring(0,difficulty) !== Array(difficulty + 1).join("0")){

            // console.log(this.hash.toString().substring(0,difficulty) + " " +Array(difficulty + 1).join("0"));
            // console.log(this.nonce);
            // console.log(this.hash)

            this.nonce ++;
            this.hash= this.calculateHash();
        }
        // console.log(this.hash);
        console.log("mining done "+this.hash);
    }
}


class Blockhain{
    constructor(){
        this.chain=[this.generateGenesisBlock()];
        this.difficulty=4;

    }
    addBlock(newBlock){
        newBlock.previousHash= this.getLetestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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

const abasas_crypto_coin= new Blockhain();




let block1 = new Block("2016-01-01",{amount:10})
// console.log(block);

// console.log(abasas_crypto_coin);
abasas_crypto_coin.addBlock(block1)



// console.log(abasas_crypto_coin.isBlockchainValid());

const block2 = new Block("2016-01-01",{amount:12},"1111")
abasas_crypto_coin.addBlock(block2)


// console.log(abasas_crypto_coin);

// abasas_crypto_coin.chain[1].data = "hacked";

// console.log(abasas_crypto_coin.isBlockchainValid());
console.log(abasas_crypto_coin);
