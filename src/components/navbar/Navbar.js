import { useSelector } from "react-redux";
import style from "./navbar.module.css";
import { Link, Outlet } from "react-router-dom";
import { userSelector } from "../../redux/slices/userSlice";
import { userActions } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
function Navbar() {
  const {isLoggedIn} = useSelector(userSelector);
  const dispatch = useDispatch();
  return (
    <>
      <nav className={style.navbar}>
        <Link to={"/"}>
          <div className={style.brandInfo}>Busy Buy</div>
        </Link>
        <ul className={style.navContainer}>
          <Link to={"/"}>
            <li>
              <i className="fi fi-ss-house-chimney"></i> Home
            </li>
          </Link>
          {isLoggedIn && <Link to={"/orders"}>
            <li>
              <i className="fi fi-ss-basket-shopping-simple"></i> My Orders
            </li>
          </Link>}
          {isLoggedIn && <Link to={"/cart"}>
            <li>
              <i className="fi fi-ss-shopping-cart"></i> Cart
            </li>
          </Link>}
          <Link to={isLoggedIn?"/":"/signin"} onClick={()=>{dispatch(userActions.logoutUser())}}>
            <li>
              <i className="fi fi-br-exit"></i> {isLoggedIn?"Logout":"Login"}
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
