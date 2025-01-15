import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from 'react';

export default function Sidebart() {
  
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();

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

  return (
    <div className='bg-[#F5F5F5] w-full px-2 py-2 pb-1'>
      <div className="hidden md:flex justify-start gap-6">
      <NavLink className="font-floral nav-link text-black" to="/dashboard">dashboard</NavLink>
        <NavLink className="nav-link text-black font-floral !important" to="/user/wishlist">wishlist</NavLink>
        <NavLink className="nav-link text-black font-floral !font-floral" to="/user/Enquiries">enquiries</NavLink>
        <NavLink className="nav-link text-black font-floral !font-floral" to="/ad/create">create</NavLink>
        <NavLink className="nav-link text-black font-floral !font-floral" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-black font-floral !font-floral" to="/user/settings">update password</NavLink>
      </div>
      <br></br>
      <div className='md:hidden z-20 flex items-center'>
        <LuLayoutDashboard onClick={handleClick} 
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: '[#51829B]' }} />
        <span onClick={handleClick} className='cursor-pointer font-floral'>dashboard navigation</span>
      </div>
      {/* Mobiilivalikko */}
      {nav && (
              <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
              <ul className='font-floral text-[#679186]'>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/user/wishlist" onClick={handleClick}>Wishlist</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/user/Enquiries" onClick={handleClick}>Enquiries</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/ad/create" onClick={handleClick}>Create</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/user/profile" onClick={handleClick}>Profile</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black" to="/user/settings" onClick={handleClick}>Update password</NavLink>
                </li>            
              </ul>
            </div>
      )}
    </div>
  );
}







/*import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from 'react';

export default function Sidebart() {

  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();

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

  return (
    <div className='bg-[#F5F5F5] w-full px-2 py-2 pb-1'>
      <div className="hidden md:flex justify-start gap-6">
        <NavLink className="nav-link text-black" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link text-black" to="/user/wishlist">Wishlist</NavLink>
        <NavLink className="nav-link text-black" to="/user/Enquiries">Enquiries</NavLink>
        <NavLink className="nav-link text-black" to="/ad/create">Create</NavLink>
        <NavLink className="nav-link text-black" to="/user/profile">Profile</NavLink>
        <NavLink className="nav-link text-black" to="/user/settings">Update password</NavLink>
      </div>
      <br></br>
      <div onClick={handleClick} className='md:hidden z-20'>
      Dashboard nav: <LuLayoutDashboard />
      </div>*/
      {/* Mobiilivalikko */}
      /*{nav && (
        <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
          <ul className='text-[#679186]'>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/wishlist" onClick={handleClick}>Wishlist</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/Enquiries" onClick={handleClick}>Enquiries</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/ad/create" onClick={handleClick}>Create</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/profile" onClick={handleClick}>Profile</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/settings" onClick={handleClick}>Update password</NavLink>
            </li>            
          </ul>
        </div>
      )}
    </div>
  );
}*/




{/*import { NavLink } from "react-router-dom";
//import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from 'react';
import './SidebarStyles.css';

export default function Sidebart() {
  //const [auth, setAuth] = useAuth();
  const [nav, setNav] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false); // Uusi tila käyttäjän alasvetovalikolle
  const navigate = useNavigate();
  

  const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

 
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  return (
    <div className='bg-[#F5F5F5] w-full px-4 py-2 pb-6'>
      <div className="hidden md:flex justify-between">
        <NavLink className="nav-link text-black" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link text-black" to="/user/wishlist">Wishlist</NavLink>
        <NavLink className="nav-link text-black" to="/user/Enquiries">Enquiries</NavLink>
        <NavLink className="nav-link text-black" to="/ad/create">Create</NavLink>
        <NavLink className="nav-link text-black" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-black" to="/user/settings">Settings</NavLink>
     
      <div onClick={handleClick} className='md:hidden z-20'>
      <LuLayoutDashboard />
      </div>
      
      {nav && (
        <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
          <ul className='text-[#679186]'>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/wishlist" onClick={handleClick}>Wishlist</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/Enquiries" onClick={handleClick}>Enquiries</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/ad/create" onClick={handleClick}>Create</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/profile" onClick={handleClick}>profile</NavLink>
            </li>
            <li className='py-6 text-4xl'>
              <NavLink className="nav-link text-black" to="/user/settings" onClick={handleClick}>Settings</NavLink>
            </li>            
          </ul>
        </div>
      )}
    </div>
  );
}*/}









{/*import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='bg-[#F5F5F5] w-full px-4 py-2 pb-6'>
        <div className="sm:flex justify-start gap-6">
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/user/wishlist">Wishlist</NavLink>
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/user/Enquiries">Enquiries</NavLink>
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/ad/create">Create</NavLink>
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/user/profile">profile</NavLink>
          <NavLink className="nav-link text-black mb-4 sm:mb-0" to="/user/settings">Settings</NavLink>
      </div>
    </div>
  );
}



import { NavLink } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className='bg-[#F5F5F5] w-full px-4 py-2 pb-6'>
        <div className="sm:flex justify-start gap-6">
        <NavLink className="nav-link text-black" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link text-black" to="/user/wishlist">Wishlist</NavLink>
        <NavLink className="nav-link text-black" to="/user/Enquiries">Enquiries</NavLink>
        <NavLink className="nav-link text-black" to="/ad/create">Create</NavLink>
        <NavLink className="nav-link text-black" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-black" to="/user/settings">Settings</NavLink>
    </div>
    </div>
  );
}*/}
