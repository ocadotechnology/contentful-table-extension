import React from 'react';
import { IconButton } from '@contentful/forma-36-react-components';
import StyledCell from './styledCell';

interface RemoveButtonProps {
  label: string;
  onClick: () => void;
}

const RemoveButton = ({ label, onClick }: RemoveButtonProps) => (
  <StyledCell>
    <IconButton
      iconProps={{ icon: 'Close' }}
      buttonType="negative"
      label={label}
      onClick={onClick}
    />
  </StyledCell>
);

export default RemoveButton;
