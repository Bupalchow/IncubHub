import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Web3Provider from "@fewcha/web3-react";
const wallets = [new PetraWallet()];
ReactDOM.createRoot(document.getElementById('root')).render(
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <Web3Provider>
    <App />
  </Web3Provider>
  </AptosWalletAdapterProvider>
)
