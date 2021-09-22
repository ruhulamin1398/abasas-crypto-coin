const sha256 = require('crypto-js/sha256');
class Block{
    constructor (timestamp,transections){
        this.timestamp= timestamp;
        this.transections= transections;
        this.hash = this.calculateHash();
        this.nonce=0;

    }
    calculateHash(){
        // console.log(sha256(this.nonce + this.timestamp + JSON.stringify( this.transections ) +  this.previousHash).toString());
        return sha256(this.nonce + this.timestamp + JSON.stringify( this.transections ) +  this.previousHash).toString();
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

class Transection{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress= fromAddress;
        this.toAddress= toAddress;
        this.amount= amount;
    }
}

class Blockhain{
    constructor(){
        this.chain=[this.generateGenesisBlock()];
        this.difficulty=1;
        this.pendingTransections= [];
        this.miningReward= 10;
    }
    createTransection(transection){
        this.pendingTransections.push(transection);

    }
    minePendingTransections(minerAddress){
        let block = new Block(Date.now(), this.pendingTransections)
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransections=[
            new Transection(null ,minerAddress, this.miningReward)
        ];
    }
    // addBlock(newBlock){
    //     newBlock.previousHash= this.getLetestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     newBlock.hash= newBlock.calculateHash();
    //     this.chain.push(newBlock)
    // }
    getLetestBlock(){
        return this.chain[this.chain.length-1];
    }

    generateGenesisBlock(){
        return new Block(Date.now(),'GENESIS',"0000");

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

    getBalenceOfAddress(address){
        let balace= 0;
        for(const block of this.chain) {
            for(const transection of block.transections){

                if(transection.fromAddress === address){
                    balace -= transection.amount;
                }
                 if(transection.toAddress === address){
                    balace += transection.amount;
                }
            }
        }
        return balace;
      
    }
}

const abasas_crypto_coin= new Blockhain();




abasas_crypto_coin.createTransection(new Transection('address1','address22',1100));
abasas_crypto_coin.createTransection(new Transection('address1','address22',2200));
abasas_crypto_coin.createTransection(new Transection('address2','address1',10012));
abasas_crypto_coin.createTransection(new Transection('address2','address1',1120));

abasas_crypto_coin.minePendingTransections('ruhul')
abasas_crypto_coin.minePendingTransections('ruhul')
console.log(abasas_crypto_coin.getBalenceOfAddress('address1'));
console.log(abasas_crypto_coin.getBalenceOfAddress('address2'));
console.log(abasas_crypto_coin.getBalenceOfAddress('address22'));
console.log(abasas_crypto_coin.getBalenceOfAddress('ruhul'));


console.log(abasas_crypto_coin)