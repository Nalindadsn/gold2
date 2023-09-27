"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { NavLink } from "_components";
import { useUserService } from "_services";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";

export { NavB };

function NavB() {
  const userService = useUserService();
  const user: any = userService.currentUser;

  useEffect(() => {
    userService.getCurrent();
  }, []);

  return (
    <>
      <header className="bg-gray-800 shadow-xl sticky w-full top-0 text-black z-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="flex-shrink-0 mr-5">
            </div>
            <div className="flex items-center space-x-2 ml-auto">

            
            
            <div className="relative bg-gray-700 px-4 text-gray-400 hover:text-white text-sm cursor-pointer">
              <div className="flex items-center py-2 min-h-full">
                <div className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" >
              <span className="sr-only">Open user menu</span>
            <FaUserCircle className="float-left  text-4xl" />
            </div>
            <div className="flex flex-col ml-4">
              <span>{user?.username}</span><span>ROLE : {user?.role}</span>
              </div>
              </div>
            
            <div className="origin-top-right absolute right-0 mt-0 min-w-full rounded-b-md shadow  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" aria-orientation="vertical" aria-labelledby="user-menu-button">
              </div>
              </div>

            </div>
            
          </div>
        </div>
      </header>
     
    </>
  );
}
