import React, { useState } from 'react'
import Button from '../Button/Button'
import { addUser } from '../../api/apiCalls'

const Form = ({setData}) => {
    const [formData,setFormData] = useState({
        name: '',
        age: '',
        email: '',
        department: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addUser(formData);
            console.log(response);
           if(response.status === 201){
            alert('New User Added')
            setData(prev => [...prev, response.data]);
           }
           else{
            alert('Error adding new user')
           }
            
        } catch (error) {
            console.log(error);
            
        }

        setFormData({
        name: '',
        age: '',
        email: '',
        department: ''
    })
    } 
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type='text'
                    placeholder='Write name'
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </label>
            <label>
                Age:
                <input 
                    type='number'
                    placeholder='Write age'
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})} />
            </label>
            <label>
                Email:
                <input 
                    type='email'
                    placeholder='Write email'
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </label>
            <label>
                Department:
                <input 
                    type='text'
                    placeholder='Write department'
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </label>

            <Button 
                type='submit'                 
                className='bg-blue-500 px-3 text-white rounded py-1 '
            >
                Submit
            </Button>
        </form>
    </div>
  )
}

export default Form