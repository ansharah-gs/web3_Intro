//contract deployment using bytecode of contract
var Tx     = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710');

const account1 = '0x533728F6ef2B6772FEDF3E7F3b7A6f258bDc8aF5' // Your account address 1
const privateKey1= "1eab57ef6425db3f95487e29c307be96a6744891ef6cfb36c9958f2a4817e87e";

const byteCode="608060405234801561001057600080fd5b5061012f806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063967e6e65146037578063d5dcf127146051575b600080fd5b603d6069565b6040516048919060c2565b60405180910390f35b6067600480360381019060639190608f565b6072565b005b60008054905090565b8060008190555050565b60008135905060898160e5565b92915050565b60006020828403121560a057600080fd5b600060ac84828501607c565b91505092915050565b60bc8160db565b82525050565b600060208201905060d5600083018460b5565b92915050565b6000819050919050565b60ec8160db565b811460f657600080fd5b5056fea264697066735822122028eaf539293eecffd41450f863948de55c7e2fd93fc2a1fc90385dc09002b5a564736f6c63430008010033"
const byteCodeBuffer=Buffer.from(byteCode, 'hex');

const privatekey1buffer=Buffer.from(privateKey1, 'hex');//buffer created i.e buffer is binary array

web3.eth.getTransactionCount(account1, (err, txCount) => {//transaction initiation
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),    
    //value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(3000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data:byteCodeBuffer,
  };

  // Sign the transaction
  const tx = new Tx(txObject,{//transaction object
    chain:'ropsten',
  });
  tx.sign(privatekey1buffer);

  const serializedTx = tx.serialize() //serialize transaction
  const raw = '0x' + serializedTx.toString('hex')
  //console.log('this is txObject:', txObject);
  // Broadcast/ sign  the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    if(err)  {console.log(err)}
        else 
    {console.log('txHash:', txHash)}
    // Now go check etherscan to see the transaction!
  })//.catch(console.log);
  // .on('error', function(error){ console.log(error); })
  .then(receipt => {
      console.log(receipt);
      console.log(receipt.contractAddress);
    });
});