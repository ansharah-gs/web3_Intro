//const Web3 = require('web3')
//console.log(Web3)
//const rpcUrl="HTTP://127.0.0.1:7545";//ganache
const rpcUrl="https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710"
const web3= new Web3(rpcUrl)
//console.log('rpc',web3)
//let address = "0x767f2C5F268f54fb2448295d9423719D6E6D3d05";//ganache
let address = "0x533728F6ef2B6772FEDF3E7F3b7A6f258bDc8aF5";//account from rospten metamask
web3.eth.getBalance(address,(err,wei)=>{//checking balance
    //console.log('balance',wei)
    balance = web3.utils.fromWei(wei, 'ether')//converting balance in ether
    console.log('balance',balance)
    document.getElementById("main").innerHTML=`this is ether balance ${balance}`
  })
