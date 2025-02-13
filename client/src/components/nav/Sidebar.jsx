import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
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
    <div className='bg-[#F5F5F5] w-full px-2 py-2 pb-2'>
      <div className="hidden md:flex justify-start gap-6">
      <NavLink className="font-yeseva-one nav-link text-black" to="/dashboard">dashboard</NavLink>
        <NavLink className="nav-link text-black font-yeseva-one !important" to="/user/wishlist">wishlist</NavLink>
        <NavLink className="nav-link text-black font-yeseva-one !important" to="/user/Enquiries">enquiries</NavLink>
        <NavLink className="nav-link text-black font-yeseva-one !important" to="/ad/create">create</NavLink>
        <NavLink className="nav-link text-black font-yeseva-one !important" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-black font-yeseva-one !important" to="/user/settings">update password</NavLink>
      </div>
      <br></br>
      <div className='md:hidden z-20 flex items-center'>
        <MdOutlineAppSettingsAlt onClick={handleClick} 
        style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem', color: '[#51829B]' }} />
        <span onClick={handleClick} className='cursor-pointer font-yeseva-one'>dashboard navigation</span>
      </div>
      {/* Mobiilivalikko */}
      {nav && (
              <div className='fixed top-0 right-0 w-[60%] max-w-md h-screen bg-[rgba(253, 235, 211, 0.8)] backdrop-filter backdrop-blur-md flex flex-col justify-center items-center z-50'>
              <ul className='font-yeseva-one-regular text-[#679186]'>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/dashboard" onClick={handleClick}>Dashboard</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/user/wishlist" onClick={handleClick}>Wishlist</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/user/Enquiries" onClick={handleClick}>Enquiries</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/ad/create" onClick={handleClick}>Create</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/user/profile" onClick={handleClick}>Profile</NavLink>
                </li>
                <li className='py-6 text-4xl'>
                  <NavLink className="nav-link text-black font-yeseva-one-regular !important" to="/user/settings" onClick={handleClick}>Update password</NavLink>
                </li>            
              </ul>
            </div>
      )}
    </div>
  );
}



