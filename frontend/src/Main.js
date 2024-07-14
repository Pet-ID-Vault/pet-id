import { useEffect } from 'react';
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Form from './components/Form';
import FormDog from './components/FormDog';
import { ethers } from 'ethers';

const contractAddress = '0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2';

const abi = require('./abis/pets.json');

const Main = () => {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (!primaryWallet) return;
    console.log(primaryWallet);
  }, [primaryWallet]);

  const sendTx = async () => {
    const web3Provider = await primaryWallet.connector.ethers.getSigner();
    console.log(web3Provider);
    const contract = new ethers.Contract(contractAddress, abi, web3Provider)
    console.log({ contract });
  }

  return (
    <div>
      <div className="flex justify-center">
        <DynamicWidget/>
      </div>
      <button onClick={sendTx}>Send Transaction</button>
      <Form/>
      <FormDog/>
    </div>
  );
}

export default Main;
