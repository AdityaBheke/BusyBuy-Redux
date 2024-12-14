import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import AuthPage from "./pages/auth/authPage";
import { ToastContainer } from "react-toastify"; // Toast notifications container
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS styles
import ErrorPage from "./pages/error/errorPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./redux/slices/userSlice"; // Redux thunk to get logged-in user data

function App() {
  const dispatch = useDispatch(); // Redux dispatch for dispatching actions

  // Fetching logged-in user data on component mount
  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch]);

  // Defining routes for the application
  const browserRouter = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Navbar />, // Navbar component to wrap child routes
      errorElement: <ErrorPage />, // Error page displayed for invalid routes
      children: [
        {
          index: true, // Default route for the root path
          element: <Home />, // Home page component
        },
        {
          path: "cart", // Path for the cart page
          element: <Cart />, // Cart page component
        },
        {
          path: "orders", // Path for the orders page
          element: <Order />, // Order page component
        },
        {
          path: "signin", // Path for the signin page
          element: <AuthPage type={"signin"} />, // AuthPage component for signing in
        },
        {
          path: "signup", // Path for the signup page
          element: <AuthPage type={"signup"} />, // AuthPage component for signing up
        },
      ],
    },
  ]);

  return (
    <div className="App">
      {/* Toast notification container with customization */}
      <ToastContainer autoClose={2000} pauseOnHover={false} closeOnClick />
      {/* Providing the router to the application */}
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
