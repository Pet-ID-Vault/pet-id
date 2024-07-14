import { useContext, useEffect, useState } from 'react';
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { EncryptionTypes, FhenixClient } from 'fhenixjs';
import { ethers } from 'ethers';
import Form from './components/Form';
import FormDog from './components/FormDog';
import { asBytes32 } from './utils/format';
import ExplorerLink from './components/ExplorerLink';
import { FormContext } from './context';
import Profile from './components/Profile';

const contractAddress = '0xA71a76eaF950150ecae8F8D0Ac94f40909d8f356';
const abi = require('./abis/pets.json');
const provider = new ethers.providers.JsonRpcProvider('https://api.helium.fhenix.zone');
const client = new FhenixClient({ provider });


const Main = () => {
  const { primaryWallet } = useDynamicContext();
  const {
    status, setStatus, ownerData, setOwnerData, dogData, setDogData, txHash, setTxHash, dogPhoto, setDogPhoto
  } = useContext(FormContext);

  useEffect(() => {
    const url = getCurrentRoute();
    if (url === 'profile') {
      setStatus(-1);
      return;
    }
    if (!primaryWallet)  {
      setStatus(0);
      return;
    }
    primaryWallet.connector.ethers.getSigner().then(signer => {
      if (!signer) {
        setStatus(0);
        return;
      }
      setStatus(1);
    });
  }, [primaryWallet]);

  useEffect(() => {
    if (!dogPhoto) return;
    localStorage.setItem('dogUrl', dogPhoto);
  }, [dogPhoto]);

  useEffect(() => {
    if (!txHash) return;
    setStatus(3);
  }, [txHash]);

  const saveDogData = async (args) => {
    setDogData(args);
    setStatus(s => s + 1);
    const formData = new FormData();
    formData.append('image', args.dogImageFile);

    const res = await fetch('https://pet.ipfs.tf/upload', {
      method: 'POST',
      headers: {
        'x-api-key': 'gg',
      },
      body: formData
    }).then(r => r.json());

    setDogPhoto(res.mediaUrl);
  }

  const saveOwnerData = async (args) => {
    setOwnerData(args);
    const signer = await primaryWallet.connector.ethers.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const encryptedBreeder = await client.encrypt(10, EncryptionTypes.uint256);
    const encryptedVaccines = await client.encrypt(10, EncryptionTypes.uint256);

    const tx = await contract.registerPet(
      asBytes32(getCurrentRoute()),
      asBytes32(dogData.dogName),
      asBytes32(dogData.breed),
      dogData.gender === 'M' ? 0 : 1,
      dogData.pedigree === 'Y',
      encryptedBreeder,
      encryptedVaccines,
      []
    );
    setTxHash(tx.hash);
  }

  const getCurrentRoute = () => {
    return window.location.pathname.split('/')[1].split('-').join('');
  };

  useEffect(() => {
    console.log({ ownerData, dogData });
  }, [ownerData, dogData]);

  return (
    <div>
      <div className="flex justify-center">
        <DynamicWidget/>
      </div>
      {status === -1 && <Profile />}
      {status === 1 && <FormDog onSubmit={saveDogData} />}
      {status === 2 && <Form onSubmit={saveOwnerData} />}
      {status === 3 && <ExplorerLink hash={txHash} />}
    </div>
  );
}

export default Main;
