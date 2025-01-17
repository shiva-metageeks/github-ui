"use client"
import { authenticatedRequest } from '@/config/request';
import { useCurrentUser } from '@/hooks/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { LuBook, LuBookLock } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { formatsData, modalitiesData } from './contant';
import { useEthersSigner } from '@/provider/EtherJSSigner';
import { useAccount } from 'wagmi';
import { Contract, formatUnits, parseEther, parseUnits } from 'ethers';
import { FACTORY_ABI, FACTORY_ADDRESS, NFT_ABI, NFT_ADDRESS } from '@/config/datasetContractConstants';
function validateGitHubRepoName(name: string) {
  // Check if the name is between 1 and 100 characters
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Check if it starts or ends with a dash or underscore
  if (/^[-_]|[-_]$/.test(name)) {
    return false;
  }

  // Check if it contains only valid characters: alphanumeric, dash, and underscore
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return false;
  }

  return true;
}
interface FormData {
  name: string,
  owner: string,
  license: string,
  visibility: string,
  format: string[],
  modalities: string[],
  description: string,

  paymentMode: string,
  customTokenSupply: number,
  d2cAccessPrice: number,
  fullAccessPrice?: number,
  expiryAccessPrice?: number,
  expiryDuration?: number,
}
const CreateDatasetForm = ({ type }: { type: "dataset" | "model" }) => {
  const { user } = useCurrentUser()
  const router = useRouter()
  const [isValidName, setIsValidName] = useState<boolean | null>(true)
  const [creatingNFT, setCreatingNFT] = useState<boolean>(false);
  const [datasets, setDatasets] = useState<any>([]);
  const [userDatasets, setUserDatasets] = useState<any>([]);
  const [accessibleDatasets, setAccessibleDatasets] = useState<any>([]);

  const etherSigner = useEthersSigner()
  const account = useAccount()
  const [factoryContract, setFactoryContract] = useState<Contract | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    owner: '',
    license: 'MIT',
    visibility: 'private',
    format: [],
    modalities: [],
    description: "Placeholder",
    paymentMode: "0",
    customTokenSupply:1000000,
    d2cAccessPrice:10
  });
  useEffect(() => {
    const initEthers = async () => {
      if (account.isConnected && etherSigner) {
        try {
          const contract = new Contract(FACTORY_ADDRESS, FACTORY_ABI, etherSigner);

          setFactoryContract(contract);

        } catch (error) {
          console.error("Error initializing:", error);
        }
      }
    };

    initEthers();
  }, [account.isConnected, etherSigner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleModalityChange = (key: string) => {
    setFormData(prev => {
      let temp = [...prev.modalities]
      if (temp.includes(key)) {
        temp = temp.filter(k => k != key)
      }
      else {
        temp.push(key)
      }
      return {
        ...prev,
        modalities: temp
      }
    });
  };
  const loadDatasets = async () => {
    if (!factoryContract || !account.isConnected) return;
  
    try {
      // setLoading(true);
      const datasetCount = await factoryContract._datasetIds();
      const loadedDatasets = [];
      const userOwnedDatasets = [];
      const userAccessibleDatasets = [];
  
      for (let i = 23; i <= datasetCount; i++) {
        try {
          const dataset = await factoryContract.datasets(i);
          
          if (!dataset.active) continue;
  
          const formattedDataset = {
            id: i,
            name: dataset.name,
            description: dataset.description,
            uri: dataset.uri,
            version: dataset.version.toString(),
            active: dataset.active,
            paymentMode: dataset.paymentMode,
            customTokenAddress: dataset.customTokenAddress,
            prices: {
              fullAccessPrice: formatUnits(
                dataset.prices.fullAccessPrice,
                dataset.paymentMode === BigInt(1) ? 6 : 18
              ),
              d2cAccessPrice: formatUnits(
                dataset.prices.d2cAccessPrice,
                dataset.paymentMode === BigInt(1) ? 6 : 18
              ),
              expiryAccessPrice: formatUnits(
                dataset.prices.expiryAccessPrice,
                dataset.paymentMode === BigInt(1) ? 6 : 18
              ),
            },
            expiryDuration: dataset.expiryDuration.toString(),
          };
  
          loadedDatasets.push(formattedDataset);
  
          // Check NFT ownership
          try {
            const nftContract = new Contract(NFT_ADDRESS, NFT_ABI, etherSigner);
            const owner = await nftContract.ownerOf(i);
            if (owner.toLowerCase() === account.address?.toLowerCase()) {
              userOwnedDatasets.push(formattedDataset);
            }
          } catch (error:any) {
            console.error('NFT ownership check error:', {
              datasetId: i,
              error: {
                message: error.message,
                code: error.code
              }
            });
          }
  
          // Check access rights
          try {
            const [hasAccess, accessType] = await factoryContract.checkAccess(
              account.address,
              i
            );
  
            const getAccessTypeName = (accessType:any) => {
              switch (Number(accessType)) {
                case 0:
                  return "None";
                case 1:
                  return "Expiry";
                case 2:
                  return "D2C";
                case 3:
                  return "Full";
                default:
                  return "Unknown";
              }
            };
  
            const accessTypeName = getAccessTypeName(accessType);
            
            // Debug logging with safe stringification
            console.log(`Dataset ${i} - Access Status:`, {
              hasAccess,
              accessType: accessTypeName
            });
  
            if (hasAccess) {
              userAccessibleDatasets.push({
                ...formattedDataset,
                accessType: accessTypeName
              });
            }
          } catch (error:any) {
            console.log(error)
            console.error('Access check error:', {
              datasetId: i,
              error: {
                message: error.message,
                code: error.code
              }
            });
          }
        } catch (error:any) {
          console.error('Dataset fetch error:', {
            datasetId: i,
            error: {
              message: error.message,
              code: error.code
            }
          });
          continue; // Skip to next dataset if this one fails
        }
      }
  
      setDatasets(loadedDatasets);
      setUserDatasets(userOwnedDatasets);
      setAccessibleDatasets(userAccessibleDatasets);
  
    } catch (error:any) {
      console.error('Load datasets error:', {
        error: {
          message: error.message,
          code: error.code
        }
      });
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (factoryContract) {
      console.log("Loading datasets")
      loadDatasets();
    }
  }, [factoryContract]);
  interface CreateDatasetContractFormData {
    name: string,
    description: string,
    uri: string,
    paymentMode: string,
    fullAccessPrice: number
    d2cAccessPrice: number
    expiryAccessPrice: number
    expiryDuration: number
    customTokenSupply: number
  }
  const createDataset = async (formDataToSubmit: CreateDatasetContractFormData) => {

    console.log(factoryContract)
    try {
      setCreatingNFT(true);

      // Parse prices based on payment mode
      const decimals = formDataToSubmit.paymentMode === "1" ? 6 : 18;
      const prices = {
        fullAccessPrice: parseUnits(String(formDataToSubmit.fullAccessPrice), decimals),
        d2cAccessPrice: parseUnits(String(formDataToSubmit.d2cAccessPrice), decimals),
        expiryAccessPrice: parseUnits(
          String(formDataToSubmit.expiryAccessPrice),
          decimals
        ),
      };

      // Log the parameters for debugging
      console.log("Creating dataset with params:", {
        name: formDataToSubmit.name,
        description: formDataToSubmit.description,
        uri: formDataToSubmit.uri,
        expiryDuration: Number(formDataToSubmit.expiryDuration) * 24 * 60 * 60,
        paymentMode: parseInt(formDataToSubmit.paymentMode),
        prices,
        customTokenSupply:
          formDataToSubmit.paymentMode === "3"
            ? parseEther(String(formDataToSubmit.customTokenSupply))
            : 0,
      });

      const tx = await factoryContract!.createDataset(
        formDataToSubmit.name,
        formDataToSubmit.description,
        formDataToSubmit.uri,
        Number(formDataToSubmit.expiryDuration) * 24 * 60 * 60,
        parseInt(formDataToSubmit.paymentMode),
        prices,
        formDataToSubmit.paymentMode === "3"
          ? parseEther(String(formDataToSubmit.customTokenSupply))
          : 0
      );

      const receipt = await tx.wait();

      // Find the DatasetCreated event
      const event = receipt.logs.find((log:any) => {
        try {
          const parsedLog = factoryContract!.interface.parseLog({
            topics: log.topics,
            data: log.data,
          });
          return parsedLog?.name === "DatasetCreated";
        } catch (e) {
          return false;
        }
      });

      if (event) {
        const parsedEvent = factoryContract!.interface.parseLog({
          topics: event.topics,
          data: event.data,
        });
        if(!parsedEvent)return

        const datasetId:number = parsedEvent.args.datasetId;
        const tokenAddress = parsedEvent.args.customTokenAddress;

        console.log("Dataset created successfully:", {
          datasetId: datasetId.toString(),
          tokenAddress,
          name: parsedEvent.args.name,
        });
        return Number(datasetId)
      }
    } catch (err: any) {
      console.error("Failed to create dataset:", err);
      // Add more detailed error logging
      console.log("Error details:", {
        message: err.message,
        code: err.code,
        data: err.data,
      });
    } finally {
      setCreatingNFT(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    console.log({formData})
    if (!user) {
      router.push("/login")
    }
    let datasetId
    if (formData.visibility === "tokenize") {
      if ( !formData.fullAccessPrice || !formData.d2cAccessPrice || !formData.expiryAccessPrice || !formData.expiryDuration || !formData.customTokenSupply) return toast.info("Fill all the values!")
      if (!account.isConnected) {
        return toast.info("Please connect your wallet first to tokenize the dataset!!")
      }
      datasetId = await toast.promise(
        createDataset({
          name: formData.name,
          description: formData.description,
          uri: `https://beta.clusterprotocol.ai/${user?.username}/${formData.name}`,
          paymentMode: formData.paymentMode,
          fullAccessPrice: formData.fullAccessPrice ,
          d2cAccessPrice: formData.d2cAccessPrice ,
          expiryAccessPrice: formData.expiryAccessPrice ,
          expiryDuration: formData.expiryDuration ,
          customTokenSupply: formData.customTokenSupply,
        }  
      ),{
        pending:"Creating NFT"
      }
      )
    if(!datasetId)return toast.error("Something went wrong!!")
    toast.success("NFT created successfully")

    }




    try {
      const finalDataToSubmit:any = {...formData,visibility: formData.visibility ==="tokenize" ? "private" :formData.visibility}
      if(formData.visibility == "tokenize"){
        const temp = {
          "0":"0x0000000000000000000000000000000000000000",
          "1":"0x01f83Ee1FFC925c45AF7e307CDa248fFd3EF00A7",
          "2":"0xb27a5d59255a65BEd9f21CB5e2499Cc8D5759b3e",
        }
        finalDataToSubmit["tokenized"]={
          d_id:datasetId,
          
        }
      }
      const resp = await toast.promise(authenticatedRequest.post(`/${type}s`, finalDataToSubmit), { pending: "Creating your own dataset repository.." })
      // router.push(`/datasets/${formData.owner}/${formData.name}`)
      toast.success("Created successfullly")
      router.push(`/${type}s/${user?.username}/${formData.name}`)
      return
    }

    catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response)
        toast.error(e.message)
        return
      }
      console.log(e)
      toast.error("Some error occurred!!")
    }

  };

  useEffect(() => {
    setIsValidName(validateGitHubRepoName(formData.name))
  }, [formData.name])

  return (
    <form onSubmit={handleSubmit} className="bg-transparent p-4 rounded-lg space-y-5 text-xs">
      {/* Name and Owner Row */}
      <div className="flex space-x-4">

        <div className="w-5/12">
          <label className="block text-white mb-1">Owner</label>
          <select
            name="owner"
            // value={formData.owner}
            // onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border border-gray-600"
          >
            <option selected value={user?.username}>{user?.username}</option>
          </select>
        </div>
        <div className="w-7/12">
          <label className="block text-white mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.name?.length == 0) ? "border-gray-600" : "border-red-500"}`}

            placeholder="Enter name"
            required
          />
        </div>
      </div>

      {/* License Field */}
      <div className="w-full">
        <label className="block text-white mb-1">License</label>
        <select
          name="license"
          value={formData.license}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border border-gray-600"
        >
          <option value="MIT">MIT</option>
          <option value="Apache">Apache</option>
          <option value="GPL">GPL</option>
          <option value="BSD">BSD</option>
          <option value="ISC">ISC</option>
        </select>
      </div>
      {
        type == "dataset" &&
        <>
          {/* Format */}
          <div className="">
            <label htmlFor="" className='mb-1 block'>Format</label>
            <div className='flex flex-wrap gap-x-3 gap-y-2'>
              {formatsData.map(format => {
                return <button key={format.name} type="button" onClick={() => { setFormData((prev: any) => ({ ...prev, format: [format.name] })) }} className={`flex items-center gap-1.5 px-3 py-1.5 text-sm leading-none whitespace-nowrap rounded-md border border-solid  ${formData.format[0] == format.name ? "bg-blue-500 bg-opacity-20 border-blue-600 text-white" : "bg-transparent border-zinc-700 text-neutral-400"}`}><img src={format.icon} alt="" className='w-4' />{format.name}</button>
              })}
            </div>
          </div>
          {/* Modalities */}
          <div className="">
            <label htmlFor="" className='mb-1 block'>Modalities</label>
            <div className='flex flex-wrap gap-x-3 gap-y-2'>
              {modalitiesData.map(modality => {
                return <button key={modality.label} type="button" onClick={() => { handleModalityChange(modality.label) }} className={`flex items-center gap-1.5 px-3 py-1.5 text-sm leading-none whitespace-nowrap rounded-md border border-solid  ${formData.modalities.includes(modality.label) ? "bg-blue-500 bg-opacity-20 border-blue-600 text-white" : "bg-transparent border-zinc-700 text-neutral-400"}`}><img src={modality.icon} alt="" className='w-4' />{modality.label}</button>
              })}
            </div>
          </div>
        </>
      }
      {/* Visibility Radio Buttons */}
      <div className="w-full py-5 border-y border-gray-700">
        <div className="space-y-4">
          <div className="text-white flex items-start gap-1.5">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={formData.visibility === 'private'}
              onChange={handleChange}
              className="mt-1"
            />
            <div className="flex text-gray-500 items-start gap-1.5">
              <div>
                <LuBookLock size={24} />
              </div>
              <div>
                <label className='block text-sm text-white font-medium'>Private</label>
                <p>{"Only you (personal dataset) or members of your organization (organization dataset) can see and commit to this dataset."}</p>
              </div>

            </div>
          </div>

          <div className="text-white flex items-start gap-1.5">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={formData.visibility === 'public'}
              onChange={handleChange}
              className="mt-1"
            />
            <div className="flex text-gray-500 items-start gap-1.5">
              <div>
                <LuBook size={24} />
              </div>
              <div>
                <label className='block text-sm text-white font-medium'>Public</label>
                <p>{"Anyone on the internet can see this dataset. Only you (personal dataset) or members of your organization (organization dataset) can commit."}</p>
              </div>
            </div>
          </div>
          {
            type == "dataset" &&
            <>
              <div className="text-white flex items-start gap-1.5">
                <input
                  type="radio"
                  name="visibility"
                  value="tokenize"
                  checked={formData.visibility === 'tokenize'}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div className="flex text-gray-500 items-start gap-1.5">
                  <div>
                    <LuBook size={24} />
                  </div>
                  <div>
                    <label className='block text-sm text-white font-medium'>Tokenize</label>
                    <p>{"Tokenize your dataset into an NFT and associate a token to sell it or provide the access to it."}</p>
                  </div>
                </div>
              </div>

              {
                formData.visibility == "tokenize" && <div className="grid grid-cols-2 gap-2">
                  <div className=''>

                    <label className="block text-white mb-1">Payment Mode</label>
                    <select
                      value={formData.paymentMode}
                      onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                      required
                      className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.paymentMode) ? "border-gray-600" : "border-red-500"}`}
                    >
                      <option value="" disabled selected>Select Payment Mode</option>
                      <option value="0">ETH</option>
                      <option value="1">USDT</option>
                      <option value="2">CLUSTER</option>
                      <option value="3">Custom Token</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="block text-white mb-1">Full Access Price</label>
                    <input
                      type="number"
                      name="fullAccessPrice"
                      value={formData.fullAccessPrice}
                      onChange={handleChange}
                      className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.fullAccessPrice && formData.fullAccessPrice >= 0) ? "border-gray-600" : "border-red-500"}`}

                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="">
                    <label className="block text-white mb-1">Expiry Access Price</label>
                    <input
                      type="number"
                      name="expiryAccessPrice"
                      value={formData.expiryAccessPrice}
                      onChange={handleChange}
                      className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.expiryAccessPrice && formData.expiryAccessPrice >= 0) ? "border-gray-600" : "border-red-500"}`}

                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="">
                    <label className="block text-white mb-1">Expiry Duration (days)</label>
                    <input
                      type="number"
                      name="expiryDuration"
                      value={formData.expiryDuration}
                      onChange={handleChange}
                      className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.expiryDuration && formData.expiryDuration >= 0) ? "border-gray-600" : "border-red-500"}`}

                      placeholder="Enter price"
                      required
                    />
                  </div>
                  {formData.paymentMode =="3" &&<div className="col-span-2">
                    <label className="block text-white mb-1">Custom Token Supply</label>
                    <input
                      type="number"
                      name="customTokenSupply"
                      value={formData.customTokenSupply}
                      onChange={handleChange}
                      className={`w-full p-2 bg-gray-800 text-white focus:outline-none rounded-lg border ${(isValidName || formData.customTokenSupply && formData.customTokenSupply >= 0) ? "border-gray-600" : "border-red-500"}`}

                      placeholder="Enter price"
                      required
                    />
                  </div>}
                </div>
              }
            </>

          }
        </div>
      </div>
      <div className="p-2 rounded border border-gray-700 bg-gray-900 text-gray-500 text-center">
        Once your dataset is created, you can upload your files using the git.
      </div>
      {/* Submit Button */}
      <button
        disabled={!isValidName}
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full ${!isValidName && "opacity-25"}`}
      >
        Create
      </button>
    </form>
  );
};

export default CreateDatasetForm;
