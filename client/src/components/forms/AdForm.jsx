import { useState } from "react";
import slugify from "slugify";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export default function AdForm({ action, type }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ad, setAd] = useState({
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

  // hooks
  const navigate = useNavigate();
  //const slug = slugify(ad.title);
  // og: self.url = slugify(ad.title);

  const handleClick = async () => {
    try {
      // Oletetaan, että otsikko on määritelty ja se on merkkijono
      const slug = slugify(ad.title || '', { lower: true }); // Lisää tyhjä merkkijono varmuuden vuoksi ja varmista, että kaikki kirjaimet ovat pieniä
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("/ad", ad);
      //console.log("ad create response => ", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        // update user in context
        setAuth({ ...auth, user: data.user });
        // update user in local storage
        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data.user;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        toast.success("Ad created successfully");
        setAd({ ...ad, loading: false });
        // reload page on redirect
        navigate("/dashboard");
        //window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  return (
    <>
      <div className="mb-3 form-control">
        <ImageUpload ad={ad} setAd={setAd} />
        <br></br>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          //apiOptions="au"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address..",
            onChange: ({ value }) => {
              setAd({ ...ad, address: value.description });
            },
          }}
        />
      </div>

        <CurrencyInput
          placeholder="Enter price"
          defaultValue={ad.price}
          className="form-control mb-3"
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
         {type === "House" ? (
        <>
          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter how many bedrooms"
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />

          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter how many bathrooms"
            value={ad.bathrooms}
            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          />

          <input
            type="number"
            min="0"
            className="form-control mb-3"
            placeholder="Enter how many carpark"
            value={ad.carpark}
            onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
          />
        </>
      ) : (
        ""
      )}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Size of land"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter title"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Enter description"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <button
        onClick={handleClick}
        className={`bg-[#cbc385] hover:bg-[#cf8c60] text-[#879c7d] py-2 px-4 rounded mb-5 ${
          ad.loading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {ad.loading ? "Saving..." : "Submit"}
      </button>
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}











