import React from "react";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PublicIcon from '@material-ui/icons/Public';
import HomeIcon from '@material-ui/icons/Home';
export const SideBarData=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        link:"/home"
    },
    {
        title:"PublicChat",
        icon:<PublicIcon/>,
        link:"/publichat"
    },
    {
        title:"LogOut",
        icon:<MeetingRoomIcon/>,
        link:"/"

    }
]