import { useState , useEffect} from 'react'
import Header from './components/Header/Header'
import UserCard from './components/UserCard/UserCard'
import { getUsers } from './api/apiCalls'
import Filter from './components/Filter/Filter'
import SearchBar from './components/SearchBar/SearchBar'
import Button from './components/Button/Button'
import Form from './components/Form/Form'

function App() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [query, setQuery] = useState('')
  const [editId, setEditId] = useState()
  const [open, setopen] = useState(false)

  //useEffect to fetch all the users data from the api
  useEffect(() => {
   const fetchUser = async () => {
    try {
      const response = await getUsers();//calling the api function to fetch all the users 
      setData(response)
    } catch (error) {
      console.log(error);
      
    }
   }

   fetchUser();
  },[])

  // Filter and search logic
  
  const filteredData = data.filter(user => {
  // Search logic - searches across multiple fields
  const matchesSearch = !query || 
    user.name?.toLowerCase().includes(query.toLowerCase()) ||
    user.email?.toLowerCase().includes(query.toLowerCase()) ||
    user.department?.toLowerCase().includes(query.toLowerCase());
  
  // Filter logic - filters by specific field based on selected filter
  let matchesFilter = true;
  
  if (filter && filter !== "") {
    switch(filter) {
      case "First Name":
        matchesFilter = user.name?.toLowerCase().includes(query.toLowerCase());
        break;
      case "Last Name":
        matchesFilter = user.name?.toLowerCase().includes(query.toLowerCase());
        break;
      case "Email":
        matchesFilter = user.email?.toLowerCase().includes(query.toLowerCase());
        break;
      case "Department":
        matchesFilter = user.department?.toLowerCase().includes(query.toLowerCase());
        break;
      default:
        matchesFilter = true;
    }
  }
  
  return matchesSearch && matchesFilter;
});
  
//find the user data to edit
  const userToEdit = editId ? data.find(user => user.id === editId) : null

  //filter the current data to remove the deleted user
  const onDelete = (id) => {
    setData(prevData => prevData.filter(user => user.id !== id));
  }

  return (
    <>
    <Header/>
    <div className='p-5'>
      <SearchBar query={query} setQuery={setQuery}/>
      <Filter setFilter= {setFilter}/>
      <Button 
        className='bg-blue-500 px-3 text-white rounded py-1 mt-3'
        onClick={() => setopen(prev => !prev)}>
        {editId ? 'Edit' : 'Add' }
      </Button>

      {open && (
        <div className='absolute bg-white right-[40%]  p-4 rounded'>
          <Form 
            setData={setData} 
            setopen={setopen} 
            userToEdit={userToEdit} 
            setEditId={setEditId}
            />
        </div>
      )}
      <div className='flex flex-wrap gap-4 mt-5 '>
        {filteredData.map(user => (
          <UserCard user={user} key={user.id} setEditId={setEditId}  onDelete={onDelete} />
        ))}
      </div>
    </div>
    </>
  )
}

export default App
