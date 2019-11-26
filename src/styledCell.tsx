import React from 'react';
import { TableCell } from '@contentful/forma-36-react-components';

const StyledCell = (props: any) => (
  <TableCell style={{ padding: '0px', paddingBottom: '0px', verticalAlign: 'baseline' }}>
    {props.children}
  </TableCell>
);

export default StyledCell;
