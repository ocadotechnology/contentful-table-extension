import React from 'react';
import {
  Table as TableUI,
  TableBody,
  TableRow,
  Button
} from '@contentful/forma-36-react-components';
import F36Tokens from '@contentful/forma-36-tokens';
import TableData from './tableData';
import RemoveButton from './removeButton';
import TableHeader from './tableHeader';
import TableBodyContent from './tableBodyContent';

interface FieldSpacerProps {
  spacing: string;
}

const FieldSpacer = ({ spacing }: FieldSpacerProps) => <div style={{ paddingBottom: spacing }} />;

interface TableProps {
  data: TableData;
  dataChanged: (newTableData: TableData) => void;
}

const Table = ({ data, dataChanged }: TableProps) => {
  return (
    <>
      <TableUI>
        <TableHeader tableData={data} dataChanged={dataChanged} />
        <TableBody>
          <TableBodyContent dataChanged={dataChanged} tableData={data} />
          <TableRow key="deleteColumns">
            {data.header.map((_, columnIndex) => (
              <RemoveButton
                key={`remove column ${columnIndex} button`}
                label="Remove column"
                onClick={() => {
                  dataChanged(data.removeColumn(columnIndex));
                }}
              />
            ))}
          </TableRow>
        </TableBody>
      </TableUI>
      <FieldSpacer spacing={F36Tokens.spacingXs} />
      <Button
        onClick={() => {
          dataChanged(data.addRow());
        }}>
        Add Row
      </Button>
      <FieldSpacer spacing={F36Tokens.spacingXs} />
      <Button
        onClick={() => {
          dataChanged(data.addColumn());
        }}>
        Add Column
      </Button>
    </>
  );
};

export default Table;
