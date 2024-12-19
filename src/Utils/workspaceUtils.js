import fs from "fs";
import path from "path";

const filePath = path.resolve(__dirname, "workspaces.json");

// Helper to read workspaces
const readWorkspaces = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); // Create file if not exists
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Helper to write workspaces
const writeWorkspaces = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// API-like methods
export const getWorkspaces = () => {
  return new Promise((resolve) => {
    const workspaces = readWorkspaces();
    resolve(workspaces);
  });
};

export const addWorkspace = (newWorkspace) => {
  return new Promise((resolve) => {
    const workspaces = readWorkspaces();
    const updatedWorkspaces = [...workspaces, newWorkspace];
    writeWorkspaces(updatedWorkspaces);
    resolve(newWorkspace);
  });
};

export const updateWorkspace = (id, updatedFields) => {
  return new Promise((resolve, reject) => {
    const workspaces = readWorkspaces();
    const index = workspaces.findIndex((workspace) => workspace.id === id);
    if (index === -1) return reject(new Error("Workspace not found"));
    workspaces[index] = { ...workspaces[index], ...updatedFields };
    writeWorkspaces(workspaces);
    resolve(workspaces[index]);
  });
};

export const deleteWorkspace = (id) => {
  return new Promise((resolve, reject) => {
    const workspaces = readWorkspaces();
    const updatedWorkspaces = workspaces.filter((workspace) => workspace.id !== id);
    if (updatedWorkspaces.length === workspaces.length) {
      return reject(new Error("Workspace not found"));
    }
    writeWorkspaces(updatedWorkspaces);
    resolve(id);
  });
};
