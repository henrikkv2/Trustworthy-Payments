import { useEffect, useState } from "react";
// import { ethers } from "ethers";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null);

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } else {
      alert("MetaMask is not installed!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
      });
      // clear account on unmount 
      window.ethereum.on("disconnect", () => {
        console.log("Disconnected from MetaMask");
        setAccount(null);
      });
    }
  }, []);

  return { account, connect };
}

