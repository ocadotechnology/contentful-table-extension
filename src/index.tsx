import 'reflect-metadata';
import * as React from 'react';
import { render } from 'react-dom';
import { SectionHeading } from '@contentful/forma-36-react-components';
import { TypedJSON, jsonMember, jsonObject } from 'typedjson';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

import TableData from './tableData';
import Table from './table'


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

  dataChanged = (newTableData: TableData) => {
    this.setState({ table: newTableData }, () => {
      this.props.sdk.field.setValue(this.state)
    })
  }

  render = () => {
    return (
      <>
        <SectionHeading>Table Data</SectionHeading>
        <Table
          data={this.state.table}
          dataChanged={this.dataChanged}
        />
      </>
    );
  };
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});
