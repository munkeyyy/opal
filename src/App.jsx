import React, { useEffect, useRef, useState } from "react";
import NavBar from "./Components/Common/NavBar.jsx";
// import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx";
import Sidebar from "./Components/Common/Sidebar.jsx";
import MyLibrary from "./Components/MyLibrary.jsx";
import Notifications from "./Components/Notifications.jsx";
import Billing from "./Components/Billing.jsx";
import Settings from "./Components/Settings.jsx";
import SearchBar from "./Components/Common/SearchBar.jsx";
// import { useNavigate } from "react-router-dom";/
import Folder from "./Components/Folder.jsx";
import { Navigate, Route, Routes } from "react-router-dom";

// Add this somewhere at the top of your app
// console.log('Available electron APIs:', window.electronAPI);
export default function App() {
  const [isExpanding, setIsExpanding] = useState(true);
  const [wp, setWp] = useState(null);
  const [currentFolder,setCurrentFolder]=useState(null)
  return (
    <div className="bg-black h-screen max-h-full">
      {/* <NavBar/> */}
      <div className="flex items-start justify-start w-full h-full overflow-x-hidden relative">
        <div className="flex  items-center">
          <Sidebar isExpanding={isExpanding} wp={wp} setWp={setWp} />
          <button
            style={{ transition: "all .5s" }}
            onClick={() => setIsExpanding(!isExpanding)}
            className={`fixed ${
              isExpanding ? "left-[250px]" : "left-0"
            } top-[2.5%] ml-[2.6rem]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 17h18M3 12h18M3 7h18"
              />
            </svg>
          </button>
        </div>
        <div
          style={{ transition: "all .5s" }}
          className={`w-full bg-[#4444] h-full ${
            isExpanding ? "ml-64" : "ml-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <SearchBar />
          </div>
          <div className="px-4 py-3">
            <Routes>
              <Route path="*" element={<Navigate to={"/"} replace />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/mylibrary" element={<MyLibrary setWp={setWp}  setCurrentFolder={setCurrentFolder} />}>
                <Route path={`folders/:id`} element={<Folder currentFolder={currentFolder} />} />
              </Route>
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
