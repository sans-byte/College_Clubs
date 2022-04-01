import React from "react";

import { FaHome ,FaProjectDiagram} from "react-icons/fa"
import {BsChatLeftDotsFill,BsFillPeopleFill,BsFillCalendarEventFill} from "react-icons/bs"

export const sideDrawerData = [
  {
    title: "Home",
    path: "/user",
    icon: <FaHome className="inline p-0 m-0 border-0" />,
  },
  {
    title: "Chats",
    path: "/api/chat",
    icon: <BsChatLeftDotsFill className="inline" />,
  },
  {
    title: "Project",
    path: "/myprojects",
    icon: <FaProjectDiagram className="inline" />,
  },
  {
    title: "Community",
    path: "#",
    icon: <BsFillPeopleFill className="inline" />,
  },
  {
    title: "Events",
    path: "#",
    icon: <BsFillCalendarEventFill className="inline" />,
  },
];
