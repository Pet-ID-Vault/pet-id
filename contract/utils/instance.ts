import type { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

export interface FheInstance {
  instance: any;
  permission: any;
}

export async function createFheInstance(
  hre: HardhatRuntimeEnvironment,
  contractAddress: string,
): Promise<FheInstance> {
  const provider = hre.ethers.provider;
  const signer = await hre.ethers.getSigners();
  const instance = hre.fhenixjs;
  
  const permit = await instance.generatePermit(contractAddress, provider, signer[0]);
  const permission = instance.extractPermitPermission(permit);

  return Promise.all([instance, permission]).then(([instance, permission]) => ({
    instance,
    permission,
  }));
}
