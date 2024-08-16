import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-10 text-6xl sm:text-7xl font-bold text-[#F5F5F5]">
      {title}
    </h1>
  </div>
);

export default function Agents() {
  // state
  const [agents, setAgents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get("/agents");
      setAgents(data);
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
      <div name="agents">
      <PageHeader title="Agents"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
        {agents?.map((agent, index) => (
          <UserCard 
            user={agent} 
            key={agent._id} 
            className={index % 3 === 0 ? 'justify-self-end' :
                       index % 3 === 1 ? '' :
                       'justify-self-start'}
            />
        ))}
      </div>
    </div>
  );
}