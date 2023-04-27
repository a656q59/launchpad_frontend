import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from '../utils/axios';

function NewProgram({onIncrement }) {

    
    const[formData,setFormdata] = useState({programId:'',programName:''});
    const url = `/program/`;
    const navigate=useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(url,formData);
            onIncrement(res.data)
            navigate(`/`);
            
        } catch (error) {
            if(error.response.status && error.response.status===409)
            alert('this program already exists')
        }    
    }
    
    
        return (
            <div className='container border'> 
                <h1>Add New Program</h1>   
                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <label htmlFor="programId" className="form-label">Program ID</label>
                        <input type="number" placeholder="must be a number" value={formData.programId} onChange={(e)=>setFormdata({...formData,programId:e.target.value})} className="form-control" id="programId" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="programName" className="form-label">Program Name</label>
                        <input type="text" className="form-control"  onChange={(e)=>setFormdata({...formData,programName:e.target.value})} value={formData.programName} id="programName"/>
                    </div>        

                
                    <button type="submit" className="btn btn-primary" >Submit</button>
                    <Link to="/"><div className="btn btn-primary  m-4"> Home</div></Link>



                </form>  
            </div>
        );



}

export default NewProgram;