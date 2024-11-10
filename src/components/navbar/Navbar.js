import style from "./navbar.module.css";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
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
          <Link to={"/"}>
            <li>
              <i className="fi fi-ss-basket-shopping-simple"></i> My Orders
            </li>
          </Link>
          <Link to={"/"}>
            <li>
              <i className="fi fi-ss-shopping-cart"></i> Cart
            </li>
          </Link>
          <Link to={"/"}>
            <li>
              <i className="fi fi-br-exit"></i> Logout
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
