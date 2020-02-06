import React from 'react';
import { Table } from 'react-bootstrap';
import Loader from './Loader';

const TableData = (props) => {
  const { tableColumns, data, isLoading } = props;
  return (
    <div className="table-view">
    { isLoading && <Loader /> }
    <Table striped bordered hover responsive>
      <thead>
      <tr>
        { tableColumns.map(item => <th key={item.key}>{item.title}</th>) }
      </tr>
      </thead>
      <tbody>
      { data.map(item => (
          <tr key={item.id}>
            {tableColumns.map(key => <td key={key.key + item.id}>{item[key.key]}</td>)}
          </tr>
        )
      )
      }
      </tbody>
    </Table>
    </div>
  );
}

export default TableData;