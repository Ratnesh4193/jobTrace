import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserTie, FaChevronCircleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleSidebar } from "../actions/actions";

import Logo from "./Logo";
import { useState } from "react";
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">JobTrace</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserTie />
            {user?.name}
            <FaChevronCircleDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
