import React, { Component } from 'react';
import { getTableData, cancel } from '../../services/requestServices';
import { tableColumns } from './constants';
import TableData from './TableData';
import Filters from './Filters';
import ReactPaginate from 'react-paginate';
import { Col, Row } from 'react-bootstrap';

const pageLimit = 30;
const requestQuery = (per_page) => (name, page = 0) => `q=${name}&sort=stars&order=desc&page=${page + 1}&per_page=${per_page}`;
const query = requestQuery(pageLimit);

class Task extends Component {
  state = {
    data: [],
    isLoading: false,
    filterData: '',
    page: 0,
    totalCount: -1,
    totalPages: 0,
  }

  getData = (searchData, inputVal, page) => {

    if(searchData === this.state.searchData) {
      alert('request with same parameters');
      return;
    }

    this.setState({isLoading: true, filterData: inputVal, page: page, searchData: searchData });

    getTableData(searchData).then((res) => {
      this.setState({
        data: res.data.items,
        isLoading: false,
        totalCount: res.data.total_count/pageLimit,
        totalPages: Math.ceil(res.data.total_count/pageLimit),
        })
    }).catch((error) => {
      this.setState({isLoading: false});
      if( error.response && error.response.status === 422) {
        alert(error.response.data.message);
      }
    });
  }

  cancelRequest = () => cancel();

  submitFilters = (inputVal) => {
    if(!inputVal) {
      alert('repo name is required');
      return;
    }
    const { page, filterData } = this.state;
    let selectedPage = page;
    if(filterData !== inputVal) {
      selectedPage = 0;
    }
    const searchData = query(inputVal, selectedPage);
    this.getData(searchData, inputVal, selectedPage);
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const { filterData } = this.state;
    const searchData = query(filterData, selectedPage);
    this.getData(searchData, filterData, selectedPage);
  }

  render() {
    const { isLoading, totalCount } = this.state;

    return (
      <div className="main pad10">
        <div className="table-with-pagin">
          <Row>
            <Col md={6}>
              <Filters submitFilters={this.submitFilters} cancelRequest={this.cancelRequest} />
            </Col>
            {totalCount > 0
              ? <Col md={6}>
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                    containerClassName={`pagination ${isLoading ? 'pagination--disabled' : ''}`}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.state.page}
                  />
                </Col>
              :null
            }
          </Row>
          <TableData
              data={this.state.data}
              tableColumns={tableColumns}
              isLoading={isLoading}
              totalCount={totalCount}
          />
        </div>
      </div>
    );
  }
}

export default Task;