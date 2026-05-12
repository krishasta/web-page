import { createBrowserRouter } from "react-router-dom";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import Service from "./Service";
import Home from "./Home";
import App from "../App";
import Blog from "./Blog";
import BLog_main from "../blog_main/BLog_main";
import Products from "./Products"
import ProductMain from "./ProductMain";
import Teams from "./Teams";
import Thinking from "./Thinking";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'contact', element: <Contact  />},
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'service', element: <Service /> },
      { path: 'blog', element: <Blog /> },
      { index: true, element: <Home /> },
      {path:'blog_main/:id',element:<BLog_main/>},
      {path:'thinking',element:<Thinking/>},
      {path:'product',element:<ProductMain/>},
      {path:`team`,element:<Teams/>},
      {path:'products/:title',element:<Products/>}
      
    ]
  } 
]);

export default Router;
