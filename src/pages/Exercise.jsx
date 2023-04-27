import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from '../utils/axios';

function Exercise(props) {

  const[formData,setFormdata] = useState({exerciseId:'',exerciseName:'',exerciseLength:''});

  
  const {id} = useParams();
  const url = `/program/${id}/exercises`;
  const navigate=useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.post(url,formData);
      navigate(`/program/${id}`);
    } catch (error) {
      alert('something went wrong');
    }
    

  }


    return (
        <div className='container border'> 
          <h1>Add New Exercise</h1>


          <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exerciseId" className="form-label">Exercise ID</label>
                    <input type="number" placeholder="must be a number" value={formData.exerciseId} onChange={(e)=>setFormdata({...formData,exerciseId:e.target.value})} className="form-control" id="exerciseId" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exerciseName" className="form-label">Exercise Name</label>
                    <input type="text" className="form-control"  onChange={(e)=>setFormdata({...formData,exerciseName:e.target.value})} value={formData.exerciseName} id="exerciseName"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exerciseLength" className="form-label">Exercise Length</label>
                    <input type="number" placeholder="Total Duration  in minutes" className="form-control"  onChange={(e)=>setFormdata({...formData,exerciseLength:e.target.value})} value={formData.exerciseLength} id="exerciseName"/>
                </div>
            
                <button type="submit" className="btn btn-primary mb-3" >Add Exercise</button>
          </form>



        </div>
    );
}

export default Exercise;