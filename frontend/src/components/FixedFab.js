import React from 'react';
import styled from 'styled-components';
import { Fab } from '@material-ui/core';

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const FixedFab = (props) => <StyledFab {...props} />;

export default FixedFab;
