//const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710' // Your RCP URL goes here
const web3 = new Web3(rpcURL)

const address="0x44454a6b55E08a589bD1b80a680EFfc819Bd6Cef";//contract address i.e that is deployed on rospten
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

const contract = new web3.eth.Contract(abi, address)

contract.methods.getAge().call((err, result) => { 
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    document.getElementById("main").innerHTML=`age ${result}`
    }    
 })
