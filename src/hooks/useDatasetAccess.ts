"use client"
import React, { useEffect, useState } from 'react'

import { CLUSTER_ADDRESS, FACTORY_ABI, FACTORY_ADDRESS, NFT_ABI, NFT_ADDRESS, TOKEN_ABI, USDT_ADDRESS } from "@/config/datasetContractConstants";
import { useAccount, useReadContract } from "wagmi";
import { Dataset } from '@/types/Dataset';
import { publicRequest } from '@/config/request';
import { formatUnits } from 'viem';
import { useEthersSigner } from '@/provider/EtherJSSigner';
import { Contract, parseEther, parseUnits } from 'ethers';
import { getGasPrice } from 'viem/actions';
const units = {
  0: "ETH",
  1: "USDT",
  2: "CLUSTER",
}
const DEFAULT_TOKEN_ID = 3

const getPrice = (dataset: any, accessType: string) => {
  console.log({accessType})
  // Get the base price amount
  let price;
  switch (accessType) {
    case "full":
      price = dataset.prices.fullAccessPrice;
      break;
    case "d2c":
      price = dataset.prices.d2cAccessPrice;
      break;
    case "expiry":
      price = dataset.prices.expiryAccessPrice;
      break;
    default:
      return 0;
  }

  // Convert based on payment mode
  if (dataset.paymentMode === BigInt(0)) {
    // ETH
    // return parseEther(price.toString());
    return price
  } else if (dataset.paymentMode === BigInt(1)) {
    // USDT
    return parseUnits(price.toString(), 6); // USDT uses 6 decimals
  } else {
    // CLUSTER or Custom Token (using 18 decimals)
    return parseEther(price.toString());
  }
};

const useDatasetAccess = (pathname: string, type: string) => {
  const [dataset, setDataset] = useState<Dataset | null>()
  const [factoryContract, setFactoryContract] = useState<Contract | null>(null);

  const account = useAccount()
  const ethSigner = useEthersSigner()
  useEffect(() => {
    if (account.isConnected && ethSigner) {
      const contract = new Contract(FACTORY_ADDRESS, FACTORY_ABI, ethSigner);
      setFactoryContract(contract)

    }
  }, [ethSigner])
  useEffect(() => {
    (async () => {
      if (type != "datasets") return
      const res = await publicRequest.get("/datasets/namespace/" + encodeURIComponent(pathname.slice(1)))
      console.log(res.data)
      setDataset(res.data)
    })()
  }, [])
  // @ts-expect-error
  const tokenized_id = dataset?.tokenized?.d_id || DEFAULT_TOKEN_ID
  console.log({ tokenized_id })
  const ownerRead = useReadContract({
    abi: NFT_ABI,
    address: NFT_ADDRESS,
    functionName: 'ownerOf',
    args: [tokenized_id]
  })
  const accessRead = useReadContract({
    abi: FACTORY_ABI,
    address: FACTORY_ADDRESS,
    functionName: 'checkAccess',
    args: [account.address, tokenized_id]
  })

  const tokenizedRead = useReadContract({
    abi: FACTORY_ABI,
    address: FACTORY_ADDRESS,
    functionName: 'datasets',
    args: [tokenized_id]
  })
  const tokenized_dataset: any = tokenizedRead.data

  let formattedDataset
  if (tokenized_dataset) {
    console.log({ tokenized_dataset })
    formattedDataset = {
      // id: tokenized_id,
      // name: tokenized_dataset.name,
      // description: tokenized_dataset.description,
      // uri: tokenized_dataset.uri,
      // version: tokenized_dataset.version?.toString(),
      // active: tokenized_dataset.active,
      paymentMode: tokenized_dataset[6],
      // @ts-expect-error
      paymentUnit: units[Number(tokenized_dataset[6])],
      // customTokenAddress: tokenized_dataset.customTokenAddress,
      prices: {
        fullAccessPrice: formatUnits(
          tokenized_dataset[8].fullAccessPrice,
          tokenized_dataset[6] === BigInt(1) ? 6 : 18
        ),
        d2cAccessPrice: formatUnits(
          tokenized_dataset[8].d2cAccessPrice,
          tokenized_dataset[6] === BigInt(1) ? 6 : 18
        ),
        expiryAccessPrice: formatUnits(
          tokenized_dataset[8].expiryAccessPrice,
          tokenized_dataset[6] === BigInt(1) ? 6 : 18
        ),
      },
      // expiryDuration: tokenized_dataset.expiryDuration?.toString(),
    }
  }

  const purchaseDataset = async ( accessType: string) => {
    if (!ethSigner || !factoryContract) return console.log("Discarding call",{ethSigner,factoryContract})
    const paymentMode = BigInt(tokenized_dataset[6])
    const prices =tokenized_dataset[8]
    const datasetTokenData = {
      paymentMode,
      prices,
      customTokenAddress: ""
    }
console.log(datasetTokenData)

    const accessTypeMap = {
      full: 3,
      d2c: 2,
      expiry: 1,
    };

    let value: bigint | 0 = 0;
    if (datasetTokenData.paymentMode === BigInt(0)) {
      value = getPrice(datasetTokenData, accessType);
      console.log("ETH Value:", value);
    } else {
      const tokenAddress =
        datasetTokenData.paymentMode === BigInt(1)
          ? USDT_ADDRESS
          : datasetTokenData.paymentMode === BigInt(2)
            ? CLUSTER_ADDRESS
            : datasetTokenData.customTokenAddress;

      console.log("Token Address:", tokenAddress);
      const tokenContract = new Contract(tokenAddress, TOKEN_ABI, ethSigner);
      const price = getPrice(datasetTokenData, accessType);
      console.log("Token Price:", price.toString());

      // Get user's token balance
      const balance = await tokenContract.balanceOf(
        await ethSigner.getAddress()
      );
      console.log("User Token Balance:", balance.toString());

      if (balance < price) {
        throw new Error("Insufficient token balance");
      }

      // Add gas estimation
      const gasLimit = await tokenContract.approve.estimateGas(
        FACTORY_ADDRESS,
        price
      );
      const adjustedGasLimit = (gasLimit * BigInt(12)) / BigInt(10);

      const approveTx = await tokenContract.approve(FACTORY_ADDRESS, price, {
        gasLimit: adjustedGasLimit,
      });
      await approveTx.wait();
    }
    const tx = await factoryContract!.purchaseAccess(
  // @ts-expect-error
      BigInt(dataset.tokenized.d_id),
      // @ts-expect-error 
      accessTypeMap[accessType],
      { value }
    );
    await tx.wait();

  }

  if (!tokenized_id) return { access: false }
  console.log({ ownerRead: ownerRead.data })
  console.log({ accessRead: accessRead.data })
  console.log({ formattedDataset: formattedDataset })
  if (ownerRead.data && accessRead.data) {
    return {
      owner: ownerRead.data,
      // @ts-expect-error
      access:ownerRead.data  == account.address || Number(accessRead.data[1]),
      formattedDataset,
      purchaseDataset
    }
  }
  return { access: false }





}

export default useDatasetAccess