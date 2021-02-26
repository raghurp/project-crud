import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { menu } from "./menu";
import { hasChildren } from "./utils";
import TopNav from "../Layout/TopNav";
import './layoutdesign.css'


export default function User() {
 
  return <div className = "sidebar" > 
    {
        menu.map((item, key) => <MenuItem  
        key={key} item={item} /> ) 
  }
    </div> 
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return  <div >
    <TopNav />
    <Component  item={item} />
    
    </div> 
};

const SingleLevel = ({ item }) => {
  return (
    <div >  
          
    <ListItem style={{color: '#e3e3e3' }}  
    id = {window.location.pathname == item.link ? "active" : " "}
    button onClick={() => {
      window.location.pathname = item.link
      }}
     
      >
      <ListItemIcon style={{color: 'white'}}>{item.icon}</ListItemIcon>
     
      <ListItemText  primary={item.title} /> 
    </ListItem>
    </div>
  );
};



const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div >
      
    <React.Fragment>
      <ListItem  button onClick={handleClick}>
        <ListItemIcon style={{color: 'white'}} >{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={ open } style={{ width: '100%'}} timeout="auto" unmountOnExit>
        <List component="div"  >
          {children.map((child, key) => (
            <MenuItem   key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
    </div>
  );
  
};
