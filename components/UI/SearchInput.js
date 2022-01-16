import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

const SearchInput = ({searchTerm, handleChange, placeholder}) => {
    return (
        <div className='flex items-center space-x-4 bg-white py-1 px-2 w-[500px] rounded border border-gray-300'>
            <SearchIcon className='h-4 text-gray-500'/>
            <input type="text" placeholder={placeholder} className='bg-transparent outline-none text-[15px] flex-1' value={searchTerm} onChange={handleChange}/>
        </div>
    )
}

export default SearchInput
