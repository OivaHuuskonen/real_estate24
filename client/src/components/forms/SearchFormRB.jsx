import { useSearch } from "../../context/search";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function SearchFormRB() {
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
    <div className="container">
      <div className="w-full max-w-2xl mb-3">
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
      <ButtonGroup className="w-100">
        <Button
          onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
          className={`flex-grow-1 ${search.action === "Buy" && "active"}`}
          variant="outline-secondary"
        >
          {search.action === "Buy" ? "☑️" : ""} Buy
        </Button>
        <Button
          onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
          className={`flex-grow-1 ${search.action === "Rent" && "active"}`}
          variant="outline-secondary"
        >
          {search.action === "Rent" ? "☑️ Rent" : "Rent"}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: "House", price: "" })}
          className={`flex-grow-1 ${search.type === "House" && "active"}`}
          variant="outline-secondary"
        >
          {search.type === "House" ? "☑️ House" : "House"}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: "Land", price: "" })}
          className={`flex-grow-1 ${search.type === "Land" && "active"}`}
          variant="outline-secondary"
        >
          {search.type === "Land" ? "☑️Land" : "Land"}
        </Button>
        <Dropdown as={ButtonGroup} className="flex-grow-1">
          <Button
            onClick={toggleDropdown}
            className="w-100"
            variant="outline-secondary"
          >
            {search?.price ? search.price : "Price"}
          </Button>
          <Dropdown.Menu show={dropdownOpen}>
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
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={handleSearch}
          className="flex-grow-1"
          variant="outline-secondary"
        >
          Search
        </Button>
      </ButtonGroup>
    </div>
  );
}





/*import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SearchFormRB() {
  console.log("SearchFormzz is rendering");
  return (
    <div className="container">
    <ButtonGroup p-4>
      <Button p-8>Buy</Button>
      <Button>Rent</Button>
      <Button>House</Button>
      <Button>Land</Button>

      <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">All price</Dropdown.Item>
        <Dropdown.Item eventKey="2">€0 to €20000</Dropdown.Item>
        <Dropdown.Item eventKey="3">€20000 to €400000</Dropdown.Item>
      </DropdownButton>

      <Button>Search</Button>
    </ButtonGroup>
    </div>
  );
}

export default SearchFormRB;*/