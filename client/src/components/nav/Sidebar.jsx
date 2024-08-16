import { NavLink } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className='bg-[#F5F5F5] w-full px-4 py-2 pb-6'>
      <div className="hidden md:flex justify-start gap-6">
        <NavLink className="nav-link text-black" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link text-black" to="/user/wishlist">Wishlist</NavLink>
        <NavLink className="nav-link text-black" to="/user/Enquiries">Enquiries</NavLink>
        <NavLink className="nav-link text-black" to="/ad/create">Create</NavLink>
        <NavLink className="nav-link text-black" to="/user/profile">profile</NavLink>
        <NavLink className="nav-link text-black" to="/user/settings">Settings</NavLink>
    </div>
    </div>
  );
}
