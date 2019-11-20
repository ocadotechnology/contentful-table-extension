import 'reflect-metadata';
import * as React from 'react';
import { render } from 'react-dom';
import { TextInput, Table, TableBody, TableRow, TableCell, TableHead, Button, SectionHeading } from '@contentful/forma-36-react-components';
import F36Tokens from '@contentful/forma-36-tokens';
import styled from 'styled-components';
import { TypedJSON, jsonMember, jsonObject } from 'typedjson';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

import { Table as TableData, testJSON } from './table';


interface AppProps {
  sdk: FieldExtensionSDK;
}

@jsonObject
class AppState {
  @jsonMember
  table: TableData = new TableData();

  public constructor(fields?: {table?: TableData}) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

interface FieldSpacerProps {
  spacing: string;
}

const FieldSpacer = styled.div`
  padding-bottom: ${(props: FieldSpacerProps) => props.spacing};
`;

const rowToComponents = (rowData: string[]) => (
  <TableRow>
    {rowData.map((cell, index) => (
      <TableCell key={index}>{cell}</TableCell>
    ))}
  </TableRow>
)

const generateTable = (tableData: TableData) => {
  const tableHeaderRow = (
    <TableHead>
      {rowToComponents(tableData.header)}
    </TableHead>
  )
  const tableBody = (
    <TableBody>
      {tableData.body.map(rowToComponents)}
    </TableBody>
  )
  return (
    <Table>
      {tableHeaderRow}
      {tableBody}
    </Table>
  )
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = this.jsonToState(props.sdk.field.getValue());
  }

  stateToPlainJSON() {
    return new TypedJSON(AppState).toPlainJson(this.state)
  }

  jsonToState(json: string): AppState {
    return new TypedJSON(AppState).parse(json) || new AppState();
  }

  detachExternalChangeHandler: Function | null = null;

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = (value: string) => {
    this.setState(this.jsonToState(value));
  };

  onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value || "";
    this.props.sdk.field.setValue({ ...this.state, title });
  };

  addRow = () => {
    this.setState(state => {
      const numberOfColumns = state.table.header.length;
      const newRow = new Array(numberOfColumns).fill("Cell")
      const newBody = state.table.body.concat([newRow])
      const newTable = new TableData({ body: newBody })
      return {
        table: newTable
      }
    }, () => {
      this.props.sdk.field.setValue(this.state)    
    })
  }

  render = () => {
    return (
      <>
        <SectionHeading>Table Data</SectionHeading>
        {this.state.table ? generateTable(this.state.table): <></>}
        <FieldSpacer spacing={F36Tokens.spacingXs} />
        <Button onClick={this.addRow}>Add Row</Button>
      </>
    );
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
