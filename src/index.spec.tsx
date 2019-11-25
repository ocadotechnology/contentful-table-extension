/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import { App } from './index';
import { render, fireEvent, cleanup, configure } from '@testing-library/react';

configure({
  testIdAttribute: 'data-test-id'
});

function renderComponent(sdk: FieldExtensionSDK) {
  return render(<App sdk={sdk} />);
}

const sdk: any = {
  field: {
    getValue: jest.fn(),
    onValueChanged: jest.fn(),
    setValue: jest.fn(),
    removeValue: jest.fn()
  },
  window: {
    startAutoResizer: jest.fn()
  }
};

const dummyTableData = {
  header: [
    'header 1'
  ],
  body: [
    ['Cell 1', 'Cell 2'],
    ['Cell 3', 'Cell 4']
  ]
}

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should read a value from field.getValue() and subscribe for external changes', () => {
    sdk.field.getValue.mockImplementation(() => dummyTableData);
    const { getByTestId } = renderComponent(sdk);

    expect(sdk.field.getValue).toHaveBeenCalled();
    expect(sdk.field.onValueChanged).toHaveBeenCalled();
  });

  it('should call starstartAutoResizer', () => {
    renderComponent(sdk);
    expect(sdk.window.startAutoResizer).toHaveBeenCalled();
  });
});
