import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useSearch } from "../../context/search";
import { useState } from "react";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchFormzz() {
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
    setDropdownOpen(false); // Sulkee pudotusvalikon valinnan jälkeen
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
      <div className="w-full max-w-2xl px-4">
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
        <ButtonGroup>
          <Button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-4 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            {search.action === "Buy" ? "☑️" : ""} Buy
          </Button>
          <Button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-4 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            {search.action === "Rent" ? "☑️ Rent" : "Rent"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-4 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            {search.type === "House" ? "☑️ House" : "House"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-4 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            {search.type === "Land" ? "☑️Land" : "Land"}
          </Button>
          <DropdownButton
            as={ButtonGroup}
            title={search?.price ? search.price : "Price"}
            id="bg-nested-dropdown"
            className="border-2 border-[#cbc385] py-2 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
            onClick={toggleDropdown}
          >
            {search.action === "Buy"
              ? sellPrices.map((item) => (
                  <Dropdown.Item
                    key={item._id}
                    onClick={() => handlePriceSelect(item.name, item.array)}
                  >
                    {item.name}
                  </Dropdown.Item>
                ))
              : rentPrices.map((item) => (
                  <Dropdown.Item
                    key={item._id}
                    onClick={() => handlePriceSelect(item.name, item.array)}
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
          </DropdownButton>
          <Button
            onClick={handleSearch}
            className="border-2 border-[#cbc385] py-2 px-4 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab]"
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}





/*import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SearchFormzz() {
  console.log("SearchFormzz is rendering");
  return (
    <div className="flex justify-center w-full px-2 pt-4">
    <ButtonGroup>
      <Button>Buy</Button>
      <Button>Rent</Button>
      <Button>House</Button>
      <Button>Land</Button>

      <DropdownButton as={ButtonGroup} title="Price" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
      </DropdownButton>

      <Button>Search</Button>
    </ButtonGroup>
    </div>
  );
}

export default SearchFormzz;*/