import * as dotenv from "dotenv";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

dotenv.config();
const web3 = createAlchemyWeb3(process.env.API_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json") // ABI
