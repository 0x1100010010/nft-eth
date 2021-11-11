import * as dotenv from "dotenv";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

dotenv.config();
const web3 = createAlchemyWeb3(process.env.API_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json") // ABI
const contractAddress = "0xe62af8d35e856ef360cab9bcfea7b4c15f8f0666"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
