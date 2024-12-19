import {React, createContext, useState } from "react";
import { Workspaces } from "../Utils/workspaces";

const WorkspaceContext=createContext()

export const WorkspaceProvider=({children})=>{
    const [workspaces, setWorkspaces] = useState([...Workspaces]);
    return(
        <WorkspaceContext.Provider value={{workspaces, setWorkspaces}}>
            {children}
        </WorkspaceContext.Provider>
    )
}