import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchMain from "../components/forms/SearchMain";
//import leafyIcon from '../assets/leafy.png'; 
//import artNouveau from '../assets/art-nouveau.png'

/*const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#51829B]">
    <div className="flex items-center pl-8">
      <h1 className="text-align:left text-6xl md:text-6xl xl:text-7xl text-[#F5F5F5]">
        {title}
      </h1>
      <img src={artNouveau} alt="Art Nouveau" className="h-[6em] w-auto ml-4 bg-[#51829B]" />
    </div>
  </div>
);*/

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="font-yeseva-one-regular  pl-8 text-4xl sm:text-7xl text-[#F5F5F5]">
      {title}
    </h1>
  </div>
);

export default function Home() {
  const [auth, setAuth] = useAuth();
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
    //  console.log("Fetched ads:", data);  // Tulosta tiedot varmistaaksesi, että haetaan jotain
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (error) {
      //console.log("axios error: ", error.message);
    }
  };

  return (
    <div name='home' className='max-w-screen w-full pb-10'>
      <br></br><br></br>
        <div className="flex justify-center py-6 mx-auto">
        <SearchMain />
        </div>
        <br></br>
        <div name="header" className="w-full">
        <PageHeader title="Real estate marketplace"/>
        </div>
  
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 
        place-items-center 
        px-4 sm:px-8 
        py-10 bg-[#FFFAFA]">
          {adsForSell.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>

        <div name="header" className="w-full">
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
          {adsForRent.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
  );
}
