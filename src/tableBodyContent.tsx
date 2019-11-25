import React from 'react';
import TableData from './tableData';
import EditableCell from './editableCell';
import { TableRow } from '@contentful/forma-36-react-components';
import RemoveButton from './removeButton';

interface TableBodyContentProps {
  tableData: TableData;
  dataChanged: (tableData: TableData) => void;
}

const TableBodyContent = ({ tableData, dataChanged }: TableBodyContentProps) => (
  <>
    {tableData.body.map((row, rowIndex) => (
      <TableRow key={`row${rowIndex}`}>
        {row.map((cell, columnIndex) => (
          <EditableCell
            key={`cell(${rowIndex}, ${columnIndex})`}
            value={cell}
            dataChanged={event =>
              dataChanged(tableData.editBodyCell(rowIndex, columnIndex, event.target.value))
            }
          />
        ))}
        <RemoveButton
          key="removeRow"
          label="Remove row"
          onClick={() => {
            dataChanged(tableData.removeRow(rowIndex));
          }}
        />
      </TableRow>
    ))}
  </>
);

export default TableBodyContent;
