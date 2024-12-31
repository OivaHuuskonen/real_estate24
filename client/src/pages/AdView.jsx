import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomImageGallery from "../components/misc/ImageGallery";
import houseLogo from "../../houseLogo.jpg";
import AdFeatures from "../components/cards/AdFeatures";
import { formatNumber } from "../helpers/ad";
import dayjs from "dayjs";
import LikeUnlike from "../components/misc/LikeUnlike";
import MapCard from "../components/cards/MapCard";
import parse from "html-react-parser";
import AdCard from "../components/cards/AdCard";
import ContactSeller from "../components/forms/ContactSeller";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function AdView() {
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(`/ad/${params?.slug}`);
        console.log('ad-objekti:', data.ad); // Tarkastellaan ad-objektin sisältöä
        setAd(data?.ad || {});
        setRelated(data?.related || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (params?.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const generatePhotosArray = (photos) => {
    if (photos?.length > 0) {
      const x = photos?.length === 1 ? 2 : 4;
      let arr = [];
      photos.map((p) =>
        arr.push({
          src: p.Location,
          width: x,
          height: x,
        })
      );
      return arr;
    } else {
      return [
        {
          src: houseLogo,
          width: 2,
          height: 1,
        },
      ];
    }
  };

  if (!ad || Object.keys(ad).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>


<div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 pt-10 pb-10">
  {/* Ylärivi (napit ja LikeUnlike) */}
  <div className="flex flex-col sm:flex-row sm:col-span-3 justify-between">
    {/*<button
      type="button"
      className="text-white bg-[#51829B] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      {ad.type} for {ad
      .action}
    </button>
    <div className="flex items-center">*/}
    <div className="pl-4">{ad?.sold ? "❌ Off market" : "✅ In market"}</div>
    {/*<LikeUnlike ad={ad} className="flex-grow mr-4" />*/}
    <LikeUnlike ad={ad} style={{ position: "relative", right: "4rem" }} />
  </div>
  

  {/* Tila (In Market / Off Market) 
  <div className="col-span-3 text-center mb-4 sm:mb-0">
    <div className="py-4">{ad?.sold ? "❌ Off market" : "✅ In market"}</div>
  </div>*/}

  {/* Osoite ja ominaisuudet */}
  <div className="col-span-3 grid sm:grid-cols-2 items-center gap-4 mb-4">
    <h1 className="text-3xl pl-4 pb-4">{ad.address}</h1>
    <AdFeatures ad={ad} />
  </div>

  {/* Hinta ja julkaisuajankohta */}
  <div className="col-span-3 grid sm:grid-cols-2 items-center gap-4 mb-4">
    <h1 className="text-3xl pl-4 pb-2">{formatNumber(ad.price)}€</h1>
    <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p>
  </div>

  {/* Kuvagalleria */}
  <div className="col-span-3">
    <CustomImageGallery photos={generatePhotosArray(ad?.photos)} />
  </div>

  {/* Google Maps -kortti */}
  {ad?.location && (
    <div className="col-span-3 mt-4">
      <MapCard ad={ad} />
    </div>
  )}
</div>





     {/* <div className="flex">
        <div className="grid grid-cols-3 gap-4 pt-10 pb-10">
          <div className="col-span-1 p-2">
            <div className="col-span-2 flex justify-between ">
              <button
                type="button"
                className="text-white bg-[#51829B] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {ad.type} for {ad.action}
              </button>
              <LikeUnlike ad={ad} />
            </div>

            <div className="py-4">{ad?.sold ? "❌ Off market" : "✅ In market"}</div>
            <h1 className="text-3xl pb-4">{ad.address}</h1>
            <AdFeatures ad={ad} />
            <h1 className="text-3xl pb-2">{formatNumber(ad.price)}€</h1>
            <p className="text-muted">{dayjs(ad?.createdAt).fromNow()}</p>
          </div>
          <div className="col-span-2">
            <CustomImageGallery photos={generatePhotosArray(ad?.photos)} />
          </div>
        </div>
      </div>*/}

      {/*<div className="container mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 mt-3">
            <br />
            <br />
            <p className="text-xl pl-6">
              {ad?.type} in {ad?.address} for {ad?.action} {ad?.price}€
            </p>
            <div className="text-xl pl-6">
              <AdFeatures ad={ad} />
              <h3 className="text-xl">{ad?.title}</h3>
            </div>
            <div className="html-content text-xl pl-6">
              {parse(String(ad?.description?.replaceAll(".", "<br/><br/>")))}
            </div>
          </div>
        </div>
      </div>*/}

      <div className="container">
        <ContactSeller ad={ad} />
      </div>

      <div className="container mb-2">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 mt-3">
            <br />
            <br />
            <h3 className="text-xl pl-6">
              Other related properties by {ad?.postedBy?.name}:
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-center mb-10 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
        {related?.map((ad, index) => (
          <AdCard
            ad={ad}
            key={ad._id}
            className={
              index % 3 === 0
                ? "justify-self-end"
                : index % 3 === 1
                ? ""
                : "justify-self-start"
            }
          />
        ))}
      </div>
    </>
  );
}


