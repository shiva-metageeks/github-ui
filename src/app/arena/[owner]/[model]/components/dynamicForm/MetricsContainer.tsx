import React from 'react'
const Card=({title,data}:{title:string,data:string})=>{
    return <div>
          <div className="mt-4 leading-[145%] text-gray-400 text-xs">
              {title}
            </div>
            <div className="font-semibold">
              {data}
            </div>
    </div>
}
const MetricsContainer = ({data}:{data: {
    total_time: number;
    input_token_count?: number;
    tokens_per_second?: number;
    output_token_count?: number;
    predict_time?: number;
    time_to_first_token?: number;
  }}) => {
  return (
    <div className='flex gap-4 py-2 items-start'>
        <Card title={"Generated in"} data={`${Math.round(data.total_time*100)/100} seconds`}/>
        {data.input_token_count &&<Card title={"Input tokens"} data={`${data.input_token_count}`}/>}
        {data.output_token_count &&<Card title={"Output tokens"} data={`${data.output_token_count}`}/>}
        {data.tokens_per_second &&<Card title={"Tokens per second"} data={`${data.tokens_per_second?.toFixed(2)} token / seconds`}/>}
        {data.time_to_first_token &&<Card title={"Time to first token"} data={`${data.time_to_first_token?.toFixed(2)} seconds`}/>}
    </div>
  )
}

export default MetricsContainer