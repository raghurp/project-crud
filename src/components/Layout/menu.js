import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LayersIcon from '@material-ui/icons/Layers';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import RoomServiceIcon from '@material-ui/icons/RoomService';

 export const menu = [
    {
        title : "Pizza Home",
        icon: <HomeIcon />,
        link: "/user/viewcatalog",
    },
  

    {
        title : "View Employees",
        icon: <GroupIcon />,
        link: "/user/employee"
    },

    {
        title : "Pizza CRUD",
        icon: <LocalPizzaIcon />,
        items: [

    {
        title : "Pizza Crust",
        icon: <LayersIcon />,
        link: "/user/pizzacrust"
    },
            
    { 
        title : "Pizza Size",
        icon: <RoomServiceIcon />,
        link: "/user/pizzasize"
    },

    
    {
        title : "Toppings Management",
        items: [
            {
                title : " Veg Toppings",
                icon: <HowToVoteIcon />,
                link: "/user/vegToppings"
            },
            {
                title : " Non-Veg Toppings",
                icon: <HowToVoteIcon />,
                link: "/user/nonVegToppings"
            },
        ]
    },

    { 
        title : "Pizza Sides",
        icon: <FastfoodIcon />,
        link: "/user/pizzasides"
    },

    { 
        title : "Beverages",
        icon: <EmojiFoodBeverageIcon />,
        link: "/user/beverage"
    }

        ]
    },

    {
        title : "My Profile",
        icon: <PersonIcon />,
        link: "/user/profile"
    }
]

