import React, { useState , useEffect} from 'react'
import Button from '../Button/Button'
import { addUser, updateUser } from '../../api/apiCalls'

const Form = ({setData,setopen,userToEdit,setEditId}) => {
    const [formData,setFormData] = useState({
        name: '',
        age: '',
        email: '',
        department: ''
    })//form-data state to store the details for new user and user to be edited

    const [inActive, setInActive] = useState(false)//flag to disable the cancel button

    useEffect(() => {
        //pre-filling the the data of the user to be edited
        if (userToEdit) {
            setFormData({
            name: userToEdit.name || "",
            age: userToEdit.age || "",
            email: userToEdit.email || "",
            department: userToEdit.department || "",
            });
        }
    }, [userToEdit]);


    const handleCancel = () => {
        //close the form for adding new user
        setopen(false);

        //remove the id to be edited if set
        setEditId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //flag to set the cancel button inactive while the api is being called
        setInActive(true)

        try {

            if(userToEdit){
                const response = await updateUser(userToEdit.id,formData);//calling the api function to update the user details
                                
                if(response.status === 200){
                    alert('User Updated Successfully')
                    setData((prev) =>
                        prev.map((user) => (user.id === userToEdit.id ? response.data : user))
                    );
                }else{
                    alert('Error Updating the User')
                }
            }else{
                const response = await addUser(formData);//caaling the api function to add new user
                if(response.status === 201){
                    alert('New User Added')
                    setData(prev => [...prev, response.data]);
                }
                else{
                    alert('Error adding new user')
                }
            }
            
        } catch (error) {
            console.log(error);
            
        }finally{
            //closing the open form after completion of the process
            setopen(false)
            setInActive(false)
        }
        
        //setting the formdata state to empty after the user is added or updated
        setFormData({
        name: '',
        age: '',
        email: '',
        department: ''
    })
    } 


  return (
     <div className='w-[400px]' >
        <p className='text-xl font-semibold'>{userToEdit ? "Edit User" : "Add New User"}</p>
        <form onSubmit={handleSubmit} className='space-y-3 '>
            <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                    Name:
                </span>
                <input 
                type="text"
                placeholder="User Name"
                value={formData.name}
                onChange={(e) => setFormData({
                    ...formData,
                    name: e.target.value
                })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </label>
            <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Age:
                </span>
                <input 
                type="number"
                placeholder="User Age"
                value={formData.age}
                onChange={(e) => setFormData({
                    ...formData,
                    age: e.target.value
                })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </label>
            <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                    Email:
                </span>
                <input 
                type="email"
                placeholder=" User Email"
                value={formData.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                 />
            </label>
            <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                    Department:
                </span>
                <input 
                type="text"
                placeholder=" User Department"
                value={formData.department}
                onChange={(e) => setFormData({
                    ...formData,
                    department: e.target.value
                })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </label>
            <div className='space-x-4'>
                <Button 
                    type='submit'
                    className='bg-blue-500 px-3 text-white rounded py-1 '
                >
                    {userToEdit ? "Update" : 'Add'}
                </Button>
                <Button       
                    onClick={handleCancel}    
                    disabled={inActive}      
                    className= {` px-3 rounded py-1 ${inActive ? "bg-gray-400 text-black" : "bg-blue-500 text-white" }`}
                >
                    Cancel
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Form