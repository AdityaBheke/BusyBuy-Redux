import { useSelector } from "react-redux"; // To access Redux state
import style from "./navbar.module.css"; // CSS module for styling the Navbar
import { Link, Outlet } from "react-router-dom"; // For routing and nested components
import { userSelector } from "../../redux/slices/userSlice"; // Selector to get user-related state
import { userActions } from "../../redux/slices/userSlice"; // Actions for user state management
import { useDispatch } from "react-redux"; // To dispatch actions to Redux store

function Navbar() {
  // Extracting the 'isLoggedIn' state from Redux using the user selector
  const { isLoggedIn } = useSelector(userSelector);
  const dispatch = useDispatch(); // Initializing dispatch function

  return (
    <>
      {/* Navigation bar container */}
      <nav className={style.navbar}>
        {/* Brand name as a link to the home page */}
        <Link to={"/"}>
          <div className={style.brandInfo}>Busy Buy</div>
        </Link>
        <ul className={style.navContainer}>
          {/* Home link */}
          <Link to={"/"}>
            <li>
              <i className="fi fi-ss-house-chimney"></i> Home
            </li>
          </Link>
          {/* My Orders link, visible only when logged in */}
          {isLoggedIn && (
            <Link to={"/orders"}>
              <li>
                <i className="fi fi-ss-basket-shopping-simple"></i> My Orders
              </li>
            </Link>
          )}
          {/* Cart link, visible only when logged in */}
          {isLoggedIn && (
            <Link to={"/cart"}>
              <li>
                <i className="fi fi-ss-shopping-cart"></i> Cart
              </li>
            </Link>
          )}
          {/* Login/Logout link */}
          <Link
            to={isLoggedIn ? "/" : "/signin"} // Redirects to home if logged in, otherwise to signin
            onClick={() => {
              dispatch(userActions.logoutUser()); // Dispatch logout action when clicked
            }}
          >
            <li>
              <i className="fi fi-br-exit"></i> {isLoggedIn ? "Logout" : "Login"}
            </li>
          </Link>
        </ul>
      </nav>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </>
  );
}

export default Navbar;
