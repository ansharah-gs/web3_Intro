var Tx=require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710');

const account1 = '0x533728F6ef2B6772FEDF3E7F3b7A6f258bDc8aF5' // Your account address 1
const privateKey1= "1eab57ef6425db3f95487e29c307be96a6744891ef6cfb36c9958f2a4817e87e";

const account2="0x80a0fbC69140dB5C05d69b3829a892Fe8eB0f496";
const privateKey2= "35e7b0d7123cc0abc05b0fcbdf868d74b19ff2874c5db47d8380d6c1b9971141"

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0x44454a6b55E08a589bD1b80a680EFfc819Bd6Cef'
const abi = [
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
const privateKeyBuffer = Buffer.from('privateKey1', 'hex')
const privateKeyBuffer2 = Buffer.from('privateKey2', 'hex')
const contract = new web3.eth.Contract(abi, contractAddress)

// Transfer some tokens
web3.eth.getTransactionCount(account1, (err, txCount) => {

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(900000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contract.methods.setAge(55).encodeABI()
  }

  const tx = new Tx(txObject,{chain:'ropsten'});
  tx.sign(privateKeyBuffer)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})

// contract.methods.getAge().call((err, result) => { 
//     console.log('here')
//     if (err) {
//         console.log('error:',err)
//     } else {
//         console.log('age',result)
//     //document.getElementById("main").innerHTML=`age ${result}`
//     }    
//  })
