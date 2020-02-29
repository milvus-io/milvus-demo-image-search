import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { FaQuestionCircle } from 'react-icons/fa';
const WithTip = props => {
  const { title, placement = 'right' } = props;
  return (
    <Tooltip title={title} placement={placement} >
      <Button><FaQuestionCircle /></Button>
    </Tooltip>
  );
};

export default WithTip;
