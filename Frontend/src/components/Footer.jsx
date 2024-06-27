import React from "react";
import { FaCamera } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gold py-4">
      <div className="container mx-auto flex justify-center items-center space-x-2">
        <span>
          &copy; {new Date().getFullYear()} Photo App. By Mirko Cherchi
        </span>
        <FaCamera />
      </div>
    </footer>
  );
};

export default Footer;
