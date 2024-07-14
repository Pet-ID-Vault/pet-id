import { DeployFunction } from "hardhat-deploy/types";
import chalk from "chalk";
import { fhenixjs, ethers, network, deployments } from "hardhat";

const func: DeployFunction = async function () {
  const { deploy } = deployments;
  const [signer] = await ethers.getSigners();

  if ((await ethers.provider.getBalance(signer.address)).toString() === "0") {
    if (network.name === "localfhenix") {
      await fhenixjs.getFunds(signer.address);
    } else {
        console.log(
            chalk.red("Please fund your account with testnet FHE from https://faucet.fhenix.zone"));
        return;
    }
  }

  const counter = await deploy("Pet", {
    from: signer.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(`Pet contract: `, counter.address);
};

export default func;
func.id = "deploy_counter";
func.tags = ["Counter"];
