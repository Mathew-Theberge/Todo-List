import { newProjectForm } from "./DOM-manipulation.js";
import { updateStorage } from "./index.js";

export const allFoldersArray = [];

class Folder {
    constructor(name) {
        this.name = name;
    }
}

export function createFolderObj() {
    const formData = new FormData(newProjectForm);
    const formDataObj = Object.fromEntries(formData);
    const project = new Folder(formDataObj.project_name);
    if (isDuplicateName(formDataObj.project_name.trim())) {
        alert("Cannot have duplicate folder names");
    } else if (!formDataObj.project_name.trim()) {
        alert("Folder Name Cannot be empty");
    } else {
        allFoldersArray.push(project);
    }
    updateStorage();
}
if (localStorage.length === 0) {
    const defaultFolder = new Folder("Default Folder");
    allFoldersArray.push(defaultFolder);
}

function isDuplicateName(newFolder) {
    return allFoldersArray.some((folder) => folder.name === newFolder);
}
