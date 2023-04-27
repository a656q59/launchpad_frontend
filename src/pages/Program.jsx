import React , {useEffect, useState}from 'react';
import { useNavigate, useParams, Link  } from 'react-router-dom';
import axios from '../utils/axios';


function Program({onUpdate}) {


    const[formData,setFormdata] = useState({programId:'',programName:'',exercises:[]});
    const {id} = useParams();
    const navigate=useNavigate();
    const url = `/program/${id}`;



    useEffect(()=>{
        async function fetchData(){
            try {
                const req = await axios.get(url)
                setFormdata(req.data);
                return req;
            } catch (error) {
                alert('invalid request');
                navigate('/');
            }
        }
        fetchData(); 
   },[navigate,url]);




   
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.put(url,formData);
            onUpdate(res.data);
            navigate('/');
        } catch (error) {
            alert('something went wrong, please try again')
        }
    }




    const handleDelete=async(data)=>{
        const originalArray = formData.exercises;
        const newExerciseArray = formData.exercises.filter(f=>f._id!==data._id)     //OPTIMISTIC UPDATE
        setFormdata({...formData,exercises:[...newExerciseArray]})
        try {
            await axios.delete(url+`/exercises/${data._id}`)
        } catch (error) {
            alert('error occured, please try again');
            setFormdata({...formData,exercises:[...originalArray]})
       }       
    }   




    return (


        <div className='container border '> 
            <h1>Edit Program</h1>

            {formData && <form onSubmit={handleSubmit} className='mb-5'>
                <div className="mb-3">
                    <label htmlFor="programID" className="form-label ">Program ID</label>
                    <input type="number"  value={formData.programId} onChange={(e)=>setFormdata({...formData,programId:e.target.value})} className="form-control w-50" id="programID" />
                </div>
                <div className="mb-3">
                    <label htmlFor="programName" className="form-label">Program Name</label>
                    <input type="text" className="form-control w-50"  onChange={(e)=>setFormdata({...formData,programName:e.target.value})} value={formData.programName} id="programName "/>
                </div>
            
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>}



            <div className='container border '>
                <div className="d-flex flex-row justify-content-between align-items-center my-4">
                    <h1>Exercises</h1>
                    <h4><Link to={`/program/${id}/exercise`}><div className="btn btn-primary mt-3 fw-bold"> Add New exercise</div></Link></h4>
                </div>
                <div className="row border">
                    <div className="col-sm-3"><h3>Exercise ID</h3></div>
                    <div className="col-sm-3"><h3>Exercise Name</h3></div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3"></div>
                </div>
            
                {formData.exercises.length===0? <h3 className='p-5'>no exercises added in this fitness program</h3>: formData.exercises.map(d=>(
                    <div className="row"key={d._id}>
                    <div className="col-sm-3">{d.exerciseId}</div>
                    <div className="col-sm-3">{d.exerciseName}</div>
                    <div className="col-sm-3">{d.exerciseLength}</div>
                    <div className="col-sm-3"><div className="btn btn-danger my-2" onClick={()=>handleDelete(d)}>Delete</div></div>

                    </div>
                ))}
           
            </div>

            <Link to="/"><div className="btn btn-primary btn-lg my-4"> Home</div></Link>

        </div>
    );
}

export default Program;