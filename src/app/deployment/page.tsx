"use client"
import { authenticatedRequest } from '@/config/request'
import { useCurrentUser } from '@/hooks/user'
import { Deployment } from '@/types/Deployment'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaCopy } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const Page = () => {

    const { user } = useCurrentUser()
    const userSpacesQuery = useQuery({
        queryKey: ["mySpaces"], queryFn: async () => {
            const spacesResp = await authenticatedRequest.get("/users/deployments")
            const data: Deployment[] = spacesResp.data.data
            return data
        }, enabled: !!user
    })
    function handleCopy(text: string) {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.info("Endpoint copied!")
            })
            .catch(err => {
                console.error('Unable to copy text to clipboard: ', err);
            });
    }
    const deleteMutation = useMutation({
        mutationFn: async (id:string) => {
            const spacesResp = await toast.promise(authenticatedRequest.delete("/users/deployments/"+id),{pending:"Deleting.."})
            userSpacesQuery.refetch()
        }
    })
    return (
        <div className='py-10 px-[10%]'>

            <h1 className='text-xl mb-4'>My Deployments</h1>
                {
                    userSpacesQuery.data?.length ?
                        <div className="grid grid-cols-2 gap-6">
                            {
                                userSpacesQuery.data.map(dep => {
                                    const ep = `https://api-cluster.clusterprotocol.ai/${dep.endpoint_name}`
                                    return <div key={dep.model_id} className='card-border-effect p-4'>
                                        <h1 className='text-xl font-medium'>Model: <span className="text-gray-100">{dep.model_id}</span></h1>
                                        <div className='flex items-center'><span>Endpoint: </span>
                                            <button onClick={() => { handleCopy(ep) }} className="flex items-center gap-2 p-2 text-gray-300">
                                                <span className='text-xs text-gray-400'>
                                                    {ep}
                                                </span>
                                                <FaCopy size={10} />
                                            </button>
                                        </div>
                                        <button onClick={()=>{deleteMutation.mutate(dep._id)}} className='bg-red-700 text-whiye rounded py-2 px-4 mt-4'> Delete</button>
                                    </div>
                                })
                            }
                        </div>
                        :
                        <h4 className='text-center'>No deployments found</h4>
                }
        </div>
    )
}

export default Page