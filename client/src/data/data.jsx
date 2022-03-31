import React from "react";
import { FiCalendar, FiHome, FiMessageCircle, FiPenTool, FiUser } from "react-icons/fi";

export const sideDrawerData = [
  {
    title: "Home",
    path: "/user",
    icon: <FiHome className="inline p-0 m-0 border-0" />,
  },
  {
    title: "Chats",
    path: "/api/chat",
    icon: <FiMessageCircle className="inline" />,
  },
  {
    title: "Project",
    path: "/myprojects",
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

