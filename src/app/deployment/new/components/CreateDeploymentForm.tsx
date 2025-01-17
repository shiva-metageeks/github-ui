"use client"
import { authenticatedRequest } from '@/config/request';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

type InstanceConfig = {
  type: string;
};

type FormState = {
  model_id: string;
  endpoint_name: string;
  instance_config: InstanceConfig;
  security_level: 'public' | 'protected';
};

const availableModels = [
  {
    model_id: "meta-llama/Meta-Llama-3-8B-Instruct",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "meta-llama/Meta-Llama-Guard-2-8B",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "mistralai/Mistral-7B-Instruct-v0.3",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1", "diffusers"],
    max_model_len: 16000,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "google/gemma-7b",
    import_path: "applications.LLM:app_builder",
    dependencies: ["vllm", "transformers", "diffusers"],
    max_model_len: 2200,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "google/gemma-2b-it",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "facebook/opt-125m",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "openai-community/gpt2-large",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "microsoft/phi-2",
    import_path: "applications.LLM:app_builder",
    dependencies: ["vllm", "transformers", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "mistralai/Mamba-Codestral-7B-v0.1",
    import_path: "applications.LLM:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "vllm==0.5.3.post1", "diffusers"],
    max_model_len: 16000,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "mistralai/Mistral-7B-Instruct-v0.1",
    import_path: "applications.LLM:app_builder",
    dependencies: ["vllm", "transformers", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "meta-llama/Meta-Llama-3.1-8B",
    import_path: "applications.LLM:app_builder",
    dependencies: ["vllm", "transformers", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
  
  },
  {
    model_id: "allenai/OLMoE-1B-7B-0924",
    import_path: "applications.LLM:app_builder",
    dependencies: ["vllm", "transformers", "diffusers"],
    max_model_len: undefined,
    application_name: "LLMApplication",
    
  },
  {
    model_id: "stabilityai/stable-diffusion-xl-base-1.0",
    import_path: "applications.stable_diffusion:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "diffusers==0.29.2", "vllm==0.5.3.post1"],
    max_model_len: undefined,
    application_name: "SDApplication",
    
  },
  {
    model_id: "lucataco/moondream2",
    import_path: "applications.moondream2:app_builder",
    dependencies: ["torch==2.3.1", "transformers==4.43.2", "einops==0.8.0", "torchvision==0.18.1"],
    max_model_len: undefined,
    application_name: "MoonDreamApplication",
    
  },
  {
    model_id: "bark/suno",
    import_path: "applications.suno:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "scipy"],
    max_model_len: undefined,
    application_name: "SunoApplication",
    
  },
  {
    model_id: "stabilityai/sdxl-turbo",
    import_path: "applications.sdxl:app_builder",
    dependencies: ["torch", "transformers==4.43.2", "diffusers==0.29.2", "vllm==0.5.3.post1"],
    max_model_len: undefined,
    application_name: "SDApplication",
    
  },
  {
    model_id: "Salesforce/blip-image-captioning-large",
    import_path: "applications.Blip:app_builder",
    dependencies: ["torch", "transformers", "boto3"],
    max_model_len: undefined,
    application_name: "Application",
    
  }
  ]
const instanceTypes = [
    {
        "id": "micro",
        "title": "Micro",
        "description": "1 CPU 2GB"
    },
    {
        "id": "small",
        "title": "Small",
        "description": "2 CPU 4GB"
    },
    {
        "id": "medium",
        "title": "Medium",
        "description": "4 CPU 8GB"
    },
    {
        "id": "large",
        "title": "Large",
        "description": "8 CPU 16GB"
    },
    {
        "id": "A10",
        "title": "A10",
        "description": "4 CPU 24GB"
    },

]
const CreateDeploymentForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    model_id: availableModels[0].model_id,
    endpoint_name: "my_endpoint",
    instance_config: { type: '' },
    security_level: 'public',
  });
  const router = useRouter()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInstanceTypeClick = (type: string) => {
    setFormState((prevState) => ({
      ...prevState,
      instance_config: { type },
    }));
  };

  const handleSecurityLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      security_level: value as 'public' | 'protected',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    const resp = await toast.promise(authenticatedRequest.post("/users/deployments",formState),{pending:"Creating deployment..."})
    if(resp.status ==200){
      toast.success("Deployment created!!")
      router.push("/deployment")
    }
    else{toast.error("Something went wrong!!")}
  };


  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto text-white rounded-lg">
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="model_id" className="block mb-2">Model ID</label>
          <select
            id="model_id"
            name="model_id"
            value={formState.model_id}
            onChange={(e)=>{setFormState((prevState) => ({
                ...prevState,
                "model_id": e.target.value,
              }));}}
            className="w-full px-2 py-3 bg-gray-800 rounded-md"
          >

            {
                availableModels.map(model=>{
                   return <option key={model.model_id} value={model.model_id}>{model.model_id}</option>
                })
            }
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="endpoint_name" className="block mb-2">Endpoint Name</label>
          <input
            type="text"
            id="endpoint_name"
            name="endpoint_name"
            value={formState.endpoint_name}
            onChange={handleInputChange}
            className="w-full px-2 py-3 bg-gray-800 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Instance Type</label>
        <div className="grid grid-cols-3 gap-2">
          {instanceTypes.map((type) => (
            <button
              type="button"
              key={type.id}
              onClick={() => handleInstanceTypeClick(type.id)}
              className={`p-2 rounded-md border ${
                formState.instance_config.type === type.id ? 'bg-blue-600 bg-opacity-40 border-blue-500' : 'bg-transparent'
              }`}
            >
              <h3 className="text-lg font-medium mb-1">{type.title}</h3>
              <p className='text-sm text-gray-300'>{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Security Level</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="security_level"
              value="public"
              checked={formState.security_level === 'public'}
              onChange={handleSecurityLevelChange}
              className="mr-2"
            />
            Public
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="security_level"
              value="protected"
              checked={formState.security_level === 'protected'}
              onChange={handleSecurityLevelChange}
              className="mr-2"
            />
            Protected
          </label>
        </div>
      </div>

      <button type="submit" className="w-full p-2 bg-blue-700 rounded-md hover:bg-blue-800">
        Create Deployment
      </button>
    </form>
  );
};

export default CreateDeploymentForm;