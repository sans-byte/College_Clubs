import React from "react";
import { FiCalendar, FiHome, FiPenTool, FiUser } from "react-icons/fi";

export const sideDrawerData = [
  {
    title: "Home",
    path: "#",
    icon: <FiHome className="inline" />,
  },
  {
    title: "Project",
    path: "#",
    icon: <FiPenTool className="inline" />,
  },
  {
    title: "Community",
    path: "#",
    icon: <FiUser className="inline" />,
  },
  {
    title: "Events",
    path: "#",
    icon: <FiCalendar className="inline" />,
  },
];

