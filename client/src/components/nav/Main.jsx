import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Main() {
  const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();
  

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Uusi funktio käyttäjän nimen klikkaustapahtumalle
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const userDropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <div className='bg-[#F5F5F5] w-full px-4 py-2 pb-6'>
      <div className="hidden md:flex justify-between">
        {/* Linkit  #F5F5F5  */}
        <NavLink className="nav-link text-black" to="/">home</NavLink>
        <NavLink className="nav-link text-black" to="/search">search</NavLink>
        <NavLink className="nav-link text-black" to="/buy">buy</NavLink>
        <NavLink className="nav-link text-black" to="/rent">rent</NavLink>
        <NavLink className="nav-link text-black" to="/agents">agents</NavLink>
        <a className="nav-link text-black pointer" onClick={handlePostAdClick}>post ad</a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link text-black" to="/login">login</NavLink>
            <NavLink className="nav-link text-black" to="/register">register</NavLink>
          </>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button 
            className="nav-link text-black dropdown-toggle" 
            onClick={toggleUserDropdown}>
              {auth?.user?.name ? auth.user.name : auth.user.username}
            </button>
            {userDropdown && ( // Käyttäen userDropdown tilaa
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <li>
                  <NavLink
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)} // Sulkee valikon klikkauksen jälkeen
                  >
                    dashboard
                  </NavLink>
                </li>
                <li>
                  <a
                    onClick={() => {
                      logout();
                      setUserDropdown(false); // Sulkee valikon klikkauksen jälkeen
                    }}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </li>
              </ul>

            )}
          </div>
        )}
      </div>
      <div onClick={handleClick} className='md:hidden z-20'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobiilivalikko */}
      {nav && (
        <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
          <ul className='font-floral text-[#679186]'>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/" onClick={handleClick}>Home</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/search" onClick={handleClick}>Search</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/buy" onClick={handleClick}>Buy</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/rent" onClick={handleClick}>Rent</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/agents" onClick={handleClick}>Agents</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <a className="nav-link text-black pointer" onClick={() => { handlePostAdClick(); handleClick(); }}>Post Ad</a>
            </li>
            {!loggedIn ? (
              <>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/login" onClick={handleClick}>Login</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/register" onClick={handleClick}>Register</NavLink>
                </li>
              </>
            ) : (
              <div>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <a onClick={() => { logout(); handleClick(); }} className="nav-link text-black">Logout</a>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

{/*  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <li>
                  <NavLink className="block px-4 py-2 text-black hover:bg-gray-100" to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <a onClick={logout} className="block px-4 py-2 text-black hover:bg-gray-100">Logout</a>
                </li>
              </ul>*/}
