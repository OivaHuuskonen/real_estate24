import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";
import LikeUnlike from "../../components/misc/LikeUnlike";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";


const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#51829B]">
    <div className="flex items-center pl-8">
      <h1 className="text-align:left text-6xl md:text-6xl xl:text-7xl text-[#F5F5F5]">
        {title}
      </h1>
    </div>
  </div>
);

export default function Enquiries() {
  const [auth, setAuth] = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`/enquiries`);
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full pb-10'>
      <div name="header">
        <PageHeader title="Enquiries"/>
      </div>
      <Sidebar />

      {!ads?.length ? (
        <div className="flex justify-center items-center text-center">
          <h2 className="flex justify-center py-10">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username},
            <br></br>
            You have not enquired any properties yet!
          </h2>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h1 className="flex justify-center py-10">
              You have enquired 
                      <FcLikePlaceholder className="text-3xl"/>
              {ads?.length}  properties</h1>
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
          </div>
        </>
      )}
    </div>
  );
}



