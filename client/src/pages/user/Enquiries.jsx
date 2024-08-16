import { useState, useEffect } from "react";
import Sidebar from "../../components/nav/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import AdCard from "../../components/cards/AdCard";

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-10 text-6xl sm:text-7xl font-bold text-[#F5F5F5]">
      {title}
    </h1>
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
          <h2 className="py-10">
            Hey {auth.user?.name ? auth.user?.name : auth.user?.username}, You
            have not enquired any properties yet!
          </h2>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h1 className="py-10">You have enquired {ads?.length} properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
              {ads?.map((ad, index) => (
                <AdCard 
                  ad={ad} 
                  key={ad._id} 
                 className={index % 3 === 0 ? 'justify-self-end' :
                  index % 3 === 1 ? 'justify-self-center' :
                  'justify-self-start'} />
                   /*className={index % 3 === 0 ? 'justify-self-end' :
                    index % 3 === 1 ? '' :
                    'justify-self-start'}*/
                 
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}



