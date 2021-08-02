import { MdDashboard } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
    iconClosed: <AiFillCaretDown />,
    iconOpen: <AiFillCaretUp />,
    subNav: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <FaUserFriends />,
      },
      {
        title: "User 2",
        path: "/dashboard/users2",
        icon: <FaUserFriends />,
      },
    ],
  },
  {
    title: "order",
    path: "/order",
    icon: "FaShoppingBag",
  },
];
