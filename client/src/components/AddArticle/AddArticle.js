import React from 'react';
import { useSelector } from 'react-redux';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddArticle.css'; // Import the CSS file for styling
import axios from 'axios'

function AddArticle() {
    let { register, handleSubmit } = useForm();
    let { currentUser } = useSelector(
        (state) => state.userAuthorLoginReducer
    );
    let [err, setErr] = useState("");
    let navigate = useNavigate();
    let token=localStorage.getItem('token')
    //create axios with token
    const axioswithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    });

    const postArticle = async (article) => {
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        //make HTTP post request
        let res=await axioswithToken.post('http://localhost:4000/author-api/article',article)
        console.log(res)
        if(res.data.message==='new article created'){
            navigate(`/author-profile/articles-by-author/${currentUser.username}`)
        }
        else{
            setErr(res.data.message)
        }
    };

    return (
        <div className='backimage'>
            <form className="addnewform" onSubmit={handleSubmit(postArticle)}>
            <h2>Add New Article</h2>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="titlearea" type="text" id="title" {...register('title', { required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" {...register('category', { required: true })}>
                        <option value="Technology">Technology</option>
                        <option value="Science">Science</option>
                        <option value="Art">Art</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="context">context</label>
                    <textarea id="content" rows="10" {...register('content', { required: true })}></textarea>
                </div>
                <button type="submit">Post Article</button>
            </form>
            {err && <p className="error-message">{err}</p>}
        </div>
    );
}

export default AddArticle;
