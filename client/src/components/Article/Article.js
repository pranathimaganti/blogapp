import "./Article.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { axiosWithToken } from '../../axiosWithToken';
import { FaEdit, FaTrashAlt, FaUndoAlt } from 'react-icons/fa';

function Article() {
    const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
    const { register, handleSubmit } = useForm();
    const [comment, setComment] = useState('');
    const [articleEditStatus, setArticleEditStatus] = useState(false);
    const { state } = useLocation();
    const [currentArticle, setCurrentArticle] = useState(state);
    const navigate = useNavigate();

    // Add comment by user
    const addCommentByUser = async (commentObj) => {
        commentObj.username = currentUser.username;
        let res = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`, commentObj);
        if (res.data.message === 'comment posted') {
            setComment(res.data.message);
            state.comments.push(commentObj); // Update local state with new comment
        }
    };

    // Enable edit status
    const enableEditStatus = () => {
        setArticleEditStatus(true);
    };

    // Save modified article
    const saveModifiedArticle = async (editedArticle) => {
        let modifiedArticle = { ...currentArticle, ...editedArticle };
        modifiedArticle.dateOfModification = new Date();
        delete modifiedArticle._id;

        let res = await axiosWithToken.put('http://localhost:4000/author-api/article', modifiedArticle);
        if (res.data.message === 'article modified') {
            setArticleEditStatus(false);
            navigate(`/author-profile/article/${modifiedArticle.articleId}`, { state: res.data.article });
        }
    };

    const deleteArticle = async() => {
        let art={...currentArticle};
        delete art._id;
        let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
        if(res.data.message==='article deleted'){
          setCurrentArticle({...currentArticle,status:res.data.payload})
        }
      };
    
      const restoreArticle =async () => {
        let art={...currentArticle};
        delete art._id;
        let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
        if(res.data.message==='article restored'){
          setCurrentArticle({...currentArticle,status:res.data.payload})
        }
      };

    // Convert ISO date to UTC date
    function ISOtoUTC(iso) {
        let date = new Date(iso).getUTCDate();
        let month = new Date(iso).getUTCMonth() + 1;
        let year = new Date(iso).getUTCFullYear();
        return `${date}/${month}/${year}`;
    }

    return (
        <div>
            {articleEditStatus === false ? (
                <div className="articlebox">
                    <div className="article-header">
                        <p className="article-title">{state.title}</p>
                        <span className="article-dates">
                            <small className="article-date">
                                Created on: {ISOtoUTC(state.dateOfCreation)}
                            </small>
                            <small className="article-date">
                                Modified on: {ISOtoUTC(state.dateOfModification)}
                            </small>
                        </span>
                    </div>
                    <div className="article-buttons">
                        {currentUser.userType === 'author' && (
                            <>
                                <button className="btn btn-primary me-2" onClick={enableEditStatus}>
                                    <FaEdit /> Edit
                                </button>
                                {currentArticle.status === true ? (
                                    <button className="btn btn-danger me-2" onClick={deleteArticle}>
                                        <FaTrashAlt /> Delete
                                    </button>
                                ) : (
                                    <button className="btn btn-info me-2" onClick={restoreArticle}>
                                        <FaUndoAlt /> Restore
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <p className="article-content">{state.content}</p>
                    {/* User comments */}
                    <div>
                        {/* Read existing comments */}
                        <div className="comments-section">
                            {state.comments.length === 0 ? (
                                <p>No comments yet...</p>
                            ) : (
                                state.comments.map((commentObj, ind) => (
                                    <div key={ind} className="comment">
                                        <p className="comment-username">{commentObj.username}</p>
                                        <p className="comment-text">{commentObj.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Write comment by user */}
                        <h1>{comment}</h1>
                        {currentUser.userType === 'user' && (
                            <form onSubmit={handleSubmit(addCommentByUser)} className="comment-form">
                                <input type="text" {...register("comment")} className="comment-input" placeholder="Write comment here" />
                                <button type="submit" className="btn btn-success">Add comment</button>
                            </form>
                        )}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(saveModifiedArticle)} className="edit-article-form">
                    <h2>Edit Article</h2>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" {...register('title', { required: true })} defaultValue={state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" {...register('category', { required: true })} defaultValue={state.category}>
                            <option value="Technology">Technology</option>
                            <option value="Science">Science</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" rows="10" {...register('content', { required: true })} defaultValue={state.content}></textarea>
                    </div>
                    <button type="submit" className="save-button">Save</button>
                </form>
            )}
        </div>
    );
};

export default Article;
