
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
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({
        ...prev,
        results: data,
        page: '/search',
        loading: false,
      }));
      navigate('/search');
    } catch (err) {
      console.error(err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <div className="container">
      {/* Search Input and Settings Button */}
      <div className="search-input-container google-places-input">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: 'Search for address..',
            onChange: ({ value }) =>
              setSearch({ ...search, address: value.description }),
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

      {/* Button Group Section */}
      <div className="button-group w-full px-2 d-none d-lg-flex">
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

      {/* Modal Section */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: 1250 }}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() =>
                  setSearch({ ...search, action: 'Rent', price: '' })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Price Range</Form.Label>
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}





/*import { useState } from 'react';
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

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
        setSearch({ ...search, loading: false }); 
      } 
    };

  return (
      <div className="container"> 

      <div className="search-input-container full-width" 
      style={{ position: 'relative', zIndex: 1050 }}> 
      <div className="google-places-input"> 
        <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY} 
          apiOptions="au" selectProps={{
          defaultInputValue: search?.address, 
          placeholder: 'Search for address..', 
          onChange: ({ value }) => { 
            setSearch({ ...search, address: value.description }); 
          }, 
          styles: {
            container: (provided) => ({
              ...provided,
              width: '100%', 
              maxWidth: '100%',
            }),
            control: (provided) => ({
              ...provided,
        width: '100%',
        minWidth: '0',
      }),
      valueContainer: (provided) => ({
        ...provided,
        paddingRight: '50px', 
      }),
    },
          components: { 
            IndicatorsContainer: () => ( 
            <div className="settings-icon-container"> 
             <button
             className="settings-icon-button" 
             onClick={handleShow}> 
            <VscSettings /> 
            </button> 
            </div> 

          ), 
          }, 
          }} 
          /> 
          </div> 
          </div> 
            <div className="button-group w-full px-2 d-none d-lg-flex"> 
              <Button onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} 
              className={`btn ${search.action === 'Buy' && 'active'}`}> {search.action === 'Buy' ? '☑️' : ''} Buy </Button> 
              <Button onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} 
              className={`btn ${search.action === 'Rent' && 'active'}`}> {search.action === 'Rent' ? '☑️ Rent' : 'Rent'} </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'House', price: '' })} 
              className={`btn ${search.type === 'House' && 'active'}`}> {search.type === 'House' ? '☑️ House' : 'House'} </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'Land', price: '' })} 
              className={`btn ${search.type === 'Land' && 'active'}`}> {search.type === 'Land' ? '☑️ Land' : 'Land'} </Button> 
              <Dropdown as={ButtonGroup} className="price-button"> <Button onClick={toggleDropdown}>{search?.price ? search.price : 'Price'}</Button> 
              <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}> {search.action === 'Buy' ? sellPrices.map((item) => ( 
                <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} 
                </Dropdown.Item> )) : rentPrices.map((item) => ( 
                  <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} </Dropdown.Item> ))} 
                  </Dropdown.Menu> </Dropdown> 
                  <Button onClick={handleSearch} 
                  className="search-button">Search</Button> </div> 
                  <Modal show={show} onHide={handleClose}> 
                    <Modal.Header closeButton> 
                      <Modal.Title>Search Options</Modal.Title> 
                      </Modal.Header> <Modal.Body> 
                        <Form> <Form.Group controlId="formBasicEmail"> 
                          <Form.Check type="radio" label="Buy" name="transactionType" 
                          onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} /> 
                          <Form.Check type="radio" label="Rent" name="transactionType" onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} /> 
                            </Form.Group> <Form.Group controlId="formBasicPassword"> 
                              <Form.Check type="radio" label="House" name="propertyType" onClick={() => setSearch({ ...search, type: 'House', price: '' })} />
                                 <Form.Check type="radio" label="Land" name="propertyType" onClick={() => setSearch({ ...search, type: 'Land', price: '' })} /> </Form.Group>
                                  <Form.Group controlId="formBasicRange"> <Form.Label>Price Range</Form.Label> 
                                  <Dropdown> <Dropdown.Toggle variant="primary" id="dropdown-basic"> {search.price ? search.price : 'Price'} </Dropdown.Toggle> 
                                  <Dropdown.Menu> {sellPrices.map((item) => ( <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} </Dropdown.Item> ))} </Dropdown.Menu> </Dropdown> </Form.Group> 
                                  <br></br> 
                                  <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }} > Search </Button> 
                                  </Form> </Modal.Body> </Modal> 
                                  </div>
                                  )
                                }*/





    /* 
     <div className="container"> 
     <div className="search-input-container full-width" style={{ position: 'relative', zIndex: 1050 }}> 
      <div className="google-places-input"> 
        <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY} 
        apiOptions="au" 
        selectProps={{ defaultInputValue: search?.address, placeholder: 'Search for address..', 
          onChange: ({ value }) => { setSearch({ ...search, address: value.description }); }, 
          components: { IndicatorsContainer: () => ( <div className="settings-icon-container"> 
          <button className="settings-icon-button" onClick={handleShow}> 
            <VscSettings /> 
            </button> 
            </div> ), }, }} /> 
            </div> </div> 

            <div className="button-group w-full px-2 d-none d-lg-flex"> 
              <Button onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} 
              className={`btn ${search.action === 'Buy' && 'active'}`}> 
              {search.action === 'Buy' ? '☑️' : ''} Buy </Button> 
              <Button onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} 
              className={`btn ${search.action === 'Rent' && 'active'}`}> 
              {search.action === 'Rent' ? '☑️ Rent' : 'Rent'} </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'House', price: '' })} 
              className={`btn ${search.type === 'House' && 'active'}`}> 
              {search.type === 'House' ? '☑️ House' : 'House'} </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'Land', price: '' })} 
              className={`btn ${search.type === 'Land' && 'active'}`}> 
              {search.type === 'Land' ? '☑️ Land' : 'Land'} </Button> 
              <Dropdown as={ButtonGroup} className="price-button"> 
                <Button onClick={toggleDropdown}>{search?.price ? search.price : 'Price'}</Button> 
                <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}> 
                  {search.action === 'Buy' ? sellPrices.map((item) => ( 
                    <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> 
                    {item.name} </Dropdown.Item> )) : rentPrices.map((item) => ( 
                      <Dropdown.Item key={item._id} 
                      onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} 
                      </Dropdown.Item> ))} 
                      </Dropdown.Menu> </Dropdown> 
                      <Button onClick={handleSearch} className="search-button">Search</Button> 
                      </div> 

                      <Modal show={show} onHide={handleClose}> 
                        <Modal.Header closeButton> 
                          <Modal.Title>Search Options</Modal.Title> 
                          </Modal.Header> 
                          <Modal.Body> 
                            <Form> 
                              <Form.Group controlId="formBasicEmail"> 
                            <Form.Check type="radio" label="Buy" name="transactionType" 
                            onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} /> 
                            <Form.Check type="radio" label="Rent" name="transactionType" 
                            onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} /> 
                            </Form.Group> 
                            <Form.Group controlId="formBasicPassword"> 
                              <Form.Check type="radio" label="House" name="propertyType" 
                              onClick={() => setSearch({ ...search, type: 'House', price: '' })} /> 
                              <Form.Check type="radio" label="Land" name="propertyType" 
                              onClick={() => setSearch({ ...search, type: 'Land', price: '' })} /> </Form.Group> 
                              <Form.Group controlId="formBasicRange"> 
                                <Form.Label>Price Range</Form.Label> 
                                <Dropdown> 
                                  <Dropdown.Toggle 
                                  variant="primary" id="dropdown-basic"> {search.price ? search.price : 'Price'} 
                                  </Dropdown.Toggle> 
                                <Dropdown.Menu> {sellPrices.map((item) => ( 
                                  <Dropdown.Item key={item._id} 
                                   onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} 
                                   </Dropdown.Item> ))} 
                                </Dropdown.Menu> 
                                </Dropdown> 
                                </Form.Group> 
                                <br></br> 
                                <Button variant="primary" 
                                onClick={() => { handleSearch(); handleClose(); }} > Search </Button> 
                                </Form> 
                                </Modal.Body> 
                                </Modal> 
                                </div>

-----------
*/
      /* <div className="container"> <div className="search-input-container full-width" style={{ position: 'relative', zIndex: 1050 }}> <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY} apiOptions="au" selectProps={{ defaultInputValue: search?.address, placeholder: 'Search for address..', onChange: ({ value }) => { setSearch({ ...search, address: value.description }); }, components: { IndicatorsContainer: () => ( <div className="settings-icon-container"> <button className="settings-icon-button" onClick={handleShow}> <VscSettings /> </button> </div> ), }, }} /> </div> <div className="button-group w-full px-2 d-none d-lg-flex"> <Button onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} className={`btn ${search.action === 'Buy' && 'active'}`}> {search.action === 'Buy' ? '☑️' : ''} Buy </Button> <Button onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} className={`btn ${search.action === 'Rent' && 'active'}`}> {search.action === 'Rent' ? '☑️ Rent' : 'Rent'} </Button> <Button onClick={() => setSearch({ ...search, type: 'House', price: '' })} className={`btn ${search.type === 'House' && 'active'}`}> {search.type === 'House' ? '☑️ House' : 'House'} </Button> <Button onClick={() => setSearch({ ...search, type: 'Land', price: '' })} className={`btn ${search.type === 'Land' && 'active'}`}> {search.type === 'Land' ? '☑️ Land' : 'Land'} </Button> <Dropdown as={ButtonGroup} className="price-button"> <Button onClick={toggleDropdown}>{search?.price ? search.price : 'Price'}</Button> <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}> {search.action === 'Buy' ? sellPrices.map((item) => ( <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} </Dropdown.Item> )) : rentPrices.map((item) => ( <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} </Dropdown.Item> ))} </Dropdown.Menu> </Dropdown> <Button onClick={handleSearch} className="search-button">Search</Button> </div> <Modal show={show} onHide={handleClose}> <Modal.Header closeButton> <Modal.Title>Search Options</Modal.Title> </Modal.Header> <Modal.Body> <Form> <Form.Group controlId="formBasicEmail"> <Form.Check type="radio" label="Buy" name="transactionType" onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} /> <Form.Check type="radio" label="Rent" name="transactionType" onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} /> </Form.Group> <Form.Group controlId="formBasicPassword"> <Form.Check type="radio" label="House" name="propertyType" onClick={() => setSearch({ ...search, type: 'House', price: '' })} /> <Form.Check type="radio" label="Land" name="propertyType" onClick={() => setSearch({ ...search, type: 'Land', price: '' })} /> </Form.Group> <Form.Group controlId="formBasicRange"> <Form.Label>Price Range</Form.Label> <Dropdown> <Dropdown.Toggle variant="primary" id="dropdown-basic"> {search.price ? search.price : 'Price'} </Dropdown.Toggle> <Dropdown.Menu> {sellPrices.map((item) => ( <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}> {item.name} </Dropdown.Item> ))} </Dropdown.Menu> </Dropdown> </Form.Group> <br></br> <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }} > Search </Button> </Form> </Modal.Body> </Modal> </div>*/


        /* <div className="container"> 
         <div className="search-input-container full-width" 
         style={{ position: 'relative', zIndex: 1050 }}> 
         <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY} 
         apiOptions="au" selectProps={{ defaultInputValue: search?.address, 
          placeholder: 'Search for address..', onChange: ({ value }) => 
            { setSearch({ ...search, address: value.description }); }, 
          components: { IndicatorsContainer: () => ( 
          <div className="settings-icon-container">
             <button className="settings-icon-button" 
             onClick={handleShow}> 
             <VscSettings /> 
             </button> 
             </div> ), 
             }, 
            }} /> 
            </div> 
            <div className="button-group w-full px-2 d-none d-lg-flex"> 
              <Button onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} 
              className={`btn ${search.action === 'Buy' && 'active'}`} > 
              {search.action === 'Buy' ? '☑️' : ''} Buy 
              </Button> 
              <Button onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} 
              className={`btn ${search.action === 'Rent' && 'active'}`} > 
              {search.action === 'Rent' ? '☑️ Rent' : 'Rent'} </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'House', price: '' })} 
              className={`btn ${search.type === 'House' && 'active'}`} > 
              {search.type === 'House' ? '☑️ House' : 'House'} 
              </Button> 
              <Button onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
               className={`btn ${search.type === 'Land' && 'active'}`} > 
               {search.type === 'Land' ? '☑️ Land' : 'Land'} 
               </Button> 
               <Dropdown as={ButtonGroup} className="price-button"> 
                <Button onClick={toggleDropdown}> {search?.price ? search.price : 'Price'} 
              </Button> 
              <Dropdown.Menu show={dropdownOpen} style={{ zIndex: 1050 }}> 
                {search.action === 'Buy' ? sellPrices.map((item) => ( 
                  <Dropdown.Item key={item._id} 
                  onClick={() => handlePriceSelect(item.name, item.array)} > 
                  {item.name} 
                  </Dropdown.Item> )) : rentPrices.map((item) => ( 
                    <Dropdown.Item key={item._id} 
                    onClick={() => handlePriceSelect(item.name, item.array)} > {item.name} 
                    </Dropdown.Item> ))} 
                    </Dropdown.Menu> 
                    </Dropdown> 
                    <Button 
                    onClick={handleSearch} 
                    className="search-button"> 
                    Search 
                    </Button> 
                    </div> 
                    <Modal show={show} onHide={handleClose}> 
                      <Modal.Header closeButton>
                         <Modal.Title>
                          Search Options
                          </Modal.Title> 
                         </Modal.Header> 
                         <Modal.Body> 
                          <Form> 
                            <Form.Group controlId="formBasicEmail">
                             <Form.Check type="radio" label="Buy" name="transactionType"
                              onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} /> 
                              <Form.Check type="radio" label="Rent" name="transactionType" 
                              onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} /> 
                              </Form.Group> 
                              <Form.Group controlId="formBasicPassword"> 
                                <Form.Check type="radio" label="House" name="propertyType" 
                                onClick={() => setSearch({ ...search, type: 'House', price: '' })} /> 
                                <Form.Check type="radio" label="Land" name="propertyType" 
                                onClick={() => setSearch({ ...search, type: 'Land', price: '' })} /> 
                                </Form.Group>
                                 <Form.Group controlId="formBasicRange">
                                   <Form.Label>Price Range</Form.Label>
                                    <Dropdown>
                                     <Dropdown.Toggle variant="primary" id="dropdown-basic"> 
                                      {search.price ? search.price : 'Price'} 
                                      </Dropdown.Toggle> 
                                      <Dropdown.Menu> {sellPrices.map((item) => ( 
                                        <Dropdown.Item key={item._id}
                                         onClick={() => handlePriceSelect(item.name, item.array)}>
                                           {item.name} 
                                           </Dropdown.Item> ))} 
                                           </Dropdown.Menu> 
                                           </Dropdown>
                                            </Form.Group>
                                             <br></br> 
                                            <Button variant="primary" 
                                              onClick={() => { handleSearch(); handleClose(); }}>
                                              Search</Button> 
                                              </Form>
                                               </Modal.Body> 
                                               </Modal> 
                                               </div>
        ); 
        }*/


/*import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourStylesheet.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
        setSearch({ ...search, loading: false }); 
      } 
    };

  return (
    <div className="container">
      <div className="search-input-container" style={{ position: 'relative', zIndex: 1050 }}>
        <div className="google-places-input">
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
            apiOptions="au"
            selectProps={{
              defaultInputValue: search?.address,
              placeholder: 'Search for address..',
              onChange: ({ value }) => {
                setSearch({ ...search, address: value.description });
              },
            }}
          />
        </div>
        <button className="settings-icon-button" onClick={handleShow}>
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-2 d-none d-lg-flex">
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
            {search.action === 'Buy'
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
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>

            <br></br>

                <Form.Group controlId="formBasicRange">
                    <Form.Label>Price Range</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {search.price ? search.price : 'Price'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {sellPrices.map((item) => (
                          <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}>
                            {item.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <br></br>
                  <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }}>Search</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        );
      }*/





/*import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourStylesheet.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
        setSearch({ ...search, loading: false }); 
      } 
    };

  return (
    <div className="container">
      <div className="google-places-container" style={{ position: 'relative', zIndex: 1050 }}>
        <div className="google-places-input">
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
            apiOptions="au"
            selectProps={{
              defaultInputValue: search?.address,
              placeholder: 'Search for address..',
              onChange: ({ value }) => {
                setSearch({ ...search, address: value.description });
              },
            }}
          />
        </div>
        <button className="settings-icon-button" onClick={handleShow}>
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-2 d-none d-lg-flex">
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
            {search.action === 'Buy'
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
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>

            <br></br>

                    <Form.Group controlId="formBasicRange">
                    <Form.Label>Price Range</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {search.price ? search.price : 'Price'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {sellPrices.map((item) => (
                          <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}>
                            {item.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <br></br>
                  <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }}>Search</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        );
      }*/






/*import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourStylesheet.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
        setSearch({ ...search, loading: false }); 
      } 
    };

  return (
    <div className="container">
      <div className="search-input-container" style={{ position: 'relative', zIndex: 1050 }}>
        <div className="google-places-input">
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
            apiOptions="au"
            selectProps={{
              defaultInputValue: search?.address,
              placeholder: 'Search for address..',
              onChange: ({ value }) => {
                setSearch({ ...search, address: value.description });
              },
            }}
          />
        </div>
        <button className="settings-icon-button" onClick={handleShow}>
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-2 d-none d-lg-flex">
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
            {search.action === 'Buy'
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
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>

            <br></br>

            <Form.Group controlId="formBasicRange">
              <Form.Label>Price Range</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {search.price ? search.price : 'Price'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sellPrices.map((item) => (
                    <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}>
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }}>Search</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}*/



/*import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourStylesheet.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
        setSearch({ ...search, loading: false }); 
      } 
    };

  return (
    <div className="container">
      <div className="search-input-container" style={{ position: 'relative', zIndex: 1050 }}>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_KEY}
          apiOptions="au"
          selectProps={{
            defaultInputValue: search?.address,
            placeholder: 'Search for address..',
            onChange: ({ value }) => {
              setSearch({ ...search, address: value.description });
            },
          }}
        />
        <button className="settings-icon-button" onClick={handleShow}>
          <VscSettings />
        </button>
      </div>

      <div className="button-group w-full px-6 d-none d-lg-flex">
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
            {search.action === 'Buy'
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
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicRange">
              <Form.Label>Price Range</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {search.price ? search.price : 'Price'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sellPrices.map((item) => (
                    <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}>
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }}>Search</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}








 older import { useState } from 'react';
import { Button, Modal, Form, Dropdown, ButtonGroup } from 'react-bootstrap';
import { VscSettings } from 'react-icons/vsc';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { sellPrices, rentPrices } from '../../helpers/priceList';
import { useSearch } from '../../context/search';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourStylesheet.css';

export default function SearchMain() {
  const [search, setSearch] = useSearch();
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    console.log('Modal suljettu');
    setShow(false);
  };
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
    setSearch({ ...search, loading: false });
    console.log(search);

    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      const { data } = await axios.get(`/search?${query}`);
      setSearch((prev) => ({ 
        ...prev, 
        results: data, 
        page: '/search', 
        loading: false, 
      })); 
        navigate('/search'); 
      } catch (err) { console.log(err); 
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
            placeholder: 'Search for address..',
            onChange: ({ value }) => {
              setSearch({ ...search, address: value.description });
            },
          }}
        />
      </div>

      <div className="button-group w-full px-6 d-none d-lg-flex">
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
            {search.action === 'Buy'
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
        <Button onClick={handleSearch} className="search-button">
          Search
        </Button>
      </div>
      
      <Button variant="secondary" className="settings-button d-lg-none" onClick={handleShow}>
        <VscSettings />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Check
                type="radio"
                label="Buy"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Buy', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Rent"
                name="transactionType"
                onClick={() => setSearch({ ...search, action: 'Rent', price: '' })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Check
                type="radio"
                label="House"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'House', price: '' })}
              />
              <Form.Check
                type="radio"
                label="Land"
                name="propertyType"
                onClick={() => setSearch({ ...search, type: 'Land', price: '' })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicRange">
            <Form.Label>Price Range</Form.Label>
  <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      {search.price ? search.price : 'Price'}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {sellPrices.map((item) => (
        <Dropdown.Item key={item._id} onClick={() => handlePriceSelect(item.name, item.array)}>
          {item.name}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</Form.Group>
            <br></br>
            <Button variant="primary" onClick={() => { handleSearch(); handleClose(); }}> Search </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
*/