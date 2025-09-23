import React from 'react'

const category = ["First Name", "Last Name", "Email", "Department"]


const Filter = ({setFilter}) => {
  return (
    <div className='border w-1/10 rounded mt-5 ml-4'>
        <select className='w-full' onChange={(e) => setFilter(e.target.value)}>
            <option value="">Select filter</option>
            {category.map((opt,idx) => (
                <option value={opt} key={idx} >{opt}</option>
            ))}
        </select>
    </div>
  )
}

export default Filter