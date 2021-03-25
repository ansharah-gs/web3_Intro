var Tx=require('ethereumjs-tx');
const Web3=require('web3');

const rpcUrl = "https://ropsten.infura.io/v3/a87553c2f2424f36a6d10c3946216710";
//const rpcUrl = "HTTP://127.0.0.1:7545";
const web3 = new Web3(rpcUrl);
//ganache 
// const account1="0x234e61CEba23A2497570Cfd6E1DE106596650F7F";
// const privateKey1= "6d5565717839ce9c7ea528b087fafa5f22a83d0d79d9e56ce3ea6bcb4f7478b0";

// const account2="0xb8E2baA0a3A74b7Bf4f02fe8378BE1e096C17Bba";
// const privateKey2="e2bcee6386fc3e2d40f23530d73ee848a15d03879db62f1d4f63b49b1dbc087e";

//ropsten
const account1="0x533728F6ef2B6772FEDF3E7F3b7A6f258bDc8aF5";
const privateKey1= "1eab57ef6425db3f95487e29c307be96a6744891ef6cfb36c9958f2a4817e87e";
 
const account2="0x80a0fbC69140dB5C05d69b3829a892Fe8eB0f496";
const privateKey2="35e7b0d7123cc0abc05b0fcbdf868d74b19ff2874c5db47d8380d6c1b9971141";

const privatekey1buffer=Buffer.from(privateKey1,'hex');
const privatekey2buffer=Buffer.from(privateKey2,'hex');

web3.eth.getTransactionCount(account1,(err,txCount)=>{
   
    let convertToHex = web3.utils.toHex;
    const txObject={
        //utils is helper functions
        nonce: convertToHex(txCount),
        to:account2,
        value: convertToHex(web3.utils.toWei("0.5",'ether')),
        gasLimit: convertToHex(21000),
        gasPrice: convertToHex(web3.utils.toWei("10",'gwei'))
        }
        console.log('object',txObject);
        //const tx=new Tx.Transaction(txObject);//local
        const tx= new Tx.Transaction(txObject,{chain:'ropsten'});//for rospten
        tx.sign(privatekey1buffer);
        const serializedTx=tx.serialize();
        const raw = '0x'+serializedTx.toString('hex');
       // console.log("tx",tx);
        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
            if (err) {
                console.log("error",err);
            }
            else
            {
            console.log('transaction hash',txHash);
            }
        })
    })