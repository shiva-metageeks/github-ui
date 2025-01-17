import React from 'react'
import CreateDatasetForm from './components/CreateDatasetForm'

const Page = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className="max-w-xl w-full py-10">
            <div className="mb-6 text-center">

            <h1 className="text-2xl mb-2 font-semibold">Create a new model repository</h1>
        <p className='text-gray-300 text-sm'>A repository contains all model files,weights, including the revision history.</p>
            </div>
            <CreateDatasetForm type='model'/>
        </div>
    </div>
  )
}

export default Page