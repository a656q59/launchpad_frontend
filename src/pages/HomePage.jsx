import React from 'react';
import { Link } from 'react-router-dom';



function HomePage({data,onDelete}) {




    
    return (
        <div className='container-fluid border '>
            <h1>HomePage</h1>
            <h4><Link to={`/newprogram`}><div className="btn btn-primary"> Add New Program</div></Link></h4>
            <div className="row border border-primary">
                <div className="col-sm-3"><h3>Program ID</h3></div>
                <div className="col-sm-3"><h3>Program Name</h3></div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3"></div>
            </div>
            
                {data&&data.map(d=>(
                    <div className="row" key={d._id}>
                    <div className="col-sm-3">{d.programId}</div>
                    <div className="col-sm-3">{d.programName}</div>
                    <div className="col-sm-3"><Link to={`/program/${d._id}`}><div className="btn btn-primary my-3"> Edit Program Details</div></Link></div>
                    <div className="col-sm-3"><div className="btn btn-danger my-3" onClick={()=>onDelete(d)}>Delete</div></div>

                    </div>
                ))}
           
        </div>
    );
}



export default HomePage;