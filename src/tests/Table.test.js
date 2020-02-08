import React from 'react';
import { render } from '@testing-library/react';
import TableData from '../modules/task/TableData';
import { tableColumns } from '../modules/task/constants';

test('Table renders with changed props', () => {
  let totalCount = -1;
  let isLoading = false;

  const { getByText, container, rerender } = render(<TableData tableColumns={tableColumns} totalCount={totalCount} isLoading={isLoading}/>);
  expect(container.querySelector(".loader__text")).toBeNull();
  expect(getByText('Please, start search')).toBeTruthy();
  totalCount = 0;

  rerender(<TableData totalCount={totalCount} isLoading={isLoading}/>);
  expect(getByText('No data!')).toBeTruthy();

  isLoading = true;
  rerender(<TableData totalCount={totalCount} isLoading={isLoading}/>);
  expect(container.querySelector(".loader__text")).toBeTruthy();
})

