import React from 'react';
import F36Tokens from '@contentful/forma-36-tokens';
import StyledCell from './styledCell';

interface EditableCellProps {
  value: string;
  dataChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: Object;
}

const EditableCell = ({ value, dataChanged, style }: EditableCellProps) => (
  <StyledCell style={style}>
    <input style={{overflow: 'hidden', border: 'none', height: 'auto', padding: F36Tokens.spacingM, width: '80%', fontSize: F36Tokens.fontSizeM}} value={value} onChange={dataChanged} />
  </StyledCell>
);

export default EditableCell;
