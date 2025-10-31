import { useState } from 'react';
import { ethers } from 'ethers';
import contractsData from '../contracts/contracts.json';
import SunGridRewardsABI from '../contracts/abis/SunGridRewards.json';
import SunGridMarketplaceArtifact from '../../Smartcontract/artifacts/contracts/Sungrid.sol/SunGridMarketplace.json';

interface UserStats {
  totalEnergyProduced: string;
  totalEnergyTraded: string;
  carbonCredits: string;
  ecoPoints: string;
}

interface ContractData {
  isConnected: boolean;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  rewardsContract: ethers.Contract | null;
  marketplaceContract: ethers.Contract | null;
  userStats: UserStats | null;
  loading: boolean;
  error: string | null;
}

export default function useContracts() {
  const [contractData, setContractData] = useState<ContractData>({
    isConnected: false,
    provider: null,
    signer: null,
    rewardsContract: null,
    marketplaceContract: null,
    userStats: null,
    loading: false,
    error: null
  });

  const connectWallet = async () => {
    try {
      setContractData(prev => ({ ...prev, loading: true, error: null }));

      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Get user address
        const address = await signer.getAddress();
        
        // Create contract instances
        const rewardsContract = new ethers.Contract(
          contractsData.contracts.SunGridRewards.address,
          SunGridRewardsABI,
          signer
        );
        const SunGridMarketplaceABI = (SunGridMarketplaceArtifact as any).abi;
        const marketplaceContract = new ethers.Contract(
          contractsData.contracts.SunGridMarketplace.address,
          SunGridMarketplaceABI,
          signer
        );

        // Get user stats
        const stats = await rewardsContract.getUserStats(address);
        const userStats: UserStats = {
          totalEnergyProduced: ethers.utils.formatEther(stats.totalEnergyProduced),
          totalEnergyTraded: ethers.utils.formatEther(stats.totalEnergyTraded),
          carbonCredits: ethers.utils.formatEther(stats.carbonCredits),
          ecoPoints: ethers.utils.formatEther(stats.ecoPoints)
        };

        setContractData({
          isConnected: true,
          provider,
          signer,
          rewardsContract,
          marketplaceContract,
          userStats,
          loading: false,
          error: null
        });

        return { success: true, address };
      } else {
        throw new Error('MetaMask not detected');
      }
    } catch (error: any) {
      setContractData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to connect wallet'
      }));
      return { success: false, error: error.message };
    }
  };

  const updateUserStats = async (energyAmount: number) => {
    try {
      if (!contractData.rewardsContract || !contractData.signer) {
        throw new Error('Contract not connected');
      }

      setContractData(prev => ({ ...prev, loading: true, error: null }));

      const tx = await contractData.rewardsContract.updateUserStats(
        ethers.utils.parseEther(energyAmount.toString())
      );
      
      await tx.wait();

      // Refresh user stats
      const address = await contractData.signer.getAddress();
      const stats = await contractData.rewardsContract.getUserStats(address);
      const userStats: UserStats = {
        totalEnergyProduced: ethers.utils.formatEther(stats.totalEnergyProduced),
        totalEnergyTraded: ethers.utils.formatEther(stats.totalEnergyTraded),
        carbonCredits: ethers.utils.formatEther(stats.carbonCredits),
        ecoPoints: ethers.utils.formatEther(stats.ecoPoints)
      };

      setContractData(prev => ({
        ...prev,
        userStats,
        loading: false,
        error: null
      }));

      return { success: true, tx };
    } catch (error: any) {
      setContractData(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to update stats'
      }));
      return { success: false, error: error.message };
    }
  };

  const getCarbonOffset = async (userAddress: string) => {
    try {
      if (!contractData.rewardsContract) {
        throw new Error('Contract not connected');
      }

      const carbonOffset = await contractData.rewardsContract.calculateCarbonOffset(userAddress);
      return ethers.utils.formatEther(carbonOffset);
    } catch (error: any) {
      console.error('Error getting carbon offset:', error);
      return '0';
    }
  };

  const disconnect = () => {
    setContractData({
      isConnected: false,
      provider: null,
      signer: null,
      rewardsContract: null,
      marketplaceContract: null,
      userStats: null,
      loading: false,
      error: null
    });
  };

  // Marketplace helpers for demo
  const calculateMarketplacePrice = async (listingId: number) => {
    if (!contractData.marketplaceContract) throw new Error('Contract not connected');
    const [totalPrice, platformFee, sellerAmount] = await contractData.marketplaceContract.calculatePrice(listingId);
    return {
      totalPrice: ethers.utils.formatEther(totalPrice),
      platformFee: ethers.utils.formatEther(platformFee),
      sellerAmount: ethers.utils.formatEther(sellerAmount)
    };
  };

  const getActiveListing = async (listingId: number) => {
    if (!contractData.marketplaceContract) throw new Error('Contract not connected');
    return await contractData.marketplaceContract.getActiveListing(listingId);
  };

  const buyEnergy = async (listingId: number, hcsRecordIdHex32: string) => {
    if (!contractData.marketplaceContract) throw new Error('Contract not connected');
    const { totalPrice } = await calculateMarketplacePrice(listingId);
    const tx = await contractData.marketplaceContract.buyEnergy(
      listingId,
      hcsRecordIdHex32,
      { value: ethers.utils.parseEther(totalPrice) }
    );
    return await tx.wait();
  };

  const createListing = async (tokenAmount: string, pricePerKwh: string) => {
    if (!contractData.marketplaceContract) throw new Error('Contract not connected');
    const tx = await contractData.marketplaceContract.createListing(
      ethers.utils.parseEther(tokenAmount),
      ethers.utils.parseEther(pricePerKwh)
    );
    return await tx.wait();
  };

  return {
    ...contractData,
    connectWallet,
    updateUserStats,
    getCarbonOffset,
    calculateMarketplacePrice,
    getActiveListing,
    buyEnergy,
    createListing,
    disconnect,
    contracts: contractsData.contracts
  };
}

