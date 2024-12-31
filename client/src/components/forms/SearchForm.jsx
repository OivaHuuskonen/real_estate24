import { useSearch } from "../../context/search";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchForm() {
  const [search, setSearch] = useSearch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePriceSelect = (name, array) => {
    setSearch({
      ...search,
      price: name,
      priceRange: array,
    });
    setDropdownOpen(false); 
  };
 
  const handleSearch = async () => {
    setSearch({ ...search, loading: false });
    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      if (search?.page !== "/search") {
        setSearch((prev) => ({ ...prev, results: data, loading: false }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data,
          page: window.location.pathname,
          loading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
         <div className="flex flex-col items-center w-full">
         <div className="w-full max-w-2xl">
              <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
                        apiOptions="au"
                        selectProps={{
                          defaultInputValue: search?.address,
                          placeholder: "Search for address..",
                          onChange: ({ value }) => {
                            setSearch({ ...search, address: value.description });
                          },
                        }}
                      />
                      </div>

                      <div className="flex justify-center w-full px-2 pt-4">
                        <button
                            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
                            className="border-2 border-[#cbc385] py-2 px-4 text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
                          >
                            {search.action === "Buy" ? "☑️" : ""} Buy
                          </button>
                            <button
                              onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
                              className="border-2 border-[#cbc385] py-2 px-4 text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
                            >
                              {search.action === "Rent" ? "☑️ Rent" : "Rent"}
                            </button>
                          
                            <button
                              onClick={() => setSearch({ ...search, type: "House", price: "" })}
                              className="border-2 border-[#cbc385] py-2 px-4 text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
                            >
                              {search.type === "House" ? "☑️ House" : "House"}
                            </button>
                            <button
                              onClick={() => setSearch({ ...search, type: "Land", price: "" })}
                              className="border-2 border-[#cbc385] py-2 px-4 text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
                            >
                              {search.type === "Land" ? "☑️Land" : "Land"}
                            </button>
                            </div>

                           {/* <div className="relative flex-grow">
                           <div className="flex justify-between w-full px-2">*/}


                            <div className="flex flex-wrap justify-center w-full px-2 md:flex-nowrap">
                            <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
                            <button
                              onClick={toggleDropdown} 
                              className="border-2 border-[#cbc385] py-2 px-2 
                               w-full
                               text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
                            >
                              {search?.price ? search.price : "Price"}
                            </button>
                            <ul className={`absolute bg-white shadow-md mt-2 w-full ${dropdownOpen ? 'block' : 'hidden'}`}>
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

            <div className="w-full md:w-1/5 lg:w-1/5 xl:w-1/5">
           
            <button 
            onClick={handleSearch}
            className="border-2 border-[#cbc385] py-2 px-2 w-full text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
            >
            Search
            </button>
            </div>
            </div>
            </div>
    )
} 