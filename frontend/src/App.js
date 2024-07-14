import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config, evmNetworks } from './utils/chain';

import Main from "./Main";
import { FormProvider } from './context';

const queryClient = new QueryClient();

const App = () => {
  return (
    <FormProvider>
      <DynamicContextProvider
        settings={{
          environmentId: "9680cf03-3690-4bfd-9cb5-295c164eafff",
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors],
          overrides: { evmNetworks },
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <Main />
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </FormProvider>
  );
};

export default App;
