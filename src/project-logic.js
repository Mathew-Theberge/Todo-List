import {newProjectForm, content, projectName, completedBtnElement, allTasksElement} from "./DOM-manipulation.js"
import { currentProjectObj } from "./index.js"

export function setCurrentProject(project) {
    currentProjectObj.currentProject = project
}

export function displayCurrentProject(projectElement) {
    const contentChildren = Array.from(content.children)
    contentChildren.forEach((element) => element.classList.add("hide"))
    projectElement.classList.remove("hide")
    contentChildren[0].classList.remove("hide")
    if (projectElement === completedBtnElement) {
        projectName.textContent = "Completed Tasks"
    } else if (projectElement === allTasksElement) {
        projectName.textContent = "All Tasks"
    }
}

class Project {
    constructor(name) {
        this.name = name
    }
}


export function createProjectObj() {
    const formData = new FormData(newProjectForm)
	const formDataObj = Object.fromEntries(formData)
    const project = new Project(formDataObj.project_name)
    return project
}