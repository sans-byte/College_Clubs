import { React, useState } from "react";
import { sideDrawerData } from "../data/data";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function SideDrawer({ sidebar }) {
  // console.log(sideDrawerData);
  const [displayArrow, setDisplayArrow] = useState(false);
  return (
    <>
      <div
        className={`${
          !sidebar ? "-translate-x-full" : null
        } lg:w-1/6 md:w-1/5 sm:w-1/5 text-white h-full fixed bg-neutral transition duration-500 ease-in-out z-10`}
      >
        <div className="w-full h-full flex flex-col justify-center items-center">
          {sideDrawerData.map((items, index) => (
            <Link
              to={items.path}
              className="w-full hover:bg-primary flex justify-start items-center p-3 rounded-sm"
            >
              <div key={index} className="w-full">
                <div className="flex flex-row items-center w-full">
                  <p className="mx-2 p-0">{items.icon}</p>
                  <p className="pt-1"> {items.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
