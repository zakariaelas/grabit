import React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledPaper = styled(Paper)`
  box-shadow: 0 0 14px 0 rgba(53, 64, 82, 0.05);
`;

const ShadowPaper = (props) => <StyledPaper {...props} />;

export default ShadowPaper;
