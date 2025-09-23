import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'//base url of the api


export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}


export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const updateUser = async (id,data) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`,{
            name: data.name,
            email: data.email
        });
        return response
    } catch (error) {
        console.log(error);
        
    }
} 


export const addUser = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`,data);
        return response
    } catch (error) {
        console.log(error);
        
    }
}


