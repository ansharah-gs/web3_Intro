const web3=require('Web3');
var tx=require('ethereumjs-tx');
const { isContractAddressInBloom } = require('web3-utils');
const account1="0x9B235cb6D5e482d2eb7fd10e0553077ef5e702b3";
const privateKey1= "8366abd047577b31bc857321762c918959e5d524aa78eb9eb6ddfefec3d89333";
const abi=[
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "val",
				"type": "int256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const privatekey1buffer=Buffer.from(privateKey1,"hex");
var contract= new web3.eth.contract(Abi,address);
web3.eth.getTransactionCount(account1,(err,txCount)=>{
    let convertToHex = web3.utils.toHex;
    const txObject={
        //utils is helper functions
        nonce: convertToHex(txCount),
        to:account2,
        value: convertToHex(web3.utils.toWei('4','ether')),
        gasLimit: convertToHex(21000),
        gasPrice: convertToHex(web3.utils.toWei('10','gwei')),
        data:contract.methods.setAge(22).encodeABI(),
        };
        const tx= new Tx.Trsansaction(txObject,{chain:'ropsten'});//for rospten
    })

