const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710')

// get latest block number
web3.eth.getBlockNumber().then(console.log)

// // get latest block
web3.eth.getBlock('latest').then(console.log)

// get latest 10 blocks
web3.eth.getBlockNumber().then((latest) => {
  for (let i = 0; i < 10; i++) {
    web3.eth.getBlock(latest - i).then(console.log)
  }
})

// get transaction from specific block
const hash = '0x74edd5f11770b3f13364806eb08f86be16ebae9676c1e550ab9ae8a0374781bf'
web3.eth.getTransactionFromBlock(hash, 2).then(console.log)