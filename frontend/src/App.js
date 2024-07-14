import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { http, defineChain } from "viem";

import Main from "./Main";

const fhenixChain = {
  blockExplorerUrls: ["https://explorer.helium.fhenix.zone/"],
  chainId: 8008135,
  iconUrls: ["https://docs.fhenix.zone/img/logo-black.svg", "https://docs.fhenix.zone/img/logo-white.svg"],
  name: "Fhenix Helium",
  nativeCurrency: {
    decimals: 18,
    name: "Fhenix Helium",
    symbol: "tFHE",
  },
  networkId: 8008135,
  rpcUrls: ["https://api.helium.fhenix.zone"],
};
const fhenix = defineChain({
  ...fhenixChain,
  id: fhenixChain.chainId,
})

const config = createConfig({
  chains: [fhenix],
  multiInjectedProviderDiscovery: false,
  transports: {
    [fhenix.id]: http(),
  },
});

const queryClient = new QueryClient();
const evmNetworks = [
  fhenixChain,
];


const App = () => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
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
  );
};

export default App;
