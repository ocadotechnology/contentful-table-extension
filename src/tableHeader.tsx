import React from 'react';
import TableData from './tableData';
import EditableCell from './editableCell';
import { TableHead, TableRow, TableCell } from '@contentful/forma-36-react-components';

interface TableHeaderProps {
  tableData: TableData;
  dataChanged: (tableData: TableData) => void;
}

const TableHeader = ({ tableData, dataChanged }: TableHeaderProps) => (
  <TableHead>
    <TableRow>
      {tableData.header.map((cell, index) => (
        <EditableCell
          key={`header(${index})`}
          style={{ backgroundColor: '#F6F8F9' }}
          value={cell}
          dataChanged={event => {
            dataChanged(tableData.editHeaderCell(index, event.target.value));
          }}
        />
      ))}
      <TableCell key="actions"></TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
