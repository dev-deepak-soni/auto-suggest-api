import React from 'react'

const Suggestions = (result) => {
    console.log('result', result);
    console.log('2======',result?.result?.resourceSets[0]?.resources[0]);
    return (
        <>
            <div className='mt-10 h-80 overflow-auto flex flex-wrap p-2 m-2 text-center ml-[5%] mr-[5%] md:ml-[16%] sm:ml-[10%]'>
                {result?.result?.resourceSets[0]?.resources[0]?.value.map((x,i) =>
                    <div 
                    className="rounded-xl shadow-md w-60 border border-gray-400 m-2 p-2 bg-white hover:bg-gray-100" 
                    key={`test_${i}`}
                    title={x.name}
                    >
                        
                        {x.name ? <h1 className='font-bold text-sm mb-2'>{x.name}</h1> : ''}
                        <h2>{x.address.adminDistrict}</h2>
                        <p>{x.address.countryRegion}</p>
                        <p>{x.address.countryRegionIso2}</p>
                        <p>{x.address.formattedAddress}</p>
                        <p>{x.address.locality}</p>
                        <p>{x.__type}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Suggestions