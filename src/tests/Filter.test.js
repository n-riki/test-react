import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filters from '../modules/task/Filters';


test('test Filter', () => {
  const handleCancel = jest.fn();
  const handleSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Filters cancelRequest={handleCancel} submitFilters={handleSearch} />);
  const input = getByPlaceholderText('Enter repository name');
  const cancelBtn = getByText('Cancel');
  const searchBtn = getByText('Search');
  fireEvent.change(input, { target: { value: 'abc' } });
  fireEvent.click(cancelBtn);
  fireEvent.click(searchBtn);
  expect(handleCancel).toHaveBeenCalledTimes(1);
  expect(handleSearch).toHaveBeenCalledTimes(1);
  expect(input.value).toBe('abc');
})