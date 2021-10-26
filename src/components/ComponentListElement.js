import React          from 'react';

import ListItemButton               from '@mui/material/ListItemButton';
import ListItemIcon                 from '@mui/material/ListItemIcon';
import FolderIcon                   from '@mui/icons-material/Folder';
import ListItemText                 from '@mui/material/ListItemText';
import Divider                      from '@mui/material/Divider';

const ComponentListElement = ({ name, getMonitors }) => {
  return(
    <div className="componentItem-box-container">
      <div className="componentItem-box" onClick={() => {getMonitors(name)}}>
        <div className="componentItem-icon component-icon-color">
          <FolderIcon />
        </div>
        <div className="componentItem-title-div">
          <p className="componentItem-title"> { name } </p>
        </div>
      </div>
      <Divider light />
    </div>
  );
}

export default ComponentListElement;
