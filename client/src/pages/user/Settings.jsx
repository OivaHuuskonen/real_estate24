import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/nav/Sidebar";

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

export default function Settings() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-password", {
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password updated");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
    <div name='settings'> 
        <PageHeader title="Update password"/>
        </div>
        <Sidebar />
        <div className="container mt-2">
          <br></br> <br></br>
          <div className="row w-full">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="font-floral bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4 rounded col-12"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update password"}
                </button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
}