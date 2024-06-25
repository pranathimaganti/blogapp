


import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Homecomp from './components/Homecomp/Homecomp';
import RootLayout from './components/RootLayout';
import ErrorRoute from './ErrorRoute';
import UserProfile from './components/UserProfile/UserProfile';
import AuthorProfile from './components/AuthorProfile/AuthorProfile';
import AddArticle from './components/AddArticle/AddArticle';
import Articles from './components/Articles/Articles';
import ArticlesByAuthor from './components/ArticlesByAuthor/ArticlesByAuthor';
import Article from './components/Article/Article';
function App() {
  let router=createBrowserRouter([
  {
    path:'',
    element:<RootLayout/>,
    errorElement:<ErrorRoute/>,
    children:[
      {
        path:'',
        element:<Homecomp/>
      },
      {
        path:"SignUp",
        element:<SignUp/>
      },
      {
        path:"SignIn", 
        element:<SignIn/>
      },
      {
        path:"/user-profile",
        element:<UserProfile/>,
        children:[
          {
            path:'articles',
            element:<Articles/>
          },
          {
            path:"article/:articleId",
            element:<Article/>
          },
          {
            path:'',
            element:<Navigate to='articles'/>
          }
        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile/>,
        children:[
          {
            path:'new-article',
            element:<AddArticle/>
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor/>
          },
          {
            path:"article/:articleId",
            element:<Article/>
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author'/>
          }
        ]
      }
    ]
  }
])
  

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
