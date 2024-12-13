import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import AuthPage from "./pages/auth/authPage";
// import ProductContextProvider from "./context/productContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from "./pages/error/errorPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement:<ErrorPage/>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart/>,
        },
        {
          path: "orders",
          element: <Order/>,
        },
        {
          path: "signin",
          element: <AuthPage type={"signin"} />,
        },
        {
          path: "signup",
          element: <AuthPage type={"signup"} />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <ToastContainer autoClose={2000} pauseOnHover={false} closeOnClick/>
      <Provider store={store}>
          <RouterProvider router={browserRouter} />
      </Provider>
    </div>
  );
}

export default App;
