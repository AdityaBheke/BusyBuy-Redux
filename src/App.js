import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path:"/",
      element: <Navbar/>,
      children:[
        {
          index:true,
          element: <Home/>
        },
        {
          path:'cart',
          element:<Cart/>
        },
        {
          path:'orders',
          element:<Order/>
        }
      ]
    }
  ])
  return (
    <div className='App'>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
