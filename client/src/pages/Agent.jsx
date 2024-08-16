import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/cards/UserCard";
import AdCard from "../components/cards/AdCard";


const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-10 text-6xl sm:text-7xl font-bold text-[#FFFAFA]">
      {title}
    </h1>
  </div>
);

export default function Agent() {
  // state
  const [agent, setAgent] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  //   console.log(params.username);

  useEffect(() => {
    if (params?.username) fetchAgent();
  }, [params?.username]);

  const fetchAgent = async () => {
    try {
      const { data } = await axios.get(`/agent/${params.username}`);
      setAgent(data.user);
      setAds(data.ads);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-10%" }}
      >
        <div className="display-1">Loading...</div>
      </div>
    );
  }

  return (
    <div className='w-full pb-10'>
      <div name="header">
        <PageHeader title={agent?.name ?? agent?.username} />
      </div>

      <div className="flex justify-center py-10">
        <div className="grid grid-cols-1">
          <UserCard user={agent} />
        </div>
      </div>

      <h2 className="text-center m-5">Recent Listings</h2>

      {/*<div className="container">
        <div className="row">
          {ads?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>*/}

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
    </div>
  );
}