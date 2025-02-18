import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchMain.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handlePriceSelect = (name, array) => {
    setSearch({
      ...search,
      price: name,
      priceRange: array,
    });
    setDropdownOpen(false);
  };

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      console.log("Search query:", query); // Lisätty lokitus

      const { data } = await axios.get(`/search?${query}`);
      console.log("Search results:", data); // Lisätty lokitus

      setSearch((prev) => ({
        ...prev,
        results: data,
        page: '/search',
        loading: false,
      }));
      navigate('/search');
    } catch (err) {
      console.error("Search error:", err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <div className="container">
      <div className="search-input-container google-places-input">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: 'Search for address..',
            onChange: async (place) => {
              const placeId = place.value.place_id;
              const address = place.value.description;

             // console.log("Selected place:", place); // Lisätty lokitus
             // console.log("Place ID:", placeId); // Tarkista, että placeId on oikein

              try {
                  // Käytä backendin APIa Google API -kutsun sijaan
                  //const res = await axios.get(`http://localhost:8000/api/geocode`, {
                  const res = await axios.get(`/geocode`, {
                  params: { place_id: placeId }
                });

                //console.log("Geocode response:", res.data); // Lisätty lokitus

                const location = res.data.results[0]?.geometry?.location;

                if (location) {
                  setSearch({
                    ...search,
                    address,
                    lat: location.lat,
                    lng: location.lng
                  });
                }
              } catch (err) {
                console.error("Geocoding error:", err.response?.data || err);
              }
            },
            styles: {
              container: (provided) => ({
                ...provided,
                flexGrow: 1,
              }),
              control: (provided) => ({
                ...provided,
                width: '100%',
                boxShadow: 'none',
                borderRadius: '4px',
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: '0 10px',
              }),
            },
            components: {
              IndicatorsContainer: () => null,
            },
          }}
        />
        <button
          className="settings-icon-button"
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-2 d-none d-lg-flex justify-center">
        <Button
          onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
          className={`btn ${search.action === 'Buy' && 'active'}`}
        >
          {search.action === 'Buy' ? '☑️' : ''} Buy
        </Button>
        <Button
          onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
          className={`btn ${search.action === 'Rent' && 'active'}`}
        >
          {search.action === 'Rent' ? '☑️ Rent' : 'Rent'}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: 'House', price: '' })}
          className={`btn ${search.type === 'House' && 'active'}`}
        >
          {search.type === 'House' ? '☑️ House' : 'House'}
        </Button>
        <Button
          onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
          className={`btn ${search.type === 'Land' && 'active'}`}
        >
          {search.type === 'Land' ? '☑️ Land' : 'Land'}
        </Button>
        <Dropdown as={ButtonGroup} className="price-button">
          <Button onClick={toggleDropdown}>
            {search?.price ? search.price : 'Price'}
          </Button>
          <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}>
            {(search.action === 'Buy' ? sellPrices : rentPrices).map((item) => (
              <Dropdown.Item
                key={item._id}
                onClick={() => handlePriceSelect(item.name, item.array)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} style={{ zIndex: 1250 }}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicTransactionType">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
               <br></br>
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() =>
                  setSearch({ ...search, action: 'Rent', price: '' })
                }
              />
               <br></br>
            </Form.Group>
            <Form.Group controlId="formBasicPropertyType">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
               <br></br>
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
               <br></br>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Price Range</Form.Label>
              <br></br>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {search.price ? search.price : 'Price'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sellPrices.map((item) => (
                    <Dropdown.Item
                      key={item._id}
                      onClick={() => handlePriceSelect(item.name, item.array)}
                    >
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <br></br>
            <Button
              variant="primary"
              onClick={() => {
                handleSearch();
                handleClose();
              }}
            >
              Search
            </Button>
            <br></br>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}