import React, { useState } from 'react';
import { FormControl, Button, InputGroup } from 'react-bootstrap';

const Filters = (props) => {
  const [searchVal, setSearchVal] = useState(0);
  const inputChange = (e) => setSearchVal(e.target.value);

  const cancelSearch = () => props.cancelRequest();

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter repository name"
        onChange={inputChange}
        type="text"
        className="search-input"
      />
      <InputGroup.Append>
        <Button
          variant="outline-primary"
          onClick={() => props.submitFilters(searchVal)}
        >
          Search
        </Button>
        <Button
          variant="outline-danger"
          onClick={cancelSearch}
        >
          Cancel
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default Filters;

