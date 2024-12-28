import { useSearch } from "../../context/search";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchForm() {
  const [search, setSearch] = useSearch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_GOOGLE_PLACES_KEY);

  /*useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        console.log('Google Maps script loaded');
      };
      document.head.appendChild(script);
    }
  }, []);*/

  /*const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };*/

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Vaihtaa tilan edellisestä arvosta
    //console.log('Dropdown open:', !dropdownOpen); 
  };

  const handlePriceSelect = (name, array) => {
    setSearch({
      ...search,
      price: name,
      priceRange: array,
    });
    setDropdownOpen(false); // Sulkee pudotusvalikon valinnan jälkeen
  };

  console.log("Search button clicked")

  /*const handleSearch = async () => {
    try {
      const { results, page, ...rest } = search;
      //const query = queryString.stringify(rest);
      const query = queryString.stringify({
        ...rest,
        priceRange: search.priceRange.join(","),
        address: search.address,
      });      

      console.log("Query:", query); // Näytä query-merkkijono

      console.log("Price Range:", search.priceRange);
      console.log("Address:", search.address);

      const { data } = await axios.get(`/search?${query}`);
      console.log("Hakutulokset:", data); // Näytä hakutulokset

      setSearch({ ...search, 
                  results: data.results || [], 
                  loading: false });
      if (search?.page !== "/search") navigate("/search");
    } catch (err) {
      console.error("Hakutoiminto epäonnistui:", err); // Näytä virheilmoitus
    }
  };*/

  /*const handleSearch = async () => {
    try {
      const { results, page, ...rest } = search;
      const query = queryString.stringify({
        ...rest,
        priceRange: search.priceRange?.join(",") || "",
        address: search.address || "",
      });
      console.log("Search state before query:", search);
      console.log("Generated Query:", query); // Tulosta kysely URL-muodossa
  
      const { data } = await axios.get(`/search?${query}`);
  
      if (!data || data.length === 0) {
        console.log("No results found");
        setSearch({ ...search, results: [], loading: false });
        return;
      }*/

        const handleSearch = async () => {
          try {
            const response = await axios.get('/geocode', {
              params: { address: search.address }
            });
        
            console.log("Geocoding Response:", response.data);

            // Simuloi hakutuloksia, kunnes taustapalvelimelta tulee oikea data
    /*const mockResults = [
      {
        _id: "1",
        slug: "mock-property-1",
        type: "House",
        action: "Sell",
        address: "Helsinki, Finland",
        price: 500000,
        photos: [{ Location: "https://via.placeholder.com/150" }],
      },
    ];

    setSearch({
      ...search,
      results: mockResults, // Tallenna tulokset kontekstiin
    });
            // Käsittele dataa, esim. koordinaattien haku tai tulosten näyttäminen
          } catch (err) {
            console.error("Geocoding API error:", err.message);
            setSearch({ ...search, results: [] }); // Tyhjennä tulokset virheen sattuessa
          }
        };*/
        
  
      console.log("Search Results:", data); // Tulosta hakutulokset konsoliin
  
      setSearch({
        ...search,
        results: data.results || [], // Lisää hakutulokset
        loading: false, // Päivitä lataustila
      });
  
      if (search?.page !== "/search") {
        navigate("/search"); // Siirry hakutulossivulle
      }
    } catch (err) {
      console.error("Search failed:", err.message); // Tulosta virheviesti konsoliin
      setSearch({ ...search, loading: false }); // Päivitä lataustila virhetilanteessa
    }
  };

  return (
      <div className="search-form">
      <div className="w-full max-w-xl px-6">
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
        /*onSelect={(address) => {
          console.log("Selected address:", address?.label); // Tarkista valittu osoite
          setSearch({ ...search, address: address?.label || "" });*/
          selectProps={{
          onChange:(address) => {
          console.log("Selected address:", address?.label); // Tarkista valittu osoite
          setSearch({ ...search, address: address?.label || "" });
        },
          }}
        placeholder="search address"
      /> 
   </div>
  <div className="flex flex-nowrap justify-between w-full px-2 mx-auto pt-4 items-stretch max-w-full">
  <button
    onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.action === "Buy" ? "☑️" : ""} Buy
  </button>
  <button
    onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.action === "Rent" ? "☑️ Rent" : "Rent"}
  </button>
  <button
    onClick={() => setSearch({ ...search, type: "House", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.type === "House" ? "☑️ House" : "House"}
  </button>
  <button
    onClick={() => setSearch({ ...search, type: "Land", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.type === "Land" ? "☑️ Land" : "Land"}
  </button>
 
  <button
    onClick={toggleDropdown}
    className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search?.price ? search.price : "Price"}
  </button>
  <ul className={`absolute bg-white shadow-md mt-2 w-full ${dropdownOpen ? "block" : "hidden"} z-50`}>
      {search.action === "Buy"
        ? sellPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <button
                onClick={() => handlePriceSelect(item.name, item.array)}>{item.name}</button>
            </li>
          ))
        : rentPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <a
                onClick={() => handlePriceSelect(item.name, item.array)}>{item.name}</a>
            </li>
          ))}
    </ul>
  
  <button
    onClick={handleSearch}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    Search
  </button>
  </div>
  </div>
  );
}

    {/*<div className="flex flex-col items-center w-full">
      <div className="w-full max-w-xl px-2">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: "Search for address..",
            onChange: ({ value }) => {
              setSearch({ ...search, address: value.description });
            },
          }}
        />
      </div>*/}
 {/*<div className="relative flex-grow min-h-[48px] flex items-stretch max-w-full">
    <button
      onClick={toggleDropdown}
      className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
    >
      {search?.price ? search.price : "Price"}
    </button>
    <ul className={`absolute bg-white shadow-md mt-2 w-full ${dropdownOpen ? "block" : "hidden"} z-50`}>*/}

 {/*
 <div className="relative">
  <button
    onClick={toggleDropdown}
    className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search?.price ? search.price : "Price"}
  </button>
  {dropdownOpen && (
    <ul className="absolute bg-white shadow-md mt-2 w-full z-50">
      {search.action === "Buy"
        ? sellPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <a
                onClick={() => handlePriceSelect(item.name, item.array)}
                className="block w-full text-left"
              >
                {item.name}
              </a>
            </li>
          ))
        : rentPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <a
                onClick={() => handlePriceSelect(item.name, item.array)}
                className="block w-full text-left"
              >
                {item.name}
              </a>
            </li>
          ))}
    </ul>
  )}
</div>*/}
{/*  
<div className="flex justify-between w-full px-2 mx-auto pt-4 items-stretch">
  <button
    onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.action === "Buy" ? "☑️" : ""} Buy
  </button>
  <button
    onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.action === "Rent" ? "☑️ Rent" : "Rent"}
  </button>
  <button
    onClick={() => setSearch({ ...search, type: "House", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.type === "House" ? "☑️ House" : "House"}
  </button>
  <button
    onClick={() => setSearch({ ...search, type: "Land", price: "" })}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    {search.type === "Land" ? "☑️ Land" : "Land"}
  </button>
  <div className="relative flex-grow min-h-[48px] flex items-stretch">
    <button
      onClick={toggleDropdown}
      className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
    >
      {search?.price ? search.price : "Price"}
    </button>
    <ul className={`absolute bg-white shadow-md mt-2 w-full ${dropdownOpen ? "block" : "hidden"}`}>
      {search.action === "Buy"
        ? sellPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <a
                onClick={() => handlePriceSelect(item.name, item.array)}
                className="block w-full text-left"
              >
                {item.name}
              </a>
            </li>
          ))
        : rentPrices.map((item) => (
            <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
              <a
                onClick={() => handlePriceSelect(item.name, item.array)}
                className="block w-full text-left"
              >
                {item.name}
              </a>
            </li>
          ))}
    </ul>
  </div>
  <button
    onClick={handleSearch}
    className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] min-h-[48px]"
  >
    Search
  </button>
</div>*/}
       
        {/*<button
          onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
          className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
        >
          {search.action === "Buy" ? "☑️" : ""} Buy
        </button>
        <button
          onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
          className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
        >
          {search.action === "Rent" ? "☑️ Rent" : "Rent"}
        </button>
        <button
          onClick={() => setSearch({ ...search, type: "House", price: "" })}
          className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
        >
          {search.type === "House" ? "☑️ House" : "House"}
        </button>
        <button
          onClick={() => setSearch({ ...search, type: "Land", price: "" })}
          className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
        >
          {search.type === "Land" ? "☑️Land" : "Land"}
        </button>
        <div className="relative flex-grow">
          <button
            onClick={toggleDropdown}
            className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            {search?.price ? search.price : "Price"}
          </button>
          <ul className={`absolute bg-white shadow-md mt-2 w-full ${dropdownOpen ? "block" : "hidden"}`}>
            {search.action === "Buy"
              ? sellPrices.map((item) => (
                  <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
                    <a
                      onClick={() => handlePriceSelect(item.name, item.array)}
                      className="block w-full text-left"
                    >
                      {item.name}
                    </a>
                  </li>
                ))
              : rentPrices.map((item) => (
                  <li key={item._id} className="p-2 hover:bg-gray-100 text-sm">
                    <a
                      onClick={() => handlePriceSelect(item.name, item.array)}
                      className="block w-full text-left"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
          </ul>
        </div>
        <button
          onClick={handleSearch}
          className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
        >
          Search
        </button>
      </div>*/}