import {newProjectForm} from "./DOM-manipulation.js"

export const allFoldersArray = []

class Folder {
    constructor(name) {
        this.name = name
    }
}


export function createFolderObj() {
    const formData = new FormData(newProjectForm)
	const formDataObj = Object.fromEntries(formData)
    const project = new Folder(formDataObj.project_name)
    if(isDuplicateName(formDataObj.project_name)) {
        alert("Cannot have duplicate folder names")
    } else {
        allFoldersArray.push(project)
    }
}

const defaultFolder = new Folder("Default Folder")
allFoldersArray.push(defaultFolder)

function isDuplicateName(newFolder) {
    return allFoldersArray.some(folder => folder.name === newFolder)
}