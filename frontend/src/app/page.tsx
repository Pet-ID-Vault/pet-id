import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import Form from "@/components/Form";
import FormDog from "@/components/FormDog";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <DynamicContextProvider
        settings={{
          environmentId: "593b4ec3-8ea0-4566-8e25-5e26b1a04673",
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <DynamicWidget />
      </DynamicContextProvider>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form />
        <FormDog />
      </div>
    </div>
  );
}
