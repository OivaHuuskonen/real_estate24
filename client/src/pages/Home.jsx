import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import AdCard from "../components/cards/AdCard";
import SearchForm from "../components/forms/SearchForm";
//import leafyIcon from '../assets/leafy.png'; 
//import artNouveau from '../assets/art-nouveau.png'

/*const PageHeader = ({ title }) => (
  <div className="mx-auto w-full	text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="font-floral pl-10 text-9xl sm:text-7xl  text-[#F5F5F5]">
      {title}
      /*<img src={leafyIcon} alt="Leafy Icon" className="h-12 w-12 ml-4" />*/
   
   /* <img src={artNouveau} alt="Art Nouveau" className="h-[1em] w-auto ml-4" /> </h1>
  </div>
);*/

const PageHeader = ({ title }) => (
  <div className="w-full text-align:left pb-12 pt-14 xl:pb-16 xl:pt-20 bg-[#51829B]">
    <div className="flex items-center pl-10">
      <h1 className="text-7xl md:text-6xl xl:text-7xl text-[#F5F5F5]">
        {title}
      </h1>
      {/*<img src={artNouveau} alt="Art Nouveau" className="h-[6em] w-auto ml-4 bg-[#51829B]" />*/}
    </div>
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
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div name='home' className='max-w-screen w-full pb-10'>
      <div className="flex justify-center py-10 mx-auto">
        <SearchForm />
        </div>
        <div name="header" className="w-full">
        <PageHeader title="For Sellz"/>
        </div>
  
        <div className="grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3   
        justify-center mb-10 gap-y-10 place-items-center px-4 sm:px-8 py-10 bg-[#FFFAFA]">
          {adsForSell.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
        
        <PageHeader title="For Rentz"/>
      {/*
      head 1 justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#FFFAFA]">
      <div className="grid grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-2
          lg:grid-cols-3 
          justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
          {adsForSell.map((ad, index) => (
            <AdCard 
              ad={ad} 
              key={ad._id} 
              className={index % 3 === 0 ? 'justify-self-end' :
                         index % 3 === 1 ? '' :
                         'justify-self-start'}
              />*/}
        {/*<div className="grid grid-cols-1 md:grid-cols-3 justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
        {adsForRent.map((ad, index) => (
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
        justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#FFFAFA]">
          {adsForRent.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
  );
}
