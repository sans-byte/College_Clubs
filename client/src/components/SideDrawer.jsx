import { React } from "react";
import { sideDrawerData } from "../data/data";
import { Link } from "react-router-dom";

function SideDrawer({ sidebar }) {
  // console.log(sideDrawerData);
  return (
    <>
      <div
        className={`${
          !sidebar ? "-translate-x-full" : null
        } lg:w-1/6 md:w-1/5 sm:w-1/5 text-white h-full fixed bg-neutral transition duration-500 ease-in-out flex justify-center items-center z-10`}
      >
        <div>
          <ul className="flex flex-col items-center justify-center w-full h-full">
            {sideDrawerData.map((items, index) => (
              <li key={index} className="w-full h-10">
                <Link to={items.path}>
                  <span className="p-3 inline text-lg">{items.icon}</span>
                  <p className="inline text-lg">{items.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
