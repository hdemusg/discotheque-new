import React, { useState } from "react";
import Logo from "../images/Rectangle1.svg";
import joinIcon from "../images/joinIcon2.png";
import createIcon2 from "../images/addIcon.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className="bg-orange-600">
      <nav className="flex items-center  flex-wrap cursor-pointer">
        <div className="justify-between flex w-full items-center">
          <div className=" cursor-pointer flex items-center">
            <img src={Logo} alt="logo" className="h-9 w-9 inline"></img>
            <h1 className="hover:text-neutral-50 duration-500 ml-1">
              {" "}
              DISCOTHEQUE{" "}
            </h1>
          </div>

          <div className="hidden md:flex justify-around w-full">
            <div className="flex">
              <h1 className="hover:text-neutral-50	duration-500">
                Join A Session
              </h1>
              <img
                src={joinIcon}
                alt="joinIcon"
                className="h-6 w-6 inline"
              ></img>
            </div>
            <div className="flex">
              <h1 className="hover:text-neutral-50	duration-500">
                Create New Session
              </h1>
              <img
                src={createIcon2}
                alt="createIcon"
                className="h-6 w-6 inline"
              ></img>
            </div>
          </div>
          {/* Mobile Navbar Starting */}
          <div className="flex md:hidden">
            <i className="fas fa-bars mr-2" onClick={() => setIsOpen(!isOpen)}>
              Menu
            </i>
            {isOpen ? (
              <div className="fixed inset-0 w-full h-full bg-orange-600">
                <i
                  className="fas fa-xmark mr-2 text-2xl mt-4"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Close Menu
                </i>
                <div className="flex flex-col h-[70%] justify-center text-xl">
                  <div className="flex justify-center">
                    <h1 className="font-serif hover:text-neutral-50	duration-500">
                      Join A Session
                    </h1>
                    <img
                      src={joinIcon}
                      alt="joinIcon"
                      className="h-6 w-6 inline"
                    ></img>
                  </div>
                  <div className="flex justify-center">
                    <h1 className="font-serif hover:text-neutral-50	duration-500">
                      Create New Session
                    </h1>
                    <img
                      src={createIcon2}
                      alt="createIcon"
                      className="h-6 w-6 inline"
                    ></img>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
