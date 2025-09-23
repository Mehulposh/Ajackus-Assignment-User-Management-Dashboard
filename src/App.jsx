import { useState , useEffect} from 'react'
import Header from './components/Header/Header'
import UserCard from './components/UserCard/UserCard'
import { getUsers } from './api/apiCalls'
import Filter from './components/Filter/Filter'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
   const fetchUser = async () => {
    try {
      const response = await getUsers();
      console.log(response);
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


  return (
    <>
    <Header/>
    <div className='p-5'>
      <SearchBar query={query} setQuery={setQuery}/>
      <Filter setFilter= {setFilter}/>
    
      <div className='flex flex-wrap gap-4 mt-5 '>
        {filteredData.map(user => (
          <UserCard user={user} key={user.id}/>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
