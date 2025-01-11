import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#51829B]">
    <div className="flex items-center pl-8">
      <h1 className="font-floral text-align:left text-6xl md:text-6xl xl:text-7xl text-[#F5F5F5]">
        {title}
      </h1>
      {/*<img src={artNouveau} alt="Art Nouveau" className="h-[6em] w-auto ml-4 bg-[#51829B]" />*/}
    </div>
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
          <h2 className="font-floral flex justify-center py-10">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username}, You
            have not liked any properties yet!
          </h2>
        </div>
      ) : (
        <>
          <div className="font-floral flex justify-center py-10">
          <h1>You have liked {ads?.length} properties</h1>
          </div>
          {/*<div className="grid grid-cols-1 
          md:grid-cols-3 
          justify-center 
          gap-0 
          gap-y-10 
          place-items-center 
          px-20 
          py-10 
          bg-[#FFFAFA]">
            {ads?.map((ad, index) => (
              <AdCard 
              ad={ad} 
              key={ad._id} 
              className={index % 3 === 0 ? 'justify-self-end' :
                index % 3 === 1 ? '' :
                'justify-self-start'}
              />
            ))}
          </div>*/}
          
                  <div className="grid grid-cols-1 
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  xl:grid-cols-3   
                  justify-center mb-10 gap-y-10 
                  place-items-center 
                  px-4 sm:px-8 
                  py-10 bg-[#FFFAFA]">
                    {ads?.map((ad) => (
                      <AdCard ad={ad} key={ad._id} />
                    ))}
                  </div>
          </>
      )}
    </div>
  );
}