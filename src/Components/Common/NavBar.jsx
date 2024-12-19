import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex w-full justify-between  items-center p-4">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <div className="menu">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.3rem"
          height="2.3rem"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>
        </div>
        <div className="logo flex items-center gap-3">
            <div>

          <svg
            width="42"
            height="41"
            viewBox="0 0 42 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.93288 0C4.64935 0 0.366211 4.28314 0.366211 9.56666V31.4333C0.366211 36.7169 4.64935 41 9.93288 41H31.7995C37.0831 41 41.3662 36.7169 41.3662 31.4333V9.56667C41.3662 4.28314 37.0831 0 31.7995 0H9.93288ZM20.8662 39.1364C31.1588 39.1364 39.5026 30.7926 39.5026 20.5C39.5026 10.2074 31.1588 1.86365 20.8662 1.86365C10.5736 1.86365 2.22986 10.2074 2.22986 20.5C2.22986 30.7926 10.5736 39.1364 20.8662 39.1364Z"
              fill="#D9D9D9"
            />
          </svg>
            </div>
            <p className="text-white font-semibold">Opal</p>
        </div>
      </div>
      <div>
        <Link to={"/"} className="text-white bg-[#7320DD] hover:bg-[#7320DD]/80 rounded-full py-2 px-5  font-semibold">
        Home
        </Link>
        <Link to={"/"} className="text-white py-2 px-5  font-semibold">
        Pricing
        </Link>
        <Link to={"/"} className="text-white py-2 px-5  font-semibold">
        Contact
        </Link>
       
      </div>
      <button className="text-balck bg-white rounded-full px-5 font-bold py-2">
        Login
      </button>
    </div>
  );
};

export default NavBar;
