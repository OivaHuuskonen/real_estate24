import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-10 text-6xl sm:text-7xl font-bold text-[#FFFAFA]">
      {title}
    </h1>
  </div>
);

export default function Wishlist() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/wishlist`);
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full pb-10'>
    <div name="header">
      <PageHeader title="Wishlist"/>
    </div>
      <Sidebar />
      {!ads?.length ? (
        <div
          className="flex justify-center items-center text-center">
          <h2 className="flex justify-center py-10">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username}, You
            have not liked any properties yet!
          </h2>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-10">
          <h1>You have liked {ads?.length} properties</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-0 gap-y-10 place-items-center px-20 py-10 bg-[#FFFAFA]">
            {ads?.map((ad, index) => (
              <AdCard 
              ad={ad} 
              key={ad._id} 
              className={index % 3 === 0 ? 'justify-self-end' :
                index % 3 === 1 ? '' :
                'justify-self-start'}
              />
            ))}
          </div>
          </>
      )}
    </div>
  );
}