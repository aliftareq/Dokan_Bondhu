import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

const NavBar = () => {
  const navOptions = (
    <>
      <li>
        <Link className="hover:text-yellow-300" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link className="hover:text-yellow-300" to="/">
          Services
        </Link>
      </li>
      <li>
        <Link className="hover:text-yellow-300" to="/">
          FAQ
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-accent text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            DOKAN | BONDHU
          </Link>
        </div>
        <div className="navbar-center sm:hidden md:flex">
          <ul className="menu menu-horizontal px-1 text-lg">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <Link className="btn" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
