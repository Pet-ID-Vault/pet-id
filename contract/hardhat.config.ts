// Plugins
// Tasks
import "dotenv/config";
import "./tasks";
import "@nomicfoundation/hardhat-toolbox";
import "fhenix-hardhat-docker";
import "fhenix-hardhat-plugin";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import "@xyrusworx/hardhat-solidity-json";

const TESTNET_CHAIN_ID = 8008135;
const TESTNET_RPC_URL = "https://api.helium.fhenix.zone";

const testnetConfig: any = {
    chainId: TESTNET_CHAIN_ID,
    url: TESTNET_RPC_URL,
}


// Select either private keys or mnemonic from .env file or environment variables
const keys = process.env.KEY;
if (!keys) {
  let mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error("No mnemonic or private key provided, please set MNEMONIC or KEY in your .env file");
  }
  testnetConfig['accounts'] = {
    count: 10,
    mnemonic,
    path: "m/44'/60'/0'/0",
  }
} else {
  testnetConfig['accounts'] = [keys];
}


const config: HardhatUserConfig = {
  solidity: "0.8.25",
  // Optional: defaultNetwork is already being set to "localfhenix" by fhenix-hardhat-plugin
  defaultNetwork: "localfhenix",
  networks: {
    testnet: testnetConfig,
  },
  etherscan: {
    apiKey: {
      testnet: "0xabc"
    },
    customChains: [
      {
        network: "testnet",
        chainId: TESTNET_CHAIN_ID,
        urls: {
          apiURL: "https://explorer.helium.fhenix.zone/api",
          browserURL: "https://explorer.helium.fhenix.zone/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
