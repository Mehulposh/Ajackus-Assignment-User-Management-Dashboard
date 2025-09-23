import React from 'react'

const SearchBar = ({query,setQuery}) => {
  return (
    <div className='flex items-center ' >
        <input 
            type='text'
            placeholder='Search by name, email, or department'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className= {`p-2 w-full  rounded m-3 font-semibold text-lg bg-gray-600 text-gray-200`}
        />

        
        <button 
            onClick={() => setQuery('')}
            className= {`px-2 py-2 rounded font-semibold text-xl hover:bg-gray-300 text-gray-700`}
        >
            X
        </button>
        
    </div>
  )
}

export default SearchBar