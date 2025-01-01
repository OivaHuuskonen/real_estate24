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
import './SearchFormRB.css';

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
      <div className="w-full max-w-2xl" style={{ position: 'relative', zIndex: 1050 }}>
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
      
      <br/>

      <ButtonGroup className="button-group">
        <Button
          onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
          className={`btn ${search.action === "Buy" && "active"}`}
        >
          {search.action === "Buy" ? "☑️" : ""} Buy
        </Button>
        <Button
          onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
          className={`btn ${search.action === "Rent" && "active"}`}
        >
          {search.action === "Rent" ? "☑️ Rent" : "Rent"}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: "House", price: "" })}
          className={`btn ${search.type === "House" && "active"}`}
        >
          {search.type === "House" ? "☑️ House" : "House"}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: "Land", price: "" })}
          className={`btn ${search.type === "Land" && "active"}`}
        >
          {search.type === "Land" ? "☑️ Land" : "Land"}
        </Button>
        <Dropdown as={ButtonGroup} className="price-button">
          <Button
            onClick={toggleDropdown}
          >
            {search?.price ? search.price : "Price"}
          </Button>
          <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}>
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
          className="search-button"
          style={{ borderColor: '#cbc385', borderWidth: '2px' }}
        >
          Search
        </Button>
      </ButtonGroup>
    </div>
  );
}






/*
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
import './SearchFormzz.css'; // Import custom CSS file

export default function SearchForm_stack() {
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
      <div className="w-full max-w-2xl px-2">
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
      <div className="flex justify-center w-full px-2 pt-4 flex-wrap">
        <ButtonGroup>
          <Button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Buy" ? "☑️" : ""} Buy
          </Button>
          <Button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Rent" ? "☑️ Rent" : "Rent"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "House" ? "☑️ House" : "House"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "Land" ? "☑️Land" : "Land"}
          </Button>
          </ButtonGroup>
          </div>


          <div className="flex justify-center w-full px-2 pt-4 flex-wrap">
          <ButtonGroup>
          <DropdownButton
            as={ButtonGroup}
            title={search?.price ? search.price : "Price"}
            id="bg-nested-dropdown"
            className="custom-dropdown border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
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
            className="border-2 border-[#cbc385] py-2 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}*/




/*import 'bootstrap/dist/css/bootstrap.min.css';
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
import './SearchFormzz.css'; 

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
      <div className="flex justify-center w-full px-0 pt-4 flex-wrap">
        <ButtonGroup>
          <Button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Buy" ? "☑️" : ""} Buy
          </Button>
          <Button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Rent" ? "☑️ Rent" : "Rent"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "House" ? "☑️ House" : "House"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "Land" ? "☑️Land" : "Land"}
          </Button>
          <DropdownButton
            as={ButtonGroup}
            title={search?.price ? search.price : "Price"}
            id="bg-nested-dropdown"
            className="custom-dropdown border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
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
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}*/

















/*import 'bootstrap/dist/css/bootstrap.min.css';
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
import './SearchFormzz.css'; // Import custom CSS file

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
      <div className="flex justify-center w-full px-0 pt-4 flex-wrap">
        <ButtonGroup>
          <Button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Buy" ? "☑️" : ""} Buy
          </Button>
          <Button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Rent" ? "☑️ Rent" : "Rent"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "House" ? "☑️ House" : "House"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "Land" ? "☑️Land" : "Land"}
          </Button>
          <DropdownButton
            as={ButtonGroup}
            title={search?.price ? search.price : "Price"}
            id="bg-nested-dropdown"
            className="custom-dropdown border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
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
            className="border-2 border-[#cbc385] py-1 px-2 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}*/





/*import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="flex justify-center w-full px-2 pt-4 flex-wrap">
        <ButtonGroup>
          <Button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Buy" ? "☑️ Buy" : "Buy"} 
          </Button>
          <Button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.action === "Rent" ? "☑️ Rent" : "Rent"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "House" ? "☑️ House" : "House"}
          </Button>
          <Button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            {search.type === "Land" ? "☑️Land" : "Land"}
          </Button>
          <DropdownButton
            as={ButtonGroup}
            title={search?.price ? search.price : "Price"}
            id="bg-nested-dropdown"
            className="custom-dropdown border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
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
            className="border-2 border-[#cbc385] py-1 px-1 flex-grow text-[#000000] hover:bg-[#f5eadc] hover:border-[#f9b4ab] btn-sm"
          >
            Search
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}*/

