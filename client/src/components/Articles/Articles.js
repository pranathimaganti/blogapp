import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../../axiosWithToken';
import './Articles.css'; // Import the CSS file

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  const getArticlesOfCurrentAuthor = async () => {
    let res = await axiosWithToken.get('http://localhost:4000/user-api/articles');
    console.log(res);
    setArticlesList(res.data.payload);
  };

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  return (
    <div className='backcolour'>
      <div className="row">
        {articlesList.map((article) => (
          <div className="col-md-4" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + '......'}
                </p>
                <button className="custom-btn btn-4" onClick={() => readArticleByArticleId(article)}>
                  Read More
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
