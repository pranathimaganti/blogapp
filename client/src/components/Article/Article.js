import "./Article.css"
import {useLocation} from 'react-router-dom'
import { Fragment,useState } from "react"
import { useSelector } from "react-redux"
import {useForm} from 'react-hook-form';
import axios from "axios";

function Article() {
    let {currentUser}=useSelector((state)=>state.userAuthorLoginReducer);

    let {register,handleSubmit}=useForm();
    let {state}=useLocation() 

    const addCommentByUser=async(commentObj)=>{
        console.log(commentObj)
    };

  return (
    <div>
        <div className="d-flex justify-content-between">
            <div>
                <p className="display-3 me-4">{state.title}</p>
                <span className="py-3">
                    <small className="text-secondary me-4">
                        Created on:{state.dateOfCreation}
                    </small>
                    <small className="text-secondary">
                        Modified on:{state.dateOfModifiaction}
                    </small>
                </span>
            </div>
            <div>
                {currentUser.userType==='author' && (
                    <>
                    {" "}
                    <span className="me-2">edit</span>
                    <span>delete</span>
                    </>
                )}
            </div>
        
        <p className="lead mt-3" style={{whiteSpace:"pre-line"}}>{state.context}</p>
     {/* user comments */}
     <div>
        {/* write comment by user */}
        {currentUser.userType==='user' && (
            <form>
                <input type="text" 
                {...register("comment")} className="form-control mb-4"
                placeholder="Write comment here"/>
                <button type="submit" className="btn btn-success">
                    Add comment 
                </button>
            </form>
        )}
     </div>
    </div>
    </div>
  )
}

export default Article