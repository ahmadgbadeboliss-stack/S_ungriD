import { useState, useEffect } from "react";

export default function useWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState('');

  useEffect(() => {
    const addr = localStorage.getItem('walletAddress');
    const type = localStorage.getItem('walletType');
    if (addr) {
      setIsConnected(true);
      setWalletAddress(addr);
      setWalletType(type || '');
    }
  }, []);

  const connect = (address: string, type: string) => {
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('walletType', type);
    setIsConnected(true);
    setWalletAddress(address);
    setWalletType(type);
  };

  const disconnect = () => {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletType');
    setIsConnected(false);
    setWalletAddress('');
    setWalletType('');
  };

  return { isConnected, walletAddress, walletType, connect, disconnect };
}