var Tx     = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710');

const account1 = '0x533728F6ef2B6772FEDF3E7F3b7A6f258bDc8aF5' // Your account address 1
const privateKey1= "1eab57ef6425db3f95487e29c307be96a6744891ef6cfb36c9958f2a4817e87e";

const account2="0x80a0fbC69140dB5C05d69b3829a892Fe8eB0f496";

const address="0x44454a6b55E08a589bD1b80a680EFfc819Bd6Cef";//contract address i.e deployed contract on ropsten
const abi=[
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const privatekey1buffer=Buffer.from(privateKey1, 'hex');//buffer created i.e buffer is binary array
var contract=new web3.eth.Contract(abi,address);
web3.eth.getTransactionCount(account1, (err, txCount) => {//transaction initiation
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),    
    //value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(80000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to:    address,
    data:contract.methods.setAge(22).encodeABI(),//this encode will convert json to byte code
  };

  // Sign the transaction
  const tx = new Tx.Transaction(txObject,{//transaction object
    chain:'ropsten',
  });
  tx.sign(privatekey1buffer);

  const serializedTx = tx.serialize();//serialize transaction
  const raw = '0x' + serializedTx.toString("hex");
  console.log('this is txObject:', txObject);
  // Broadcast/ sign  the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  });
})