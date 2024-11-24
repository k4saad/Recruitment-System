import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="z-50 top-0 relative font-LakesNeueDemiBold">
      <nav
        className={` px-4 lg:px-6 ${
          location.pathname === "/"
            ? "bg-transparent bg-opacity-30 backdrop-blur-md  text-[#EFEDE7]"
            : "bg-[#ffffff] text-black"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <button className="lg:hidden">
            <svg
              width="60px"
              height="60px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke={`${location.pathname === "/" ? "#EFEDE7" : "#000000"}`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center ">
            <svg
              fill={`${location.pathname === "/" ? "#EFEDE7" : "#000000"}`}
              height="60px"
              width="60px" 
              viewBox="0 0 300.000000 300.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
              stroke="currentColor"
              strokeWidth="100">
                <path
                 d="M1703 2399 c-81 -40 -125 -115 -124 -211 0 -88 23 -153 97 -274 37
                -60 74 -121 83 -136 9 -16 21 -28 26 -28 13 0 80 108 134 218 116 231 85 422
                -67 422 -78 0 -152 -82 -152 -168 0 -74 51 -143 110 -144 45 -1 72 29 78 90 4
                44 1 54 -21 76 -15 14 -38 26 -52 26 -34 0 -32 -16 3 -23 28 -6 52 -40 52 -73
                0 -32 -30 -74 -53 -74 -47 0 -97 62 -97 122 0 37 41 109 74 129 59 36 133 15
                158 -45 18 -42 14 -152 -7 -217 -18 -56 -115 -249 -144 -287 -16 -21 -18 -19
                -86 91 -109 174 -138 290 -96 383 23 50 75 100 119 115 17 6 32 15 32 20 0 14
                -22 11 -67 -12z"/>
                <path d="M1411 2269 c-94 -12 -194 -45 -291 -95 -85 -43 -218 -148 -219 -171
                -1 -21 13 -15 45 18 62 65 265 189 311 189 29 0 -1 -81 -36 -100 -22 -11 -61
                -87 -61 -118 0 -13 13 -64 30 -114 48 -145 38 -218 -33 -233 -89 -20 -141 -49
                -225 -126 -48 -44 -91 -78 -97 -76 -20 8 -8 75 29 161 44 103 46 152 5 175
                -22 12 -31 12 -69 0 -56 -18 -83 -57 -105 -152 -74 -319 37 -652 285 -854 77
                -63 239 -145 330 -168 94 -23 244 -30 337 -15 337 54 600 290 695 625 32 114
                32 316 0 428 -30 104 -72 196 -126 270 -67 94 -187 210 -202 194 -3 -2 35 -45
                84 -93 144 -144 221 -302 241 -497 9 -88 0 -227 -19 -296 -12 -46 -106 -160
                -164 -200 -25 -17 -52 -41 -61 -53 -18 -27 -20 -99 -3 -116 13 -13 17 -10 -83
                -86 -306 -232 -738 -214 -1037 43 -21 18 -22 24 -12 59 15 57 4 94 -46 152
                -24 29 -44 57 -44 64 0 7 16 35 35 62 42 59 45 96 9 129 -28 26 -120 50 -154
                41 -61 -18 -57 -22 -63 55 -12 139 31 344 78 375 14 9 39 14 62 12 33 -3 38
                -7 41 -30 2 -15 -12 -63 -32 -109 -40 -92 -51 -138 -42 -174 12 -46 47 -32
                140 54 83 77 106 90 215 123 90 27 110 114 57 252 -28 73 -33 134 -15 169 7
                12 30 42 51 65 34 37 39 49 36 78 -3 24 0 35 12 38 35 11 138 26 185 29 54 2
                70 21 20 23 -16 1 -59 -2 -94 -7z m-533 -999 c54 -33 53 -52 -3 -129 -34 -46
                -31 -74 9 -118 18 -21 38 -48 45 -60 12 -23 15 -95 5 -106 -15 -15 -128 144
                -169 236 -32 74 -58 165 -51 183 9 23 123 19 164 -6z m1383 -208 c-36 -72
                -133 -203 -146 -199 -5 2 -11 20 -13 41 -3 33 1 42 34 69 21 18 62 58 93 89
                31 31 57 57 59 57 1 1 -11 -25 -27 -57z"/>
                <path d="M1687 1667 l-46 -42 -30 27 c-51 46 -121 31 -121 -26 0 -55 77 -86
                128 -50 21 14 24 14 48 -5 22 -17 41 -21 107 -21 131 0 204 -49 214 -144 7
                -61 -19 -112 -76 -148 -56 -35 -85 -43 -226 -63 -148 -20 -218 -54 -280 -136
                -65 -84 -131 -113 -155 -69 -15 27 8 78 65 144 63 74 75 115 75 258 0 80 5
                130 14 153 14 32 12 45 -5 45 -17 0 -29 -79 -29 -183 0 -141 -11 -181 -69
                -253 -54 -66 -81 -114 -81 -141 0 -33 29 -63 61 -63 46 0 78 22 143 95 77 87
                124 109 281 130 205 27 310 99 308 213 -2 115 -84 182 -223 182 -64 0 -130 18
                -130 36 0 8 73 73 83 74 10 0 9 30 -2 30 -4 0 -29 -19 -54 -43z m-90 -32 c27
                -24 28 -25 9 -40 -26 -20 -55 -19 -78 2 -21 19 -24 49 -5 56 26 11 47 6 74
                -18z"/>
                <path d="M1619 862 c-24 -16 -57 -45 -72 -65 -33 -43 -69 -64 -128 -73 -47 -8
                -107 -53 -95 -73 5 -8 13 -4 27 13 12 16 37 28 70 35 69 15 96 31 157 94 29
                30 66 60 82 67 42 17 81 2 102 -41 28 -57 35 -61 93 -54 34 5 55 3 59 -4 10
                -16 26 -14 26 3 0 23 -18 29 -84 30 -55 1 -61 3 -64 23 -5 33 -58 73 -96 73
                -18 0 -51 -12 -77 -28z"/>
                </g>
            </svg>
          </Link>
          <div className="hidden lg:flex items-center lg:order-2">
            <a
              href="/login"
              className=" hover:ring-2 hover:ring-[#00634D] focus:bg-[#00634D]  rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="text-[#EFEDE7] bg-[#00634D] hover:bg-[#124b3e] focus:ring-4 focus:ring-orange-300  rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Sign up
            </a>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          >
            <ul className="flex flex-col mt-4  lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b ${
                      isActive ? "text-[#00634D]" : ""
                    } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#00634D] lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b ${
                      isActive ? "text-[#00634D]" : ""
                    } border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#00634D] lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;