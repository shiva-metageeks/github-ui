import CreateDatasetForm from '@/app/models/new/components/CreateDatasetForm'
import React from 'react'
const Page = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className="max-w-xl w-full py-10">
            <div className="mb-6 text-center">

            <h1 className="text-2xl mb-2 font-semibold">Create a new dataset repository</h1>
        <p className='text-gray-300 text-sm'>A repository contains all dataset files, including the revision history.</p>
            </div>
            <CreateDatasetForm type='dataset'/>
        </div>
    </div>
  )
}

export default Page