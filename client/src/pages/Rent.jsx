import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";


const PageHeader = ({ title }) => (
  <div className="mx-auto w-full	text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="font-floral pl-10 text-6xl sm:text-7xl font-bold text-[#F5F5F5]">
      {title}
    </h1>
  </div>
);

export default function Rent() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads-for-rent");
      setAds(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full pb-10'>
    <div className="flex justify-center py-10 mx-auto">
        <SearchMain />
    </div>
      <div name="rent">
      <PageHeader title="For Rent"/>
      </div>
      <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FFFAFA]">
        {ads?.map((ad) => (
          <AdCard 
            ad={ad} 
            key={ad._id} 
            />
        ))}
      </div>
    </div>
  );
}