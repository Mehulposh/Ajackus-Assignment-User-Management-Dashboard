import React from 'react'
import Button  from '../Button/Buttton'
const UserCard = ({user}) => {
  return (
    <div>
        <div className={`w-[350px] p-3 rounded bg-gray-300`}>
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Age: {user.age}</p>
        {/* <p>Department: {user./></p> */}
        
        <div>
            <Button>Edit</Button>
            <Button>Delete</Button>
        </div>

    </div>  
    </div>
  )
}

export default UserCard