//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SearchFormzz() {
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

export default SearchFormzz;