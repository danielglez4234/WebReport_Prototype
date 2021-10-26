import React          from 'react';

import ListItemButton               from '@mui/material/ListItemButton';
import ListItemIcon                 from '@mui/material/ListItemIcon';
import CircleIcon                   from '@mui/icons-material/Circle';
import ListItemText                 from '@mui/material/ListItemText';
import Divider                      from '@mui/material/Divider';

import DonutSmallIcon               from '@mui/icons-material/DonutSmall';

const MonitorListElement = ({ name, type, selectMonitor }) => {

  var defineIcon;
  if (type === "b"  || type === "e") {
    defineIcon = <CircleIcon className ="monitor-type-indicator_2" />

  }else if (type === "d" || type ==="f" || type === "l" || type === "s" || type === "o") {
    defineIcon = <CircleIcon className ="monitor-type-indicator_scalar_azul" />

  }else if (type === "D" || type ==="F" || type ==="L"	|| type === "S" || type ==="O" || type ==="9"  || type ==="8" || type ==="7"  || type ==="6" || type === "5") {
    defineIcon = <DonutSmallIcon className ="monitor-type-indicator_1" />
  }


  if (name === "STATE") {
    defineIcon = <CircleIcon className ="monitor-type-indicator_3" />
  }

  return(
    <div id="dropitem" className="drag componentItem-box-container">
         <div className="componentItem-box" onDoubleClick={() => {selectMonitor(name, defineIcon)}}>
          <div className="componentItem-icon">
            { defineIcon }
          </div>
          <div className="componentItem-title-div">
            <p className="componentItem-title"> { name } </p>
          </div>
        </div>
      <Divider light />
    </div>
  );
}

export default MonitorListElement;
