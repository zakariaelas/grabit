import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
  font-weight: 600;
  text-transform: initial;
`;

const BoldButton = (props) => <StyledButton {...props} />;

export default BoldButton;
