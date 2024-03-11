import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSearch, LuShoppingCart } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { ThemeContext } from "../../context/themeContext";
import { MdMovieEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { toggle, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav className={`header`}>
      <h1 onClick={() => navigate("/")}>
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
          <li onClick={() => navigate("/")}>
            <HiOutlineHome />
          </li>
          <li>
            <LuSearch />
          </li>
          <li>
            <GrFavorite onClick={() => navigate("/savedmovies")} />
          </li>
          <li>
            <CgProfile onClick={() => navigate("/profile")} />
          </li>
        </ul>
      )}

      <div className="searchIconsContainer">
        <div className="searchContainer">
          <input type="text" />
          <button>
            <LuSearch />
          </button>
        </div>

        <ul className="menuItems">
          <li className="item">
            {theme === "dark" ? (
              <IoSunny onClick={toggle} />
            ) : (
              <MdOutlineDarkMode onClick={toggle} />
            )}
          </li>
          <li onClick={() => navigate("/")} className="item">
            <HiOutlineHome />
          </li>
          <li className="item">
            <GrFavorite onClick={() => navigate("/savedmovies")} />
          </li>
          <li className="item">
            <CgProfile onClick={() => navigate("/profile")} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
