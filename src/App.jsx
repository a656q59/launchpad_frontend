import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Home from './pages/HomePage';
import Program from './pages/Program';
import Exercise from './pages/Exercise';
import NewProgram from './pages/NewProgram';
import{Routes,Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from './utils/axios';

function App() {           
  const[data,setData] = useState([]);


  useEffect(()=>{
    const fetchData =async()=>{
      const res = await axios.get('/program');
      setData(res.data);
    }
    fetchData();
  },[])


  const handleUpdate = (updatedData)=>{
    const tempData = [...data];
    const index = tempData.findIndex(x=>x._id===updatedData._id)
    tempData[index] = {...updatedData}                                                                                                 // to edit a fitness program     
    setData(tempData);
  }



  const handleIncrement=(newData)=>{
    setData([...data,newData]);                                                                                                        // to add a new fitness program
  }




  const handleDelete=async(newData)=>{
    const originalData=[...data];
    const newArray = data.filter(d=>d._id!==newData._id)                                                                              // to delete a fitness program
    setData([...newArray]);
    const url = `/program/${newData._id}`
    try {
      await axios.delete(url)
    } catch (error) {
      alert('error occured');
      setData([...originalData]);
    }
  }




  return (
    <Routes >
          <Route path="/program/:id/exercise" element={ <Exercise />}/>
          <Route path='/program/:id' element={ <Program  data={data} onUpdate={handleUpdate}/>}/>
          <Route path="/newprogram" exact element={ <NewProgram onIncrement={handleIncrement}/>}/>
          <Route path="/" exact element={ <Home data={data} onDelete={handleDelete}/>}/>
    </Routes >  
  );
}

export default App;
