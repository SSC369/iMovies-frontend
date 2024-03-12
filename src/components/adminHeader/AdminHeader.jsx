import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";

import { MdMovieCreation } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { ThemeContext } from "../../context/themeContext";
import { MdMovieEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { FaMasksTheater } from "react-icons/fa6";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { toggle, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = Cookies.get("adminJwtToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <nav className={`adminHeader`}>
      <h1 onClick={() => navigate("/admin")}>
        <span>i</span>Movies
      </h1>

      <button onClick={() => setMenu(!menu)} className="menuButton">
        <RxHamburgerMenu />
      </button>

      {menu && (
        <ul className="menu">
          <li>
            {theme === "dark" ? (
              <IoSunny onClick={toggle} />
            ) : (
              <MdOutlineDarkMode onClick={toggle} />
            )}
          </li>
          <li onClick={() => navigate("/admin")}>
            <HiOutlineHome />
          </li>
          <li>
            <MdMovieEdit onClick={() => navigate("/admin/addmovie")} />
          </li>
          <li>
            <IoAddCircleOutline onClick={() => navigate("/admin/addshow")} />
          </li>
          <li>
            <FaMasksTheater onClick={() => navigate("/admin/addtheatre")} />
          </li>
          {/* <li>
            <MdMovieCreation onClick={() => navigate("/admin/movies")} />
          </li> */}
        </ul>
      )}

      <div className="searchIconsContainerAdmin">
        {/* <div className="searchContainer">
          <input type="text" />
          <button>
            <LuSearch />
          </button>
        </div> */}

        <ul className="menuItems">
          <li className="item">
            {theme === "dark" ? (
              <IoSunny onClick={toggle} />
            ) : (
              <MdOutlineDarkMode onClick={toggle} />
            )}
          </li>
          <li onClick={() => navigate("/admin")} className="item">
            <HiOutlineHome />
          </li>
          <li className="item">
            <MdMovieEdit onClick={() => navigate("/admin/addmovie")} />
          </li>
          <li className="item">
            <IoAddCircleOutline onClick={() => navigate("/admin/addshow")} />
          </li>
          <li className="item">
            <FaMasksTheater onClick={() => navigate("/admin/addtheatre")} />
          </li>
          {/* <li onClick={() => navigate("/admin/movies")} className="item">
            <MdMovieCreation />
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
