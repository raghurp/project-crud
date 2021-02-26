import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import InfoIcon from '@material-ui/icons/Info';

 export const Menu = [
    {
        title : "Pizza Menu",
        icon: <HomeIcon />,
        link: "/home/menu",
    },
  

    {
        title : "Store Finder",
        icon: <StoreIcon />,
        link: "/home/locate"
    },


    {
        title : "Contact Us",
        icon: <ContactPhoneIcon />,
        link: "/home/contact"
    },

    {
        title : "About Us",
        icon: <InfoIcon />,
        link: "/home/about"
    }
]

