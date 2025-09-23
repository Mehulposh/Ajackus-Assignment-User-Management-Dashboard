import React from 'react'
import Button  from '../Button/Button'
import { deleteUser } from '../../api/apiCalls'

const departments = ["HR", "Engineering", "Sales", "Marketing"];

const UserCard = ({user,setEditId,onDelete}) => {
    const handleEdit = (id) => {
        setEditId(id)
    }

    const handleDelete = async (id) => {
        try {
            const response =  await deleteUser(id);
            if(response){
                onDelete(id)
                alert('User Deleted')
            }
           
        } catch (error) {
            console.log(error);
            
        }
    }

    // 🔹 Pick random department if none exists
    const randomDepartment = user.department || departments[Math.floor(Math.random() * departments.length)];
    const randomAge = user.age || Math.floor(Math.random() * (60 - 20 + 1)) + 20;


  return (
    <div>
        <div className={`w-[350px] p-3 rounded bg-gray-300`}>
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>  
        <p>Age: {user.age || randomAge}</p>
        <p>Department: {user.department || randomDepartment}</p>
        
        <div className='space-x-3 mt-3'>
            <Button 
                onClick = {() => handleEdit(user.id)}
                className='bg-blue-500 px-3 text-white rounded py-1 '
            > 
                Edit
            </Button>
            <Button 
                className='bg-blue-500 px-3 text-white rounded py-1 '
                onClick = {() => handleDelete(user.id)}    
            >Delete</Button>
        </div>

    </div>  
    </div>
  )
}

export default UserCard