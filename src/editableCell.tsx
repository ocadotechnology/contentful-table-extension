import React from 'react';
import styled from 'styled-components';
import F36Tokens from '@contentful/forma-36-tokens';
import StyledCell from './styledCell';

const TextArea = styled.input`
  overflow: hidden;
  border: none;
  height: auto;
  padding: ${_ => F36Tokens.spacingM};
  width: 80%;
  font-size: ${_ => F36Tokens.fontSizeM};
`;

interface EditableCellProps {
  value: string;
  dataChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: Object;
}

const EditableCell = ({ value, dataChanged, style }: EditableCellProps) => (
  <StyledCell style={style}>
    <TextArea value={value} onChange={dataChanged} />
  </StyledCell>
);

export default EditableCell;
