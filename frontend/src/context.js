import { createContext, useState } from 'react';

// Create a context
const FormContext = createContext();

// Create a provider component
const FormProvider = ({ children }) => {
  const [status, setStatus] = useState(0);
  const [ownerData, setOwnerData] = useState({});
  const [dogData, setDogData] = useState({});
  const [txHash, setTxHash] = useState('');
  const [dogPhoto, setDogPhoto] = useState('');

  return (
    <FormContext.Provider value={{ status, setStatus, ownerData, setOwnerData, dogData, setDogData, txHash, setTxHash, dogPhoto, setDogPhoto }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };