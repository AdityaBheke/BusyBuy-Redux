import { useUserValue } from "../../context/userContext";
import style from "./navbar.module.css";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  
  const {isLoggedIn, handleLogout} = useUserValue();
  
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
          <Link to={"/cart"}>
            <li>
              <i className="fi fi-ss-shopping-cart"></i> Cart
            </li>
          </Link>
          <Link to={isLoggedIn?"/":"/signin"} onClick={handleLogout}>
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
