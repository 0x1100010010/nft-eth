import * as dotenv from "dotenv";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

dotenv.config();
const web3 = createAlchemyWeb3(process.env.API_URL)
const contract = require("../artifacts/contracts/NFT.sol/NFT.json") // ABI
const contractAddress = "0xe62af8d35e856ef360cab9bcfea7b4c15f8f0666" //Deployed Contract Address
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const safeMint = async (tokenURI: String) => {
    const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': process.env.PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.safeMint(process.env.PUBLIC_KEY, tokenURI).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
    signPromise.then((signedTx: any) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err: any, hash: any) {
                if (!err) {
                    console.log(
                        "The hash of your transaction is: ", hash,
                        "\nCheck Alchemy's Mempool to view the status of your transaction!"
                    )
                } else {
                    console.log("Something went wrong when submitting your transaction:", err)
                }
            }
        )
    })

        .catch((err: any) => {
            console.log(" Promise failed:", err)
        })
}

safeMint("https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
