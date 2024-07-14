import { defineChain, http } from 'viem';
import { createConfig } from 'wagmi';

export const fhenixChain = {
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

export const localChain = {
  blockExplorerUrls: [],
  chainId: 412346,
  iconUrls: ["https://docs.fhenix.zone/img/logo-black.svg", "https://docs.fhenix.zone/img/logo-white.svg"],
  name: "Local Fhenix",
  nativeCurrency: {
    decimals: 18,
    name: "Fhenix Helium",
    symbol: "tFHE",
  },
  networkId: 412346,
  rpcUrls: ["http://localhost:42069"],
};

export const fhenix = defineChain({
  ...fhenixChain,
  id: fhenixChain.chainId,
});

export const hFhenix = defineChain({
  ...localChain,
  id: localChain.chainId,
})

export const config = createConfig({
  chains: [fhenix],
  multiInjectedProviderDiscovery: false,
  transports: {
    [fhenix.id]: http(),
  },
});

export const evmNetworks = [
  fhenixChain,
];
