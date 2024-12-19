import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Workspaces } from "../../Utils/workspaces";
import { useNavigate } from "react-router-dom";

// import { Workspaces } from "../../Utils/workspaces";
const Sidebar = ({ isExpanding, wp, setWp }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [activeWorkSpace, setActiveWorkspace] = useState(0);
  const [workspaces,setWorkspaces]=useState(null)
  const [spaces, setSpaces] = useState(() => {
    // Try to get workspaces from localStorage first
    const savedWorkspaces = localStorage.getItem("workspaces");
    return savedWorkspaces ? JSON.parse(savedWorkspaces) : [...Workspaces];
  });
  const [workspaceName, setWorkspaceName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update localStorage whenever spaces change
  useEffect(() => {
    localStorage.setItem("workspaces", JSON.stringify(spaces));
   
  }, [spaces]);
  useEffect(()=>{
    const wp=JSON.parse(localStorage.getItem("workspaces"))
    setWorkspaces(wp)
  },[spaces,setSpaces])
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addWorkspace = () => {
    if (!workspaceName.trim()) return;

    // Find the next id dynamically
    const nextId =
      spaces.length > 0 ? Math.max(...spaces.map((ws) => ws.id)) + 1 : 1;

    // Create new workspace object
    const newWorkspace = { id: nextId, name: workspaceName };

    // Update the spaces state (which will trigger localStorage update via useEffect)
    const updatedSpaces = [...spaces, newWorkspace];
    setSpaces(updatedSpaces);
    setWp(updatedSpaces);
    // Reset the input and close modal
    setWorkspaceName("");
    setIsModalOpen(false);
  };
  // const [workspaces, setWorkspaces] = useState(null);
  // useEffect(() => {
  //   setWorkspaces(JSON.parse(localStorage.getItem("workspaces")));
  // }, [wp, setWp]);
  return (
    <div
      className={` bg-[#1111]  flex-none fixed ${
        isExpanding ? "left-0" : "left-[-252px]"
      } top-0 h-full font-medium sidebar  w-[250px] overflow-y-auto flex flex-col gap-4 items-center justify-start overflow-hidden `}
    >
      <div className="bg-[#1111] border-b border-gray-300 p-4 gap-2 justify-center items-center w-full mb-4">
        <div className="logo flex items-center justify-center gap-3">
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
          <p className=" text-2xl text-white font-semibold">Opal</p>
        </div>
      </div>
      <div className="self-start w-full">
        <div className="pb-4 border-b border-[rgb(32,32,32)]">
          <p className="text-[rgb(175,175,175)] mb-4 px-2 font-semibold">
            Menu
          </p>
          <div className=" flex flex-col px-1 gap-2 w-full">
            <Button
              onClick={() => {
                setActive("home");
                navigate("/");
              }}
              className={`w-full  text-start justify-start px-2  border-none ${
                active === "home"
                  ? "bg-[rgb(37,34,36)] font-medium text-white"
                  : "font-normal bg-transparent text-[rgb(175,175,175)]"
              }  text-base  transition-all  hover:bg-[rgb(44, text-[rgb(175,175,175)]42,44)] py-6 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
                </g>
              </svg>
              Home
            </Button>
            <Button
              onClick={() => {
                setActive("library");
                navigate("/mylibrary");
              }}
              className={`w-full text-start justify-start px-2  border-none ${
                active === "library"
                  ? "bg-[rgb(37,34,36)] font-medium text-white"
                  : "font-normal bg-transparent text-[rgb(175,175,175)]"
              }  text-base  transition-all  hover:bg-[rgb(44,42,44)] py-6 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    d="M19.562 7a2.132 2.132 0 0 0-2.1-2.5H6.538a2.132 2.132 0 0 0-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 0 0-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 0 0-1.787 1.993c0 .107.014.237.043.496"
                    opacity="0.5"
                  />
                  <path stroke-linecap="round" d="M15 18H9" />
                  <path d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024s.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464s-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743s-1.072-1.983-1.422-4.464z" />
                </g>
              </svg>
              My Library
            </Button>
            <Button
              onClick={() => {
                setActive("notifications");
                navigate("/notifications");
              }}
              className={`w-full text-start justify-start px-2  border-none ${
                active === "notifications"
                  ? "bg-[rgb(37,34,36)] font-medium text-white"
                  : "font-normal bg-transparent text-[rgb(175,175,175)]"
              }  text-base  transition-all  hover:bg-[rgb(44,42,44)] py-6 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path d="M20 7a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
                  <path d="M12 6H4v14h14v-8h-2v6H6V8h6z" />
                </g>
              </svg>
              Notifications
            </Button>
            <Button
              onClick={() => {
                setActive("billing");
                navigate("/billing");
              }}
              className={`w-full text-start justify-start px-2  border-none ${
                active === "billing"
                  ? "bg-[rgb(37,34,36)] font-medium text-white"
                  : "font-normal bg-transparent text-[rgb(175,175,175)]"
              }  text-base  transition-all  hover:bg-[rgb(44,42,44)] py-6 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" />
                  <path stroke-linecap="round" d="M10 16H6m8 0h-1.5M2 10h20" />
                </g>
              </svg>
              Billing
            </Button>
            <Button
              onClick={() => {
                setActive("settings");
                navigate("/settings");
              }}
              className={`w-full text-start justify-start px-2  border-none ${
                active === "settings"
                  ? "bg-[rgb(37,34,36)] font-medium text-white"
                  : "font-normal bg-transparent text-[rgb(175,175,175)]"
              }  text-base  transition-all  hover:bg-[rgb(44,42,44)] py-6 `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3rem"
                height="1.3rem"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    fill="currentColor"
                    d="m5.399 5.88l.5-.867a1 1 0 0 0-1.234.186zM3.4 9.344l-.956-.295a1 1 0 0 0 .456 1.16zm-.002 5.311l-.5-.866a1 1 0 0 0-.455 1.162zm2 3.464l-.734.68a1 1 0 0 0 1.234.186zm4.6 2.655H9a1 1 0 0 0 .778.975zm4.001.002l.223.975a1 1 0 0 0 .777-.975zM18.6 18.12l-.5.866a1 1 0 0 0 1.233-.186zm1.998-3.466l.956.295a1 1 0 0 0-.456-1.16zm.002-5.311l.5.866a1 1 0 0 0 .455-1.162zm-2-3.465l.734-.679a1 1 0 0 0-1.234-.187zM14 3.225h1a1 1 0 0 0-.777-.975zm-4-.002l-.223-.975A1 1 0 0 0 9 3.223zm4 1.849h-1zm5 8.66l-.5.866zm-2 3.464l-.5.866zM5 13.732l.5.866zm2-6.928l-.5.866zM4.356 9.639a8 8 0 0 1 1.776-3.08L4.665 5.2a10 10 0 0 0-2.22 3.85zM5.072 16a8 8 0 0 1-.718-1.64l-1.91.592c.217.701.515 1.388.896 2.048zm1.06 1.441A8 8 0 0 1 5.073 16L3.34 17c.38.66.827 1.261 1.325 1.8zm7.646 2.361a8 8 0 0 1-3.556-.002l-.445 1.95a10 10 0 0 0 4.446.002zm5.866-5.441a8 8 0 0 1-1.776 3.08l1.467 1.36a10 10 0 0 0 2.22-3.85zM18.928 8c.306.53.545 1.08.718 1.64l1.91-.592A10 10 0 0 0 20.66 7zm-1.06-1.441c.397.43.754.91 1.06 1.441l1.732-1a10 10 0 0 0-1.325-1.8zm-7.646-2.361a8 8 0 0 1 3.556.002l.444-1.95a10 10 0 0 0-4.445-.002zm.778.874v-1.85H9v1.85zm-3.5.866l-1.601-.925l-1 1.732l1.6.925zm-3 6.928l-1.601.924l1 1.732l1.6-.924zm1-3.464l-1.6-.923l-1 1.732l1.6.923zM11 20.775v-1.847H9v1.847zM6.5 16.33l-1.601.925l1 1.732l1.6-.925zm12.601.925L17.5 16.33l-1 1.732l1.601.925zM15 20.777v-1.849h-2v1.85zm5.101-12.3l-1.601.925l1 1.732l1.601-.925zm.998 5.312l-1.599-.923l-1 1.732l1.6.923zM15 5.072V3.225h-2v1.847zm3.101-.059l-1.601.925l1 1.732l1.601-.925zM13 5.072c0 2.31 2.5 3.753 4.5 2.598l-1-1.732a1 1 0 0 1-1.5-.866zm5.5 4.33c-2 1.155-2 4.041 0 5.196l1-1.732a1 1 0 0 1 0-1.732zm-1 6.928c-2-1.154-4.5.289-4.5 2.598h2a1 1 0 0 1 1.5-.866zM11 18.928c0-2.31-2.5-3.753-4.5-2.598l1 1.732a1 1 0 0 1 1.5.866zm-5.5-4.33c2-1.155 2-4.041 0-5.196l-1 1.732a1 1 0 0 1 0 1.732zM9 5.072a1 1 0 0 1-1.5.866l-1 1.732c2 1.154 4.5-.289 4.5-2.598z"
                  />
                </g>
              </svg>
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className="self-start w-full">
        <div className="pb-4 border-b border-[rgb(32,32,32)]">
          <div className="flex items-center mb-4 justify-between">
            <p className="text-[rgb(175,175,175)]  px-2 font-semibold">
              Workspaces
            </p>
            <button
              onClick={showModal}
              className="text-[rgb(175,175,175)]  rounded-full  cursor-pointer  text-xs hover:text-white flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="currentColor"
                    fill-opacity="0.25"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke-width="1.2"
                    d="M12 8v8m4-4H8"
                  />
                </g>
              </svg>
              Add Workspace
            </button>
            <Modal
              className="bg-black"
              title="Create Workspace"
              open={isModalOpen}
              onOk={addWorkspace}
              onCancel={handleCancel}
            >
              <div className="my-4 w-full flex items-center flex-col">
                <input
                  type="text"
                  className="w-full p-3 bg-transparent border border-[rgb(44,44,44)] rounded-lg"
                  placeholder="Workspace Name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>
              <button
                onClick={addWorkspace}
                className="my-2  bg-[rgb(51,51,51)] text-white py-2 px-4 rounded-lg"
              >
                Add Workspace
              </button>
            </Modal>
          </div>
          <div className="h-[150px] overflow-auto flex flex-col sidebar">
            {workspaces ? (
              workspaces.length > 0 &&
              workspaces.slice(10).map((workspace, index) => {
                return (
                  <div
                    key={workspace.id}
                    onClick={() => {
                      setActiveWorkspace(workspace.id);
                      console.log(workspace.id);
                    }}
                    className={`flex items-center ${
                      activeWorkSpace === workspace.id
                        ? "bg-[rgb(37,34,36)]"
                        : ""
                    } rounded-md cursor-pointer hover:bg-[rgb(37,34,36)] gap-2 py-2 px-2 mb-2`}
                  >
                    <div className="px-3 py-2 h-10 w-10 flex items-center justify-center font-bold text-[#1e1e1e] bg-[rgba(75,75,75)] rounded-md">
                      {workspace.name.charAt(0).toLocaleUpperCase()}
                    </div>
                    <span className="text-white font-semibold">
                      {workspace.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-[rgb(175,175,175)] opacity-[0.7]">
                  No Workspaces Available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
