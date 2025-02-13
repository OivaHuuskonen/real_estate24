import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";

const PageHeader = ({ title }) => (
  <div className="mx-auto w-full text-align:left pb-16 pt-20 bg-[#51829B]">
    <h1 className="pl-8 text-6xl sm:text-7xl font-yeseva-one-regulartext-[#F5F5F5]">
      {title}
    </h1>
  </div>
);

export default function AdEdit({ action, type }) {
  const [ad, setAd] = useState({
    _id: "",
    photos: [],
    uploading: false,
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    carpark: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    type,
    action,
  });
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      if (!ad.photos?.length) {
        toast.error("Photo is required");
        return;
      } else if (!ad.price) {
        toast.error("Price is required");
        return;
      } else if (!ad.description) {
        toast.error("Description is required");
        return;
      } else {
        setAd({ ...ad, loading: true });
        const { data } = await axios.put(`/ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad updated successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.delete(`/ad/${ad._id}`);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad deleted successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <div>
      <div name="header">
        <PageHeader title="Edit post" />
      </div>
      <div className="container-fluid">
        <Sidebar />
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
          <br></br><br></br>
            <ImageUpload ad={ad} setAd={setAd} />
            <br></br>
            {loaded && (
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
                selectProps={{
                  defaultInputValue: ad?.address,
                  placeholder: "Search for address..",
                  onChange: ({ value }) => {
                    setAd({ ...ad, address: value.description });
                  },
                  className: "form-control mb-3",
                }}
              />
            )}
            {loaded && (
              <div className="mb-4">
              <label htmlFor="price" className="block text-[#879c7d] mb-2">
                Price
              </label>
              <CurrencyInput
                type="text"
                id="price"
                placeholder="Enter price"
                defaultValue={ad.price}
                className="form-control mb-3"
                onValueChange={(value) => setAd({ ...ad, price: value })}
              />
              </div>
            )}
            {ad.type === "House" && (
              <>
               <div className="mb-4">
                <label htmlFor="bedrooms" className="block text-[#879c7d] mb-2">
                  bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many bedrooms"
                  value={ad.bedrooms}
                  onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="bathrooms" className="block text-[#879c7d] mb-2">
                  bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many bathrooms"
                  value={ad.bathrooms}
                  onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="carpark" className="block text-[#879c7d] mb-2">
                  carpark
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many carpark"
                  value={ad.carpark}
                  onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                />
                </div>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="landsize" className="block text-[#879c7d] mb-2">
                  landsize
                </label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Size of land"
              value={ad.landsize}
              onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
            />
            </div>
            <div className="mb-4">
            <label htmlFor="title" className="block text-[#879c7d] mb-2">
              Title
            </label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter title"
              value={ad.title}
              onChange={(e) => setAd({ ...ad, title: e.target.value })}
            />
            </div>
            <div className="mb-4">
            <label htmlFor="description" className="block text-[#879c7d] mb-2">
              Description
            </label>            
            <textarea
              className="form-control mb-3"
              placeholder="Enter description"
              value={ad.description}
              onChange={(e) => setAd({ ...ad, description: e.target.value })}
            />
            </div>
            <div className="d-grid gap-2">
              <button
                onClick={handleClick}
                className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4 mb-3 rounded-xl"
                disabled={ad.loading}
              >
                {ad.loading ? "Updating..." : "Update"}
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-block bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4"
                disabled={ad.loading}
              >
                {ad.loading ? "Deleting..." : "Delete"}
              </button>
            </div>
            <br></br><br></br>
          </div>
        </div>
      </div>
    </div>
  );
}


